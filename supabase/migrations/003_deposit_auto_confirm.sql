-- Deposit tracking + auto-confirm when payment_status becomes paid (Moolre)

alter table public.bookings
  add column if not exists payment_reference text,
  add column if not exists deposit_paid_at timestamptz;

create unique index if not exists bookings_payment_reference_idx
  on public.bookings (payment_reference)
  where payment_reference is not null;

create or replace function public.confirm_booking_on_deposit()
returns trigger
language plpgsql
as $$
begin
  if new.payment_status = 'paid'
     and (old.payment_status is distinct from 'paid')
     and new.status = 'pending' then
    new.status := 'confirmed';
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_confirm_on_deposit on public.bookings;

create trigger bookings_confirm_on_deposit
  before update on public.bookings
  for each row
  execute function public.confirm_booking_on_deposit();
