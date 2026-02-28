// Run once: creates the two products + prices in your Stripe account
// Usage: cp ../.env.example ../.env  (fill in real keys)  →  npm run setup

require('dotenv').config({ path: '../.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function setup() {
  // 1. Founding Member — $9.99/mo, 7-day trial
  const founding = await stripe.products.create({
    name: 'Life OS Pro — Founding Member',
    description: 'Early-adopter price locked for life. Full access to all 4 modules.',
  });
  const foundingPrice = await stripe.prices.create({
    product: founding.id,
    unit_amount: 999,           // $9.99
    currency: 'usd',
    recurring: { interval: 'month', trial_period_days: 7 },
  });

  // 2. Standard — $14.99/mo, 7-day trial
  const standard = await stripe.products.create({
    name: 'Life OS Pro — Standard',
    description: 'Full access to all 4 modules.',
  });
  const standardPrice = await stripe.prices.create({
    product: standard.id,
    unit_amount: 1499,          // $14.99
    currency: 'usd',
    recurring: { interval: 'month', trial_period_days: 7 },
  });

  console.log('\n=== Stripe products created ===');
  console.log(`Founding Member  product: ${founding.id}`);
  console.log(`                 price:   ${foundingPrice.id}`);
  console.log(`Standard         product: ${standard.id}`);
  console.log(`                 price:   ${standardPrice.id}`);
  console.log('\nAdd these price IDs to your .env as:');
  console.log(`STRIPE_PRICE_FOUNDING=${foundingPrice.id}`);
  console.log(`STRIPE_PRICE_STANDARD=${standardPrice.id}\n`);
}

setup().catch(console.error);
