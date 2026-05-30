import { SITE } from './data.js';

export function getMaxReservationsPerDay() {
  return SITE.booking?.maxReservationsPerDay ?? 6;
}

export function formatDateYmd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function countBookingsByDate(rows) {
  const counts = {};
  for (const row of rows || []) {
    const key = row.booking_date;
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export function isDateFullyBooked(dateStr, countsByDate, max = getMaxReservationsPerDay()) {
  if (!dateStr) return false;
  return (countsByDate[dateStr] || 0) >= max;
}

export function buildDateDisableFunctions(countsByDate, maxPerDay = getMaxReservationsPerDay()) {
  return [
    (date) => date.getDay() === 0,
    (date) => isDateFullyBooked(formatDateYmd(date), countsByDate, maxPerDay),
  ];
}

function isMissingColumnError(error) {
  return error?.code === '42703' || error?.code === 'PGRST204';
}

export async function fetchBookingCountsByDate(supabase, locationId, minDate, maxDate) {
  if (!supabase || !locationId) return {};

  const minStr = typeof minDate === 'string' ? minDate : formatDateYmd(minDate);
  const maxStr = typeof maxDate === 'string' ? maxDate : formatDateYmd(maxDate);

  try {
    let { data, error } = await supabase
      .from('bookings')
      .select('booking_date')
      .eq('location_id', locationId)
      .gte('booking_date', minStr)
      .lte('booking_date', maxStr)
      .in('status', ['pending', 'confirmed']);

    if (isMissingColumnError(error)) {
      ({ data, error } = await supabase
        .from('bookings')
        .select('booking_date')
        .gte('booking_date', minStr)
        .lte('booking_date', maxStr)
        .in('status', ['pending', 'confirmed'));
    }

    if (error) throw error;
    return countBookingsByDate(data);
  } catch {
    return {};
  }
}

export async function getDailyBookingCount(supabase, date, locationId) {
  if (!supabase || !date || !locationId) return 0;

  try {
    let { count, error } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('booking_date', date)
      .eq('location_id', locationId)
      .in('status', ['pending', 'confirmed']);

    if (isMissingColumnError(error)) {
      ({ count, error } = await supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('booking_date', date)
        .in('status', ['pending', 'confirmed']));
    }

    if (error) throw error;
    return count || 0;
  } catch {
    return 0;
  }
}

export function getBookingWindowDates(daysAhead = 60) {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + daysAhead);
  return { minDate, maxDate };
}

export function applyCapacityToDatePicker(picker, countsByDate) {
  if (!picker) return;
  picker.set('disable', buildDateDisableFunctions(countsByDate));
}
