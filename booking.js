import {
  SITE,
  getLocationBookingValue,
  getLocationLabel,
  getLocationLabelById,
  getBookingStyleOptions,
  findServiceById,
  findServiceStyle,
} from './data.js';
import { getSupabase, isSupabaseConfigured } from './supabase-client.js';

let bookedSlots = [];
let datePicker = null;

function populateBookingPage() {
  document.getElementById('booking-subhead').textContent = SITE.booking.subhead;
  document.getElementById('booking-quote').innerHTML = `
    <i class="fas fa-quote-left" style="color: var(--gold); margin-right: 0.4rem;"></i>
    "${SITE.booking.bookingQuote}"
    <div style="margin-top: 0.5rem; font-weight: 600; font-style: normal;">— ${SITE.owner} 🇬🇭</div>
  `;
  document.getElementById('booking-promise').innerHTML = `
    <i class="fas fa-gem" style="color: var(--gold);"></i>
    <strong>Mama Glam's Promise:</strong> ${SITE.booking.promise}
  `;
  document.getElementById('booking-tag').textContent = SITE.booking.tagline;
  const locationsList = document.getElementById('booking-locations-list');
  if (locationsList) {
    locationsList.innerHTML = SITE.locations
      .map((loc) => {
        const label = getLocationLabel(loc);
        const brand = loc.name?.trim();
        const showBrand = brand && label !== brand;

        return `
      <li>
        <i class="fas fa-map-marker-alt"></i>
        <strong>${label}</strong>
        ${showBrand ? `<br><span style="opacity:0.85;font-size:0.88em">${brand}</span>` : ''}
      </li>
    `;
      })
      .join('');
  }

  const locationSelect = document.getElementById('location');
  if (locationSelect) {
    locationSelect.innerHTML =
      '<option value="">— Select location —</option>' +
      SITE.locations
        .map((loc) => {
          const label = getLocationLabel(loc);
          return `<option value="${getLocationBookingValue(loc)}">${label}</option>`;
        })
        .join('');
  }

  document.getElementById('booking-hours').textContent = SITE.booking.hours || SITE.business.hours;
  document.getElementById('booking-tiktok').textContent = `Follow me: ${SITE.booking.tiktokHandle}`;
  document.getElementById('booking-vibe').textContent = SITE.booking.vibeNote;

  const serviceSelect = document.getElementById('service');
  const styleOptions = getBookingStyleOptions();
  serviceSelect.innerHTML =
    '<option value="">— Select service —</option>' +
    styleOptions
      .map((s) => `<option value="${s.value}">${s.label} — ${s.price}</option>`)
      .join('');

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get('service');
  const styleId = params.get('style');
  if (serviceId && styleId) {
    const service = findServiceById(serviceId);
    const style = findServiceStyle(serviceId, styleId);
    if (service && style) {
      serviceSelect.value = `${service.name} — ${style.name}`;
      updateSummary();
    }
  }

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

function initDatePicker() {
  if (typeof flatpickr === 'undefined') return;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);

  datePicker = flatpickr('#date', {
    minDate: today,
    maxDate,
    dateFormat: 'Y-m-d',
    disable: [(date) => date.getDay() === 0],
    onChange(_selectedDates, dateStr) {
      updateSummary();
      fetchBookedSlots(dateStr);
    },
  });
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

async function fetchExistingBooking(supabase, date, time, locationId) {
  let result = await supabase
    .from('bookings')
    .select('id')
    .eq('booking_date', date)
    .eq('booking_time', time)
    .eq('location_id', locationId)
    .in('status', ['pending', 'confirmed']);

  if (isMissingColumnError(result.error)) {
    result = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .in('status', ['pending', 'confirmed']);
  }

  return result;
}

async function insertBooking(supabase, booking) {
  let result = await supabase.from('bookings').insert([toDbRow(booking, true)]);
  if (isMissingColumnError(result.error)) {
    result = await supabase.from('bookings').insert([toDbRow(booking, false)]);
  }
  if (result.error) throw result.error;
}

async function fetchBookedSlots(date) {
  const locationId = getSelectedLocationId();
  if (!date || !locationId) {
    bookedSlots = [];
    updateTimeSlotAvailability();
    return;
  }

  const supabase = getSupabase();
  if (!supabase) {
    bookedSlots = [];
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

    bookedSlots = (data || []).map((row) => row.booking_time);
    updateTimeSlotAvailability();
  } catch (err) {
    console.error('Error fetching bookings:', err);
    bookedSlots = [];
    updateTimeSlotAvailability();
  }
}

function updateTimeSlotAvailability() {
  const timeSelect = document.getElementById('time');
  if (!timeSelect) return;

  SITE.booking.timeSlots.forEach(({ value, label }) => {
    const option = timeSelect.querySelector(`option[value="${value}"]`);
    if (!option) return;

    if (bookedSlots.includes(value)) {
      option.disabled = true;
      option.textContent = `${label} 🔴 Booked`;
    } else {
      option.disabled = false;
      option.textContent = label;
    }
  });
}

function updateSummary() {
  const name = document.getElementById('fullName').value.trim() || 'Queen';
  const locationId = getSelectedLocationId();
  const location = getLocationLabelById(locationId);
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const summaryDiv = document.getElementById('liveSummary');

  if (service && locationId && date && time) {
    summaryDiv.innerHTML = `
      <i class="fas fa-check-circle" style="color: var(--terracotta);"></i>
      <strong>Booking summary:</strong><br>
      👑 ${name} · ${service}<br>
      📍 ${location}<br>
      📅 ${date} at ${time}<br>
      <span style="font-size: 0.82rem;">💰 Pay at salon. Mama Glam dey wait you!</span>
    `;
  } else if (service && locationId) {
    summaryDiv.innerHTML = `<i class="fas fa-info-circle"></i> Pick date and time to complete your booking.`;
  } else if (service) {
    summaryDiv.innerHTML = `<i class="fas fa-info-circle"></i> Pick date and time to complete your booking.`;
  } else {
    summaryDiv.innerHTML = `<i class="fas fa-info-circle"></i> Select a service to see your summary.`;
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
  btn.innerHTML = '<i class="fas fa-calendar-plus"></i> Book My Glam Session';
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
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value.trim();

  if (!fullName) { showError("Abeg, tell us who's coming to slay! 💁🏾‍♀️"); resetButton(submitBtn); return; }
  if (!validatePhone(phone)) { showError('Chale! Enter correct Ghana number (e.g., 024XXXXXXX or +233XXXXXXXXX) 📱'); resetButton(submitBtn); return; }
  if (!locationId) { showError('Pick which Glam Room location you dey come to! 📍'); resetButton(submitBtn); return; }
  if (!service) { showError("Pick a service, mama! We no fit guess your hair dreams 🔥"); resetButton(submitBtn); return; }
  if (!date) { showError('Pick date. Make you no just show anyhow o! 📅'); resetButton(submitBtn); return; }
  if (!time) { showError('Select time. Asantewaa no dey sleep for shop 😴'); resetButton(submitBtn); return; }
  if (bookedSlots.includes(time)) { showError('Eh! This time don book already. Choose another time, queen 👑'); resetButton(submitBtn); return; }

  const bookingData = {
    fullName,
    phone,
    email,
    locationId,
    location,
    service,
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
    const { data: existingBookings, error: checkError } = await fetchExistingBooking(
      supabase,
      date,
      time,
      locationId
    );

    if (checkError) throw checkError;

    if (existingBookings?.length > 0) {
      showError('Eh! This time don book already. Choose another time, queen 👑');
      resetButton(submitBtn);
      await fetchBookedSlots(date);
      return;
    }

    await insertBooking(supabase, bookingData);

    showSuccess(
      `🔥 SUCCESS! ${fullName}, your booking at <strong>${location}</strong> for ${service} on ${date} at ${time} don land in our system! Asantewaa go confirm via WhatsApp soon. Come slay! 👑`
    );

    document.getElementById('fullName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('location').value = '';
    document.getElementById('service').value = '';
    if (datePicker) datePicker.clear();
    document.getElementById('time').value = '';
    updateSummary();
    await fetchBookedSlots(date);
  } catch (err) {
    console.error('Booking error:', err);
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

  document.getElementById('fullName')?.addEventListener('input', updateSummary);
  document.getElementById('location')?.addEventListener('change', () => {
    updateSummary();
    fetchBookedSlots(document.getElementById('date')?.value || '');
  });
  document.getElementById('service')?.addEventListener('change', updateSummary);
  document.getElementById('time')?.addEventListener('change', updateSummary);
  document.getElementById('bookingForm')?.addEventListener('submit', handleSubmit);
}

export { initBookingForm };
