import { SITE } from './data.js';
import { getSupabase, isSupabaseConfigured } from './supabase-client.js';

function normalizePhoneDigits(phone) {
  return phone.replace(/\D/g, '');
}

function phoneVariants(phone) {
  const digits = normalizePhoneDigits(phone);
  const variants = new Set([digits]);
  if (digits.startsWith('233') && digits.length >= 12) {
    variants.add(`0${digits.slice(3)}`);
  }
  if (digits.startsWith('0') && digits.length >= 10) {
    variants.add(`233${digits.slice(1)}`);
  }
  return [...variants];
}

function nameSuffixMatches(fullName, suffix) {
  const letters = (fullName || '').replace(/[^a-zA-Z]/g, '');
  const expected = suffix.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (expected.length !== 4) return false;
  return letters.slice(-4).toLowerCase() === expected;
}

function formatBookingDate(dateStr) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-GH', {
    month: 'short',
    day: 'numeric',
  });
}

function formatBookingTime(time) {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}${m ? `:${String(m).padStart(2, '0')}` : ''}${period}`;
}

function statusLabel(status) {
  return (status || 'pending').toUpperCase();
}

function renderResultMessage(booking) {
  const date = formatBookingDate(booking.booking_date);
  const time = formatBookingTime(booking.booking_time);
  const status = statusLabel(booking.status);
  return `Your booking on <strong>${date}</strong> at <strong>${time}</strong> is <strong>${status}</strong>`;
}

async function lookupViaRpc(supabase, phone, nameSuffix) {
  const { data, error } = await supabase.rpc('find_my_bookings', {
    p_phone: phone,
    p_name_suffix: nameSuffix,
  });
  if (error) throw error;
  return data || [];
}

async function lookupViaTable(supabase, phone, nameSuffix) {
  const matches = [];
  const seen = new Set();

  for (const variant of phoneVariants(phone)) {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_date, booking_time, status, service, location, full_name, phone')
      .eq('phone', variant);

    if (error) throw error;

    for (const row of data || []) {
      if (!nameSuffixMatches(row.full_name, nameSuffix)) continue;
      const key = `${row.booking_date}-${row.booking_time}-${row.status}`;
      if (seen.has(key)) continue;
      seen.add(key);
      matches.push({
        booking_date: row.booking_date,
        booking_time: row.booking_time,
        status: row.status,
        service: row.service,
        location: row.location,
      });
    }
  }

  return matches.sort((a, b) => {
    const d = b.booking_date.localeCompare(a.booking_date);
    return d !== 0 ? d : b.booking_time.localeCompare(a.booking_time);
  });
}

async function findBookings(phone, nameSuffix) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error('Booking lookup is not available right now.');
  }

  try {
    return await lookupViaRpc(supabase, phone, nameSuffix);
  } catch (rpcError) {
    if (!rpcError.message?.includes('find_my_bookings')) throw rpcError;
    return lookupViaTable(supabase, phone, nameSuffix);
  }
}

function showResult(el, html, type = 'success') {
  el.hidden = false;
  el.className = `find-booking-result find-booking-result--${type}`;
  el.innerHTML = html;
}

export function initFindBooking() {
  const form = document.getElementById('findBookingForm');
  const resultEl = document.getElementById('findBookingResult');
  if (!form || !resultEl) return;

  const copy = SITE.findBooking || {};

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = form.querySelector('#findPhone')?.value.trim() || '';
    const nameSuffix = form.querySelector('#findNameSuffix')?.value.trim() || '';
    const submitBtn = form.querySelector('button[type="submit"]');

    resultEl.hidden = true;

    if (!/^(\+233|0)[0-9]{9}$/.test(phone.replace(/\s/g, ''))) {
      showResult(resultEl, copy.invalidPhone || 'Enter a valid Ghana number (e.g. 024XXXXXXX).', 'error');
      return;
    }

    if (!/^[a-zA-Z]{4}$/.test(nameSuffix)) {
      showResult(
        resultEl,
        copy.invalidName || 'Enter exactly 4 letters — the last 4 letters of the name you booked with.',
        'error'
      );
      return;
    }

    if (!isSupabaseConfigured()) {
      showResult(resultEl, copy.unavailable || 'Booking lookup is not connected yet. WhatsApp Glam Room instead.', 'error');
      return;
    }

    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = copy.loading || 'Checking…';

    try {
      const bookings = await findBookings(phone, nameSuffix);

      if (!bookings.length) {
        showResult(
          resultEl,
          copy.notFound ||
            'No booking found. Double-check your phone and the last 4 letters of the name you used when booking.',
          'error'
        );
        return;
      }

      const messages = bookings.map((b) => `<p>${renderResultMessage(b)}</p>`).join('');
      showResult(resultEl, messages, 'success');
    } catch (err) {
      showResult(
        resultEl,
        copy.error || `Something went wrong: ${err.message || 'Please try again.'}`,
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });
}
