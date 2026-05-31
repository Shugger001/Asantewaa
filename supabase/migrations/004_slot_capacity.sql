-- 4 time slots × 3 chairs = 12 reservations per shop per day
-- Matches SITE.booking.maxReservationsPerDay (12) and maxReservationsPerSlot (3)

-- Allow multiple bookings per date/time/location (up to 3 per slot)
drop index if exists public.bookings_unique_slot;

create index if not exists bookings_slot_lookup_idx
  on public.bookings (booking_date, booking_time, location_id)
  where status in ('pending', 'confirmed');

-- Daily cap: 12 per location
create or replace function public.enforce_daily_booking_capacity()
returns trigger
language plpgsql
as $$
declare
  booking_count integer;
  max_per_day constant integer := 12;
begin
  select count(*)
  into booking_count
  from public.bookings
  where booking_date = new.booking_date
    and location_id = new.location_id
    and status in ('pending', 'confirmed')
    and (tg_op = 'INSERT' or id is distinct from new.id);

  if booking_count >= max_per_day then
    raise exception 'Daily booking limit reached for this location on %', new.booking_date
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

-- Per-slot cap: 3 per location
create or replace function public.enforce_slot_booking_capacity()
returns trigger
language plpgsql
as $$
declare
  slot_count integer;
  max_per_slot constant integer := 3;
begin
  select count(*)
  into slot_count
  from public.bookings
  where booking_date = new.booking_date
    and booking_time = new.booking_time
    and location_id = new.location_id
    and status in ('pending', 'confirmed')
    and (tg_op = 'INSERT' or id is distinct from new.id);

  if slot_count >= max_per_slot then
    raise exception 'Time slot fully booked for this location on % at %', new.booking_date, new.booking_time
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists bookings_daily_capacity on public.bookings;
drop trigger if exists bookings_slot_capacity on public.bookings;

create trigger bookings_daily_capacity
  before insert on public.bookings
  for each row
  execute function public.enforce_daily_booking_capacity();

create trigger bookings_slot_capacity
  before insert on public.bookings
  for each row
  execute function public.enforce_slot_booking_capacity();
