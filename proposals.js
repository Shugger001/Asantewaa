import { SITE } from './data.js';

export function initProposalsForm() {
  const form = document.getElementById('prop-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('prop-name').value.trim();
    const email = document.getElementById('prop-email').value.trim();
    const pillar = document.getElementById('prop-pillar').value;
    const budget = document.getElementById('prop-budget').value;
    const brief = document.getElementById('prop-brief').value.trim();
    const msgEl = document.getElementById('prop-msg');
    const contact = SITE.proposals?.contact || {};

    const body = encodeURIComponent(
      `Strategic Briefing — Partner with Asantewaa\n\n` +
        `Name / Company: ${name}\n` +
        `Email: ${email}\n` +
        `Collaboration Pillar: ${pillar}\n` +
        `Budget Tier: ${budget}\n\n` +
        `Brief:\n${brief || '(none provided)'}`
    );

    const mailto = `mailto:${contact.email || 'martinadwamena599@gmail.com'}?subject=${encodeURIComponent('Strategic Briefing — ' + name)}&body=${body}`;

    msgEl.textContent = 'Opening your email client to submit the briefing…';
    msgEl.hidden = false;
    window.location.href = mailto;
  });
}
