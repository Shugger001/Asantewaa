import { SITE } from './data.js';
import { getSupabase } from './supabase-client.js';

const adminContent = document.getElementById('adminContent');
const loginContainer = document.getElementById('loginContainer');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const bookingsBody = document.getElementById('bookingsBody');
const emptyState = document.getElementById('emptyState');

let allBookings = [];
let filteredBookings = [];

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

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateStats(bookings) {
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById('totalBookings').textContent = bookings.length;
  document.getElementById('pendingBookings').textContent = bookings.filter((b) => b.status === 'pending').length;
  document.getElementById('confirmedBookings').textContent = bookings.filter((b) => b.status === 'confirmed').length;
  document.getElementById('todayBookings').textContent = bookings.filter((b) => b.booking_date === today).length;
}

function renderBookings(bookings) {
  filteredBookings = bookings;
  emptyState.hidden = bookings.length > 0;

  if (!bookings.length) {
    bookingsBody.innerHTML = '<tr><td colspan="8" class="table-empty">No bookings found</td></tr>';
    return;
  }

  bookingsBody.innerHTML = bookings
    .map((b) => {
      const location = b.location || b.notes?.match(/\[Location: ([^\]]+)\]/)?.[1] || '—';

      return `
        <tr data-id="${b.id}">
          <td>${formatDate(b.booking_date)}</td>
          <td>${formatTime(b.booking_time)}</td>
          <td><strong>${escapeHtml(b.full_name)}</strong></td>
          <td><a class="phone-link" href="${whatsAppHref(b.phone)}" target="_blank" rel="noopener noreferrer">${escapeHtml(b.phone)}</a></td>
          <td>${escapeHtml(location)}</td>
          <td>${escapeHtml(b.service)}</td>
          <td>${statusBadge(b.status)}</td>
          <td>
            <div class="row-actions">
              ${b.status === 'pending' ? `<button type="button" class="action-btn confirm" data-action="status" data-id="${b.id}" data-status="confirmed" title="Confirm">✅</button>` : ''}
              ${b.status === 'confirmed' ? `<button type="button" class="action-btn complete" data-action="status" data-id="${b.id}" data-status="completed" title="Complete">✨</button>` : ''}
              ${b.status !== 'cancelled' ? `<button type="button" class="action-btn cancel" data-action="status" data-id="${b.id}" data-status="cancelled" title="Cancel">❌</button>` : ''}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
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
  const supabase = getSupabase();
  if (!supabase) {
    showLogin('Supabase is not configured in data.js.');
    return;
  }

  bookingsBody.innerHTML = '<tr><td colspan="8" class="table-loading">Loading bookings…</td></tr>';
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
    bookingsBody.innerHTML = `<tr><td colspan="8" class="table-empty">Could not load bookings: ${escapeHtml(error.message)}</td></tr>`;
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

function exportToCSV() {
  const rows = filteredBookings.length ? filteredBookings : allBookings;

  if (!rows.length) {
    alert('No bookings to export!');
    return;
  }

  const headers = ['Full Name', 'Phone', 'Email', 'Location', 'Service', 'Date', 'Time', 'Status', 'Notes', 'Created At'];
  const csvRows = rows.map((b) => [
    b.full_name,
    b.phone,
    b.email || '',
    b.location || '',
    b.service,
    b.booking_date,
    b.booking_time,
    b.status,
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

  renderBookings([...allBookings]);
}

async function deleteAllBookings() {
  const supabase = getSupabase();
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
    document.querySelector('.filter-bar')?.appendChild(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showClearSuccess._timer);
  showClearSuccess._timer = setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

async function handleClearAll() {
  if (!confirm('Delete all bookings permanently? This cannot be undone.')) return;

  const btn = document.getElementById('clearAllBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Clearing…';
  }

  try {
    await deleteAllBookings();
    showClearSuccess();
  } catch (err) {
    alert(err?.message || 'Could not clear bookings. Try again.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Clear all bookings';
    }
  }
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
  document.getElementById('resetFilterBtn').addEventListener('click', resetFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
  document.getElementById('dateFilter').addEventListener('change', applyFilters);
  document.getElementById('phoneFilter').addEventListener('input', applyFilters);
  document.getElementById('exportBtn').addEventListener('click', exportToCSV);
  document.getElementById('clearAllBtn').addEventListener('click', handleClearAll);
  document.getElementById('refreshBtn').addEventListener('click', loadBookings);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  bookingsBody.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'status') await updateStatus(btn.dataset.id, btn.dataset.status);
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
