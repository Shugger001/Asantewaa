import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const moolreUser = Deno.env.get('MOOLRE_API_USER');
    const moolrePubKey = Deno.env.get('MOOLRE_API_PUBKEY');
    const accountNumber = Deno.env.get('MOOLRE_ACCOUNT_NUMBER');
    const businessEmail = Deno.env.get('MOOLRE_BUSINESS_EMAIL');
    const depositAmount = Deno.env.get('DEPOSIT_AMOUNT_GHS') || '50';
    const apiBase = Deno.env.get('MOOLRE_API_BASE') || 'https://api.moolre.com';
    const siteUrl = (Deno.env.get('SITE_URL') || 'https://shugger001.github.io/Asantewaa').replace(/\/$/, '');

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!moolreUser || !accountNumber || !businessEmail || !supabaseUrl || !serviceRoleKey) {
      throw new Error('Moolre payments are not configured on the server.');
    }

    if (apiBase.includes('api.moolre.com') && !moolrePubKey) {
      throw new Error('MOOLRE_API_PUBKEY is required for live payments.');
    }

    const { booking_id: bookingId, return_path: returnPath } = await req.json();

    if (!bookingId) {
      return new Response(JSON.stringify({ error: 'Missing booking id.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, payment_status, status')
      .eq('id', bookingId)
      .maybeSingle();

    if (bookingError) throw bookingError;
    if (!booking) {
      return new Response(JSON.stringify({ error: 'Reservation not found.' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (booking.payment_status === 'paid') {
      return new Response(JSON.stringify({ error: 'Deposit already paid for this reservation.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const externalref = `GR-${String(bookingId).slice(0, 8)}-${Date.now()}`;
    const safeReturnPath = String(returnPath || '/glam-room.html').startsWith('/')
      ? String(returnPath || '/glam-room.html')
      : '/glam-room.html';
    const redirectUrl = `${siteUrl}${safeReturnPath}?deposit=return&booking_id=${encodeURIComponent(bookingId)}&ref=${encodeURIComponent(externalref)}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-USER': moolreUser,
    };
    if (moolrePubKey) headers['X-API-PUBKEY'] = moolrePubKey;

    const linkRes = await fetch(`${apiBase}/embed/link`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 1,
        amount: depositAmount,
        email: businessEmail,
        externalref,
        redirect: redirectUrl,
        reusable: '0',
        currency: 'GHS',
        accountnumber: accountNumber,
        metadata: { booking_id: bookingId },
      }),
    });

    const linkPayload = await linkRes.json();
    const authorizationUrl = linkPayload?.data?.authorization_url;
    const reference = linkPayload?.data?.reference || externalref;

    if (!linkRes.ok || linkPayload?.status !== 1 || !authorizationUrl) {
      const message = linkPayload?.message || 'Could not create Moolre payment link.';
      return new Response(JSON.stringify({ error: message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ authorization_url: authorizationUrl, reference }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not start deposit payment.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
