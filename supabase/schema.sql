create extension if not exists pgcrypto;

create table if not exists persons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nickname text,
  gender text default 'unspecified',
  birth_year int,
  is_deceased boolean default false,
  death_year int,
  description text,
  photo_url text,
  created_at timestamptz default now()
);

create table if not exists relationships (
  id uuid primary key default gen_random_uuid(),
  from_person uuid references persons(id) on delete cascade,
  to_person uuid references persons(id) on delete cascade,
  relation_type text not null,
  note text,
  created_at timestamptz default now()
);

create table if not exists updates (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  message text not null,
  person_id uuid references persons(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table persons enable row level security;
alter table relationships enable row level security;
alter table updates enable row level security;

drop policy if exists "public read persons" on persons;
drop policy if exists "public write persons" on persons;
drop policy if exists "public read relationships" on relationships;
drop policy if exists "public write relationships" on relationships;
drop policy if exists "public read updates" on updates;
drop policy if exists "public write updates" on updates;

create policy "public read persons" on persons for select using (true);
create policy "public write persons" on persons for insert with check (true);
create policy "public read relationships" on relationships for select using (true);
create policy "public write relationships" on relationships for insert with check (true);
create policy "public read updates" on updates for select using (true);
create policy "public write updates" on updates for insert with check (true);
