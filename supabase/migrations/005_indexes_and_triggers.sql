-- =============================================================================
-- Lite Orbit Platform
-- Migration: 005
-- File: 005_indexes_and_triggers.sql
-- Version: 1.0
--
-- Description:
-- Performance indexes, helper functions and optimization.
--
-- =============================================================================

begin;

-- =============================================================================
-- ADDITIONAL PERFORMANCE INDEXES
-- =============================================================================

create index if not exists idx_products_featured
on products(featured);

create index if not exists idx_products_created_at
on products(created_at);

create index if not exists idx_products_category_status
on products(category_id, status);

create index if not exists idx_products_brand_status
on products(brand_id, status);

create index if not exists idx_products_collection_status
on products(collection_id, status);

create index if not exists idx_variants_active
on product_variants(active);

create index if not exists idx_variants_sku_active
on product_variants(sku, active);

create index if not exists idx_inventory_quantity
on inventory(quantity);

create index if not exists idx_orders_created_at
on orders(created_at);

create index if not exists idx_orders_customer_created
on orders(customer_id, created_at);

create index if not exists idx_order_items_variant
on order_items(variant_id);

create index if not exists idx_profiles_display_name
on profiles(display_name);

create index if not exists idx_shipping_active
on shipping_methods(is_active);
-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Generate Lite Orbit Order Number
-- Format:
-- LO-20260705-000001
-- -----------------------------------------------------------------------------
-- -----------------------------------------------------------------------------
-- DEVELOPMENT NOTE
--
-- This implementation is intended for development and low-volume stores.
-- Before production launch, it should be replaced with a sequence-based
-- implementation to guarantee uniqueness under concurrent order creation.
-- -----------------------------------------------------------------------------

create or replace function generate_order_number()
returns text
language plpgsql
as
$$
declare
    next_number bigint;
begin

    select
        coalesce(count(*), 0) + 1
    into next_number
    from orders;

    return
        'LO-'
        || to_char(current_date, 'YYYYMMDD')
        || '-'
        || lpad(next_number::text, 6, '0');

end;
$$;

-- -----------------------------------------------------------------------------
-- Available Inventory
-- -----------------------------------------------------------------------------

create or replace function available_inventory(
    inventory_row inventory
)
returns integer
language sql
stable
as
$$
select
    greatest(
        inventory_row.quantity - inventory_row.reserved_quantity,
        0
    );
$$;

-- -----------------------------------------------------------------------------
-- Low Stock Check
-- -----------------------------------------------------------------------------

create or replace function is_low_stock(
    inventory_row inventory
)
returns boolean
language sql
stable
as
$$
select
(
    inventory_row.quantity
    <=
    inventory_row.low_stock_threshold
);
$$;

-- -----------------------------------------------------------------------------
-- Customer Total Orders
-- -----------------------------------------------------------------------------

create or replace function customer_total_orders(
    customer_uuid uuid
)
returns integer
language sql
stable
as
$$
select
count(*)
from orders
where customer_id = customer_uuid;
$$;

-- -----------------------------------------------------------------------------
-- Customer Lifetime Spend
-- -----------------------------------------------------------------------------

create or replace function customer_total_spent(
    customer_uuid uuid
)
returns numeric
language sql
stable
as
$$
select
coalesce(sum(grand_total),0)
from orders
where customer_id = customer_uuid
and payment_status='paid';
$$;
-- =============================================================================
-- INVENTORY VALIDATION
-- =============================================================================

create or replace function validate_inventory()
returns trigger
language plpgsql
as
$$
begin

    if new.quantity < 0 then
        raise exception 'Inventory quantity cannot be negative.';
    end if;

    if new.reserved_quantity < 0 then
        raise exception 'Reserved quantity cannot be negative.';
    end if;

    if new.reserved_quantity > new.quantity then
        raise exception 'Reserved quantity cannot exceed inventory quantity.';
    end if;

    return new;

end;
$$;

drop trigger if exists trg_validate_inventory
on inventory;

create trigger trg_validate_inventory
before insert or update
on inventory
for each row
execute function validate_inventory();

-- =============================================================================
-- ORDER TOTAL VALIDATION
-- =============================================================================

create or replace function validate_order_totals()
returns trigger
language plpgsql
as
$$
begin

    if new.subtotal < 0 then
        raise exception 'Subtotal cannot be negative.';
    end if;

    if new.shipping_total < 0 then
        raise exception 'Shipping total cannot be negative.';
    end if;

    if new.tax_total < 0 then
        raise exception 'Tax total cannot be negative.';
    end if;

    if new.discount_total < 0 then
        raise exception 'Discount total cannot be negative.';
    end if;

    if new.grand_total < 0 then
        raise exception 'Grand total cannot be negative.';
    end if;

    return new;

end;
$$;

drop trigger if exists trg_validate_orders
on orders;

create trigger trg_validate_orders
before insert or update
on orders
for each row
execute function validate_order_totals();

-- =============================================================================
-- PRODUCT SLUG NORMALIZATION
-- =============================================================================

create or replace function normalize_product_slug()
returns trigger
language plpgsql
as
$$
begin

    new.slug :=
    regexp_replace(
        lower(trim(new.slug)),
        '\s+',
        '-',
        'g'
    );

    return new;

end;
$$;

drop trigger if exists trg_products_slug
on products;

create trigger trg_products_slug
before insert or update
on products
for each row
execute function normalize_product_slug();
-- =============================================================================
-- DATABASE OPTIMIZATION NOTES
-- =============================================================================
--
-- This migration provides:
--
-- • Performance indexes for common application queries
-- • Helper functions for reusable business logic
-- • Inventory validation triggers
-- • Order validation triggers
-- • Automatic product slug normalization
--
-- Future enhancements (when needed):
--
-- • PostgreSQL Full Text Search
-- • pgvector AI product recommendations
-- • Advanced inventory reservation
-- • Automatic order numbering using sequences
-- • Materialized analytics views
--
-- =============================================================================

commit;

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================