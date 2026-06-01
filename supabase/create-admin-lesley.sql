-- Glam Room — create / reset admin: lesleyyskills@gmail.com
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/pksfslkwmlrlttoojluk/sql/new
--
-- Also run setup-admin.sql first if admin policies are not applied yet.

create extension if not exists pgcrypto with schema extensions;

update auth.users
set
  encrypted_password = extensions.crypt('GlamLesley2026!', extensions.gen_salt('bf')),
  email_confirmed_at = coalesce(email_confirmed_at, now()),
  updated_at = now()
where email = 'lesleyyskills@gmail.com';

-- Verify (should return 1 row with confirmed email)
select id, email, email_confirmed_at is not null as email_confirmed
from auth.users
where email = 'lesleyyskills@gmail.com';
