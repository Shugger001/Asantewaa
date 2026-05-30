import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SITE } from './data.js?v=20260536';

let client = null;

export function isSupabaseConfigured() {
  const { url, anonKey } = SITE.booking.supabase || {};
  return Boolean(
    url &&
    anonKey &&
    !url.includes('YOUR_SUPABASE') &&
    !anonKey.includes('YOUR_SUPABASE')
  );
}

export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(SITE.booking.supabase.url, SITE.booking.supabase.anonKey);
  }
  return client;
}
