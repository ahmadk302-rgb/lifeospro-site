require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY   // service role — server-side only
);

const app = express();

// Stripe webhooks need the raw body — must come before express.json()
app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(cors({ origin: process.env.APP_URL }));
app.use(express.json());

// ─── Health check ────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ─── Create Checkout Session ─────────────────────────────────
// POST /create-checkout  { plan: "founding"|"standard", userId: "uuid" }
app.post('/create-checkout', async (req, res) => {
  const { plan, userId, email } = req.body;

  const priceId = plan === 'founding'
    ? process.env.STRIPE_PRICE_FOUNDING
    : process.env.STRIPE_PRICE_STANDARD;

  if (!priceId) return res.status(400).json({ error: 'Invalid plan' });

  try {
    // Find or create Stripe customer linked to this Supabase user
    let customerId;
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    if (existing?.stripe_customer_id) {
      customerId = existing.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId },
      });
      customerId = customer.id;

      await supabase.from('subscriptions').insert({
        user_id: userId,
        stripe_customer_id: customerId,
        plan,
        status: 'inactive',
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: `${process.env.APP_URL}/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/pricing`,
      metadata: { supabase_user_id: userId, plan },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// ─── Customer Portal (manage/cancel) ─────────────────────────
app.post('/customer-portal', async (req, res) => {
  const { userId } = req.body;

  const { data } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single();

  if (!data?.stripe_customer_id) {
    return res.status(404).json({ error: 'No subscription found' });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: data.stripe_customer_id,
    return_url: `${process.env.APP_URL}/billing`,
  });

  res.json({ url: session.url });
});

// ─── Stripe Webhook Handler ──────────────────────────────────
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const subscription = event.data.object;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const plan = subscription.metadata?.plan
        || (subscription.items.data[0].price.unit_amount === 999 ? 'founding' : 'standard');

      await supabase
        .from('subscriptions')
        .update({
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          plan,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          trial_end: subscription.trial_end
            ? new Date(subscription.trial_end * 1000).toISOString()
            : null,
          cancel_at_period_end: subscription.cancel_at_period_end,
        })
        .eq('stripe_customer_id', subscription.customer);
      break;
    }

    case 'customer.subscription.deleted': {
      await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          cancel_at_period_end: false,
        })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      await supabase
        .from('subscriptions')
        .update({ status: 'past_due' })
        .eq('stripe_customer_id', invoice.customer);
      break;
    }
  }

  res.json({ received: true });
}

// ─── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Billing server running on :${PORT}`));
