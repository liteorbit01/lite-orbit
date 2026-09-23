-- ==========================================================
-- SHOPPING CARTS
-- ==========================================================

CREATE TABLE IF NOT EXISTS public.shopping_carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    session_id TEXT,

    status TEXT NOT NULL DEFAULT 'active'
        CHECK (
            status IN (
                'active',
                'converted',
                'abandoned'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT shopping_cart_owner_check
    CHECK (
        user_id IS NOT NULL
        OR session_id IS NOT NULL
    )
);

CREATE INDEX IF NOT EXISTS idx_shopping_carts_user
ON public.shopping_carts(user_id);

CREATE INDEX IF NOT EXISTS idx_shopping_carts_session
ON public.shopping_carts(session_id);

CREATE INDEX IF NOT EXISTS idx_shopping_carts_status
ON public.shopping_carts(status);



-- ==========================================================
-- SHOPPING CART ITEMS
-- ==========================================================

CREATE TABLE IF NOT EXISTS public.shopping_cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    cart_id UUID NOT NULL
        REFERENCES public.shopping_carts(id)
        ON DELETE CASCADE,

    variant_id UUID NOT NULL
        REFERENCES public.product_variants(id)
        ON DELETE RESTRICT,

    quantity INTEGER NOT NULL
        CHECK (quantity > 0),

    price_at_addition NUMERIC(10,2) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT shopping_cart_variant_unique
    UNIQUE (
        cart_id,
        variant_id
    )
);

CREATE INDEX IF NOT EXISTS idx_shopping_cart_items_cart
ON public.shopping_cart_items(cart_id);

CREATE INDEX IF NOT EXISTS idx_shopping_cart_items_variant
ON public.shopping_cart_items(variant_id);

-- ==========================================================
-- CART PRODUCTS VIEW
-- ==========================================================

create or replace view cart_products_view as
select
    pv.id as variant_id,

    pv.product_id,

    p.name as product_name,

    p.slug,

    pv.sku,

    pv.size,

    pv.color,

    pv.price,

    pv.stock_quantity,

    (
        select pi.image_url
        from product_images pi
        where pi.product_id = p.id
        order by pi.display_order
        limit 1
    ) as image_url

from product_variants pv

join products p
    on p.id = pv.product_id

where pv.active = true;
