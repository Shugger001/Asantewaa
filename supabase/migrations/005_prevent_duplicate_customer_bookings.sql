-- One active booking per phone number per day (pending/confirmed)

create or replace function public.canonical_booking_phone(phone text)
returns text
language sql
immutable
as $$
  with digits as (
    select regexp_replace(coalesce(phone, ''), '[^0-9]', '', 'g') as d
  )
  select case
    when d like '0%' and length(d) >= 10 then '233' || substring(d from 2)
    else d
  end
  from digits;
$$;

create or replace function public.enforce_customer_booking_uniqueness()
returns trigger
language plpgsql
as $$
declare
  existing_count integer;
begin
  select count(*)
  into existing_count
  from public.bookings b
  where b.booking_date = new.booking_date
    and b.status in ('pending', 'confirmed')
    and public.canonical_booking_phone(b.phone) = public.canonical_booking_phone(new.phone)
    and (tg_op = 'INSERT' or b.id is distinct from new.id);

  if existing_count > 0 then
    raise exception 'You already have a booking on this date. Use Find my booking to view it or pick another day.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists bookings_customer_uniqueness on public.bookings;

create trigger bookings_customer_uniqueness
  before insert on public.bookings
  for each row
  execute function public.enforce_customer_booking_uniqueness();

create or replace function public.customer_has_active_booking_on_date(p_phone text, p_date date)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.bookings b
    where b.booking_date = p_date
      and b.status in ('pending', 'confirmed')
      and public.canonical_booking_phone(b.phone) = public.canonical_booking_phone(p_phone)
  );
$$;

revoke all on function public.customer_has_active_booking_on_date(text, date) from public;
grant execute on function public.customer_has_active_booking_on_date(text, date) to anon, authenticated;
