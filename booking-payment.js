import { SITE } from './data.js?v=20260537';
import { getSupabase } from './supabase-client.js?v=20260537';

export function getDepositConfig() {
  return SITE.booking?.deposit || {};
}

export function isDepositPaymentEnabled() {
  const deposit = getDepositConfig();
  return Boolean(deposit.enabled && deposit.provider === 'moolre' && deposit.configured);
}

export function getDepositAmountGhs() {
  const deposit = getDepositConfig();
  return Number(deposit.amountGhs || 50);
}

export function getDepositButtonLabel() {
  const deposit = getDepositConfig();
  return deposit.submitLabel || `Pay ${deposit.label || 'deposit'} & confirm`;
}

export function getDepositNote() {
  const deposit = getDepositConfig();
  return (
    deposit.note ||
    `A ${deposit.label || 'commitment deposit'} is required to confirm your reservation.`
  );
}

export async function confirmDepositPayment(reference, bookingId) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Booking system unavailable.');

  const { data, error } = await supabase.functions.invoke('confirm-deposit', {
    body: { reference, booking_id: bookingId },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  if (!data?.ok) throw new Error('Deposit could not be verified.');
  return data;
}

export async function startDepositPayment({ bookingId, email, phone, fullName, returnPath }) {
  if (!isDepositPaymentEnabled()) {
    throw new Error('Deposit payments are not configured yet.');
  }

  const supabase = getSupabase();
  if (!supabase) throw new Error('Booking system unavailable.');

  const { data, error } = await supabase.functions.invoke('initiate-deposit', {
    body: {
      booking_id: bookingId,
      email: email || '',
      phone,
      full_name: fullName,
      return_path: returnPath || window.location.pathname,
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  if (!data?.authorization_url) throw new Error('Could not start payment.');

  sessionStorage.setItem(
    'grPendingDeposit',
    JSON.stringify({ bookingId, reference: data.reference })
  );

  window.location.href = data.authorization_url;
}

function clearDepositReturnParams() {
  const url = new URL(window.location.href);
  url.searchParams.delete('deposit');
  url.searchParams.delete('booking_id');
  url.searchParams.delete('ref');
  history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

function showDepositReturnBanner(message, type = 'success') {
  let banner = document.getElementById('deposit-return-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'deposit-return-banner';
    banner.className = 'deposit-return-banner';
    document.body.prepend(banner);
  }
  banner.textContent = message;
  banner.dataset.type = type;
  banner.hidden = false;
}

export async function handleDepositReturn(handlers = {}) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('deposit') !== 'return') return false;

  const bookingId = params.get('booking_id');
  const reference = params.get('ref');
  if (!bookingId || !reference) return false;

  try {
    await confirmDepositPayment(reference, bookingId);
    sessionStorage.removeItem('grPendingDeposit');
    clearDepositReturnParams();

    const message =
      getDepositConfig().confirmedMessage ||
      "You're confirmed! Your deposit secures your reservation.";

    if (handlers.onSuccess) {
      handlers.onSuccess(message);
    } else {
      showDepositReturnBanner(message, 'success');
    }
    return true;
  } catch (err) {
    clearDepositReturnParams();

    const message =
      getDepositConfig().pendingMessage ||
      'Your slot is held. Complete the deposit to confirm your reservation.';

    if (handlers.onPending) {
      handlers.onPending(message, err);
    } else {
      showDepositReturnBanner(message, 'pending');
    }
    return false;
  }
}
