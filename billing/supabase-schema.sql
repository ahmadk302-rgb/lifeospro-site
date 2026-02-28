-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Subscriptions table: tracks Stripe subscription state per user
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_customer_id text unique not null,
  stripe_subscription_id text unique,
  plan text check (plan in ('founding', 'standard')),
  status text default 'inactive'
    check (status in ('trialing', 'active', 'past_due', 'canceled', 'unpaid', 'inactive')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for fast lookups
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscriptions_stripe_customer
  on public.subscriptions(stripe_customer_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function update_updated_at();

-- RLS: users can only read their own subscription
alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);
