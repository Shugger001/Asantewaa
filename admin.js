import { SITE } from './data.js';
import { isSupabaseConfigured } from './supabase-client.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

let adminSupabase = null;

function getAdminSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!adminSupabase) {
    const { url, anonKey } = SITE.booking.supabase;
    adminSupabase = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'glam-admin-auth',
      },
    });
  }
  return adminSupabase;
}

const adminContent = document.getElementById('adminContent');
const loginContainer = document.getElementById('loginContainer');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const bookingsBody = document.getElementById('bookingsBody');
const emptyState = document.getElementById('emptyState');

let allBookings = [];
let filteredBookings = [];
let cachedLoginPassword = null;
let activeQuickFilter = 'all';

const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const STATUS_CONFIRM = {
  confirmed: {
    title: 'Confirm booking?',
    text: (name) => `Confirm ${name}'s reservation. They should receive your usual confirmation message.`,
    confirmLabel: 'Confirm',
  },
  completed: {
    title: 'Mark as completed?',
    text: (name) => `Mark ${name}'s visit as completed. This closes the appointment.`,
    confirmLabel: 'Mark completed',
  },
  cancelled: {
    title: 'Cancel booking?',
    text: (name) => `Cancel ${name}'s reservation. This cannot be undone from the client side.`,
    confirmLabel: 'Cancel booking',
    danger: true,
  },
  pending: {
    title: 'Revert to pending?',
    text: (name) => `Set ${name}'s booking back to pending. Use this if you need to reopen the slot.`,
    confirmLabel: 'Revert to pending',
  },
};

function needsStatusConfirm(fromStatus, toStatus) {
  if (fromStatus === toStatus) return false;
  return Boolean(STATUS_CONFIRM[toStatus]) || (toStatus === 'pending' && fromStatus !== 'pending');
}

function showLogin(message = '') {
  adminContent.hidden = true;
  adminContent.setAttribute('aria-hidden', 'true');
  loginContainer.hidden = false;
  loginContainer.removeAttribute('aria-hidden');
  document.body.classList.remove('admin-is-signed-in');
  loginError.textContent = message;
  if (message) {
    loginError.classList.add('is-visible');
    loginError.hidden = false;
    loginError.style.removeProperty('display');
  } else {
    loginError.classList.remove('is-visible');
    loginError.hidden = true;
    loginError.style.removeProperty('display');
  }
}

function showAdmin() {
  loginContainer.hidden = true;
  loginContainer.setAttribute('aria-hidden', 'true');
  adminContent.hidden = false;
  adminContent.removeAttribute('aria-hidden');
  document.body.classList.add('admin-is-signed-in');
  loginError.classList.remove('is-visible');
  loginError.hidden = true;
  loginError.textContent = '';
}

function formatTime(time) {
  if (!time) return 'N/A';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-GH', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function normalizeGhanaWhatsAppDigits(phone) {
  let digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) digits = `233${digits.slice(1)}`;
  if (!digits.startsWith('233')) digits = `233${digits}`;
  return digits;
}

function getShopWhatsAppConfig() {
  const admin = SITE.admin || {};
  const number = admin.shopWhatsapp || SITE.whatsapp || '';
  const digits = normalizeGhanaWhatsAppDigits(number);
  return {
    digits,
    display: admin.shopWhatsapp || SITE.whatsapp || '',
    label: admin.shopWhatsappLabel || 'Glam Room WhatsApp',
    prefix: admin.clientMessagePrefix || 'Glam Room by Asantewaa',
  };
}

function whatsAppClientHref(booking) {
  const clientDigits = normalizeGhanaWhatsAppDigits(booking.phone);
  if (!clientDigits) return '#';

  const shop = getShopWhatsAppConfig();
  const name = booking.full_name || 'there';
  const date = booking.booking_date ? formatDate(booking.booking_date) : 'TBC';
  const time = booking.booking_time ? formatTime(booking.booking_time) : 'TBC';
  const service = booking.service || 'your appointment';
  const location =
    booking.location || booking.notes?.match(/\[Location: ([^\]]+)\]/)?.[1] || 'Glam Room';
  const status = (booking.status || 'pending').replace(/^\w/, (c) => c.toUpperCase());

  const message =
    `Hi ${name}, ${shop.prefix} here! 👑\n\n` +
    `Regarding your booking:\n` +
    `• Service: ${service}\n` +
    `• When: ${date} at ${time}\n` +
    `• Where: ${location}\n` +
    `• Status: ${status}\n\n` +
    `This message is from our salon line (${shop.display}). Reply here with any questions — see you soon!`;

  return `https://wa.me/${clientDigits}?text=${encodeURIComponent(message)}`;
}

function statusBadge(status, type = 'status') {
  const safe = (status || 'pending').toLowerCase().replace(/\s+/g, '-');
  const paymentClass =
    type === 'payment' && !['paid', 'pending', 'failed', 'unpaid', 'cancelled', 'refunded'].includes(safe)
      ? 'payment-pending'
      : type === 'payment'
        ? `payment-${safe}`
        : '';
  const className = paymentClass || `status-${safe}`;
  return `<span class="status-badge ${className}">${escapeHtml(safe.replace(/-/g, ' '))}</span>`;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function todayYmd() {
  return new Date().toISOString().slice(0, 10);
}

function statusSelectHtml(booking) {
  const status = (booking.status || 'pending').toLowerCase();
  const options = BOOKING_STATUSES.map(
    (value) =>
      `<option value="${value}"${value === status ? ' selected' : ''}>${value.charAt(0).toUpperCase() + value.slice(1)}</option>`
  ).join('');

  return `<select class="status-select" data-action="status-select" data-id="${booking.id}" data-name="${escapeHtml(booking.full_name)}" data-prev="${status}" aria-label="Booking status for ${escapeHtml(booking.full_name)}">${options}</select>`;
}

function setActiveQuickFilter(key) {
  activeQuickFilter = key;
  document.querySelectorAll('.admin-chip[data-quick]').forEach((chip) => {
    chip.classList.toggle('is-active', chip.dataset.quick === key);
  });
  document.querySelectorAll('.stat-card[data-quick-filter]').forEach((card) => {
    card.classList.toggle('is-filter-active', card.dataset.quickFilter === key);
  });
}

function applyQuickFilter(key) {
  const statusFilter = document.getElementById('statusFilter');
  const dateFilter = document.getElementById('dateFilter');
  const phoneFilter = document.getElementById('phoneFilter');
  const today = todayYmd();

  setActiveQuickFilter(key);

  if (phoneFilter) phoneFilter.value = '';

  if (key === 'today') {
    if (statusFilter) statusFilter.value = 'all';
    if (dateFilter) dateFilter.value = today;
    applyFilters();
    return;
  }

  if (key === 'pending') {
    if (statusFilter) statusFilter.value = 'pending';
    if (dateFilter) dateFilter.value = '';
    applyFilters();
    return;
  }

  if (key === 'confirmed') {
    if (statusFilter) statusFilter.value = 'confirmed';
    if (dateFilter) dateFilter.value = '';
    applyFilters();
    return;
  }

  if (key === 'upcoming') {
    if (statusFilter) statusFilter.value = 'all';
    if (dateFilter) dateFilter.value = '';
    const filtered = allBookings.filter(
      (b) => b.booking_date >= today && b.status !== 'cancelled'
    );
    renderBookings(filtered);
    return;
  }

  if (statusFilter) statusFilter.value = 'all';
  if (dateFilter) dateFilter.value = '';
  applyFilters();
}

function showToast(message, isError = false) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('p');
    toast.id = 'adminToast';
    toast.className = 'admin-toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.toggle('admin-toast--error', isError);
  toast.classList.add('is-visible');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function closeActionModal() {
  document.getElementById('adminActionModal')?.remove();
  if (!document.getElementById('clearConfirmModal')) {
    document.body.classList.remove('admin-modal-open');
  }
}

function openStatusConfirmModal({ name, fromStatus, toStatus, onConfirm }) {
  closeActionModal();
  const config = STATUS_CONFIRM[toStatus];
  if (!config) {
    onConfirm();
    return;
  }

  const backdrop = document.createElement('div');
  backdrop.id = 'adminActionModal';
  backdrop.className = 'admin-modal-backdrop is-open';
  backdrop.setAttribute('role', 'presentation');
  backdrop.innerHTML = `
    <div class="admin-modal" role="dialog" aria-labelledby="actionModalTitle" aria-modal="true">
      <h3 id="actionModalTitle">${escapeHtml(config.title)}</h3>
      <p class="admin-modal-text">${escapeHtml(config.text(name))}</p>
      <p class="admin-modal-meta">Status: ${escapeHtml(fromStatus)} → ${escapeHtml(toStatus)}</p>
      <div class="admin-modal-actions">
        <button type="button" class="btn-primary${config.danger ? ' btn-danger' : ''}" id="actionModalConfirm">${escapeHtml(config.confirmLabel)}</button>
        <button type="button" class="btn-primary btn-dark" id="actionModalCancel">Go back</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.classList.add('admin-modal-open');

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.querySelector('#actionModalCancel')?.click();
  });
  backdrop.querySelector('.admin-modal')?.addEventListener('click', (e) => e.stopPropagation());

  backdrop.querySelector('#actionModalCancel')?.addEventListener('click', () => {
    closeActionModal();
    onConfirm(false);
  });

  backdrop.querySelector('#actionModalConfirm')?.addEventListener('click', async () => {
    const btn = backdrop.querySelector('#actionModalConfirm');
    btn.disabled = true;
    btn.textContent = 'Saving…';
    await onConfirm(true);
    closeActionModal();
  });

  document.addEventListener(
    'keydown',
    function escHandler(e) {
      if (e.key === 'Escape' && document.getElementById('adminActionModal')) {
        document.removeEventListener('keydown', escHandler);
        backdrop.querySelector('#actionModalCancel')?.click();
      }
    },
    { once: true }
  );
}

function updateStats(bookings) {
  const today = todayYmd();
  document.getElementById('totalBookings').textContent = bookings.length;
  document.getElementById('pendingBookings').textContent = bookings.filter((b) => b.status === 'pending').length;
  document.getElementById('confirmedBookings').textContent = bookings.filter((b) => b.status === 'confirmed').length;
  document.getElementById('todayBookings').textContent = bookings.filter((b) => b.booking_date === today).length;
}

function sortBookings(bookings) {
  const key = document.getElementById('sortBy')?.value || 'date';
  const dir = document.getElementById('sortDir')?.value || 'desc';
  const mult = dir === 'asc' ? 1 : -1;

  return [...bookings].sort((a, b) => {
    let cmp = 0;

    switch (key) {
      case 'time':
        cmp = (a.booking_time || '').localeCompare(b.booking_time || '');
        if (cmp === 0) cmp = (a.booking_date || '').localeCompare(b.booking_date || '');
        break;
      case 'name':
        cmp = (a.full_name || '').localeCompare(b.full_name || '', undefined, { sensitivity: 'base' });
        break;
      case 'status':
        cmp = (a.status || '').localeCompare(b.status || '');
        break;
      case 'service':
        cmp = (a.service || '').localeCompare(b.service || '', undefined, { sensitivity: 'base' });
        break;
      case 'deposit':
        cmp = (a.payment_status || '').localeCompare(b.payment_status || '');
        break;
      case 'created':
        cmp = (a.created_at || '').localeCompare(b.created_at || '');
        break;
      case 'date':
      default:
        cmp = (a.booking_date || '').localeCompare(b.booking_date || '');
        if (cmp === 0) cmp = (a.booking_time || '').localeCompare(b.booking_time || '');
        break;
    }

    return cmp * mult;
  });
}

function renderBookings(bookings) {
  const sorted = sortBookings(bookings);
  filteredBookings = sorted;
  emptyState.hidden = sorted.length > 0;

  if (!sorted.length) {
    bookingsBody.innerHTML = '<tr><td colspan="9" class="table-empty">No bookings found</td></tr>';
    return;
  }

  bookingsBody.innerHTML = sorted
    .map((b) => {
      const location = b.location || b.notes?.match(/\[Location: ([^\]]+)\]/)?.[1] || 'N/A';

      return `
        <tr data-id="${b.id}">
          <td>${formatDate(b.booking_date)}</td>
          <td>${formatTime(b.booking_time)}</td>
          <td><strong>${escapeHtml(b.full_name)}</strong></td>
          <td><a class="phone-link" href="${whatsAppHref(b.phone)}" target="_blank" rel="noopener noreferrer">${escapeHtml(b.phone)}</a></td>
          <td>${escapeHtml(location)}</td>
          <td class="service-cell">${escapeHtml(b.service)}</td>
          <td>${statusSelectHtml(b)}</td>
          <td>${statusBadge(b.payment_status || 'pending', 'payment')}</td>
          <td>
            <div class="row-actions">
              <a class="action-pill action-pill--wa" href="${whatsAppHref(b.phone)}" target="_blank" rel="noopener noreferrer" title="WhatsApp client" aria-label="WhatsApp ${escapeHtml(b.full_name)}"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function clearQuickFilterUi() {
  activeQuickFilter = '';
  document.querySelectorAll('.admin-chip').forEach((c) => c.classList.remove('is-active'));
  document.querySelectorAll('.stat-card[data-quick-filter]').forEach((c) => c.classList.remove('is-filter-active'));
}

function applyFilters() {
  const status = document.getElementById('statusFilter').value;
  const date = document.getElementById('dateFilter').value;
  const phone = document.getElementById('phoneFilter').value.trim().toLowerCase();

  let filtered = [...allBookings];
  if (status !== 'all') filtered = filtered.filter((b) => b.status === status);
  if (date) filtered = filtered.filter((b) => b.booking_date === date);
  if (phone) filtered = filtered.filter((b) => b.phone.toLowerCase().includes(phone));

  renderBookings(filtered);
}

async function loadBookings() {
  const supabase = getAdminSupabase();
  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return;
  }

  bookingsBody.innerHTML = '<tr><td colspan="9" class="table-loading">Loading bookings…</td></tr>';
  emptyState.hidden = true;

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('booking_date', { ascending: false })
    .order('booking_time', { ascending: false });

  if (error) {
    if (error.message?.includes('JWT') || error.code === 'PGRST301') {
      showLogin('Session expired. Please log in again.');
      await supabase.auth.signOut();
      return;
    }
    bookingsBody.innerHTML = `<tr><td colspan="9" class="table-empty">Could not load bookings: ${escapeHtml(error.message)}</td></tr>`;
    return;
  }

  allBookings = data || [];
  updateStats(allBookings);
  if (activeQuickFilter) {
    applyQuickFilter(activeQuickFilter);
  } else {
    applyFilters();
  }
}

async function updateStatus(id, status) {
  const supabase = getAdminSupabase();
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) {
    showToast(`Update failed: ${error.message}`, true);
    return false;
  }
  showToast(`Booking marked as ${status}.`);
  await loadBookings();
  return true;
}

function handleStatusSelectChange(select) {
  const id = select.dataset.id;
  const name = select.dataset.name || 'this client';
  const fromStatus = select.dataset.prev || 'pending';
  const toStatus = select.value;

  if (toStatus === fromStatus) return;

  const revert = () => {
    select.value = fromStatus;
  };

  const runUpdate = async (confirmed) => {
    if (!confirmed) {
      revert();
      return;
    }
    select.disabled = true;
    const ok = await updateStatus(id, toStatus);
    select.disabled = false;
    if (!ok) revert();
    else select.dataset.prev = toStatus;
  };

  if (needsStatusConfirm(fromStatus, toStatus)) {
    openStatusConfirmModal({ name, fromStatus, toStatus, onConfirm: runUpdate });
    return;
  }

  runUpdate(true);
}

function exportToCSV() {
  const rows = filteredBookings.length ? filteredBookings : allBookings;

  if (!rows.length) {
    showToast('No bookings to export.', true);
    return;
  }

  const headers = [
    'Full Name',
    'Phone',
    'Location',
    'Service',
    'Date',
    'Time',
    'Status',
    'Deposit',
    'Notes',
    'Created At',
  ];
  const csvRows = rows.map((b) => [
    b.full_name,
    b.phone,
    b.location || '',
    b.service,
    b.booking_date,
    b.booking_time,
    b.status,
    b.payment_status || '',
    b.notes || '',
    b.created_at || '',
  ]);

  const csvContent = [headers, ...csvRows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `glam-room-bookings-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Exported ${rows.length} booking${rows.length === 1 ? '' : 's'}.`);
}

function formatAuthError(error) {
  const msg = error?.message || 'Sign-in failed.';
  if (/invalid login credentials/i.test(msg)) {
    return 'Incorrect staff login or password. Type your Supabase staff login manually — saved browser autofill often uses the wrong account.';
  }
  if (/email not confirmed/i.test(msg)) {
    return 'Staff account is not confirmed. In Supabase, run supabase/create-admin-lesley.sql again.';
  }
  if (/network|fetch/i.test(msg)) {
    return 'Network error. Check your connection and try again.';
  }
  return msg;
}

function isValidStaffLogin(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function login(email, password) {
  const supabase = getAdminSupabase();
  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidStaffLogin(normalizedEmail)) {
    showLogin('Enter a valid staff login (must be an email address).');
    return false;
  }

  if (!password) {
    showLogin('Enter your password.');
    return false;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    showLogin(formatAuthError(error));
    return false;
  }

  if (!data?.session) {
    showLogin('Sign-in did not create a session. Try again or use a private browser window.');
    return false;
  }

  cachedLoginPassword = password;
  showAdmin();
  await loadBookings();
  return true;
}

function resetFilters() {
  const statusFilter = document.getElementById('statusFilter');
  const dateFilter = document.getElementById('dateFilter');
  const phoneFilter = document.getElementById('phoneFilter');

  if (statusFilter) {
    statusFilter.value = 'all';
    statusFilter.selectedIndex = 0;
  }

  if (dateFilter) {
    dateFilter.value = '';
    dateFilter.defaultValue = '';
    dateFilter.valueAsDate = null;
  }

  if (phoneFilter) {
    phoneFilter.value = '';
  }

  const sortBy = document.getElementById('sortBy');
  const sortDir = document.getElementById('sortDir');
  if (sortBy) sortBy.value = 'date';
  if (sortDir) sortDir.value = 'desc';

  applyQuickFilter('all');
}

async function deleteAllBookings() {
  const supabase = getAdminSupabase();
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data: rows, error: readError } = await supabase.from('bookings').select('id');
  if (readError) throw new Error(readError.message);
  if (!rows?.length) {
    allBookings = [];
    resetFilters();
    updateStats([]);
    return;
  }

  const { error: deleteError } = await supabase
    .from('bookings')
    .delete()
    .in('id', rows.map((row) => row.id));

  if (deleteError) throw new Error(deleteError.message);

  allBookings = [];
  resetFilters();
  updateStats([]);
}

function showClearSuccess(message = 'All bookings cleared from the site.') {
  let toast = document.getElementById('clearFiltersToast');
  if (!toast) {
    toast = document.createElement('p');
    toast.id = 'clearFiltersToast';
    toast.className = 'clear-filters-toast';
    toast.setAttribute('role', 'status');
    document.querySelector('.admin-filters')?.appendChild(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showClearSuccess._timer);
  showClearSuccess._timer = setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

async function verifyClearPassword(password) {
  const trimmed = password.trim();
  if (!trimmed) return false;

  if (cachedLoginPassword && trimmed === cachedLoginPassword) return true;

  const supabase = getAdminSupabase();
  if (!supabase) return false;

  const { data: { session } } = await supabase.auth.getSession();
  const email = session?.user?.email?.trim();
  if (!email) return false;

  const { url, anonKey } = SITE.booking.supabase || {};
  if (!url || !anonKey) return false;

  const tempClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await tempClient.auth.signInWithPassword({ email, password: trimmed });
  return Boolean(data?.session && !error);
}

function openClearConfirmModal() {
  closeClearConfirmModal();

  const backdrop = document.createElement('div');
  backdrop.id = 'clearConfirmModal';
  backdrop.className = 'admin-modal-backdrop is-open';
  backdrop.setAttribute('role', 'presentation');
  backdrop.innerHTML = `
    <div class="admin-modal" role="dialog" aria-labelledby="clearConfirmTitle" aria-modal="true">
      <h3 id="clearConfirmTitle">Clear all bookings?</h3>
      <p class="admin-modal-text">This permanently removes every booking from the site. Enter your admin password to confirm.</p>
      <div class="login-error" id="clearConfirmError"></div>
      <label for="clearConfirmPassword">Password</label>
      <input type="password" id="clearConfirmPassword" autocomplete="current-password" placeholder="Admin password">
      <div class="admin-modal-actions">
        <button type="button" class="btn-primary" id="clearConfirmSubmit">Clear all bookings</button>
        <button type="button" class="btn-primary btn-dark" id="clearConfirmCancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeClearConfirmModal();
  });
  backdrop.querySelector('.admin-modal')?.addEventListener('click', (e) => e.stopPropagation());
  document.getElementById('clearConfirmCancel')?.addEventListener('click', closeClearConfirmModal);
  document.getElementById('clearConfirmSubmit')?.addEventListener('click', handleClearWithPassword);
  document.getElementById('clearConfirmPassword')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClearWithPassword();
    }
    if (e.key === 'Escape') closeClearConfirmModal();
  });

  document.body.classList.add('admin-modal-open');
  setTimeout(() => document.getElementById('clearConfirmPassword')?.focus(), 50);
}

function closeClearConfirmModal() {
  document.getElementById('clearConfirmModal')?.remove();
  document.body.classList.remove('admin-modal-open');
}

async function handleClearWithPassword() {
  const errorEl = document.getElementById('clearConfirmError');
  const passwordInput = document.getElementById('clearConfirmPassword');
  const submitBtn = document.getElementById('clearConfirmSubmit');
  if (!errorEl || !passwordInput || !submitBtn) return;

  errorEl.style.display = 'none';
  submitBtn.disabled = true;

  try {
    const ok = await verifyClearPassword(passwordInput.value);
    if (!ok) {
      errorEl.textContent = 'Wrong password. Bookings were not cleared.';
      errorEl.style.display = 'block';
      return;
    }

    submitBtn.textContent = 'Clearing…';
    await deleteAllBookings();
    showClearSuccess();
    closeClearConfirmModal();
  } catch (err) {
    errorEl.textContent = err?.message || 'Could not clear bookings. Try again.';
    errorEl.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Clear all bookings';
  }
}

async function logout() {
  const supabase = getAdminSupabase();
  if (supabase) await supabase.auth.signOut();
  cachedLoginPassword = null;
  showLogin();
}

function bindPasswordToggle() {
  const input = document.getElementById('adminPassword');
  const toggle = document.getElementById('toggleAdminPassword');
  if (!input || !toggle) return;

  toggle.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = show ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye';
    }
  });
}

async function init() {
  const supabase = getAdminSupabase();
  bindPasswordToggle();

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    showLogin('');

    const ok = await login(emailInput?.value || '', passwordInput?.value || '');
    if (!ok) {
      passwordInput?.focus();
    }

    btn.disabled = false;
    btn.textContent = 'Sign in';
  });

  document.getElementById('applyFilterBtn').addEventListener('click', () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById('resetFilterBtn').addEventListener('click', resetFilters);
  document.getElementById('statusFilter').addEventListener('change', () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById('dateFilter').addEventListener('change', () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById('phoneFilter').addEventListener('input', () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById('sortBy')?.addEventListener('change', applyFilters);
  document.getElementById('sortDir')?.addEventListener('change', applyFilters);
  document.getElementById('exportBtn').addEventListener('click', exportToCSV);
  document.getElementById('clearAllBtn').addEventListener('click', openClearConfirmModal);
  document.getElementById('refreshBtn').addEventListener('click', loadBookings);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  document.querySelectorAll('.admin-chip[data-quick]').forEach((chip) => {
    chip.addEventListener('click', () => applyQuickFilter(chip.dataset.quick));
  });

  document.querySelectorAll('.stat-card[data-quick-filter]').forEach((card) => {
    card.addEventListener('click', () => applyQuickFilter(card.dataset.quickFilter));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        applyQuickFilter(card.dataset.quickFilter);
      }
    });
  });

  bookingsBody.addEventListener('change', (e) => {
    const select = e.target.closest('.status-select');
    if (select) handleStatusSelectChange(select);
  });

  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return;
  }

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    showLogin(formatAuthError(sessionError));
    return;
  }
  if (session) {
    showAdmin();
    await loadBookings();
  } else {
    showLogin();
  }
}

if (!loginForm || !loginError || !adminContent || !loginContainer) {
  document.body.innerHTML =
    '<p style="color:#fff;padding:2rem;font-family:sans-serif">Admin page failed to load. Refresh or try another browser.</p>';
} else {
  init().catch((err) => {
    console.error(err);
    showLogin(err?.message || 'Admin failed to start. Refresh the page.');
  });
}
