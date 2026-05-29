-- Customer booking lookup (no account) — run in Supabase SQL Editor
-- Matches phone + last 4 letters of name; returns only safe fields

create or replace function public.find_my_bookings(p_phone text, p_name_suffix text)
returns table (
  booking_date date,
  booking_time text,
  status text,
  service text,
  location text
)
language sql
security definer
set search_path = public
as $$
  with normalized as (
    select
      regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g') as phone_digits,
      lower(right(regexp_replace(coalesce(p_name_suffix, ''), '[^a-zA-Z]', '', 'g'), 4)) as suffix
  )
  select
    b.booking_date,
    b.booking_time,
    b.status,
    b.service,
    coalesce(nullif(b.location, ''), 'Glam Room')
  from public.bookings b
  cross join normalized n
  where length(n.suffix) = 4
    and lower(right(regexp_replace(b.full_name, '[^a-zA-Z]', '', 'g'), 4)) = n.suffix
    and (
      regexp_replace(b.phone, '[^0-9]', '', 'g') = n.phone_digits
      or regexp_replace(b.phone, '[^0-9]', '', 'g') = regexp_replace(
        case
          when n.phone_digits like '233%' then '0' || substring(n.phone_digits from 4)
          when n.phone_digits like '0%' then '233' || substring(n.phone_digits from 2)
          else n.phone_digits
        end,
        '[^0-9]', '', 'g'
      )
    )
  order by b.booking_date desc, b.booking_time desc;
$$;

revoke all on function public.find_my_bookings(text, text) from public;
grant execute on function public.find_my_bookings(text, text) to anon, authenticated;
