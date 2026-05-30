import {
  SITE,
  getLocationBookingValue,
  getLocationLabelById,
  findServiceById,
} from './data.js';
import { getSupabase, isSupabaseConfigured } from './supabase-client.js';

let overlayDatePicker = null;
let bookedSlots = [];
let activeLocationId = '';

function validatePhone(phone) {
  return /^(\+233|0)[0-9]{9}$/.test(phone.replace(/\s/g, ''));
}

function getSelectedOverlayService() {
  const checked = document.querySelector('#gr-service-radios input[name="service"]:checked');
  return checked?.value || '';
}

async function fetchBookedSlots(date, locationId) {
  if (!date || !locationId) {
    bookedSlots = [];
    updateOverlayTimeSlots();
    return;
  }

  const supabase = getSupabase();
  if (!supabase) {
    bookedSlots = [];
    updateOverlayTimeSlots();
    return;
  }

  try {
    let { data, error } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .eq('location_id', locationId)
      .in('status', ['pending', 'confirmed']);

    if (error?.code === '42703' || error?.code === 'PGRST204') {
      ({ data, error } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('booking_date', date)
        .in('status', ['pending', 'confirmed']));
    }

    if (error) throw error;
    bookedSlots = (data || []).map((row) => row.booking_time);
  } catch {
    bookedSlots = [];
  }

  updateOverlayTimeSlots();
}

function updateOverlayTimeSlots() {
  const timeSelect = document.getElementById('gr-time');
  if (!timeSelect) return;

  SITE.booking.timeSlots.forEach(({ value, label }) => {
    const option = timeSelect.querySelector(`option[value="${value}"]`);
    if (!option) return;
    if (bookedSlots.includes(value)) {
      option.disabled = true;
      option.textContent = `${label} — Booked`;
    } else {
      option.disabled = false;
      option.textContent = label;
    }
  });
}

function initOverlayDatePicker() {
  if (typeof flatpickr === 'undefined') return;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);

  overlayDatePicker = flatpickr('#gr-date', {
    minDate: today,
    maxDate,
    dateFormat: 'Y-m-d',
    disable: [(date) => date.getDay() === 0],
    onChange(_selectedDates, dateStr) {
      fetchBookedSlots(dateStr, activeLocationId);
    },
  });
}

function openBookingOverlay(location) {
  activeLocationId = getLocationBookingValue(location);
  const overlay = document.getElementById('gr-booking-overlay');
  const copy = SITE.glamRoom?.bookingOverlay || {};

  document.getElementById('gr-location-id').value = activeLocationId;
  document.getElementById('gr-overlay-title').textContent = copy.title || 'RESERVE YOUR CHAIR';
  document.getElementById('gr-overlay-location').textContent = `${copy.locationPrefix || 'GLAM ROOM —'} ${location.area || getLocationLabelById(activeLocationId)}`;
  document.getElementById('gr-overlay-exit').textContent = copy.exitLabel || 'X EXIT';
  document.getElementById('gr-overlay-submit').textContent = copy.submitLabel || 'CONFIRM YOUR RESERVATION';

  document.getElementById('gr-booking-form').reset();
  document.getElementById('gr-overlay-msg').hidden = true;
  overlayDatePicker?.clear();

  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('gr-full-name')?.focus();
}

function closeBookingOverlay() {
  const overlay = document.getElementById('gr-booking-overlay');
  overlay?.classList.remove('is-open');
  overlay?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function handleOverlaySubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('gr-overlay-submit');
  const msgEl = document.getElementById('gr-overlay-msg');
  submitBtn.disabled = true;

  const fullName = document.getElementById('gr-full-name').value.trim();
  const phone = document.getElementById('gr-phone').value.trim();
  const service = getSelectedOverlayService();
  const date = document.getElementById('gr-date').value;
  const time = document.getElementById('gr-time').value;
  const notes = document.getElementById('gr-notes').value.trim();
  const locationId = activeLocationId;
  const location = getLocationLabelById(locationId);

  if (!fullName || !validatePhone(phone) || !service || !date || !time) {
    msgEl.textContent = 'Please complete all required fields with a valid Ghana phone number.';
    msgEl.hidden = false;
    submitBtn.disabled = false;
    return;
  }

  const bookingData = { fullName, phone, email: '', locationId, location, service, date, time, notes };

  if (!isSupabaseConfigured()) {
    const num = SITE.whatsapp.replace(/[^0-9+]/g, '').replace('+', '');
    const waMsg = encodeURIComponent(
      `Hi Glam Room! I'd like to reserve:\n\nName: ${fullName}\nLocation: ${location}\nService: ${service}\nDate: ${date}\nTime: ${time}${notes ? `\nNotes: ${notes}` : ''}`
    );
    msgEl.innerHTML = `Online booking isn't connected yet. <a href="https://wa.me/${num}?text=${waMsg}" target="_blank" rel="noopener noreferrer">Confirm via WhatsApp</a>`;
    msgEl.hidden = false;
    submitBtn.disabled = false;
    return;
  }

  try {
    const supabase = getSupabase();
    const row = {
      full_name: fullName,
      phone,
      email: null,
      service,
      booking_date: date,
      booking_time: time,
      status: 'pending',
      payment_status: 'pending',
      location_id: locationId,
      location,
      notes: notes || null,
    };

    let result = await supabase.from('bookings').insert([row]);
    if (result.error?.code === '42703' || result.error?.code === 'PGRST204') {
      result = await supabase.from('bookings').insert([
        {
          full_name: fullName,
          phone,
          email: null,
          service,
          booking_date: date,
          booking_time: time,
          status: 'pending',
          payment_status: 'pending',
          notes: [`[Location: ${location}]`, notes].filter(Boolean).join('\n') || null,
        },
      ]);
    }

    if (result.error) throw result.error;

    msgEl.textContent = 'Reservation received. We will confirm through official channels.';
    msgEl.hidden = false;
    setTimeout(closeBookingOverlay, 2800);
  } catch {
    msgEl.textContent = 'Something went wrong. Please try again or contact us directly.';
    msgEl.hidden = false;
  }

  submitBtn.disabled = false;
}

export function initGlamBookingOverlay() {
  const form = document.getElementById('gr-booking-form');
  if (!form) return;

  initOverlayDatePicker();

  document.getElementById('gr-overlay-exit')?.addEventListener('click', closeBookingOverlay);
  document.getElementById('gr-booking-overlay')?.addEventListener('click', (event) => {
    if (event.target.id === 'gr-booking-overlay') closeBookingOverlay();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeBookingOverlay();
  });

  form.addEventListener('submit', handleOverlaySubmit);
}

export function bindSanctuaryBookingButtons() {
  document.querySelectorAll('[data-location-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const loc = SITE.locations.find((l) => l.id === button.dataset.locationId);
      if (loc) openBookingOverlay(loc);
    });
  });
}

export function populateOverlayServices() {
  const container = document.getElementById('gr-service-radios');
  if (!container) return;

  const items = SITE.glamRoom?.signatureServices || [];
  container.innerHTML = items
    .map((item) => {
      const service = findServiceById(item.serviceId);
      const label = service?.name || item.title;
      return `
        <label class="gr-radio">
          <input type="radio" name="service" value="${label}" required>
          <span>${item.title}</span>
        </label>
      `;
    })
    .join('');
}

export function populateOverlayTimeSlots() {
  const timeSelect = document.getElementById('gr-time');
  if (!timeSelect) return;

  timeSelect.innerHTML =
    '<option value="">Select time</option>' +
    SITE.booking.timeSlots.map((t) => `<option value="${t.value}">${t.label}</option>`).join('');
}
