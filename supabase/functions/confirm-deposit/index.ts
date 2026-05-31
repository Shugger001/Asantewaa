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
    const expectedAmount = Number(Deno.env.get('DEPOSIT_AMOUNT_GHS') || '50');
    const apiBase = Deno.env.get('MOOLRE_API_BASE') || 'https://api.moolre.com';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!moolreUser || !accountNumber || !supabaseUrl || !serviceRoleKey) {
      throw new Error('Payment verification is not configured on the server.');
    }

    if (apiBase.includes('api.moolre.com') && !moolrePubKey) {
      throw new Error('MOOLRE_API_PUBKEY is required for live payments.');
    }

    const { reference, booking_id: bookingId } = await req.json();

    if (!reference || !bookingId) {
      return new Response(JSON.stringify({ error: 'Missing payment reference or booking id.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-USER': moolreUser,
    };
    if (moolrePubKey) headers['X-API-PUBKEY'] = moolrePubKey;

    const statusRes = await fetch(`${apiBase}/open/transact/status`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 1,
        idtype: '1',
        id: reference,
        accountnumber: accountNumber,
      }),
    });

    const statusPayload = await statusRes.json();
    const tx = statusPayload?.data;

    if (statusPayload?.status !== 1 || tx?.txstatus !== 1) {
      return new Response(JSON.stringify({ error: 'Payment was not successful.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const paidAmount = Number(tx.amount ?? tx.value);
    if (paidAmount !== expectedAmount) {
      return new Response(JSON.stringify({ error: 'Deposit amount does not match.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const externalRef = tx.externalref || reference;
    if (externalRef !== reference && tx.externalref) {
      return new Response(JSON.stringify({ error: 'Payment reference mismatch.' }), {
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
      return new Response(JSON.stringify({ ok: true, status: booking.status || 'confirmed', alreadyPaid: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const paymentReference = tx.externalref || reference;
    const updatePayload: Record<string, string> = {
      payment_status: 'paid',
      status: 'confirmed',
      deposit_paid_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        ...updatePayload,
        payment_reference: paymentReference,
      })
      .eq('id', bookingId)
      .eq('payment_status', 'pending');

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ ok: true, status: 'confirmed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment verification failed.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
