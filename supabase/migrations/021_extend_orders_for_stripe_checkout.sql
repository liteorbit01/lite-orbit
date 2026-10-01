-- ======================================================
-- Extend Orders for Stripe Checkout
-- ======================================================

alter table public.orders
add column stripe_session_id text unique;

alter table public.orders
add column cart_id uuid
references public.shopping_carts(id);

create index idx_orders_cart_id
on public.orders(cart_id);

create index idx_orders_stripe_session
on public.orders(stripe_session_id);