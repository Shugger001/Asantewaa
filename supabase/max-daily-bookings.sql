-- Enforce max 6 reservations per shop per day (matches SITE.booking.maxReservationsPerDay)
-- Run once in Supabase → SQL Editor after setup.sql

create or replace function public.enforce_daily_booking_capacity()
returns trigger
language plpgsql
as $$
declare
  booking_count integer;
  max_per_day constant integer := 6;
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

drop trigger if exists bookings_daily_capacity on public.bookings;

create trigger bookings_daily_capacity
  before insert on public.bookings
  for each row
  execute function public.enforce_daily_booking_capacity();
