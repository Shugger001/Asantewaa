-- Deposit auto-confirm (Moolre) — run in Supabase → SQL Editor
-- Deploy edge functions: initiate-deposit, confirm-deposit
-- Secrets: MOOLRE_API_USER, MOOLRE_API_PUBKEY, MOOLRE_ACCOUNT_NUMBER,
--           MOOLRE_BUSINESS_EMAIL, DEPOSIT_AMOUNT_GHS, SITE_URL

alter table public.bookings
  add column if not exists paystack_reference text,
  add column if not exists payment_reference text,
  add column if not exists deposit_paid_at timestamptz;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'paystack_reference'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'payment_reference'
  ) then
    alter table public.bookings rename column paystack_reference to payment_reference;
  end if;
end $$;

alter table public.bookings
  add column if not exists payment_reference text;

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
