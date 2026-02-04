-- LENS9 data model: museum + market core
-- Run inside Supabase Postgres (UUID + pgcrypto + pg_trgm available)

-- Extensions
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- Enums
create type era_enum as enum ('2010s', '2020s', '2030s');
create type auth_level_enum as enum ('unchecked', 'verified', 'rejected');
create type item_status_enum as enum ('draft', 'live', 'sold');
create type media_type_enum as enum ('main', 'detail', 'tag', 'stitch', 'zipper', 'patch', 'label');
create type drop_status_enum as enum ('scheduled', 'live', 'ended');
create type wtb_status_enum as enum ('open', 'fulfilled', 'closed');

-- Users (profiles)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique,
  display_name text,
  badges text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Brands & lines
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.lines (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (brand_id, name)
);

-- Features dictionary
create table public.features (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  created_at timestamptz not null default now()
);

-- Items
create table public.items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brand_id uuid references public.brands(id) on delete set null,
  line_id uuid references public.lines(id) on delete set null,
  season text,
  era era_enum,
  size text,
  price integer,
  condition_score integer check (condition_score between 1 and 10),
  condition_notes text,
  auth_level auth_level_enum not null default 'unchecked',
  origin_card jsonb default '{}', -- material/tech, story, notes
  status item_status_enum not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Item media
create table public.item_media (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items(id) on delete cascade,
  url text not null,
  type media_type_enum not null default 'main',
  sort integer default 0,
  created_at timestamptz not null default now()
);

-- Item features (join)
create table public.item_features (
  item_id uuid not null references public.items(id) on delete cascade,
  feature_id uuid not null references public.features(id) on delete cascade,
  primary key (item_id, feature_id)
);

-- Drops
create table public.drops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  status drop_status_enum not null default 'scheduled',
  created_at timestamptz not null default now()
);

create table public.drop_items (
  drop_id uuid not null references public.drops(id) on delete cascade,
  item_id uuid not null references public.items(id) on delete cascade,
  primary key (drop_id, item_id)
);

-- WTB requests
create table public.wtb_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  brand_id uuid references public.brands(id) on delete set null,
  query text not null,
  size text,
  max_price integer,
  status wtb_status_enum not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_items_brand on public.items (brand_id);
create index idx_items_status on public.items (status);
create index idx_items_price on public.items (price);
create index idx_items_title_trgm on public.items using gin (title gin_trgm_ops);

-- Optional FTS index (comment in if needed later)
-- create index idx_items_title_tsv on public.items using gin (to_tsvector('simple', coalesce(title,'')));

-- Updated-at trigger helper (simple)
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_items_updated_at
before update on public.items
for each row execute procedure public.set_updated_at();

create trigger trg_users_updated_at
before update on public.users
for each row execute procedure public.set_updated_at();

create trigger trg_wtb_updated_at
before update on public.wtb_requests
for each row execute procedure public.set_updated_at();
