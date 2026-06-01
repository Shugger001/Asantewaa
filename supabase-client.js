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

export function getSupabase(options = {}) {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    const { url, anonKey } = SITE.booking.supabase;
    client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        ...options.auth,
      },
    });
  }
  return client;
}
