-- =============================================================================
-- Lite Orbit Platform
-- Migration: 001
-- File: 001_initial_schema.sql
-- Version: 1.0
--
-- Description:
-- Creates the core database schema for the Lite Orbit Platform.
--
-- =============================================================================

create extension if not exists pgcrypto;

-- =============================================================================
-- ENUMS
-- =============================================================================

create type product_status as enum
(
    'draft',
    'review',
    'published',
    'archived'
);

create type order_status as enum
(
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'completed',
    'cancelled',
    'refunded'
);

create type payment_status_type as enum
(
    'pending',
    'authorized',
    'paid',
    'failed',
    'refunded'
);

create type address_type as enum
(
    'billing',
    'shipping'
);

create type audit_action_type as enum
(
    'insert',
    'update',
    'delete',
    'login',
    'logout'
);

-- =============================================================================
-- BRANDS
-- =============================================================================

create table brands
(
    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    slug text not null unique,

    description text,

    logo_url text,

    website text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

-- =============================================================================
-- CATEGORIES
-- =============================================================================

create table categories
(
    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    slug text not null unique,

    description text,

    image_url text,

    display_order integer not null default 0,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

-- =============================================================================
-- PRODUCT TYPES
-- =============================================================================

create table product_types
(
    id uuid primary key default gen_random_uuid(),

    category_id uuid not null
        references categories(id)
        on delete cascade,

    name text not null,

    slug text not null unique,

    description text,

    display_order integer not null default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

-- =============================================================================
-- COLLECTIONS
-- =============================================================================

create table collections
(
    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    slug text not null unique,

    description text,

    hero_image_url text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

-- =============================================================================
-- PRODUCTS
-- =============================================================================

create table products
(
    id uuid primary key default gen_random_uuid(),

    brand_id uuid
        not null
        references brands(id)
        on delete restrict,

    category_id uuid
        not null
        references categories(id)
        on delete restrict,

    product_type_id uuid
        references product_types(id)
        on delete restrict,

    collection_id uuid
        references collections(id)
        on delete set null,

    product_code text unique,

    name text not null,

    slug text not null unique,

    short_description text,

    description text,

    material text,

    care_instructions text,

    seo_title text,

    seo_description text,

    featured boolean not null default false,

    status product_status
        not null
        default 'draft',

    deleted_at timestamptz,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- PRODUCT VARIANTS
-- =============================================================================

create table product_variants
(
    id uuid primary key default gen_random_uuid(),

    product_id uuid
        not null
        references products(id)
        on delete cascade,

    sku text not null unique,

    size text,

    color text,

    material text,

    barcode text,

    weight numeric(8,2)
        check (weight is null or weight >= 0),

    price numeric(10,2)
        not null
        check (price >= 0),

    compare_at_price numeric(10,2)
        check (
            compare_at_price is null
            or compare_at_price >= 0
        ),

    cost_price numeric(10,2)
        check (
            cost_price is null
            or cost_price >= 0
        ),

    active boolean not null default true,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);
-- =============================================================================
-- PRODUCT IMAGES
-- =============================================================================

create table product_images
(
    id uuid primary key default gen_random_uuid(),

    product_id uuid
        not null
        references products(id)
        on delete cascade,

    image_url text not null,

    alt_text text,

    image_type text
        not null
        default 'gallery'
        check (
            image_type in
            (
                'hero',
                'gallery',
                'detail',
                'lifestyle',
                'thumbnail'
            )
        ),

    display_order integer
        not null
        default 0,

    created_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- INVENTORY
-- =============================================================================

create table inventory
(
    id uuid primary key default gen_random_uuid(),

    variant_id uuid
        not null
        unique
        references product_variants(id)
        on delete cascade,

    quantity integer
        not null
        default 0
        check (quantity >= 0),

    reserved_quantity integer
        not null
        default 0
        check (reserved_quantity >= 0),

    low_stock_threshold integer
        not null
        default 5
        check (low_stock_threshold >= 0),

    reorder_quantity integer
        not null
        default 20
        check (reorder_quantity >= 0),

    allow_backorder boolean
        not null
        default false,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now(),

    constraint chk_reserved_not_greater_than_quantity
        check (reserved_quantity <= quantity)
);

-- =============================================================================
-- CUSTOMERS
-- =============================================================================

create table customers
(
    id uuid primary key default gen_random_uuid(),

    first_name text not null,

    last_name text not null,

    email text
        not null
        unique,

    phone text,

    marketing_opt_in boolean
        not null
        default false,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- ADDRESSES
-- =============================================================================

create table addresses
(
    id uuid primary key default gen_random_uuid(),

    customer_id uuid
        not null
        references customers(id)
        on delete cascade,

    type address_type
        not null,

    first_name text not null,

    last_name text not null,

    company text,

    address_line_1 text not null,

    address_line_2 text,

    city text not null,

    province text not null,

    postal_code text not null,

    country text not null,

    phone text,

    is_default boolean
        not null
        default false,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- ORDERS
-- =============================================================================

create table orders
(
    id uuid primary key default gen_random_uuid(),

    customer_id uuid
        null
        references customers(id)
        on delete set null,

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

    stripe_payment_intent text,

    notes text,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- ORDER ITEMS
-- =============================================================================

create table order_items
(
    id uuid primary key default gen_random_uuid(),

    order_id uuid
        not null
        references orders(id)
        on delete cascade,

    variant_id uuid
        references product_variants(id)
        on delete set null,

    product_name text
        not null,

    product_slug text,

    variant_name text,

    sku text,

    quantity integer
        not null
        check (quantity > 0),

    unit_price numeric(10,2)
        not null
        check (unit_price >= 0),

    line_total numeric(10,2)
        not null
        check (line_total >= 0)
);
-- =============================================================================
-- ROLES
-- =============================================================================

create table roles
(
    id uuid primary key default gen_random_uuid(),

    code text
        not null
        unique,

    name text
        not null
        unique,

    description text,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- PROFILES
-- =============================================================================

create table profiles
(
    id uuid
        primary key
        references auth.users(id)
        on delete cascade,

    email text
        not null
        unique,

    first_name text,

    last_name text,

    display_name text,

    avatar_url text,

    phone text,

    is_active boolean
        not null
        default true,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- PROFILE ROLES
-- =============================================================================

create table profile_roles
(
    profile_id uuid
        not null
        references profiles(id)
        on delete cascade,

    role_id uuid
        not null
        references roles(id)
        on delete cascade,

    assigned_at timestamptz
        not null
        default now(),

    primary key (profile_id, role_id)
);

-- =============================================================================
-- PERMISSIONS
-- =============================================================================

create table permissions
(
    id uuid primary key default gen_random_uuid(),

    code text
        not null
        unique,

    name text
        not null,

    description text,

    created_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- ROLE PERMISSIONS
-- =============================================================================

create table role_permissions
(
    role_id uuid
        not null
        references roles(id)
        on delete cascade,

    permission_id uuid
        not null
        references permissions(id)
        on delete cascade,

    granted_at timestamptz
        not null
        default now(),

    primary key (role_id, permission_id)
);

-- =============================================================================
-- AUDIT LOGS
-- =============================================================================

create table audit_logs
(
    id uuid primary key default gen_random_uuid(),

    profile_id uuid
        references profiles(id)
        on delete set null,

    table_name text
        not null,

    record_id uuid,

    action audit_action_type
        not null,

    old_data jsonb,

    new_data jsonb,

    ip_address inet,

    user_agent text,

    created_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- CURRENCIES
-- =============================================================================

create table currencies
(
    id uuid primary key default gen_random_uuid(),

    code text
        not null
        unique,

    name text
        not null,

    symbol text
        not null,

    is_default boolean
        not null
        default false,

    created_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- COUNTRIES
-- =============================================================================

create table countries
(
    id uuid primary key default gen_random_uuid(),

    code text
        not null
        unique,

    name text
        not null,

    currency_id uuid
        references currencies(id)
        on delete restrict,

    is_active boolean
        not null
        default true,

    created_at timestamptz
        not null
        default now()
);

-- =============================================================================
-- SHIPPING METHODS
-- =============================================================================

create table shipping_methods
(
    id uuid primary key default gen_random_uuid(),

    name text
        not null
        unique,

    description text,

    base_price numeric(10,2)
        not null
        default 0
        check (base_price >= 0),

    estimated_days integer
        check (estimated_days is null or estimated_days > 0),

    display_order integer
        not null
        default 0,

    is_active boolean
        not null
        default true,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);
-- =============================================================================
-- INDEXES
-- =============================================================================

create index idx_products_brand_id
    on products(brand_id);

create index idx_products_category_id
    on products(category_id);

create index idx_products_collection_id
    on products(collection_id);

create index idx_products_status
    on products(status);

create index idx_products_slug
    on products(slug);

create index idx_product_variants_product_id
    on product_variants(product_id);

create index idx_product_images_product_id
    on product_images(product_id);

create index idx_inventory_variant_id
    on inventory(variant_id);

create index idx_addresses_customer_id
    on addresses(customer_id);

create index idx_orders_customer_id
    on orders(customer_id);

create index idx_orders_status
    on orders(status);

create index idx_order_items_order_id
    on order_items(order_id);

create index idx_profiles_email
    on profiles(email);

create index idx_audit_logs_profile_id
    on audit_logs(profile_id);

create index idx_audit_logs_created_at
    on audit_logs(created_at);

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================================================

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as
$$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- =============================================================================
-- UPDATED_AT TRIGGERS
-- =============================================================================

create trigger trg_brands_updated_at
before update on brands
for each row
execute function update_updated_at_column();

create trigger trg_categories_updated_at
before update on categories
for each row
execute function update_updated_at_column();

create trigger trg_product_types_updated_at
before update on product_types
for each row
execute function update_updated_at_column();

create trigger trg_collections_updated_at
before update on collections
for each row
execute function update_updated_at_column();

create trigger trg_products_updated_at
before update on products
for each row
execute function update_updated_at_column();

create trigger trg_product_variants_updated_at
before update on product_variants
for each row
execute function update_updated_at_column();

create trigger trg_inventory_updated_at
before update on inventory
for each row
execute function update_updated_at_column();

create trigger trg_customers_updated_at
before update on customers
for each row
execute function update_updated_at_column();

create trigger trg_addresses_updated_at
before update on addresses
for each row
execute function update_updated_at_column();

create trigger trg_orders_updated_at
before update on orders
for each row
execute function update_updated_at_column();

create trigger trg_profiles_updated_at
before update on profiles
for each row
execute function update_updated_at_column();

create trigger trg_roles_updated_at
before update on roles
for each row
execute function update_updated_at_column();

create trigger trg_shipping_methods_updated_at
before update on shipping_methods
for each row
execute function update_updated_at_column();

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================