-- Add location fields for two Glam Room shops (run after 001 if table already existed)

alter table public.bookings
  add column if not exists location_id text,
  add column if not exists location text;

-- Backfill any existing rows (optional — uses Abelemkpe as default)
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
