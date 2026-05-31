import { SITE } from './data.js?v=20260536';

const STORAGE_KEY = 'glamroom_install_dismissed';
const DISMISS_DAYS = 14;

let deferredPrompt = null;

function isMobileDevice() {
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

function isStandaloneApp() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    navigator.standalone === true
  );
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function wasDismissedRecently() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { at } = JSON.parse(raw);
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now() }));
}

function getCopy() {
  return SITE.installPrompt || {};
}

function removePrompt() {
  document.getElementById('installPrompt')?.remove();
  document.getElementById('installPromptBackdrop')?.remove();
  document.body.classList.remove('install-prompt-open');
}

function showPrompt(mode = 'android') {
  if (document.getElementById('installPrompt')) return;

  const copy = getCopy();
  const isIosMode = mode === 'ios';

  const backdrop = document.createElement('div');
  backdrop.id = 'installPromptBackdrop';
  backdrop.className = 'install-prompt-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  const el = document.createElement('div');
  el.id = 'installPrompt';
  el.className = 'install-prompt';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-labelledby', 'installPromptTitle');
  el.setAttribute('aria-modal', 'true');

  el.innerHTML = `
    <button type="button" class="install-prompt-close" id="installPromptClose" aria-label="Close">×</button>
    <div class="install-prompt-icon" aria-hidden="true"><i class="fa-solid fa-mobile-screen-button"></i></div>
    <h2 id="installPromptTitle" class="install-prompt-title">${copy.title || 'Add Glam Room to your home screen'}</h2>
    <p class="install-prompt-body">${copy.body || 'Open like an app: one tap from your phone, no browser bar.'}</p>
    ${
      isIosMode
        ? `<ol class="install-prompt-steps">
            <li><span class="install-prompt-step-icon"><i class="fa-solid fa-arrow-up-from-bracket"></i></span> Tap <strong>Share</strong> in Safari</li>
            <li><span class="install-prompt-step-icon"><i class="fa-solid fa-plus"></i></span> Choose <strong>Add to Home Screen</strong></li>
            <li><span class="install-prompt-step-icon"><i class="fa-solid fa-check"></i></span> Tap <strong>Add</strong></li>
          </ol>`
        : `<p class="install-prompt-hint">${copy.androidHint || 'Tap below to install Glam Room on this device.'}</p>`
    }
    <div class="install-prompt-actions">
      ${
        isIosMode
          ? `<button type="button" class="install-prompt-btn install-prompt-btn--primary" id="installPromptGotIt">${copy.iosButton || 'Got it'}</button>`
          : `<button type="button" class="install-prompt-btn install-prompt-btn--primary" id="installPromptInstall">${copy.installButton || 'Add to Home Screen'}</button>`
      }
      <button type="button" class="install-prompt-btn install-prompt-btn--ghost" id="installPromptLater">${copy.laterButton || 'Maybe later'}</button>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(el);
  document.body.classList.add('install-prompt-open');

  backdrop.addEventListener('click', () => {
    markDismissed();
    removePrompt();
  });

  document.getElementById('installPromptClose')?.addEventListener('click', () => {
    markDismissed();
    removePrompt();
  });

  document.getElementById('installPromptLater')?.addEventListener('click', () => {
    markDismissed();
    removePrompt();
  });

  document.getElementById('installPromptGotIt')?.addEventListener('click', () => {
    markDismissed();
    removePrompt();
  });

  document.getElementById('installPromptInstall')?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      markDismissed();
      removePrompt();
      if (outcome === 'accepted') return;
    }
    markDismissed();
    removePrompt();
  });

  requestAnimationFrame(() => {
    el.classList.add('install-prompt--visible');
    backdrop.classList.add('install-prompt-backdrop--visible');
  });
}

let promptScheduled = false;

function schedulePrompt(mode) {
  if (promptScheduled || wasDismissedRecently() || isStandaloneApp()) return;
  promptScheduled = true;
  const delay = getCopy().delayMs ?? 2500;
  setTimeout(() => {
    if (wasDismissedRecently() || isStandaloneApp()) return;
    showPrompt(mode);
  }, delay);
}

export function initInstallPrompt() {
  if (!isMobileDevice() || isStandaloneApp() || wasDismissedRecently()) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    schedulePrompt('android');
  });

  if (isIOS()) {
    schedulePrompt('ios');
  }
}
