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
// POST /create-checkout  { plan: "founding"|"standard", userId: "uuid", email: "..." }
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
      .from('stripe_customers')
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

      await supabase.from('stripe_customers').insert({
        user_id: userId,
        stripe_customer_id: customerId,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 7,
        metadata: { supabase_user_id: userId, plan },
      },
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
    .from('stripe_customers')
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

  const obj = event.data.object;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const planType = obj.metadata?.plan
        || (obj.items.data[0].price.unit_amount === 999 ? 'founding' : 'standard');

      // Find the user via stripe_customers
      const { data: customer } = await supabase
        .from('stripe_customers')
        .select('user_id')
        .eq('stripe_customer_id', obj.customer)
        .single();

      if (!customer) break;

      // Upsert into stripe_subscriptions
      const subData = {
        user_id: customer.user_id,
        stripe_subscription_id: obj.id,
        stripe_customer_id: obj.customer,
        stripe_price_id: obj.items.data[0].price.id,
        status: obj.status,
        plan_type: planType,
        current_period_start: new Date(obj.current_period_start * 1000).toISOString(),
        current_period_end: new Date(obj.current_period_end * 1000).toISOString(),
        trial_start: obj.trial_start ? new Date(obj.trial_start * 1000).toISOString() : null,
        trial_end: obj.trial_end ? new Date(obj.trial_end * 1000).toISOString() : null,
        cancel_at_period_end: obj.cancel_at_period_end,
        canceled_at: obj.canceled_at ? new Date(obj.canceled_at * 1000).toISOString() : null,
      };

      const { data: existingSub } = await supabase
        .from('stripe_subscriptions')
        .select('id')
        .eq('stripe_subscription_id', obj.id)
        .single();

      if (existingSub) {
        await supabase
          .from('stripe_subscriptions')
          .update(subData)
          .eq('stripe_subscription_id', obj.id);
      } else {
        await supabase.from('stripe_subscriptions').insert(subData);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      await supabase
        .from('stripe_subscriptions')
        .update({
          status: 'canceled',
          cancel_at_period_end: false,
          canceled_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', obj.id);
      break;
    }

    case 'invoice.payment_failed': {
      await supabase
        .from('stripe_subscriptions')
        .update({ status: 'past_due' })
        .eq('stripe_customer_id', obj.customer);
      break;
    }
  }

  res.json({ received: true });
}

// ─── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Billing server running on :${PORT}`));
