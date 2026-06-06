import { SITE } from './data.js?v=20260536';

export function getMaxReservationsPerDay() {
  return SITE.booking?.maxReservationsPerDay ?? 12;
}

export function getMaxReservationsPerSlot() {
  return SITE.booking?.maxReservationsPerSlot ?? 3;
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

export function countBookingsByTimeSlot(rows) {
  const counts = {};
  for (const row of rows || []) {
    const key = row.booking_time;
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export function isDateFullyBooked(dateStr, countsByDate, max = getMaxReservationsPerDay()) {
  if (!dateStr) return false;
  return (countsByDate[dateStr] || 0) >= max;
}

export function isSlotFullyBooked(time, countsBySlot, max = getMaxReservationsPerSlot()) {
  if (!time) return false;
  return (countsBySlot[time] || 0) >= max;
}

export function getSlotSpotsRemaining(time, countsBySlot, max = getMaxReservationsPerSlot()) {
  if (!time) return max;
  return Math.max(0, max - (countsBySlot[time] || 0));
}

export function buildDateDisableFunctions(countsByDate, maxPerDay = getMaxReservationsPerDay()) {
  return [
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
        .in('status', ['pending', 'confirmed']));
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

export async function getSlotBookingCount(supabase, date, time, locationId) {
  if (!supabase || !date || !time || !locationId) return 0;

  try {
    let { count, error } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('booking_date', date)
      .eq('booking_time', time)
      .eq('location_id', locationId)
      .in('status', ['pending', 'confirmed']);

    if (isMissingColumnError(error)) {
      ({ count, error } = await supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('booking_date', date)
        .eq('booking_time', time)
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
  picker.redraw();
}
