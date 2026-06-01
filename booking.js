import {
  SITE,
  getLocationBookingValue,
  getLocationLabel,
  getLocationLabelById,
  findServiceById,
  findServiceStyle,
} from './data.js?v=20260536';
import { getSupabase, isSupabaseConfigured } from './supabase-client.js?v=20260536';
import {
  applyCapacityToDatePicker,
  buildDateDisableFunctions,
  countBookingsByTimeSlot,
  fetchBookingCountsByDate,
  formatDateYmd,
  getBookingWindowDates,
  getDailyBookingCount,
  getMaxReservationsPerDay,
  getMaxReservationsPerSlot,
  getSlotBookingCount,
  getSlotSpotsRemaining,
  isDateFullyBooked,
  isSlotFullyBooked,
} from './booking-capacity.js?v=20260536';
import {
  handleDepositReturn,
  isDepositPaymentEnabled,
  startDepositPayment,
} from './booking-payment.js?v=20260537';

let slotBookingCounts = {};
let datePicker = null;
let capacityByDate = {};

function populateServiceCategories() {
  const categorySelect = document.getElementById('serviceCategory');
  if (!categorySelect) return;

  categorySelect.innerHTML =
    '<option value="">Select category</option>' +
    SITE.services
      .map((service) => `<option value="${service.id}">${service.name}</option>`)
      .join('');
}

function populateServiceStyles(serviceId, selectedStyleId = '') {
  const styleSelect = document.getElementById('serviceStyle');
  if (!styleSelect) return;

  const service = findServiceById(serviceId);
  const styles = service?.styles || [];

  if (!serviceId || !styles.length) {
    styleSelect.innerHTML = '<option value="">Select category first</option>';
    styleSelect.value = '';
    styleSelect.disabled = true;
    return;
  }

  styleSelect.disabled = false;
  styleSelect.innerHTML =
    '<option value="">Select service</option>' +
    styles
      .map((style) => `<option value="${style.id}">${style.name} (${style.price})</option>`)
      .join('');

  if (selectedStyleId && styles.some((style) => style.id === selectedStyleId)) {
    styleSelect.value = selectedStyleId;
  }
}

function getSelectedBookingService() {
  const serviceId = document.getElementById('serviceCategory')?.value || '';
  const styleId = document.getElementById('serviceStyle')?.value || '';
  const service = findServiceById(serviceId);
  const style = findServiceStyle(serviceId, styleId);

  if (!service || !style) return '';

  return `${service.name}: ${style.name}`;
}

function applyBookingServiceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get('service');
  const styleId = params.get('style');

  if (!serviceId) return;

  const categorySelect = document.getElementById('serviceCategory');
  if (categorySelect && findServiceById(serviceId)) {
    categorySelect.value = serviceId;
    populateServiceStyles(serviceId, styleId || '');
    updateSummary();
  }
}

function applyBookingLocationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const locationValue = params.get('location');
  if (!locationValue) return;

  const locationSelect = document.getElementById('location');
  if (!locationSelect) return;

  const hasOption = Array.from(locationSelect.options).some(
    (option) => option.value === locationValue
  );
  if (!hasOption) return;

  locationSelect.value = locationValue;
  locationSelect.dispatchEvent(new Event('change'));
  updateSummary();
}

function populateBookingPage() {
  const locationsList = document.getElementById('booking-locations-list');
  if (locationsList) {
    const hours = SITE.business?.hours || 'Mon to Sat: 9am to 6pm · Sun: Closed';
    locationsList.innerHTML =
      SITE.locations
        .map((loc) => {
          const label = getLocationLabel(loc);
          const brand = loc.name?.trim();
          const showBrand = brand && label !== brand;

          return `
      <li>
        <span><strong>${label}</strong>${showBrand ? `<br><span class="booking-info-sub">${brand}</span>` : ''}</span>
      </li>
    `;
        })
        .join('') +
      `
      <li class="booking-hours-row">
        <span><strong>Opening hours</strong><br>${hours}</span>
      </li>
    `;
  }

  const locationSelect = document.getElementById('location');
  if (locationSelect) {
    locationSelect.innerHTML =
      '<option value="">Select location</option>' +
      SITE.locations
        .map((loc) => {
          const label = getLocationLabel(loc);
          return `<option value="${getLocationBookingValue(loc)}">${label}</option>`;
        })
        .join('');
  }

  populateServiceCategories();
  populateServiceStyles('');
  applyBookingServiceFromUrl();

  const timeSelect = document.getElementById('time');
  timeSelect.innerHTML =
    '<option value="">Select time</option>' +
    SITE.booking.timeSlots
      .map((t) => `<option value="${t.value}">${t.label}</option>`)
      .join('');

  const waAlt = document.getElementById('booking-wa-alt');
  if (waAlt) {
    const num = SITE.whatsapp.replace(/[^0-9+]/g, '').replace('+', '');
    waAlt.href = `https://wa.me/${num}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
    waAlt.setAttribute('target', '_blank');
    waAlt.setAttribute('rel', 'noopener noreferrer');
  }
}

function markFullyBookedCalendarDays(_dObj, _dStr, _fp, dayElem) {
  const dateStr = formatDateYmd(dayElem.dateObj);
  if (isDateFullyBooked(dateStr, capacityByDate)) {
    dayElem.classList.add('fully-booked-day');
    dayElem.setAttribute('title', 'Fully booked');
    dayElem.setAttribute('aria-disabled', 'true');
  }
}

function initDatePicker() {
  if (typeof flatpickr === 'undefined') return;

  const { minDate, maxDate } = getBookingWindowDates();

  datePicker = flatpickr('#date', {
    minDate,
    maxDate,
    dateFormat: 'Y-m-d',
    disable: buildDateDisableFunctions(capacityByDate),
    onDayCreate: markFullyBookedCalendarDays,
    onChange(_selectedDates, dateStr) {
      updateSummary();
      fetchBookedSlots(dateStr);
    },
  });
}

async function refreshBookingDateCapacity() {
  const locationId = getSelectedLocationId();
  const supabase = getSupabase();

  if (!supabase || !locationId) {
    capacityByDate = {};
    applyCapacityToDatePicker(datePicker, capacityByDate);
    return;
  }

  const { minDate, maxDate } = getBookingWindowDates();
  capacityByDate = await fetchBookingCountsByDate(supabase, locationId, minDate, maxDate);
  applyCapacityToDatePicker(datePicker, capacityByDate);

  const selectedDate = document.getElementById('date')?.value;
  if (selectedDate && isDateFullyBooked(selectedDate, capacityByDate)) {
    datePicker?.clear();
    slotBookingCounts = {};
    updateTimeSlotAvailability();
    updateSummary();
  }
}

function getSelectedLocationId() {
  return document.getElementById('location')?.value || '';
}

function isMissingColumnError(error) {
  return error?.code === '42703' || error?.code === 'PGRST204';
}

function toDbRow(booking, withLocationColumns) {
  const row = {
    full_name: booking.fullName,
    phone: booking.phone,
    email: booking.email || null,
    service: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    status: 'pending',
    payment_status: 'pending',
  };

  if (withLocationColumns) {
    row.location_id = booking.locationId;
    row.location = booking.location;
    row.notes = booking.notes || null;
  } else {
    const locationLine = booking.location ? `[Location: ${booking.location}]` : '';
    row.notes = [locationLine, booking.notes].filter(Boolean).join('\n').trim() || null;
  }

  return row;
}

async function insertBooking(supabase, booking) {
  let result = await supabase.from('bookings').insert([toDbRow(booking, true)]).select('id').single();
  if (isMissingColumnError(result.error)) {
    result = await supabase.from('bookings').insert([toDbRow(booking, false)]).select('id').single();
  }
  if (result.error) throw result.error;
  return result.data?.id;
}

async function fetchBookedSlots(date) {
  const locationId = getSelectedLocationId();
  if (!date || !locationId) {
    slotBookingCounts = {};
    updateTimeSlotAvailability();
    return;
  }

  const supabase = getSupabase();
  if (!supabase) {
    slotBookingCounts = {};
    updateTimeSlotAvailability();
    return;
  }

  try {
    let { data, error } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .eq('location_id', locationId)
      .in('status', ['pending', 'confirmed']);

    if (isMissingColumnError(error)) {
      ({ data, error } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('booking_date', date)
        .in('status', ['pending', 'confirmed']));
    }

    if (error) throw error;

    slotBookingCounts = countBookingsByTimeSlot(data);
    updateTimeSlotAvailability();
  } catch (err) {
    console.error('Error fetching bookings:', err);
    slotBookingCounts = {};
    updateTimeSlotAvailability();
  }
}

function formatTimeSlotLabel(label, timeValue) {
  const max = getMaxReservationsPerSlot();
  const booked = slotBookingCounts[timeValue] || 0;
  const remaining = getSlotSpotsRemaining(timeValue, slotBookingCounts, max);

  if (remaining <= 0) {
    return `${label} (Full)`;
  }

  if (booked > 0) {
    const spotWord = remaining === 1 ? 'spot' : 'spots';
    return `${label} (${remaining} ${spotWord} left)`;
  }

  return label;
}

function updateTimeSlotAvailability() {
  const timeSelect = document.getElementById('time');
  if (!timeSelect) return;

  const selectedTime = timeSelect.value;

  SITE.booking.timeSlots.forEach(({ value, label }) => {
    const option = timeSelect.querySelector(`option[value="${value}"]`);
    if (!option) return;

    if (isSlotFullyBooked(value, slotBookingCounts)) {
      option.disabled = true;
      option.textContent = `${label} (Full)`;
    } else {
      option.disabled = false;
      option.textContent = formatTimeSlotLabel(label, value);
    }
  });

  if (selectedTime && isSlotFullyBooked(selectedTime, slotBookingCounts)) {
    timeSelect.value = '';
  }
}

function updateSummary() {
  const name = document.getElementById('fullName').value.trim() || 'Queen';
  const locationId = getSelectedLocationId();
  const location = getLocationLabelById(locationId);
  const service = getSelectedBookingService();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const summaryDiv = document.getElementById('liveSummary');

  if (service && locationId && date && time) {
    summaryDiv.innerHTML = `
      <strong>Summary</strong><br>
      ${name} · ${service}<br>
      ${location}<br>
      ${date} at ${time}
    `;
  } else if (service && locationId) {
    summaryDiv.textContent = 'Pick a date and time to finish.';
  } else if (service) {
    summaryDiv.textContent = 'Pick a date and time to finish.';
  } else {
    summaryDiv.textContent = 'Choose category and style to see your summary.';
  }
}

function validatePhone(phone) {
  return /^(\+233|0)[0-9]{9}$/.test(phone.replace(/\s/g, ''));
}

function showSuccess(message) {
  const el = document.getElementById('successMessage');
  document.getElementById('successText').innerHTML = message;
  el.style.display = 'block';
  document.getElementById('errorMessage').style.display = 'none';
  setTimeout(() => { el.style.display = 'none'; }, 10000);
}

function showError(message, { html = false } = {}) {
  const el = document.getElementById('errorMessage');
  const textEl = document.getElementById('errorText');
  if (html) {
    textEl.innerHTML = message;
  } else {
    textEl.textContent = message;
  }
  el.style.display = 'block';
  document.getElementById('successMessage').style.display = 'none';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}

function resetButton(btn) {
  btn.textContent = 'Book appointment';
  btn.disabled = false;
}

function getWhatsAppFallbackUrl(bookingData) {
  const num = SITE.whatsapp.replace(/[^0-9+]/g, '').replace('+', '');
  const msg = encodeURIComponent(
    `Hi Asantewaa! I'd like to book:\n\n` +
    `Name: ${bookingData.fullName}\n` +
    `Location: ${bookingData.location}\n` +
    `Service: ${bookingData.service}\n` +
    `Date: ${bookingData.date}\n` +
    `Time: ${bookingData.time}\n` +
    (bookingData.notes ? `Notes: ${bookingData.notes}` : '')
  );
  return `https://wa.me/${num}?text=${msg}`;
}

async function handleSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerHTML = '<span class="booking-loader"></span> Abeg small, booking...';
  submitBtn.disabled = true;

  document.getElementById('successMessage').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'none';

  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const locationId = getSelectedLocationId();
  const location = getLocationLabelById(locationId);
  const service = getSelectedBookingService();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value.trim();

  if (!fullName) { showError("Abeg, tell us who's coming to slay! 💁🏾‍♀️"); resetButton(submitBtn); return; }
  if (!validatePhone(phone)) { showError('Chale! Enter correct Ghana number (e.g., 024XXXXXXX or +233XXXXXXXXX) 📱'); resetButton(submitBtn); return; }
  if (!locationId) { showError('Pick which Glam Room location you dey come to! 📍'); resetButton(submitBtn); return; }
  if (!getSelectedBookingService()) { showError("Pick a general service and specific style, mama! We no fit guess your hair dreams 🔥"); resetButton(submitBtn); return; }
  if (!date) { showError('Pick date. Make you no just show anyhow o! 📅'); resetButton(submitBtn); return; }
  if (!time) { showError('Select time. Asantewaa no dey sleep for shop 😴'); resetButton(submitBtn); return; }
  if (isSlotFullyBooked(time, slotBookingCounts)) {
    showError('Eh! This time slot is full. Choose another time, queen 👑');
    resetButton(submitBtn);
    return;
  }

  const bookingData = {
    fullName,
    phone,
    email,
    locationId,
    location,
    service: getSelectedBookingService(),
    date,
    time,
    notes,
  };

  if (!isSupabaseConfigured()) {
    const waUrl = getWhatsAppFallbackUrl(bookingData);
    showSuccess(`⚠️ Online booking isn't connected yet. WhatsApp Asantewaa to confirm: <a href="${waUrl}" target="_blank" rel="noopener noreferrer">Tap to chat on WhatsApp</a>`);
    resetButton(submitBtn);
    return;
  }

  const supabase = getSupabase();

  try {
    const dailyCount = await getDailyBookingCount(supabase, date, locationId);
    if (dailyCount >= getMaxReservationsPerDay()) {
      showError('This date is fully booked at this location. Please choose another day.');
      resetButton(submitBtn);
      datePicker?.clear();
      await refreshBookingDateCapacity();
      return;
    }

    const slotCount = await getSlotBookingCount(supabase, date, time, locationId);
    if (slotCount >= getMaxReservationsPerSlot()) {
      showError('Eh! This time slot is full. Choose another time, queen 👑');
      resetButton(submitBtn);
      await fetchBookedSlots(date);
      return;
    }

    const bookingId = await insertBooking(supabase, bookingData);

    if (isDepositPaymentEnabled() && bookingId) {
      showSuccess('Redirecting to secure payment…');
      await startDepositPayment({
        bookingId,
        email,
        phone,
        fullName,
        returnPath: window.location.pathname,
      });
      return;
    }

    showSuccess(
      `🔥 SUCCESS! ${fullName}, your booking at <strong>${location}</strong> for ${service} on ${date} at ${time} don land in our system! Asantewaa go confirm via WhatsApp soon. Come slay! 👑`
    );

    document.getElementById('fullName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('location').value = '';
    document.getElementById('serviceCategory').value = '';
    populateServiceStyles('');
    if (datePicker) datePicker.clear();
    document.getElementById('time').value = '';
    updateSummary();
    await refreshBookingDateCapacity();
    await fetchBookedSlots(date);
  } catch (err) {
    console.error('Booking error:', err);
    const limitReached =
      err?.message?.includes('Daily booking limit') ||
      err?.details?.includes('Daily booking limit') ||
      err?.message?.includes('Time slot fully booked') ||
      err?.details?.includes('Time slot fully booked');

    if (limitReached) {
      const slotFull = err?.message?.includes('Time slot fully booked') || err?.details?.includes('Time slot fully booked');
      showError(
        slotFull
          ? 'Eh! This time slot is full. Choose another time, queen 👑'
          : 'This date is fully booked at this location. Please choose another day.'
      );
      if (!slotFull) datePicker?.clear();
      await refreshBookingDateCapacity();
      await fetchBookedSlots(document.getElementById('date')?.value || '');
      resetButton(submitBtn);
      return;
    }

    const waUrl = getWhatsAppFallbackUrl(bookingData);
    showError(
      `Something went wrong: ${err.message || 'Please try again'}. Or <a href="${waUrl}" target="_blank" rel="noopener noreferrer">WhatsApp Asantewaa directly</a>.`,
      { html: true }
    );
  }

  resetButton(submitBtn);
}

function initBookingForm() {
  populateBookingPage();
  initDatePicker();

  handleDepositReturn({
    onSuccess: (message) => showSuccess(message),
  });

  document.getElementById('fullName')?.addEventListener('input', updateSummary);
  document.getElementById('location')?.addEventListener('change', async () => {
    updateSummary();
    await refreshBookingDateCapacity();
    await fetchBookedSlots(document.getElementById('date')?.value || '');
  });
  document.getElementById('serviceCategory')?.addEventListener('change', (e) => {
    populateServiceStyles(e.target.value);
    updateSummary();
  });
  document.getElementById('serviceStyle')?.addEventListener('change', updateSummary);
  document.getElementById('time')?.addEventListener('change', updateSummary);
  document.getElementById('bookingForm')?.addEventListener('submit', handleSubmit);

  applyBookingLocationFromUrl();
}

export { initBookingForm };
