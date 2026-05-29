import { SITE } from './data.js';
import { getSupabase } from './supabase-client.js';

const adminContent = document.getElementById('adminContent');
const loginContainer = document.getElementById('loginContainer');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const bookingsBody = document.getElementById('bookingsBody');
const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');

let allBookings = [];

function showLogin(message = '') {
  adminContent.hidden = true;
  loginContainer.hidden = false;
  loginError.style.display = message ? 'block' : 'none';
  loginError.textContent = message;
}

function showAdmin() {
  loginContainer.hidden = true;
  adminContent.hidden = false;
  loginError.style.display = 'none';
}

function formatTime(time) {
  if (!time) return '—';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-GH', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function whatsAppHref(phone) {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '233');
  return `https://wa.me/${digits}`;
}

function statusBadge(status) {
  const safe = (status || 'pending').toLowerCase();
  return `<span class="status-badge status-${safe}">${safe}</span>`;
}

function updateStats(bookings) {
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById('totalBookings').textContent = bookings.length;
  document.getElementById('pendingBookings').textContent = bookings.filter((b) => b.status === 'pending').length;
  document.getElementById('confirmedBookings').textContent = bookings.filter((b) => b.status === 'confirmed').length;
  document.getElementById('todayBookings').textContent = bookings.filter((b) => b.booking_date === today).length;
}

function renderBookings(bookings) {
  bookingsBody.innerHTML = '';
  emptyState.hidden = bookings.length > 0;
  loadingState.hidden = true;

  if (!bookings.length) return;

  bookingsBody.innerHTML = bookings
    .map((b) => {
      const location = b.location || b.notes?.match(/\[Location: ([^\]]+)\]/)?.[1] || '—';
      const notes = (b.notes || '').replace(/\[Location:[^\]]+\]\n?/, '').trim() || '—';

      return `
        <tr data-id="${b.id}">
          <td>${formatDate(b.booking_date)}</td>
          <td>${formatTime(b.booking_time)}</td>
          <td><strong>${escapeHtml(b.full_name)}</strong></td>
          <td><a class="phone-link" href="${whatsAppHref(b.phone)}" target="_blank" rel="noopener noreferrer">${escapeHtml(b.phone)}</a></td>
          <td>${escapeHtml(location)}</td>
          <td>${escapeHtml(b.service)}</td>
          <td class="notes-cell">${escapeHtml(notes)}</td>
          <td>${statusBadge(b.status)}</td>
          <td>
            <div class="row-actions">
              ${actionButton(b, 'confirmed', 'Confirm', b.status === 'confirmed')}
              ${actionButton(b, 'completed', 'Complete', b.status === 'completed')}
              ${actionButton(b, 'cancelled', 'Cancel', b.status === 'cancelled')}
              <button type="button" class="btn-sm danger" data-action="delete" data-id="${b.id}">Delete</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function actionButton(booking, status, label, disabled) {
  return `<button type="button" class="btn-sm secondary" data-action="status" data-id="${booking.id}" data-status="${status}" ${disabled ? 'disabled' : ''}>${label}</button>`;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyFilters() {
  const status = document.getElementById('statusFilter').value;
  const date = document.getElementById('dateFilter').value;

  let filtered = [...allBookings];
  if (status !== 'all') filtered = filtered.filter((b) => b.status === status);
  if (date) filtered = filtered.filter((b) => b.booking_date === date);

  renderBookings(filtered);
}

async function loadBookings() {
  const supabase = getSupabase();
  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return;
  }

  loadingState.hidden = false;
  emptyState.hidden = true;
  bookingsBody.innerHTML = '';

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('booking_date', { ascending: false })
    .order('booking_time', { ascending: false });

  loadingState.hidden = true;

  if (error) {
    if (error.message?.includes('JWT') || error.code === 'PGRST301') {
      showLogin('Session expired. Please log in again.');
      await supabase.auth.signOut();
      return;
    }
    emptyState.hidden = false;
    emptyState.textContent = `Could not load bookings: ${error.message}`;
    return;
  }

  allBookings = data || [];
  updateStats(allBookings);
  applyFilters();
}

async function updateStatus(id, status) {
  const supabase = getSupabase();
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) {
    alert(`Update failed: ${error.message}`);
    return;
  }
  await loadBookings();
}

async function deleteBooking(id) {
  if (!confirm('Delete this booking permanently?')) return;
  const supabase = getSupabase();
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) {
    alert(`Delete failed: ${error.message}`);
    return;
  }
  await loadBookings();
}

async function login(email, password) {
  const supabase = getSupabase();
  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    showLogin(error.message);
    return;
  }

  showAdmin();
  await loadBookings();
}

async function logout() {
  const supabase = getSupabase();
  if (supabase) await supabase.auth.signOut();
  showLogin();
}

async function init() {
  const supabase = getSupabase();
  const emailInput = document.getElementById('adminEmail');
  if (SITE.admin?.loginEmail && emailInput) {
    emailInput.value = SITE.admin.loginEmail;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    await login(
      document.getElementById('adminEmail').value.trim(),
      document.getElementById('adminPassword').value
    );
    btn.disabled = false;
  });

  document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);
  document.getElementById('clearFilterBtn').addEventListener('click', () => {
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('dateFilter').value = '';
    applyFilters();
  });
  document.getElementById('refreshBtn').addEventListener('click', loadBookings);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  bookingsBody.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const { action, id, status } = btn.dataset;
    if (action === 'status') await updateStatus(id, status);
    if (action === 'delete') await deleteBooking(id);
  });

  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    showAdmin();
    await loadBookings();
  } else {
    showLogin();
  }
}

init();
