-- Glam Room by Asantewaa — bookings table
-- Run in Supabase SQL Editor or via: supabase db push

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  location_id text not null,
  location text not null,
  service text not null,
  booking_date date not null,
  booking_time text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'refunded')),
  created_at timestamptz not null default now()
);

-- One active booking per date/time/location
create unique index if not exists bookings_unique_slot
  on public.bookings (booking_date, booking_time, location_id)
  where status in ('pending', 'confirmed');

create index if not exists bookings_date_location_idx
  on public.bookings (booking_date, location_id);

alter table public.bookings enable row level security;

-- Public can create bookings (anon key from the website)
create policy "Public can insert bookings"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

-- Public can read bookings to check slot availability
create policy "Public can read bookings for availability"
  on public.bookings
  for select
  to anon, authenticated
  using (status in ('pending', 'confirmed'));
