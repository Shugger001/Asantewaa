-- Glam Room — run once in Supabase → SQL Editor
-- https://supabase.com/dashboard/project/pksfslkwmlrlttoojluk/sql/new

-- 1) Location columns (two shops)
alter table public.bookings
  add column if not exists location_id text,
  add column if not exists location text;

update public.bookings
set
  location_id = coalesce(location_id, 'glam-room-tn4f'),
  location = coalesce(location, 'Behind Tasty Fried Chicken, Abelemkpe, Accra')
where location_id is null or location is null;

alter table public.bookings
  alter column location_id set not null,
  alter column location set not null;

drop index if exists bookings_unique_slot;

create unique index if not exists bookings_unique_slot
  on public.bookings (booking_date, booking_time, location_id)
  where status in ('pending', 'confirmed');

create index if not exists bookings_date_location_idx
  on public.bookings (booking_date, location_id);

-- 2) Allow website (anon key) to create & read bookings
alter table public.bookings enable row level security;

drop policy if exists "Public can insert bookings" on public.bookings;
drop policy if exists "Public can read bookings for availability" on public.bookings;

create policy "Public can insert bookings"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

create policy "Public can read bookings for availability"
  on public.bookings
  for select
  to anon, authenticated
  using (status in ('pending', 'confirmed'));

-- 3) Optional: enforce max 6 reservations per shop per day — run supabase/max-daily-bookings.sql
