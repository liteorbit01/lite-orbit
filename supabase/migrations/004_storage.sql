-- =============================================================================
-- Lite Orbit Platform
-- Migration: 004
-- File: 004_storage.sql
-- Version: 1.0
--
-- Description:
-- Creates Supabase Storage buckets and policies.
--
-- =============================================================================

begin;

-- =============================================================================
-- STORAGE BUCKETS
-- =============================================================================
insert into storage.buckets
(
    id,
    name,
    public
)

values

(
'products',
'products',
true
),

(
'brands',
'brands',
true
),

(
'collections',
'collections',
true
),

(
'categories',
'categories',
true
),

(
'site',
'site',
true
),

(
'profiles',
'profiles',
false
)

on conflict (id)
do update
set
    name = excluded.name,
    public = excluded.public;

-- =============================================================================
-- PUBLIC READ ACCESS
-- =============================================================================

drop policy if exists "Public can view product images"
on storage.objects;

create policy "Public can view product images"
on storage.objects
for select
using (bucket_id = 'products');

drop policy if exists "Public can view brand assets"
on storage.objects;

create policy "Public can view brand assets"
on storage.objects
for select
using (bucket_id = 'brands');

drop policy if exists "Public can view collections"
on storage.objects;

create policy "Public can view collections"
on storage.objects
for select
using (bucket_id = 'collections');

drop policy if exists "Public can view categories"
on storage.objects;

create policy "Public can view categories"
on storage.objects
for select
using (bucket_id = 'categories');

drop policy if exists "Public can view site assets"
on storage.objects;

create policy "Public can view site assets"
on storage.objects
for select
using (bucket_id = 'site');

-- =============================================================================
-- PROFILE AVATAR ACCESS
-- =============================================================================

drop policy if exists "Users can view their own avatars"
on storage.objects;

create policy "Users can view their own avatars"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can upload their own avatars"
on storage.objects;

create policy "Users can upload their own avatars"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update their own avatars"
on storage.objects;

create policy "Users can update their own avatars"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete their own avatars"
on storage.objects;

create policy "Users can delete their own avatars"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
);

-- =============================================================================
-- ADMINISTRATIVE STORAGE
-- =============================================================================
--
-- The following buckets are managed exclusively by the Lite Orbit
-- Admin Dashboard using the Supabase Service Role.
--
-- products
-- brands
-- collections
-- categories
-- site
--
-- The Service Role bypasses RLS automatically, therefore no INSERT,
-- UPDATE or DELETE policies are created for these buckets.
--
-- Public users have READ access only.
--
-- =============================================================================
-- =============================================================================
-- STORAGE VALIDATION NOTES
-- =============================================================================
--
-- Bucket Purpose
--
-- products     -> Product images
-- brands       -> Brand logos and assets
-- collections  -> Collection banners
-- categories   -> Category images
-- site         -> Website assets (hero banners, marketing, etc.)
-- profiles     -> Customer profile avatars
--
-- Upload Rules
--
-- products      -> Service Role only
-- brands        -> Service Role only
-- collections   -> Service Role only
-- categories    -> Service Role only
-- site          -> Service Role only
-- profiles      -> Authenticated user (own folder only)
--
-- Read Rules
--
-- products      -> Public
-- brands        -> Public
-- collections   -> Public
-- categories    -> Public
-- site          -> Public
-- profiles      -> Owner only
--
-- =============================================================================

commit;

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================