import { SITE, getLocationLabel, findServiceById, getServicePriceRange } from './data.js';
import { initBookingForm } from './booking.js';
import {
  initGlamBookingOverlay,
  bindSanctuaryBookingButtons,
  populateOverlayServices,
  populateOverlayTimeSlots,
} from './glam-booking.js';
import { initProposalsForm } from './proposals.js';
import { initFindBooking } from './find-booking.js';
import { initInstallPrompt } from './install-prompt.js';

/* ==========================================================================
   Glam Room by Asantewaa — Application Logic
   ========================================================================== */

function getWhatsAppUrl() {
  const number = SITE.whatsapp.replace(/[^0-9+]/g, '');
  const msg = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${number.replace('+', '')}?text=${msg}`;
}

function openWhatsApp() {
  window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
}

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* --- Dynamic Content Rendering --- */

function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = Array.from({ length: SITE.services.length }, () =>
    '<div class="skeleton"></div>'
  ).join('');

  setTimeout(() => {
    grid.innerHTML = SITE.services
      .map(
        (service, i) => `
      <a href="service.html?id=${encodeURIComponent(service.id)}" class="service-card-link reveal reveal-delay-${(i % 4) + 1}">
        <article class="glass-card service-card" data-service="${service.id}">
          <div class="service-card-header">
            <div class="service-icon"><i class="${service.icon}"></i></div>
            ${service.badge ? `<span class="service-badge">${service.badge}</span>` : ''}
          </div>
          <h3 class="service-name">${service.name}</h3>
          <p class="service-desc">${service.description}</p>
          <div class="service-meta">
            <span class="service-price">${getServicePriceRange(service)}</span>
            <span class="service-duration"><i class="fa-regular fa-clock"></i> ${service.duration}</span>
          </div>
          <div class="service-card-footer">
            <span>${(service.styles?.length || 0)} styles</span>
            <span>View <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </article>
      </a>
    `
      )
      .join('');

    observeRevealElements(grid.querySelectorAll('.reveal'));
  }, 400);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderServiceDetail() {
  const serviceId = getQueryParam('id');
  const service = findServiceById(serviceId);

  if (!service) {
    window.location.replace('glam-room.html#services');
    return;
  }

  document.title = `${service.name} | Glam Room — Asantewaa`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${service.name} at Glam Room — ${service.description}`;
  }

  const iconEl = document.getElementById('service-icon');
  if (iconEl) iconEl.innerHTML = `<i class="${service.icon}"></i>`;

  const titleEl = document.getElementById('service-title');
  if (titleEl) titleEl.textContent = service.name;

  const descEl = document.getElementById('service-desc');
  if (descEl) descEl.textContent = service.description;

  const metaEl = document.getElementById('service-meta');
  if (metaEl) {
    metaEl.innerHTML = `
      <span><i class="fa-solid fa-tag"></i> ${getServicePriceRange(service)}</span>
      <span><i class="fa-regular fa-clock"></i> ${service.duration}</span>
      <span><i class="fa-solid fa-scissors"></i> ${service.styles?.length || 0} styles</span>
    `;
  }

  const introEl = document.getElementById('service-styles-intro');
  if (introEl) {
    introEl.textContent = `Pick a specific ${service.name.toLowerCase()} style below, then book your slot.`;
  }

  const grid = document.getElementById('service-styles-grid');
  if (!grid || !service.styles?.length) return;

  grid.innerHTML = service.styles
    .map((style, i) => {
      const bookUrl = `book.html?service=${encodeURIComponent(service.id)}&style=${encodeURIComponent(style.id)}`;
      const mediaStyle = style.imageUrl
        ? `background-image: url('${style.imageUrl}');`
        : '';
      const mediaClass = style.imageUrl ? '' : ' style-card-media--placeholder';
      const mediaInner = style.imageUrl ? '' : '<i class="fa-solid fa-scissors"></i>';

      return `
        <article class="glass-card style-card reveal reveal-delay-${(i % 4) + 1}">
          <div class="style-card-media${mediaClass}" style="${mediaStyle}">${mediaInner}</div>
          <div class="style-card-body">
            <h3 class="style-card-name">${style.name}</h3>
            <p class="style-card-desc">${style.description}</p>
            <div class="style-card-meta">
              <span class="style-card-price">${style.price}</span>
              <span class="style-card-duration"><i class="fa-regular fa-clock"></i> ${style.duration}</span>
            </div>
            <a href="${bookUrl}" class="btn btn-primary style-card-book">Book this style <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>
      `;
    })
    .join('');

  observeRevealElements(grid.querySelectorAll('.reveal'));

  const noticeEl = document.querySelector('.services-extension-notice');
  const extensionNotice = SITE.business?.extensionNotice;
  if (noticeEl) {
    if (service.id === 'braiding-workmanship' && extensionNotice) {
      noticeEl.hidden = false;
      noticeEl.innerHTML = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>${extensionNotice}</span>`;
    } else {
      noticeEl.hidden = true;
      noticeEl.innerHTML = '';
    }
  }
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = SITE.gallery
    .map(
      (item, i) => `
    <div class="gallery-item reveal visible reveal-delay-${(i % 4) + 1}" data-gallery-id="${item.id}">
      <div class="gallery-item-inner" style="${
        item.imageUrl
          ? `background-image: url('${item.imageUrl}'); background-size: cover; background-position: center top;`
          : `background: ${item.gradient}`
      }">
        ${item.imageUrl ? '' : '<i class="fa-solid fa-camera gallery-placeholder-icon"></i>'}
      </div>
      <div class="gallery-overlay">
        <span>${item.label}${item.imageUrl ? '' : '<br><small>Coming Soon</small>'}</span>
      </div>
    </div>
  `
    )
    .join('');

  observeRevealElements(grid.querySelectorAll('.reveal'));
}

function renderAbout() {
  const statsEl = document.getElementById('about-stats');
  if (statsEl) {
    statsEl.innerHTML = SITE.about.stats
      .map(
        (stat) => `
      <div class="glass-card stat-item">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `
      )
      .join('');
  }

  const aboutParagraphs = document.getElementById('about-paragraphs');
  if (aboutParagraphs) {
    aboutParagraphs.innerHTML = SITE.about.paragraphs
      .map((p) => `<p>${p}</p>`)
      .join('');
  }

  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  if (quoteText) quoteText.textContent = SITE.quote.text;
  if (quoteAuthor) quoteAuthor.textContent = SITE.quote.attribution;
}

function initEnterpriseAccordion(container) {
  if (!container) return;

  const items = container.querySelectorAll('.ent-accordion-item');
  items.forEach((item) => {
    const trigger = item.querySelector('.ent-accordion-trigger');
    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.ent-accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initEnterprisePortalScroll(container) {
  if (!container) return;

  container.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initEnterpriseGatewayScroll() {
  const link = document.getElementById('enterprise-gateway-scroll');
  if (!link) return;

  link.addEventListener('click', (event) => {
    const target = document.getElementById('enterprise-portal');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function renderEnterprise() {
  const data = SITE.enterprise;
  if (!data) return;

  document.title = 'The Enterprise | Asantewaa';

  const gateway = data.gateway;
  if (gateway) {
    const gatewayImage = document.getElementById('enterprise-gateway-image');
    if (gatewayImage) {
      gatewayImage.src = gateway.imageUrl || SITE.hero?.photoUrl || '';
      gatewayImage.alt = gateway.imageAlt || 'Asantewaa';
      if (gateway.imagePosition) {
        gatewayImage.style.objectPosition = gateway.imagePosition;
      }
    }

    const titleEl = document.getElementById('enterprise-gateway-title');
    if (titleEl && gateway.title) titleEl.textContent = gateway.title;

    const headlineEl = document.getElementById('enterprise-gateway-headline');
    if (headlineEl && gateway.headline) {
      headlineEl.innerHTML = `
        <span class="ent-gateway__headline-rule" aria-hidden="true"></span>
        <span class="ent-gateway__headline-text">${gateway.headline}</span>
        <span class="ent-gateway__headline-rule" aria-hidden="true"></span>
      `;
    }

    const metaEl = document.getElementById('enterprise-gateway-meta');
    if (metaEl && gateway.meta) metaEl.textContent = gateway.meta;

    const scrollText = document.getElementById('enterprise-gateway-scroll-text');
    if (scrollText && gateway.scrollHint) scrollText.textContent = gateway.scrollHint;

    initEnterpriseGatewayScroll();
  }

  const portalsEl = document.getElementById('enterprise-portals');
  if (portalsEl && data.portals) {
    portalsEl.innerHTML = data.portals
      .map(
        (panel) => `
      <a href="${panel.href}" class="ent-portal__panel ent-portal__panel--${panel.theme || panel.id}">
        <div class="ent-portal__media" aria-hidden="true">
          <img src="${panel.imageUrl || ''}" alt="" loading="lazy" decoding="async"${panel.imagePosition ? ` style="object-position: ${panel.imagePosition}"` : ''}>
        </div>
        <div class="ent-portal__shade" aria-hidden="true"></div>
        <div class="ent-portal__content">
          <h2 class="ent-portal__title">${panel.title}</h2>
          <p class="ent-portal__tagline">${panel.tagline}</p>
          ${panel.subline ? `<p class="ent-portal__subline">${panel.subline}</p>` : '<p class="ent-portal__subline" aria-hidden="true">&nbsp;</p>'}
          <span class="ent-portal__cta">${panel.cta}</span>
        </div>
      </a>
    `
      )
      .join('');
    initEnterprisePortalScroll(portalsEl);
  }

  const portalFooter = document.getElementById('enterprise-portal-footer');
  if (portalFooter && data.footer) portalFooter.textContent = data.footer;

  const statement = data.statement;
  const statementImage = document.getElementById('enterprise-statement-image');
  if (statementImage && statement) {
    statementImage.src = statement.imageUrl || SITE.hero?.photoUrl || '';
    statementImage.alt = statement.imageAlt || 'Asantewaa';
    if (statement.imagePosition) {
      statementImage.style.objectPosition = statement.imagePosition;
    }
  }

  const headlinesEl = document.getElementById('enterprise-headlines');
  if (headlinesEl && statement?.displayLines) {
    headlinesEl.innerHTML = statement.displayLines
      .map((line) => `<span class="ent-display-line">${line}</span>`)
      .join('');
  }

  const statementsEl = document.getElementById('enterprise-statements');
  if (statementsEl && statement?.statements) {
    statementsEl.innerHTML = statement.statements
      .map((line) => `<p class="ent-bold-line">${line}</p>`)
      .join('');
  }

  const bodyEl = document.getElementById('enterprise-body');
  if (bodyEl && statement?.body) {
    bodyEl.innerHTML = statement.body
      .map((block, index) => {
        const lines = block
          .map((line) => `<p class="ent-body-line">${line}</p>`)
          .join('');
        const gap = index < statement.body.length - 1 ? '<div class="ent-body-gap" aria-hidden="true"></div>' : '';
        return lines + gap;
      })
      .join('');
  }

  const metricsEl = document.getElementById('enterprise-metrics');
  if (metricsEl && data.metrics) {
    metricsEl.innerHTML = data.metrics
      .map((metric, index) => {
        if (metric.variant === 'strip') {
          return `
        <div class="ent-metric-strip">
          <span>${metric.text}</span>
        </div>
      `;
        }
        const wideClass = index >= 4 ? ' ent-metric--wide' : '';
        return `
      <div class="ent-metric${wideClass}">
        <p class="ent-metric-value">${metric.value}</p>
        <p class="ent-metric-label">${metric.label}</p>
        ${metric.sublabel ? `<p class="ent-metric-sub">${metric.sublabel}</p>` : ''}
        ${metric.benchmark ? `<p class="ent-metric-faint">${metric.benchmark}</p>` : ''}
      </div>
    `;
      })
      .join('');
  }

  const brandsEl = document.getElementById('enterprise-brands');
  if (brandsEl && data.brandPartners?.items) {
    brandsEl.innerHTML = data.brandPartners.items
      .map(
        (brand) => `
      <span class="ent-brand">${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="${brand.name}">` : brand.name}</span>
    `
      )
      .join('');
  }

  const pillarsEl = document.getElementById('enterprise-pillars');
  if (pillarsEl && data.campaignPillars?.items) {
    pillarsEl.innerHTML = data.campaignPillars.items
      .map(
        (pillar) => `
      <div class="ent-accordion-item">
        <button
          type="button"
          class="ent-accordion-trigger"
          aria-expanded="false"
          aria-controls="pillar-panel-${pillar.id}"
          id="pillar-trigger-${pillar.id}"
        >
          <span class="ent-accordion-title">${pillar.number} / ${pillar.title}</span>
          <span class="ent-accordion-icon" aria-hidden="true">+</span>
        </button>
        <div
          class="ent-accordion-panel"
          id="pillar-panel-${pillar.id}"
          role="region"
          aria-labelledby="pillar-trigger-${pillar.id}"
        >
          <div class="ent-accordion-panel-inner">
            <div class="ent-accordion-body">
              ${(Array.isArray(pillar.body) ? pillar.body : [pillar.body])
                .map((line) => `<p class="ent-accordion-body-line">${line}</p>`)
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join('');
    initEnterpriseAccordion(pillarsEl);
  }

  const footerMid = document.getElementById('enterprise-footer-mid');
  if (footerMid && data.footer) footerMid.textContent = data.footer;

  const footerEnd = document.getElementById('enterprise-footer-end');
  if (footerEnd && data.footer) footerEnd.textContent = data.footer;

  renderHomeContact();
}

function renderGlamRoom() {
  const data = SITE.glamRoom;
  if (!data) return;

  document.title = 'The Glam Room | Asantewaa';

  const decl = data.declaration;
  const titleEl = document.getElementById('gr-declaration-title');
  if (titleEl && decl?.title) titleEl.textContent = decl.title;
  const bylineEl = document.getElementById('gr-declaration-byline');
  if (bylineEl && decl?.byline) bylineEl.textContent = decl.byline;
  const taglineEl = document.getElementById('gr-declaration-tagline');
  if (taglineEl && decl?.tagline) taglineEl.textContent = decl.tagline;

  const sanctuariesEl = document.getElementById('gr-sanctuaries');
  if (sanctuariesEl) {
    sanctuariesEl.innerHTML = SITE.locations
      .map(
        (loc) => `
      <button type="button" class="gr-sanctuary" data-location-id="${loc.id}">
        <div class="gr-sanctuary__media" aria-hidden="true">
          <img src="${loc.imageUrl || SITE.hero.photoUrl}" alt="" loading="lazy" decoding="async"${loc.imagePosition ? ` style="object-position: ${loc.imagePosition}"` : ''}>
        </div>
        <div class="gr-sanctuary__shade" aria-hidden="true"></div>
        <div class="gr-sanctuary__content">
          <p class="gr-sanctuary__brand">${loc.name?.toUpperCase() || 'GLAM ROOM'}</p>
          <p class="gr-sanctuary__area">${loc.area || loc.city || 'ACCRA'}</p>
          <span class="gr-sanctuary__cta">RESERVE YOUR CHAIR</span>
        </div>
      </button>
    `
      )
      .join('');
  }

  const servicesEl = document.getElementById('gr-services-list');
  if (servicesEl && data.signatureServices) {
    servicesEl.innerHTML = data.signatureServices
      .map(
        (item) => `
      <a href="service.html?id=${item.serviceId}" class="gr-service-row">
        <span class="gr-service-row__num">${item.number}</span>
        <div class="gr-service-row__main">
          <p class="gr-service-row__title">${item.title}</p>
        </div>
        <p class="gr-service-row__desc">${item.descriptor}</p>
      </a>
    `
      )
      .join('');
  }

  const footerMid = document.getElementById('gr-footer-mid');
  if (footerMid) footerMid.textContent = data.footer || SITE.globalFooter;
  const footerEnd = document.getElementById('gr-footer-end');
  if (footerEnd) footerEnd.textContent = data.footer || SITE.globalFooter;

  populateOverlayServices();
  populateOverlayTimeSlots();
  initGlamBookingOverlay();
  bindSanctuaryBookingButtons();
}

function renderProposals() {
  const data = SITE.proposals;
  if (!data) return;

  document.title = 'Bookings & Proposals | Asantewaa';

  const titleEl = document.getElementById('prop-hero-title');
  if (titleEl && data.hero?.title) titleEl.textContent = data.hero.title;
  const sublineEl = document.getElementById('prop-hero-subline');
  if (sublineEl && data.hero?.subline) sublineEl.textContent = data.hero.subline;

  const pillarSelect = document.getElementById('prop-pillar');
  if (pillarSelect && data.form?.pillars) {
    pillarSelect.innerHTML = data.form.pillars
      .map((p) => `<option value="${p}">${p}</option>`)
      .join('');
  }

  const budgetSelect = document.getElementById('prop-budget');
  if (budgetSelect && data.form?.budgetTiers) {
    budgetSelect.innerHTML =
      '<option value="">— Select tier —</option>' +
      data.form.budgetTiers.map((t) => `<option value="${t}">${t}</option>`).join('');
  }

  const submitBtn = document.getElementById('prop-submit');
  if (submitBtn && data.form?.submitLabel) submitBtn.textContent = data.form.submitLabel;

  const complianceEl = document.getElementById('prop-compliance');
  if (complianceEl && data.compliance) {
    complianceEl.innerHTML = data.compliance
      .map(
        (item) => `
      <div class="prop-compliance__item">
        <p class="prop-compliance__title">${item.title}</p>
        <p class="prop-compliance__body">${item.body}</p>
      </div>
    `
      )
      .join('');
  }

  const contactEl = document.getElementById('prop-contact');
  const contact = data.contact;
  if (contactEl && contact) {
    const waNum = contact.whatsapp?.replace(/[^0-9+]/g, '') || '';
    contactEl.innerHTML = `
      <p class="prop-contact__intro">${contact.intro || ''}</p>
      <div class="prop-contact__row">
        <span class="prop-contact__label">${contact.whatsappLabel || 'WhatsApp Management'}</span>
        <a class="prop-contact__value" href="https://wa.me/${waNum.replace('+', '')}" target="_blank" rel="noopener noreferrer">${contact.whatsapp || ''}</a>
      </div>
      <div class="prop-contact__row">
        <span class="prop-contact__label">${contact.emailLabel || 'Corporate Inbox'}</span>
        <a class="prop-contact__value" href="mailto:${contact.email || ''}">${contact.email || ''}</a>
      </div>
      <p class="prop-contact__locations">${contact.locations || ''}</p>
    `;
  }

  const footerEl = document.getElementById('prop-footer');
  if (footerEl) footerEl.textContent = data.footer || SITE.globalFooter;

  initProposalsForm();
}

function renderBusiness() {
  const taglineEl = document.getElementById('business-tagline');
  if (taglineEl) taglineEl.textContent = SITE.business.tagline;

  const introEl = document.getElementById('business-intro');
  if (introEl) {
    introEl.innerHTML = SITE.business.intro
      .map((p) => `<p>${p}</p>`)
      .join('');
  }

  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  if (quoteText) quoteText.textContent = SITE.quote.text;
  if (quoteAuthor) quoteAuthor.textContent = SITE.quote.attribution;

  const hoursEl = document.getElementById('business-hours');
  if (hoursEl) {
    hoursEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${SITE.business.hours}`;
  }
}

function renderHomeContact() {
  const socialsEl = document.getElementById('contact-socials');
  if (socialsEl) {
    socialsEl.innerHTML = SITE.socials
      .map(
        (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
      )
      .join('');
  }

  const footerSocials = document.getElementById('footer-socials');
  if (footerSocials) {
    footerSocials.innerHTML = SITE.socials
      .map(
        (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
      )
      .join('');
  }
}

function renderLocations(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !SITE.locations?.length) return;

  el.innerHTML = SITE.locations
    .map((loc) => {
      const address = loc.address?.trim();
      const title = getLocationLabel(loc);
      const showBrandLine = address && loc.name && address !== loc.name;

      return `
    <div class="glass-card location-card">
      <h3 class="location-card-name"><i class="fa-solid fa-location-dot"></i> ${title}</h3>
      ${showBrandLine ? `<p class="location-card-brand">${loc.name}</p>` : ''}
      ${address ? '' : `<p class="location-card-address">Open Google Maps for the full address.</p>`}
      <p class="location-card-meta">${loc.city}, ${loc.country}</p>
      ${loc.hours ? `<p class="location-card-hours"><i class="fa-regular fa-clock"></i> ${loc.hours}</p>` : ''}
      <a href="${loc.mapUrl}" class="location-card-map" target="_blank" rel="noopener noreferrer">
        View on Google Maps <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `;
    })
    .join('');
}

function renderContact() {
  renderLocations('contact-locations');

  const socialsEl = document.getElementById('contact-socials');
  if (socialsEl) {
    socialsEl.innerHTML = SITE.socials
      .map(
        (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
      )
      .join('');
  }

  const footerSocials = document.getElementById('footer-socials');
  if (footerSocials) {
    footerSocials.innerHTML = SITE.socials
      .map(
        (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
      )
      .join('');
  }
}

function populateStaticContent() {
  const page = document.body.dataset.page || 'home';
  const titles = {
    home: SITE.owner,
    enterprise: 'The Enterprise | Asantewaa',
    'glam-room': 'The Glam Room | Asantewaa',
    proposals: 'Bookings & Proposals | Asantewaa',
    about: `About ${SITE.owner} | Glam Room`,
    business: `Glam Room | Hair Salon Accra — ${SITE.owner}`,
    booking: `Book Your Glam | ${SITE.brand}`,
  };
  document.title = titles[page] || titles.home;

  const brandEls = document.querySelectorAll('[data-brand]');
  brandEls.forEach((el) => {
    el.innerHTML = `Glam Room <span>by Asantewaa</span>`;
  });

  const taglineEl = document.getElementById('hero-tagline');
  if (taglineEl) taglineEl.textContent = SITE.tagline;

  const footerCopy = document.getElementById('footer-copyright');
  if (footerCopy) footerCopy.textContent = SITE.footer.copyright;

  const footerTag = document.getElementById('footer-tagline');
  if (footerTag) footerTag.textContent = SITE.footer.tagline;

  const heroImg = document.getElementById('hero-photo');
  if (heroImg && SITE.hero.photoUrl) {
    heroImg.src = SITE.hero.photoUrl;
    heroImg.alt = SITE.hero.photoAlt;
    heroImg.style.display = 'block';
    document.getElementById('hero-placeholder')?.remove();
  }

  const extensionNotice = SITE.business?.extensionNotice;
  if (extensionNotice) {
    document.querySelectorAll('.services-extension-notice').forEach((el) => {
      if (document.body.dataset.page === 'service') return;
      el.innerHTML = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>${extensionNotice}</span>`;
    });
  }
}

function getNavLinks() {
  const page = document.body.dataset.page || 'home';
  if (page === 'business') return SITE.businessNavLinks;
  if (page === 'service') return SITE.serviceNavLinks;
  if (page === 'enterprise' || page === 'about') return SITE.aboutNavLinks;
  if (page === 'proposals' || page === 'booking') return SITE.bookingNavLinks;
  if (page === 'glam-room') return SITE.home.menuLinks;
  return SITE.homeNavLinks;
}

/* --- Wireframe Homepage (PAGE 01) --- */

function initWireframeHomeScroll() {
  const link = document.getElementById('home-gateway-scroll');
  if (!link) return;

  link.addEventListener('click', (event) => {
    const target = document.getElementById('home-portal');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function renderWireframeHome() {
  const container = document.getElementById('home-main');
  const home = SITE.home;
  if (!container || !home) return;

  const gateway = home.gateway || {};
  const imageStyle = gateway.imagePosition ? ` style="object-position: ${gateway.imagePosition}"` : '';
  const title = gateway.title || SITE.owner.toUpperCase();

  const portalHtml = (home.portals || [])
    .map(
      (panel) => `
    <a href="${panel.href}" class="wf-portal__panel wf-portal__panel--${panel.theme || panel.id}" id="${panel.id === 'enterprise' ? 'home-portal-enterprise' : ''}">
      <div class="wf-portal__media" aria-hidden="true">
        <img src="${panel.imageUrl || ''}" alt="" loading="lazy" decoding="async"${panel.imagePosition ? ` style="object-position: ${panel.imagePosition}"` : ''}>
      </div>
      <div class="wf-portal__shade" aria-hidden="true"></div>
      <div class="wf-portal__content">
        <h2 class="wf-portal__title">${panel.title}</h2>
        <p class="wf-portal__tagline">${panel.tagline}</p>
        ${panel.subline ? `<p class="wf-portal__subline">${panel.subline}</p>` : '<p class="wf-portal__subline" aria-hidden="true">&nbsp;</p>'}
        <span class="wf-portal__cta">${panel.cta}</span>
      </div>
    </a>
  `
    )
    .join('');

  container.innerHTML = `
    <section class="wf-gateway" id="hero">
      <div class="wf-gateway__media">
        <img id="home-gateway-image" src="${gateway.imageUrl || SITE.hero?.photoUrl || ''}" alt="${gateway.imageAlt || SITE.owner}" decoding="async"${imageStyle}>
      </div>
      <div class="wf-gateway__overlay" aria-hidden="true"></div>
      <div class="wf-gateway__content">
        <h1 class="wf-gateway__title">${title}</h1>
        <p class="wf-gateway__headline">
          <span class="wf-gateway__headline-rule" aria-hidden="true"></span>
          <span class="wf-gateway__headline-text">${gateway.headline || ''}</span>
          <span class="wf-gateway__headline-rule" aria-hidden="true"></span>
        </p>
        <p class="wf-gateway__meta">${gateway.meta || ''}</p>
      </div>
      <a href="#home-portal" class="wf-gateway__scroll" id="home-gateway-scroll">
        <span>${gateway.scrollHint || 'SCROLL TO ENTER'}</span>
        <span class="wf-gateway__scroll-icon" aria-hidden="true">↓</span>
      </a>
    </section>
    <section class="wf-portal" id="home-portal" aria-label="Choose your path">
      ${portalHtml}
    </section>
    <p class="wf-footer">${home.footer || SITE.globalFooter || ''}</p>
  `;

  initWireframeHomeScroll();
}

/* --- Editorial Homepage (beyonce.com style) --- */

function renderFindBookingPanel(panel, i, bgStyle, panelClass) {
  const copy = SITE.findBooking || {};
  const labelHtml = panel.label ? `<p class="home-panel-label">${panel.label}</p>` : '';

  return `
    <section class="${panelClass} home-panel--find-booking" id="${panel.id}">
      <div class="home-panel-bg" style="${bgStyle}"></div>
      <div class="home-panel-overlay"></div>
      <div class="home-panel-content home-panel-content--form">
        ${labelHtml}
        <h2 class="home-panel-title">${panel.title}</h2>
        ${panel.subtitle ? `<p class="home-panel-subtitle">${panel.subtitle}</p>` : ''}
        <form id="findBookingForm" class="find-booking-form" autocomplete="off">
          <label class="find-booking-field">
            <span>WhatsApp / phone number</span>
            <input type="tel" id="findPhone" required placeholder="${copy.phonePlaceholder || '+233 XX XXX XXXX'}">
          </label>
          <label class="find-booking-field">
            <span>Last 4 letters of your name</span>
            <input type="text" id="findNameSuffix" required maxlength="4" minlength="4"
              placeholder="${copy.namePlaceholder || 'e.g. nsah'}" autocapitalize="characters" spellcheck="false">
          </label>
          <button type="submit" class="find-booking-submit">${copy.submitLabel || 'Check Status'}</button>
        </form>
        <div id="findBookingResult" class="find-booking-result" hidden></div>
      </div>
    </section>
  `;
}

function renderHomePanels() {
  const container = document.getElementById('home-panels');
  if (!container || !SITE.home?.panels) return;

  container.innerHTML = SITE.home.panels
    .map((panel, i) => {
      const imageUrl = panel.imageUrl || (i === 0 ? SITE.hero.photoUrl : '');
      const imagePosition = panel.imagePosition || 'center top';
      const overlay = panel.imageOnly
        ? 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)'
        : panel.gradient || 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)';

      const bgStyle = imageUrl
        ? `background-image: ${overlay}, url('${imageUrl}'); background-position: ${imagePosition};`
        : `background: ${panel.gradient || '#1a0f0a'};`;

      const isVisual = panel.imageOnly;
      const panelClass = `home-panel${i === 0 ? ' in-view' : ''}${isVisual ? ' home-panel--visual' : ''}`;

      if (panel.type === 'find-booking') {
        return renderFindBookingPanel(panel, i, bgStyle, panelClass);
      }

      const linkOverlay = panel.link
        ? `<a href="${panel.link}" class="home-panel-link" aria-label="${panel.linkText || panel.labelLeft || panel.title || 'View'}"></a>`
        : '';

      if (isVisual) {
        return `
        <section class="${panelClass}" id="${panel.id}">
          <div class="home-panel-bg" style="${bgStyle}" role="img" aria-label="${panel.labelLeft || ''} ${panel.labelRight || ''}"></div>
          ${linkOverlay}
          <div class="home-panel-visual-labels">
            <span>${panel.labelLeft || ''}</span>
            <span>${panel.labelRight || ''}</span>
          </div>
        </section>
      `;
      }

      const titleClass = i === 0 ? 'home-panel-title hero-name' : 'home-panel-title';
      const labelHtml = panel.label ? `<p class="home-panel-label">${panel.label}</p>` : '';
      const headingTag = i === 0 ? 'h1' : 'h2';
      const ctaHtml = panel.link
        ? `<a href="${panel.link}" class="home-panel-cta">${panel.linkText || 'Explore'}</a>`
        : '';

      return `
        <section class="${panelClass}" id="${panel.id}">
          <div class="home-panel-bg" style="${bgStyle}"></div>
          <div class="home-panel-overlay"></div>
          ${linkOverlay}
          <div class="home-panel-content">
            ${labelHtml}
            <${headingTag} class="${titleClass}">${panel.title}</${headingTag}>
            ${panel.subtitle ? `<p class="home-panel-subtitle">${panel.subtitle}</p>` : ''}
            ${ctaHtml}
          </div>
        </section>
      `;
    })
    .join('');
}

function initEditorialMenu() {
  const openBtn = document.getElementById('home-menu-open');
  const closeBtn = document.getElementById('home-menu-close');
  const panel = document.getElementById('home-menu-panel');
  const overlay = document.getElementById('home-menu-overlay');

  const menuLinks = document.getElementById('home-menu-links');
  if (menuLinks) {
    menuLinks.innerHTML = SITE.home.menuLinks
      .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
      .join('');
  }

  const menuSocials = document.getElementById('home-menu-socials');
  if (menuSocials) {
    menuSocials.innerHTML = SITE.socials
      .map(
        (s) =>
          `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}"><i class="${s.icon}"></i></a>`
      )
      .join('');
  }

  const topbarLeft = document.getElementById('home-topbar-left');
  if (topbarLeft) {
    topbarLeft.textContent = SITE.home.topbarLeft;
    topbarLeft.href = SITE.home.topbarLeftLink;
  }

  const copyright = document.getElementById('home-copyright');
  if (copyright) copyright.textContent = `${SITE.owner} © ${new Date().getFullYear()}`;

  const menuFooter = document.getElementById('home-menu-footer');
  if (menuFooter) menuFooter.textContent = SITE.footer.tagline;

  function setMenu(open) {
    panel?.classList.toggle('open', open);
    overlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  openBtn?.addEventListener('click', () => setMenu(true));
  closeBtn?.addEventListener('click', () => setMenu(false));
  overlay?.addEventListener('click', () => setMenu(false));

  panel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        })
    )
  );
}

async function initHomeIntroLoader(onComplete) {
  const config = SITE.home?.introLoader;
  const images = config?.images?.filter(Boolean);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!images?.length || reducedMotion) {
    document.body.classList.add('home-intro-done');
    onComplete();
    return;
  }

  document.body.classList.add('home-intro-active');

  const loader = document.createElement('div');
  loader.className = 'home-intro-loader';
  loader.setAttribute('role', 'presentation');
  loader.innerHTML = `
    <div class="home-intro-loader__bg"></div>
    <div class="home-intro-loader__slides"></div>
    <div class="home-intro-loader__stars" aria-hidden="true">
      <span class="home-intro-star home-intro-star--tl"><i class="fa-solid fa-star"></i></span>
      <span class="home-intro-star home-intro-star--tr"><i class="fa-solid fa-star"></i></span>
      <span class="home-intro-star home-intro-star--center"><i class="fa-solid fa-star"></i></span>
      <span class="home-intro-star home-intro-star--bl"><i class="fa-solid fa-star"></i></span>
      <span class="home-intro-star home-intro-star--br"><i class="fa-solid fa-star"></i></span>
    </div>
  `;

  const slidesEl = loader.querySelector('.home-intro-loader__slides');
  const slides = images.map((src) => {
    const slide = document.createElement('div');
    slide.className = 'home-intro-slide';
    slide.innerHTML = `<img src="${src}" alt="" decoding="async">`;
    slidesEl.appendChild(slide);
    return slide;
  });

  const title = (config.title || SITE.owner || 'Asantewaa').toUpperCase();
  const subtitle = (config.subtitle || '').toUpperCase();
  const letterStaggerMs = config.letterStaggerMs ?? 28;
  const titleHoldMs = config.titleHoldMs ?? 280;
  const titleLetters = [...title].map((ch, i) => {
    const safe = ch === ' ' ? '\u00a0' : escapeHtml(ch);
    return `<span class="home-intro-letter" style="--i:${i}">${safe}</span>`;
  }).join('');

  const titleEl = document.createElement('div');
  titleEl.className = 'home-intro-loader__title';
  titleEl.style.setProperty('--letter-stagger', `${letterStaggerMs}ms`);
  titleEl.setAttribute('aria-hidden', 'true');
  titleEl.innerHTML = `
    <div class="home-intro-title-line">${titleLetters}</div>
    ${subtitle ? `<p class="home-intro-subtitle" style="--i:${title.length + 1}">${escapeHtml(subtitle)}</p>` : ''}
  `;
  loader.appendChild(titleEl);

  document.body.appendChild(loader);
  await preloadImages(images);
  await new Promise((resolve) => requestAnimationFrame(resolve));

  const slideMs = config.slideMs ?? 480;
  const starMs = config.starMs ?? 650;
  const exitMs = config.exitMs ?? 750;

  slides[0]?.classList.add('is-active');
  for (let i = 1; i < slides.length; i += 1) {
    await sleep(slideMs);
    slides[i - 1]?.classList.remove('is-active');
    slides[i]?.classList.add('is-active');
  }

  await sleep(slideMs);
  loader.classList.add('show-stars', 'show-title');
  const titleRevealMs = title.length * letterStaggerMs + 220;
  await sleep(Math.max(starMs, titleRevealMs + titleHoldMs));

  loader.classList.add('is-exiting');
  document.body.classList.remove('home-intro-active');
  document.body.classList.add('home-intro-done');
  await sleep(exitMs);
  loader.remove();
  onComplete();
}

function isHomeHorizontalScroll() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

function initHomeScrollEffects() {
  const scrollEl = document.getElementById('home-scroll');
  const hint = document.getElementById('home-scroll-hint');
  const panels = document.querySelectorAll('.home-panel');
  const dotsContainer = document.getElementById('home-scroll-dots');

  if (dotsContainer && panels.length) {
    dotsContainer.innerHTML = Array.from(panels, (_, i) =>
      `<span class="home-scroll-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`
    ).join('');
  }

  const dots = dotsContainer?.querySelectorAll('.home-scroll-dot');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateActivePanel() {
    const horizontal = isHomeHorizontalScroll();
    let activeIndex = 0;

    panels.forEach((panel, i) => {
      const rect = panel.getBoundingClientRect();
      const inView = horizontal
        ? rect.left < window.innerWidth * 0.55 && rect.right > window.innerWidth * 0.45
        : rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45;

      panel.classList.toggle('in-view', inView);
      if (inView) activeIndex = i;

      const bg = panel.querySelector('.home-panel-bg');
      if (bg && !reducedMotion.matches) {
        if (horizontal) {
          const center = rect.left + rect.width / 2;
          const viewportCenter = window.innerWidth / 2;
          const offset = ((center - viewportCenter) / window.innerWidth) * 36;
          bg.style.setProperty('--parallax-x', `${offset.toFixed(1)}px`);
          bg.style.setProperty('--parallax-y', '0px');
        } else {
          const center = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const offset = ((center - viewportCenter) / window.innerHeight) * 36;
          bg.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
          bg.style.setProperty('--parallax-x', '0px');
        }
      }
    });

    dots?.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  }

  if (!scrollEl) return;

  scrollEl.addEventListener('scroll', () => {
    const horizontal = isHomeHorizontalScroll();
    const scrolled = horizontal ? scrollEl.scrollLeft : scrollEl.scrollTop;
    if (scrolled > 80) hint?.classList.add('hidden');
    updateActivePanel();
  }, { passive: true });

  scrollEl.addEventListener('wheel', (e) => {
    if (!isHomeHorizontalScroll() || e.ctrlKey) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    scrollEl.scrollLeft += e.deltaY;
  }, { passive: false });

  dots?.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      const panel = panels[index];
      if (!panel) return;
      panel.scrollIntoView({
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: isHomeHorizontalScroll() ? 'start' : 'nearest',
      });
    });
  });

  window.addEventListener('resize', updateActivePanel, { passive: true });
  updateActivePanel();
}

/* --- Testimonial Carousel --- */

class TestimonialCarousel {
  constructor() {
    this.track = document.getElementById('testimonial-track');
    this.dotsContainer = document.getElementById('carousel-dots');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.current = 0;
    this.total = SITE.testimonials.length;
    this.autoInterval = null;
    this.touchStartX = 0;

    if (!this.track) return;
    this.init();
  }

  init() {
    this.renderSlides();
    this.renderDots();
    this.bindEvents();
    this.startAuto();
  }

  renderSlides() {
    this.track.innerHTML = SITE.testimonials
      .map(
        (t) => `
      <div class="testimonial-slide">
        <div class="glass-card testimonial-card">
          <div class="testimonial-stars">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <p class="testimonial-text">"${t.text}"</p>
          <p class="testimonial-author">${t.author}</p>
          <p class="testimonial-role">${t.role}</p>
        </div>
      </div>
    `
      )
      .join('');
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = SITE.testimonials
      .map(
        (_, i) =>
          `<button class="carousel-dot${i === 0 ? ' active' : ''}" aria-label="Go to testimonial ${i + 1}" data-index="${i}"></button>`
      )
      .join('');
  }

  goTo(index) {
    this.current = ((index % this.total) + this.total) % this.total;
    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    this.dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === this.current);
    });
  }

  next() {
    this.goTo(this.current + 1);
  }

  prev() {
    this.goTo(this.current - 1);
  }

  startAuto() {
    this.stopAuto();
    this.autoInterval = setInterval(() => this.next(), 5000);
  }

  stopAuto() {
    if (this.autoInterval) clearInterval(this.autoInterval);
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => {
      this.prev();
      this.startAuto();
    });

    this.nextBtn?.addEventListener('click', () => {
      this.next();
      this.startAuto();
    });

    this.dotsContainer?.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) {
        this.goTo(parseInt(dot.dataset.index, 10));
        this.startAuto();
      }
    });

    const wrapper = document.querySelector('.testimonial-carousel');
    wrapper?.addEventListener('mouseenter', () => this.stopAuto());
    wrapper?.addEventListener('mouseleave', () => this.startAuto());

    wrapper?.addEventListener(
      'touchstart',
      (e) => {
        this.touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    wrapper?.addEventListener(
      'touchend',
      (e) => {
        const diff = this.touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? this.next() : this.prev();
          this.startAuto();
        }
      },
      { passive: true }
    );
  }
}

/* --- Typewriter Effect --- */

function initTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const phrases = SITE.hero.typewriterPhrases;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* --- Parallax --- */

function initParallax() {
  const layer = document.getElementById('hero-parallax');
  if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    const scrollY = window.scrollY * 0.15;
    layer.style.transform = `translate3d(${currentX}px, ${currentY + scrollY}px, 0)`;
    requestAnimationFrame(animate);
  }

  animate();
}

/* --- Theme Toggle --- */

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('glamroom-theme');

  if (saved === 'dark') {
    html.classList.add('dark');
  }

  updateThemeIcon();

  toggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('glamroom-theme', html.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });

  function updateThemeIcon() {
    if (!toggle) return;
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = html.classList.contains('dark')
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';
    }
  }
}

/* --- Custom Cursor --- */

function initCustomCursor() {
  if (document.body.classList.contains('enterprise-page')) return;
  const isTouch =
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches;
  if (isTouch) {
    document.body.classList.add('no-custom-cursor');
    return;
  }

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.querySelectorAll('a, button, .gallery-item, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
    });
  });

  function animate() {
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animate);
  }

  animate();
}

/* --- Intersection Observer (Reveal) --- */

let revealObserver;

function observeRevealElements(elements) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
  }

  elements.forEach((el) => revealObserver.observe(el));
}

function initReveal() {
  observeRevealElements(document.querySelectorAll('.reveal'));
}

/* --- Navigation --- */

function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  });

  const floatBtn = document.getElementById('whatsapp-float');
  if (floatBtn) {
    window.addEventListener('scroll', () => {
      floatBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.3);
    });
  }

  function toggleMenu(open) {
    hamburger?.classList.toggle('active', open);
    mobileMenu?.classList.toggle('open', open);
    overlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', () => {
    toggleMenu(!mobileMenu?.classList.contains('open'));
  });

  overlay?.addEventListener('click', () => toggleMenu(false));

  document.querySelectorAll('.nav-link, .mobile-menu-links a, .footer-links a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href);
        toggleMenu(false);
      }
    });
  });

  const navLinks = getNavLinks();

  const navLinksContainer = document.getElementById('nav-links');
  if (navLinksContainer) {
    navLinksContainer.innerHTML = navLinks
      .map((link) => `<li><a href="${link.href}" class="nav-link">${link.label}</a></li>`)
      .join('');
  }

  const mobileLinks = document.getElementById('mobile-menu-links');
  if (mobileLinks) {
    mobileLinks.innerHTML = navLinks
      .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
      .join('');
  }

  const footerLinks = document.getElementById('footer-nav-links');
  if (footerLinks) {
    footerLinks.innerHTML = navLinks
      .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
      .join('');
  }
}

/* --- Button Handlers --- */

function initButtons() {
  const page = document.body.dataset.page || 'home';

  document.getElementById('btn-view-services')?.addEventListener('click', () => {
    scrollToSection('#services');
  });

  if (page === 'business') {
    document.getElementById('btn-contact-whatsapp')?.addEventListener('click', openWhatsApp);
  }

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* --- External Links --- */

function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/* --- Init --- */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'home';

  populateStaticContent();
  initEditorialMenu();
  initCustomCursor();

  if (page !== 'home') {
    renderContact();
    initReveal();
    initButtons();
  }

  initExternalLinks();

  if (page === 'home') {
    renderHomePanels();
    initFindBooking();
    initInstallPrompt();
    initHomeIntroLoader(() => {
      initHomeScrollEffects();
    });
  } else if (page === 'business') {
    renderServices();
    renderBusiness();
    renderGallery();
    new TestimonialCarousel();
    initParallax();
  } else if (page === 'service') {
    renderServiceDetail();
    initParallax();
  } else if (page === 'enterprise') {
    renderEnterprise();
  } else if (page === 'glam-room') {
    renderGlamRoom();
  } else if (page === 'proposals') {
    renderProposals();
  } else if (page === 'about') {
    renderAbout();
    initParallax();
  } else if (page === 'booking') {
    initBookingForm();
  }
});
