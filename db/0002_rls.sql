-- RLS policies for trust & safety

-- Helper role checks from JWT
create or replace function public.auth_role()
returns text
language sql
stable
as $$
  select coalesce(current_setting('request.jwt.claim.role', true), '');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select auth_role() = 'admin';
$$;

create or replace function public.is_verified_seller()
returns boolean
language sql
stable
as $$
  select auth_role() in ('admin', 'seller_verified');
$$;

-- Enable RLS
alter table public.items enable row level security;
alter table public.wtb_requests enable row level security;
alter table public.users enable row level security;

-- ITEMS
create policy "items_public_read_live_sold"
on public.items
for select
using (status in ('live', 'sold') or is_admin());

create policy "items_admin_write"
on public.items
for all
using (is_admin())
with check (is_admin());

-- WTB requests: only owner or admin
create policy "wtb_read_own_or_admin"
on public.wtb_requests
for select
using (user_id = auth.uid() or is_admin());

create policy "wtb_write_own_or_admin"
on public.wtb_requests
for all
using (user_id = auth.uid() or is_admin())
with check (user_id = auth.uid() or is_admin());

-- Profiles (users): public read, only self can update
create policy "users_public_read"
on public.users
for select
using (true);

create policy "users_self_upsert"
on public.users
for all
using (id = auth.uid() or is_admin())
with check (id = auth.uid() or is_admin());

-- STORAGE bucket `items`
-- Make sure bucket exists and RLS is on
insert into storage.buckets (id, name, public)
values ('items', 'items', false)
on conflict (id) do nothing;

alter table storage.objects enable row level security;

create policy "items_bucket_public_read"
on storage.objects
for select
using (bucket_id = 'items');

create policy "items_bucket_upload_admin_or_verified"
on storage.objects
for insert
with check (bucket_id = 'items' and is_verified_seller());

create policy "items_bucket_update_admin_or_verified"
on storage.objects
for update
using (bucket_id = 'items' and is_verified_seller())
with check (bucket_id = 'items' and is_verified_seller());

create policy "items_bucket_delete_admin"
on storage.objects
for delete
using (bucket_id = 'items' and is_admin());
