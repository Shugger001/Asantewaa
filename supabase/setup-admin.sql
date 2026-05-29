-- Glam Room admin — run in Supabase SQL Editor after setup.sql
-- Lets logged-in Supabase Auth users manage all bookings

drop policy if exists "Admin read all bookings" on public.bookings;
drop policy if exists "Admin update bookings" on public.bookings;
drop policy if exists "Admin delete bookings" on public.bookings;

create policy "Admin read all bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

create policy "Admin update bookings"
  on public.bookings
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin delete bookings"
  on public.bookings
  for delete
  to authenticated
  using (true);
