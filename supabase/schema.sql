-- CycleCare v2 schema
-- Run in Supabase SQL Editor using a project owner account.
-- IMPORTANT: Review with a security professional before collecting real health data.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  last_period_start date,
  cycle_length smallint not null default 28 check (cycle_length between 15 and 45),
  period_length smallint not null default 5 check (period_length between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cycle_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  flow text not null default 'Not bleeding'
    check (flow in ('Not bleeding','Spotting','Light','Medium','Heavy')),
  symptoms text[] not null default '{}',
  mood text not null default 'Okay'
    check (mood in ('Okay','Happy','Calm','Anxious','Irritable','Low','Tired')),
  notes varchar(1000),
  created_at timestamptz not null default now()
);

create index if not exists cycle_entries_user_date_idx
  on public.cycle_entries(user_id, entry_date desc);

alter table public.profiles enable row level security;
alter table public.cycle_entries enable row level security;

-- Each authenticated user can access only their own row.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "cycle_entries_select_own" on public.cycle_entries;
create policy "cycle_entries_select_own" on public.cycle_entries
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "cycle_entries_insert_own" on public.cycle_entries;
create policy "cycle_entries_insert_own" on public.cycle_entries
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "cycle_entries_update_own" on public.cycle_entries;
create policy "cycle_entries_update_own" on public.cycle_entries
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "cycle_entries_delete_own" on public.cycle_entries;
create policy "cycle_entries_delete_own" on public.cycle_entries
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Automatically create an empty profile after signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Do not create public policies. Do not expose service_role keys in frontend code.
