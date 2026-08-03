-- =============================================================================
-- Lite Orbit Platform
-- Migration: 002a
-- File: 002a_customer_profile_link.sql
--
-- Description:
-- Links customers to authenticated profiles.
--
-- =============================================================================

begin;

alter table customers
add column profile_id uuid;

alter table customers
add constraint fk_customers_profile
foreign key (profile_id)
references profiles(id)
on delete set null;

create unique index idx_customers_profile
on customers(profile_id)
where profile_id is not null;

create index idx_customers_email
on customers(lower(email));

commit;