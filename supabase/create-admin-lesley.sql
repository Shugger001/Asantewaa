-- Glam Room — create / reset admin staff account
-- Run in Supabase SQL Editor (project pksfslkwmlrlttoojluk)
-- Run setup-admin.sql first if admin booking policies are missing.
--
-- If sign-in still fails after this script, create the user manually:
-- Dashboard → Authentication → Users → Add user → Auto Confirm User = ON

create extension if not exists pgcrypto with schema extensions;

do $$
declare
  admin_email text := 'lesleyyskills@gmail.com';
  admin_password text := 'GlamLesley2026!';
  user_id uuid;
  existing_id uuid;
begin
  select id into existing_id from auth.users where email = admin_email;

  if existing_id is null then
    user_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmation_sent_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_sso_user
    ) values (
      '00000000-0000-0000-0000-000000000000',
      user_id,
      'authenticated',
      'authenticated',
      admin_email,
      extensions.crypt(admin_password, extensions.gen_salt('bf')),
      now(),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      false
    );

    insert into auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      user_id,
      user_id,
      admin_email,
      jsonb_build_object('sub', user_id::text, 'email', admin_email),
      'email',
      now(),
      now(),
      now()
    );
  else
    update auth.users
    set
      encrypted_password = extensions.crypt(admin_password, extensions.gen_salt('bf')),
      email_confirmed_at = coalesce(email_confirmed_at, now()),
      updated_at = now()
    where id = existing_id;
  end if;
end $$;

-- Should return 1 row with email_confirmed = true
select id, email, email_confirmed_at is not null as email_confirmed
from auth.users
where email = 'lesleyyskills@gmail.com';
