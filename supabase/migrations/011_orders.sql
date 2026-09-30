-- ======================================================
-- 011_orders.sql
-- Orders
-- ======================================================

-- ------------------------------------------------------
-- Order Status Type
-- ------------------------------------------------------

create type order_status as enum (
    'pending',
    'processing',
    'completed',
    'cancelled'
);

-- ------------------------------------------------------
-- Payment Status Type
-- ------------------------------------------------------

create type payment_status_type as enum (
    'pending',
    'paid',
    'failed',
    'refunded'
);

-- ------------------------------------------------------
-- Orders
-- ------------------------------------------------------

create table public.orders (

    id uuid primary key
        default gen_random_uuid(),

    customer_id uuid
        references public.customers(id),

    order_number text
        not null
        unique,

    status order_status
        not null
        default 'pending',

    payment_status payment_status_type
        not null
        default 'pending',

    currency_code text
        not null
        default 'CAD',

    subtotal numeric(10,2)
        not null
        check (subtotal >= 0),

    shipping_total numeric(10,2)
        not null
        default 0
        check (shipping_total >= 0),

    tax_total numeric(10,2)
        not null
        default 0
        check (tax_total >= 0),

    discount_total numeric(10,2)
        not null
        default 0
        check (discount_total >= 0),

    grand_total numeric(10,2)
        not null
        check (grand_total >= 0),

    stripe_payment_intent text
        unique,

    notes text,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()

);

-- ------------------------------------------------------
-- Foreign Key Index
-- ------------------------------------------------------

create index idx_orders_customer
on public.orders(customer_id);

create index idx_orders_status
on public.orders(status);

create index idx_orders_payment_status
on public.orders(payment_status);

create index idx_orders_created_at
on public.orders(created_at);

-- ------------------------------------------------------
-- Updated At Trigger
-- ------------------------------------------------------

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger trg_orders_updated_at
before update
on public.orders
for each row
execute function update_updated_at_column();