import {
  SITE,
  getLocationBookingValue,
  getLocationLabel,
  getLocationLabelById,
} from './data.js';

const GOOGLE_SCRIPT_URL = SITE.booking.googleScriptUrl;
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
  serviceSelect.innerHTML =
    '<option value="">— Select service —</option>' +
    SITE.booking.services
      .map((s) => `<option value="${s.value}">${s.label} - ${s.price}</option>`)
      .join('');

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

async function fetchBookedSlots(date) {
  if (!date || GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT')) return;

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=get&date=${encodeURIComponent(date)}`);
    if (response.ok) {
      const data = await response.json();
      bookedSlots = data.bookedTimes || [];
      updateTimeSlotAvailability();
    }
  } catch {
    bookedSlots = getLocalBookingsForDate(date);
    updateTimeSlotAvailability();
  }
}

function getLocalBookingsForDate(date) {
  const local = JSON.parse(localStorage.getItem('glamBookings') || '[]');
  return local.filter((b) => b.date === date).map((b) => b.time);
}

function updateTimeSlotAvailability() {
  const timeSelect = document.getElementById('time');
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

function updateSummary() {
  const name = document.getElementById('fullName').value.trim() || 'Queen';
  const locationId = document.getElementById('location')?.value || '';
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

function showError(message) {
  const el = document.getElementById('errorMessage');
  document.getElementById('errorText').textContent = message;
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
  const locationId = document.getElementById('location').value;
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
    action: 'add',
    timestamp: new Date().toISOString(),
    fullName,
    phone,
    email,
    location,
    service,
    date,
    time,
    notes,
    status: 'Pending',
  };

  const localBookings = JSON.parse(localStorage.getItem('glamBookings') || '[]');
  localBookings.push(bookingData);
  localStorage.setItem('glamBookings', JSON.stringify(localBookings));

  const scriptConfigured = GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT');

  if (scriptConfigured) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      showSuccess(`🔥 SUCCESS! ${fullName}, your booking at <strong>${location}</strong> for ${service} on ${date} at ${time} don land! Asantewaa go text you on WhatsApp to confirm. Come slay! 👑`);
    } catch {
      const waUrl = getWhatsAppFallbackUrl(bookingData);
      showSuccess(`⚠️ Saved locally! WhatsApp Asantewaa to confirm: <a href="${waUrl}" target="_blank" rel="noopener noreferrer">Tap to chat on WhatsApp</a>`);
    }
  } else {
    const waUrl = getWhatsAppFallbackUrl(bookingData);
    showSuccess(`✅ Booking saved! WhatsApp Asantewaa to confirm: <a href="${waUrl}" target="_blank" rel="noopener noreferrer">Tap to chat on WhatsApp</a>`);
  }

  document.getElementById('fullName').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('notes').value = '';
  document.getElementById('location').value = '';
  document.getElementById('service').value = '';
  if (datePicker) datePicker.clear();
  document.getElementById('time').value = '';
  updateSummary();
  resetButton(submitBtn);
}

function initBookingForm() {
  populateBookingPage();
  initDatePicker();

  document.getElementById('fullName')?.addEventListener('input', updateSummary);
  document.getElementById('location')?.addEventListener('change', updateSummary);
  document.getElementById('service')?.addEventListener('change', updateSummary);
  document.getElementById('time')?.addEventListener('change', updateSummary);
  document.getElementById('bookingForm')?.addEventListener('submit', handleSubmit);
}

export { initBookingForm };
