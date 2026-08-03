-- =============================================================================
-- Lite Orbit Platform
-- Migration: 003
-- File: 003_row_level_security.sql
-- Version: 1.0
--
-- Description:
-- Enables Row Level Security (RLS) and defines security policies.
--
-- =============================================================================

begin;

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================

alter table brands enable row level security;
alter table categories enable row level security;
alter table product_types enable row level security;
alter table collections enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_images enable row level security;
alter table inventory enable row level security;
alter table customers enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table profiles enable row level security;
alter table roles enable row level security;
alter table permissions enable row level security;
alter table profile_roles enable row level security;
alter table role_permissions enable row level security;
alter table audit_logs enable row level security;
alter table currencies enable row level security;
alter table countries enable row level security;
alter table shipping_methods enable row level security;

-- =============================================================================
-- PUBLIC CATALOG ACCESS
-- =============================================================================

create policy public_read_brands
on brands
for select
using (true);

create policy public_read_categories
on categories
for select
using (true);

create policy public_read_product_types
on product_types
for select
using (true);

create policy public_read_collections
on collections
for select
using (true);

create policy public_read_products
on products
for select
using (status = 'published');

create policy public_read_variants
on product_variants
for select
using (active = true);

create policy public_read_images
on product_images
for select
using (true);

create policy public_read_currencies
on currencies
for select
using (true);

create policy public_read_countries
on countries
for select
using (true);

create policy public_read_shipping
on shipping_methods
for select
using (is_active = true);
-- =============================================================================
-- CUSTOMER PROFILE
-- =============================================================================

create policy customer_read_own_profile
on profiles
for select
to authenticated
using (auth.uid() = id);

create policy customer_update_own_profile
on profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- =============================================================================
-- CUSTOMER ADDRESSES
-- =============================================================================

create policy customer_read_addresses
on addresses
for select
to authenticated
using (
    customer_id in (
        select id
        from customers
        where profile_id = auth.uid()
    )
);

create policy customer_insert_addresses
on addresses
for insert
to authenticated
with check (
    customer_id in (
        select id
        from customers
        where profile_id = auth.uid()
    )
);

create policy customer_update_addresses
on addresses
for update
to authenticated
using (
    customer_id in (
        select id
        from customers
        where profile_id = auth.uid()
    )
)
with check (
    customer_id in (
        select id
        from customers
        where profile_id = auth.uid()
    )
);

create policy customer_delete_addresses
on addresses
for delete
to authenticated
using (
    customer_id in (
        select id
        from customers
        where profile_id = auth.uid()
    )
);

-- =============================================================================
-- CUSTOMER ORDERS
-- =============================================================================

create policy customer_read_orders
on orders
for select
to authenticated
using (
    customer_id in (
        select id
        from customers
        where profile_id = auth.uid()
    )
);

create policy customer_read_order_items
on order_items
for select
to authenticated
using (
    order_id in (
        select id
        from orders
        where customer_id in (
            select id
            from customers
            where profile_id = auth.uid()
        )
    )
);

-- =============================================================================
-- CUSTOMER RECORD
-- =============================================================================

create policy customer_read_customer_record
on customers
for select
to authenticated
using (
    profile_id = auth.uid()
);

create policy customer_update_customer_record
on customers
for update
to authenticated
using (
    profile_id = auth.uid()
)
with check (
    profile_id = auth.uid()
);
-- =============================================================================
-- ADMIN ACCESS
-- =============================================================================
--
-- Lite Orbit uses the Supabase Service Role for all server-side
-- administration (Admin Dashboard, Stripe webhooks, inventory updates,
-- catalog management, etc.).
--
-- The Service Role bypasses RLS automatically.
--
-- Therefore, no administrator RLS policies are required here.
--
-- This keeps the security model simple and avoids depending on
-- custom JWT role claims.
--
-- =============================================================================

-- =============================================================================
-- PROTECT SENSITIVE TABLES
-- =============================================================================
--
-- No public or authenticated policies are created for:
--
-- inventory
-- roles
-- permissions
-- profile_roles
-- role_permissions
-- audit_logs
--
-- These tables remain inaccessible from the client.
-- They are only accessible through the Service Role.
--
-- =============================================================================
-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
commit;