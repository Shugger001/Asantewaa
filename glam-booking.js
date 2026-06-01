import { findLocationById, getLocationBookingValue } from './data.js?v=20260541';

export function openBookingPage(location) {
  const locationValue = location ? getLocationBookingValue(location) : '';
  const url = locationValue
    ? `book.html?location=${encodeURIComponent(locationValue)}`
    : 'book.html';
  window.location.href = url;
}

export function bindSanctuaryBookingButtons() {
  document.querySelectorAll('[data-location-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.target.closest('.gr-sanctuary__map')) return;
      const loc = findLocationById(button.dataset.locationId);
      if (loc) openBookingPage(loc);
    });
  });
}

// Legacy exports — glam room now uses the full book.html form
export function openBookingOverlay(location) {
  openBookingPage(location);
}

export function initGlamBookingOverlay() {}

export function populateOverlayServices() {}

export function populateOverlayTimeSlots() {}
