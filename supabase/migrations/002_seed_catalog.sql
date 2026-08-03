-- =============================================================================
-- Lite Orbit Platform
-- Migration: 002
-- File: 002_seed_catalog.sql
-- Version: 1.0
--
-- Description:
-- Seeds the Lite Orbit catalog with initial business data.
--
-- =============================================================================

begin;

-- =============================================================================
-- BRAND
-- =============================================================================

insert into brands
(
    name,
    slug,
    description,
    website
)
values
(
    'Lite Orbit',
    'lite-orbit',
    'Premium home textiles and apparel.',
    'https://liteorbit.com'
)
on conflict (slug) do nothing;

-- =============================================================================
-- CATEGORIES
-- =============================================================================

insert into categories
(
    name,
    slug,
    description,
    display_order
)
values

(
    'Home',
    'home',
    'Premium home textile products.',
    1
),

(
    'Apparel',
    'apparel',
    'Timeless clothing collections.',
    2
)

on conflict (slug) do nothing;

-- =============================================================================
-- PRODUCT TYPES
-- =============================================================================

insert into product_types
(
    category_id,
    name,
    slug,
    description,
    display_order
)

values

(
(
select id
from categories
where slug='home'
),

'Bedding',

'bedding',

'Luxury bedding products.',

1
),

(
(
select id
from categories
where slug='home'
),

'Curtains',

'curtains',

'Curtains and drapery.',

2
),

(
(
select id
from categories
where slug='home'
),

'Pillow Covers',

'pillow-covers',

'Decorative pillow covers.',

3
),

(
(
select id
from categories
where slug='home'
),

'Throws',

'throws',

'Throws and blankets.',

4
),

(
(
select id
from categories
where slug='home'
),

'Decorative Cushions',

'decorative-cushions',

'Decorative cushions.',

5
),

(
(
select id
from categories
where slug='apparel'
),

'Men''s Collection',

'mens-collection',

'Menswear.',

1
),

(
(
select id
from categories
where slug='apparel'
),

'Women''s Collection',

'womens-collection',

'Womenswear.',

2
),

(
(
select id
from categories
where slug='apparel'
),

'Children''s Collection',

'childrens-collection',

'Children clothing.',

3
)

on conflict (slug) do nothing;
-- =============================================================================
-- COLLECTIONS
-- =============================================================================

insert into collections
(
    name,
    slug,
    description
)

values

(
'Essentials',
'essentials',
'Everyday premium essentials.'
),

(
'Signature',
'signature',
'Flagship Lite Orbit collection.'
),

(
'Hotel Collection',
'hotel-collection',
'Luxury hospitality textiles.'
),

(
'Modern Living',
'modern-living',
'Modern lifestyle collection.'
),

(
'Seasonal',
'seasonal',
'Seasonal and limited edition products.'
)

on conflict (slug) do nothing;

-- =============================================================================
-- CURRENCIES
-- =============================================================================

insert into currencies
(
    code,
    name,
    symbol,
    is_default
)

values

(
'CAD',
'Canadian Dollar',
'$',
true
),

(
'USD',
'US Dollar',
'$',
false
),

(
'EUR',
'Euro',
'€',
false
),

(
'GBP',
'British Pound',
'£',
false
)

on conflict (code) do nothing;

-- =============================================================================
-- COUNTRIES
-- =============================================================================

insert into countries
(
    code,
    name,
    currency_id
)

values

(
'CA',
'Canada',
(
select id
from currencies
where code='CAD'
)
),

(
'US',
'United States',
(
select id
from currencies
where code='USD'
)
)

on conflict (code) do nothing;

-- =============================================================================
-- SHIPPING METHODS
-- =============================================================================

insert into shipping_methods
(
    name,
    description,
    base_price,
    estimated_days,
    display_order
)

values

(
'Standard Shipping',
'Standard ground shipping.',
12.99,
5,
1
),

(
'Express Shipping',
'Fast delivery service.',
24.99,
2,
2
),

(
'Free Shipping',
'Available when order minimum is reached.',
0,
7,
3
)

on conflict (name) do nothing;

commit;