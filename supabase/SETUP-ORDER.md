# Supabase setup checklist

> **Do not run this file in the SQL Editor.**  
> Supabase only runs `.sql` files. Markdown lines starting with `#` cause a syntax error.  
> In the repo, open each file below, copy its full contents, paste into **SQL Editor → New query**, then click **Run**.

Project: `pksfslkwmlrlttoojluk`

## Run these `.sql` files in order

| Step | File to open and run |
|------|----------------------|
| 1 | `supabase/setup.sql` |
| 2 | `supabase/max-daily-bookings.sql` |
| 3 | `supabase/setup-find-booking.sql` |
| 4 | `supabase/setup-admin.sql` |
| 5 | `supabase/create-admin-lesley.sql` |
| 6 | `supabase/setup-deposit.sql` |

Skip `migrations/004_slot_capacity.sql` if step 2 already succeeded (it overlaps with max-daily-bookings).

## After SQL

1. Deploy edge functions: `initiate-deposit`, `confirm-deposit` (see `supabase/functions/`).
2. Add Moolre secrets in Supabase → Project Settings → Edge Functions.
3. In `data.js`, set `booking.deposit.configured` to `true` when payments are live.
4. Rotate Lesley’s password in **Authentication → Users** after first login.
