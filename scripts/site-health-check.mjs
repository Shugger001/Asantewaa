#!/usr/bin/env node
/**
 * Glam Room live site health check.
 * Used by .github/workflows/daily-site-scan.yml
 */

const SITE_BASE = 'https://shugger001.github.io/Asantewaa';
const WRONG_BASE = 'https://shugger001.github.io/Asantewaaa';
const SUPABASE_URL = 'https://pksfslkwmlrlttoojluk.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc2ZzbGt3bWxybHR0b29qbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjMyNzcsImV4cCI6MjA5NTYzOTI3N30.put72ryG2V8E7rQLfF6omcGplgrUbHmrep8zLBvEk6M';

const EXPECTED = {
  whatsapp: '+233243646400',
  oldWhatsapp: '+233247743593',
  hours: 'Mon to Sun: 8am to 8pm',
  timeSlots: ['09:00', '12:00', '15:00', '18:00'],
};

const PAGES = [
  '/',
  '/index.html',
  '/glam-room.html',
  '/book.html',
  '/about.html',
  '/service.html',
  '/proposals.html',
  '/admin.html',
];

const ASSETS = ['/dist/app.bundle.js', '/admin.bundle.js'];

/** @type {{ name: string, ok: boolean, detail: string }[]} */
const results = [];

function pass(name, detail = 'OK') {
  results.push({ name, ok: true, detail });
}

function fail(name, detail) {
  results.push({ name, ok: false, detail });
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    redirect: 'follow',
    ...options,
  });
  const text = await response.text();
  return { response, text };
}

async function checkPage(path) {
  const url = `${SITE_BASE}${path}`;
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    if (response.status === 200) {
      pass(`Page ${path || '/'}`, `HTTP ${response.status}`);
    } else {
      fail(`Page ${path || '/'}`, `HTTP ${response.status}`);
    }
  } catch (err) {
    fail(`Page ${path || '/'}`, err.message || String(err));
  }
}

async function checkWrongUrl() {
  try {
    const response = await fetch(`${WRONG_BASE}/`, { method: 'GET', redirect: 'follow' });
    if (response.status === 404) {
      pass('Wrong URL blocked', 'Asantewaaa returns 404 as expected');
    } else {
      fail('Wrong URL blocked', `Asantewaaa returned HTTP ${response.status} (expected 404)`);
    }
  } catch (err) {
    pass('Wrong URL blocked', `Unreachable (${err.message || 'network error'})`);
  }
}

async function checkBundle(path, label) {
  const url = `${SITE_BASE}${path}`;
  try {
    const { response, text } = await fetchText(url);
    if (response.status !== 200) {
      fail(label, `HTTP ${response.status}`);
      return;
    }

    const checks = [
      [`WhatsApp ${EXPECTED.whatsapp}`, text.includes(EXPECTED.whatsapp)],
      [`No old WhatsApp ${EXPECTED.oldWhatsapp}`, !text.includes(EXPECTED.oldWhatsapp)],
      [`Hours "${EXPECTED.hours}"`, text.includes(EXPECTED.hours)],
      ...EXPECTED.timeSlots.map((slot) => [`Slot ${slot}`, text.includes(slot)]),
    ];

    if (path.includes('app.bundle')) {
      checks.push(['Duplicate booking guard', text.includes('hasExistingCustomerBookingOnDate')]);
    }

    const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
    if (failed.length) {
      fail(label, `Missing or wrong: ${failed.join(', ')}`);
    } else {
      pass(label, `${Math.round(text.length / 1024)} KB loaded, content checks passed`);
    }
  } catch (err) {
    fail(label, err.message || String(err));
  }
}

async function checkSupabaseRest() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings?select=id&limit=0`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    if (response.ok) {
      pass('Supabase bookings API', `HTTP ${response.status}`);
    } else {
      fail('Supabase bookings API', `HTTP ${response.status}`);
    }
  } catch (err) {
    fail('Supabase bookings API', err.message || String(err));
  }
}

async function checkSupabaseRpc(name, body) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = await response.text();

    if (response.ok) {
      pass(`Supabase RPC ${name}`, `HTTP ${response.status}`);
      return;
    }

    if (response.status === 404 && text.includes('Could not find the function')) {
      fail(`Supabase RPC ${name}`, 'Function not deployed in Supabase');
      return;
    }

    fail(`Supabase RPC ${name}`, `HTTP ${response.status}: ${text.slice(0, 120)}`);
  } catch (err) {
    fail(`Supabase RPC ${name}`, err.message || String(err));
  }
}

function formatReport() {
  const now = new Date().toISOString();
  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;
  const status = failed === 0 ? 'ALL CHECKS PASSED' : `${failed} ISSUE(S) FOUND`;

  const lines = [
    'Glam Room by Asantewaa — Daily Site Health Scan',
    `Site: ${SITE_BASE}`,
    `Time (UTC): ${now}`,
    `Summary: ${status} (${passed}/${results.length} passed)`,
    '',
    ...results.map((r) => `${r.ok ? 'PASS' : 'FAIL'}  ${r.name} — ${r.detail}`),
    '',
    '—',
    'Automated scan from GitHub Actions (.github/workflows/daily-site-scan.yml)',
  ];

  return { lines: lines.join('\n'), failed, passed, total: results.length };
}

async function main() {
  await Promise.all(PAGES.map((path) => checkPage(path)));
  await checkWrongUrl();
  await Promise.all(ASSETS.map((path) => checkBundle(path, path)));
  await checkSupabaseRest();
  await checkSupabaseRpc('find_my_bookings', {
    p_phone: '0240000000',
    p_name_suffix: 'test',
  });
  await checkSupabaseRpc('customer_has_active_booking_on_date', {
    p_phone: '0240000000',
    p_date: '2099-01-01',
  });

  const report = formatReport();
  console.log(report.lines);
  process.exit(report.failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(`Health check crashed: ${err.message || err}`);
  process.exit(2);
});
