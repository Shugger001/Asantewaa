# Supabase setup (run once in SQL Editor)

Run these scripts **in order** on project `pksfslkwmlrlttoojluk`:

1. `setup.sql` — bookings table and RLS
2. `max-daily-bookings.sql` — daily cap (12) and per-slot cap (3)
3. `migrations/004_slot_capacity.sql` — if not already applied by step 2
4. `setup-find-booking.sql` — homepage “Find my booking” lookup
5. `setup-admin.sql` — admin policies
6. `create-admin-lesley.sql` — Lesley admin user (Authentication)
7. `setup-deposit.sql` — deposit columns and payment status

Then deploy edge functions:

- `supabase/functions/initiate-deposit`
- `supabase/functions/confirm-deposit`

Set secrets: `MOOLRE_*` (or your provider keys). In `data.js`, set `booking.deposit.configured` to `true` when live.

**Rotate** the Lesley password in Supabase Auth after first login (it is no longer stored in the site code).
