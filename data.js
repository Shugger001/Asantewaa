/**
 * Glam Room by Asantewaa — Site Configuration
 * Edit this file to update all content without touching HTML.
 */

/** Primary label: Maps formatted address, else area or business name from the pin */
export function getLocationLabel(loc) {
  const address = loc.address?.trim();
  if (address) return address;
  if (loc.area?.trim()) return `${loc.name?.trim() || "Glam Room"} — ${loc.area.trim()}`;
  return loc.name?.trim() || "Glam Room";
}

/** Stable unique value for booking forms (not duplicate "Glam Room" titles) */
export function getLocationBookingValue(loc) {
  return loc.bookingValue?.trim() || loc.id;
}

export function findLocationById(id) {
  return SITE.locations?.find((loc) => loc.id === id);
}

export function getLocationLabelById(id) {
  const loc = findLocationById(id);
  return loc ? getLocationLabel(loc) : id;
}

export function findServiceById(id) {
  return SITE.services?.find((service) => service.id === id);
}

export function findServiceStyle(serviceId, styleId) {
  const service = findServiceById(serviceId);
  return service?.styles?.find((style) => style.id === styleId);
}

/** Extract numeric GHS amount from a price string (e.g. "GH₵ 35", "From GH₵ 350/person") */
export function parsePriceAmount(priceStr) {
  if (!priceStr) return null;
  const match = String(priceStr).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

/** Price range label for a general service from its specific styles */
export function getServicePriceRange(service) {
  const amounts = (service?.styles || [])
    .map((style) => parsePriceAmount(style.price))
    .filter((amount) => amount != null);

  if (!amounts.length) {
    return service?.price || '';
  }

  const min = Math.min(...amounts);
  const max = Math.max(...amounts);

  if (min === max) {
    return `GH₵ ${min}`;
  }

  return `GH₵ ${min} – GH₵ ${max}`;
}

/** Flat list for booking dropdown — category + specific style */
export function getBookingStyleOptions() {
  return SITE.services.flatMap((service) =>
    (service.styles || []).map((style) => ({
      value: `${service.name} — ${style.name}`,
      label: style.name,
      category: service.name,
      price: style.price,
      serviceId: service.id,
      styleId: style.id,
    }))
  );
}

export const SITE = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  tagline: "Accra's baddest hair destination — where your crown gets the main character energy it deserves.",

  /** Wireframe document — 6 pages (PDF pages 2–7) */
  wireframePages: [
    { id: "01", label: "Home — Editorial Gateway", href: "index.html" },
    { id: "02", label: "The Enterprise — Cinematic Gateway & Portal", href: "about.html" },
    { id: "02b", label: "The Enterprise — Campaign Pillars", href: "about.html#pillars" },
    { id: "03", label: "The Glam Room — Salon Flagship", href: "glam-room.html" },
    { id: "03b", label: "The Glam Room — Signature Services", href: "glam-room.html#services" },
    { id: "04", label: "Partnerships — Brand Intake", href: "proposals.html" },
  ],

  globalFooter: "© 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",

  // UPDATE THIS with your real WhatsApp number (include country code, e.g. +233XXXXXXXXX)
  whatsapp: "+233XXXXXXXXX",
  whatsappMessage: "Hi Glam Room! I'd like to book an appointment 💅",

  // Two Glam Room shops — names/addresses match Google Maps pins (not area labels)
  locations: [
    {
      id: "glam-room-adenta",
      name: "Glam Room",
      area: "ADENTA",
      address: "Adenta, Accra",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/TN4FohAFQiJ6UgK4b",
      hours: "Mon – Sat: 9am – 6pm · Sun: Closed",
      imageUrl: "images/glam-red-indoor.png",
      imagePosition: "center center",
      bookingValue: "glam-room-adenta",
    },
    {
      id: "glam-room-sowutuom",
      name: "Glam Room",
      area: "SOWUTUOM",
      address: "Sowutuom, Accra",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/eNIyXIhSW1kZ6rzmF",
      hours: "Mon – Sat: 9am – 6pm · Sun: Closed",
      imageUrl: "images/glam-braids-studio.png",
      imagePosition: "center top",
      bookingValue: "glam-room-sowutuom",
    },
  ],

  hero: {
    photoUrl: "images/glam-braids-studio.png",
    photoAlt: "Asantewaa — Glam Room by Asantewaa",
    typewriterPhrases: ["Your Crown.", "Your Glow.", "Your Glam Room."],
  },

  home: {
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" },
    ],
    introLoader: {
      images: [
        "images/glam-braids-studio.png",
        "images/glam-braids-portrait.png",
        "images/glam-red-studio.png",
        "images/glam-red-indoor.png",
        "images/glam-red-outdoor.png",
        "images/glam-red-celebration.png",
      ],
      slideMs: 160,
      starMs: 320,
      exitMs: 320,
      titleHoldMs: 280,
      title: "Asantewaa",
      subtitle: "Glam Room",
      letterStaggerMs: 28,
    },
    panels: [
      {
        id: "hero",
        label: "",
        title: "Asantewaa",
        subtitle: "🇬🇭 Accra, Ghana",
        imageUrl: "images/glam-braids-studio.png",
        imagePosition: "center 15%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
        link: null,
      },
      {
        id: "visual-1",
        imageOnly: true,
        labelLeft: "Braids",
        labelRight: "Butterfly",
        imageUrl: "images/glam-braids-portrait.png",
        imagePosition: "center top",
      },
      {
        id: "discover",
        label: "Discover",
        title: "The Queen Behind the Chair",
        subtitle: "4M+ Followers · Ghanaian Pride",
        imageUrl: "images/glam-red-studio.png",
        imagePosition: "center top",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)",
        link: "about.html",
        linkText: "The Enterprise",
      },
      {
        id: "visual-2",
        imageOnly: true,
        labelLeft: "Bridal",
        labelRight: "Glam",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 20%",
      },
      {
        id: "visual-3",
        imageOnly: true,
        labelLeft: "Red",
        labelRight: "Carpet",
        imageUrl: "images/glam-red-outdoor.png",
        imagePosition: "center center",
      },
      {
        id: "glam",
        label: "The Glam Room",
        title: "Your Crown. Your Glow.",
        subtitle: "Accra's baddest hair destination",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center 25%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)",
        link: "glam-room.html",
        linkText: "Enter Glam Room",
      },
      {
        id: "visual-4",
        imageOnly: true,
        labelLeft: "Studio",
        labelRight: "Slay",
        imageUrl: "images/glam-braids-studio.png",
        imagePosition: "center top",
      },
      {
        id: "visual-5",
        imageOnly: true,
        labelLeft: "Full",
        labelRight: "Glam",
        imageUrl: "images/glam-braids-portrait.png",
        imagePosition: "center center",
      },
      {
        id: "book",
        label: "Book Your Glam",
        title: "Secure Your Slot",
        subtitle: "Mama Glam Is Waiting",
        imageUrl: "images/glam-red-studio.png",
        imagePosition: "center 20%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
        link: "book.html",
        linkText: "Book Now",
      },
      {
        id: "find-booking",
        type: "find-booking",
        label: "Track",
        title: "Find My Booking",
        subtitle: "No account needed — phone & last 4 letters of your name",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 30%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.88) 100%)",
      },
      {
        id: "visual-6",
        imageOnly: true,
        labelLeft: "Ghana",
        labelRight: "🇬🇭",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center center",
        link: "glam-room.html",
      },
    ],
  },

  quote: {
    text: "I didn't come to play, I came to SLAY — and so did your hair when you walk out my door. Baby girl, treat yourself. You deserve to look expensive!",
    attribution: "— Asantewaa",
  },

  about: {
    headline: "The Queen Behind the Chair",
    paragraphs: [
      "Asantewaa is Ghana's favourite TikTok star — 4 million+ followers who know her for her energy, her humour, and her unapologetic Ghanaian pride. What started as viral content turned into a dream: a salon where every woman walks in feeling like herself and walks out feeling like THAT girl.",
      "Glam Room is her love letter to Accra — warm vibes, expert hands, and zero tolerance for bad hair days. Whether you're coming for a silk press or a full transformation, you're family here.",
    ],
    stats: [
      { value: "4M+", label: "Followers" },
      { value: "Accra", label: "Ghana" },
      { value: "100%", label: "Good Vibes" },
    ],
  },

  enterprise: {
    footer: "© 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "THE ENTERPRISE",
    topbarLeftLink: "about.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "Partnerships", href: "proposals.html" },
    ],
    gateway: {
      title: "ASANTEWAA",
      headline: "THE WORLD KNOWS HER NAME.",
      meta: "ACCRA, GHANA * ASANTEWAA © 2026",
      scrollHint: "SCROLL TO ENTER",
      imageUrl: "images/glam-braids-portrait.png",
      imageAlt: "Asantewaa — cinematic portrait",
      imagePosition: "center 15%",
    },
    portals: [
      {
        id: "enterprise",
        theme: "enterprise",
        title: "THE ENTERPRISE",
        tagline: "She Builds Empires.",
        subline: "",
        cta: "Explore Partnerships",
        href: "#enterprise-statement",
        imageUrl: "images/glam-red-studio.png",
        imagePosition: "center 20%",
      },
    ],
    statement: {
      imageUrl: "images/glam-red-studio.png",
      imageAlt: "Asantewaa — editorial portrait",
      imagePosition: "center 20%",
      displayLines: ["SHAPING", "CULTURE.", "DRIVING", "ENGAGEMENT."],
      statements: [
        "She is not just a creator.",
        "She is a cultural institution.",
      ],
      body: [
        [
          "Asantewaa is a leading digital creator",
          "captivating millions weekly through viral",
          "storytelling, lifestyle, and cultural truth.",
        ],
        [
          "Her community does not just follow.",
          "They act. They buy. They trust.",
        ],
      ],
    },
    metrics: [
      { value: "4,000,000+", label: "TIKTOK FOLLOWERS" },
      { value: "8.4%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 2 to 4%" },
      { value: "1,000,000+", label: "INSTAGRAM FOLLOWERS" },
      { value: "5.2%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 1 to 3%" },
      { value: "12,000,000+", label: "MONTHLY VIDEO VIEWS", sublabel: "Across All Platforms" },
      { value: "18 to 38", label: "CORE AUDIENCE AGE", sublabel: "72% of Total Reach" },
      { variant: "strip", text: "68% FEMALE / 32% MALE" },
      { variant: "strip", text: "PRIMARY REACH: GHANA & WEST AFRICA" },
      { variant: "strip", text: "89K+ SNAPCHAT SUBSCRIBERS" },
    ],
    brandPartners: {
      items: [
        { name: "BRAND 1" },
        { name: "BRAND 2" },
        { name: "BRAND 3" },
        { name: "BRAND 4" },
        { name: "BRAND 5" },
        { name: "BRAND 6" },
      ],
    },
    campaignPillars: {
      items: [
        {
          id: "demonstrative",
          number: "01",
          title: "DEMONSTRATIVE CAMPAIGNS",
          body: [
            "A professionally produced advertisement that",
            "demonstrates your product in real life,",
            "the way it was meant to be seen.",
            "Precision formatted for maximum retention",
            "on TikTok and Instagram. Measurable",
            "conversion. No guesswork.",
          ],
        },
        {
          id: "pro-location",
          number: "02",
          title: "PRO LOCATION CAMPAIGNS",
          body: [
            "Asantewaa travels directly to your headquarters,",
            "retail flagship, corporate office, or custom venue.",
            "Shot on location. Owned by your brand story.",
            "Deployed where your audience lives.",
          ],
        },
        {
          id: "snapchat",
          number: "03",
          title: "SNAPCHAT ECOSYSTEM AMPLIFICATION",
          body: [
            "Extended campaign lifecycle inside her private",
            "premium Snapchat subscriber network.",
            "High-visibility weekly content integration.",
            "Exclusive access. Unmatched intimacy with audience.",
          ],
        },
      ],
    },
    cta: {
      label: "Explore Partnerships",
      href: "proposals.html",
    },
  },

  glamRoom: {
    footer: "© 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
    ],
    declaration: {
      title: "THE GLAM ROOM",
      byline: "BY ASANTEWAA",
      tagline:
        "Where the world's most driven women come to be seen, restored, and elevated.",
    },
    bookingOverlay: {
      title: "RESERVE YOUR CHAIR",
      locationPrefix: "GLAM ROOM —",
      submitLabel: "CONFIRM YOUR RESERVATION",
      depositNote: "A commitment deposit confirms your reservation instantly.",
      exitLabel: "X EXIT",
    },
    signatureServices: [
      {
        number: "01",
        title: "LUXURY HAIR INSTALLATION",
        descriptor: "Premier installation service. Every strand, intentional.",
        serviceId: "hair-installation",
      },
      {
        number: "02",
        title: "CUSTOM WIG STYLING & MAINTENANCE",
        descriptor: "Bespoke shaping and care. Built for your identity.",
        serviceId: "hair-reset",
      },
      {
        number: "03",
        title: "PRECISION HAIR COLORING & BLENDING",
        descriptor: "Color that looks like it was born that way.",
        serviceId: "color-highlights",
      },
      {
        number: "04",
        title: "DEEP TREATMENTS & HAIR RESTORATION",
        descriptor: "Repair. Restore. Revive. Results that speak.",
        serviceId: "natural-care",
      },
      {
        number: "05",
        title: "EDITORIAL & BRIDAL GLAM",
        descriptor: "For the moments that define you. No second takes.",
        serviceId: "bridal-glam",
      },
    ],
  },

  proposals: {
    footer: "© 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "PARTNERSHIPS",
    topbarLeftLink: "proposals.html",
    hero: {
      title: "PARTNER WITH ASANTEWAA",
      subline:
        "Submit your brief. We respond within 48 hours through official channels only.",
    },
    form: {
      submitLabel: "SUBMIT STRATEGIC BRIEFING",
      budgetTiers: [
        "Under GH₵ 50,000",
        "GH₵ 50,000 – GH₵ 150,000",
        "GH₵ 150,000 – GH₵ 500,000",
        "GH₵ 500,000+",
      ],
      pillars: [
        "01 — Demonstrative Campaigns",
        "02 — Pro Location Campaigns",
        "03 — Snapchat Ecosystem Amplification",
        "Open / Not yet selected",
      ],
    },
    compliance: [
      {
        title: "image & asset rights",
        body: "All creative assets licensed for 12 months from campaign launch. Organic digital distribution only.",
      },
      {
        title: "paid media amplification",
        body: "Boosting, dark-posting, or commercial promotion requires pre-approval plus a 30% base package premium.",
      },
      {
        title: "media restrictions",
        body: "Assets prohibited on national TV, billboards, print, or any offline or out-of-home media channels.",
      },
      {
        title: "asset modification",
        body: "No re-editing, cropping, or remixing without written authorisation. Unapproved changes void usage rights.",
      },
    ],
    contact: {
      intro: "FOR IMMEDIATE ASSISTANCE OR OFFICIAL DOCUMENTATION APPROVALS",
      whatsappLabel: "WhatsApp Management",
      whatsapp: "+233 (0) 247 743 593",
      emailLabel: "Corporate Inbox",
      email: "martinadwamena599@gmail.com",
      locations: "ACCRA, GHANA * NEW JERSEY, USA",
    },
  },

  socials: [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@asantewaaaaa",
      icon: "fa-brands fa-tiktok",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/asantewaaaa",
      icon: "fa-brands fa-instagram",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@asantewaa",
      icon: "fa-brands fa-youtube",
    },
  ],

  services: [
    {
      id: "hair-reset",
      name: "Hair Reset",
      description: "Fresh start energy — wash, unwind, touch-ups, and quick styles to reset your crown.",
      price: "From GH₵ 35",
      duration: "30 min – 2 hrs",
      icon: "fa-solid fa-arrows-rotate",
      badge: "Popular",
      styles: [
        { id: "hair-wash", name: "Hair Wash", description: "Cleanse and refresh your hair.", price: "GH₵ 35", duration: "30 min" },
        { id: "hair-wash-cornrows", name: "Hair Wash + Cornrows", description: "Wash plus cornrow styling.", price: "GH₵ 55", duration: "1–1.5 hrs" },
        { id: "unbraid-hair-wash", name: "Unbraiding & Hair Wash", description: "Take down braids and wash your hair.", price: "GH₵ 50", duration: "1–2 hrs" },
        { id: "touch-up-salon-relaxer", name: "Touch Up with Salon’s Relaxer", description: "New growth touch-up using Glam Room relaxer.", price: "GH₵ 70", duration: "1–1.5 hrs" },
        { id: "touch-up-client-relaxer", name: "Touch Up with Client’s Relaxer", description: "New growth touch-up using your own relaxer.", price: "GH₵ 50", duration: "1–1.5 hrs" },
        { id: "normal-ponytail", name: "Normal Ponytail", description: "Sleek, styled ponytail finish.", price: "GH₵ 80", duration: "45 min – 1 hr" },
      ],
    },
    {
      id: "hair-installation",
      name: "Hair Installation Services",
      description: "Closure and frontal installs — secure, natural, and styled to slay.",
      price: "From GH₵ 50",
      duration: "1–2 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
      styles: [
        { id: "closure-install", name: "Closure Hair Install", description: "Closure unit installed and styled.", price: "GH₵ 50", duration: "1–1.5 hrs" },
        { id: "frontal-install", name: "Frontal Hair Install", description: "Frontal unit installed with a natural hairline.", price: "GH₵ 100", duration: "1.5–2 hrs" },
        { id: "frontal-ponytail", name: "Frontal Ponytail", description: "Frontal install finished in a sleek ponytail style.", price: "GH₵ 150", duration: "1.5–2 hrs" },
      ],
    },
    {
      id: "braiding-workmanship",
      name: "Braids (Workmanship Only)",
      description: "Expert braiding by length — you bring the hair, we bring the hands. Workmanship only.",
      price: "From GH₵ 150",
      duration: "3–8 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
      styles: [
        { id: "shoulder-length", name: "Shoulder Length", description: "Braiding service to shoulder length. Hair not included.", price: "GH₵ 150", duration: "3–4 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "bra-length", name: "Bra Length", description: "Braiding service to bra strap length. Hair not included.", price: "GH₵ 200", duration: "4–5 hrs" },
        { id: "hip-length", name: "Hip Length", description: "Braiding service to hip length. Hair not included.", price: "GH₵ 250", duration: "5–6 hrs" },
        { id: "butt-length", name: "Butt Length", description: "Braiding service to butt length. Hair not included.", price: "GH₵ 300", duration: "6–7 hrs" },
        { id: "under-butt", name: "Under Butt", description: "Braiding service past butt length. Hair not included.", price: "GH₵ 400", duration: "7–8 hrs", imageUrl: "images/glam-braids-portrait.png" },
      ],
    },
    {
      id: "natural-care",
      name: "Natural Hair Care",
      description: "Deep conditioning, trims, and treatments that love your natural texture back to life.",
      price: "From GH₵ 100",
      duration: "1–2 hrs",
      icon: "fa-solid fa-leaf",
      badge: null,
      styles: [
        { id: "deep-condition", name: "Deep Conditioning", description: "Intensive moisture treatment for dry, tired hair.", price: "GH₵ 100", duration: "1 hr" },
        { id: "trim-shape", name: "Trim & Shape", description: "Health trim to keep your ends fresh.", price: "GH₵ 80", duration: "45 min" },
        { id: "steam-treatment", name: "Steam Treatment", description: "Steam-assisted hydration for max absorption.", price: "GH₵ 130", duration: "1–1.5 hrs" },
        { id: "protein-treatment", name: "Protein Treatment", description: "Strengthen weak or over-processed strands.", price: "GH₵ 140", duration: "1.5 hrs" },
        { id: "wash-go-style", name: "Wash & Go Style", description: "Define and set your natural curl pattern.", price: "GH₵ 120", duration: "1–2 hrs" },
      ],
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      description: "Bold colour, subtle highlights, or a full transformation — let's make you unforgettable.",
      price: "From GH₵ 250",
      duration: "3–4 hrs",
      icon: "fa-solid fa-palette",
      badge: null,
      styles: [
        { id: "full-color", name: "Full Color", description: "All-over colour transformation.", price: "From GH₵ 350", duration: "3–4 hrs", imageUrl: "images/glam-red-studio.png" },
        { id: "highlights", name: "Highlights", description: "Face-framing or full-head highlights.", price: "From GH₵ 280", duration: "3 hrs" },
        { id: "ombre-balayage", name: "Ombré / Balayage", description: "Gradual colour melt — subtle or bold.", price: "From GH₵ 400", duration: "4–5 hrs" },
        { id: "root-touchup", name: "Root Touch-up", description: "Refresh grown-out roots to match your colour.", price: "GH₵ 250", duration: "2 hrs" },
      ],
    },
    {
      id: "bridal-glam",
      name: "Bridal Glam",
      description: "Your big day deserves a crown that stops the room. Bridal packages with all the extras.",
      price: "From GH₵ 500",
      duration: "Full day",
      icon: "fa-solid fa-gem",
      badge: "Premium",
      styles: [
        { id: "bridal-hair-makeup", name: "Bridal Hair & Makeup", description: "Full bridal glam — hair, makeup, and touch-ups.", price: "From GH₵ 800", duration: "Full day", imageUrl: "images/glam-red-indoor.png" },
        { id: "bridal-hair-only", name: "Bridal Hair Only", description: "Wedding-day hairstyle with trial session.", price: "From GH₵ 500", duration: "4–6 hrs" },
        { id: "bridesmaid-package", name: "Bridesmaid Package", description: "Coordinated looks for the bridal party.", price: "From GH₵ 350/person", duration: "2–3 hrs each" },
        { id: "engagement-look", name: "Engagement Look", description: "Camera-ready hair for your engagement shoot.", price: "From GH₵ 400", duration: "3 hrs", imageUrl: "images/glam-red-celebration.png" },
        { id: "traditional-ceremony", name: "Traditional Ceremony Style", description: "Styled for kente, white, or traditional wedding events.", price: "From GH₵ 450", duration: "3–4 hrs" },
      ],
    },
  ],

  testimonials: [
    {
      text: "Baby girl, when you leave my chair, Accra is NOT ready! Best silk press I've ever had — I felt like a whole new person.",
      author: "Ama K.",
      role: "Regular Client",
    },
    {
      text: "Asantewaa did my braids and I got stopped on the street THREE times. The energy in that salon? Unmatched!",
      author: "Efua M.",
      role: "First-Timer",
    },
    {
      text: "I came in stressed, I left feeling like a celebrity. The vibes, the music, the hair — 10/10 would recommend to every sis.",
      author: "Akua T.",
      role: "Bridal Client",
    },
    {
      text: "My wig install was so seamless my own mother thought it was my hair. Glam Room is THE spot in Accra, period.",
      author: "Dela S.",
      role: "Wig Install Client",
    },
  ],

  gallery: [
    { id: 1, label: "Butterfly Braids", imageUrl: "images/glam-braids-studio.png", gradient: "linear-gradient(135deg, #C75B39 0%, #D4A853 100%)" },
    { id: 2, label: "Full Glam Portrait", imageUrl: "images/glam-braids-portrait.png", gradient: "linear-gradient(135deg, #006B3F 0%, #D4A853 100%)" },
    { id: 3, label: "Red Carpet Outdoor", imageUrl: "images/glam-red-outdoor.png", gradient: "linear-gradient(135deg, #CE1126 0%, #2C1810 100%)" },
    { id: 4, label: "Bridal Glow", imageUrl: "images/glam-red-indoor.png", gradient: "linear-gradient(135deg, #D4A853 0%, #C75B39 100%)" },
    { id: 5, label: "Studio Slay", imageUrl: "images/glam-red-studio.png", gradient: "linear-gradient(135deg, #2C1810 0%, #006B3F 100%)" },
    { id: 6, label: "Celebration Glam", imageUrl: "images/glam-red-celebration.png", gradient: "linear-gradient(135deg, #CE1126 0%, #FCD116 100%)" },
    { id: 7, label: "Twist Out", gradient: "linear-gradient(135deg, #C75B39 0%, #006B3F 100%)" },
    { id: 8, label: "Glam Room Vibes", gradient: "linear-gradient(135deg, #D4A853 0%, #CE1126 100%)" },
  ],

  business: {
    tagline: "Accra's baddest hair destination — where your crown gets the main character energy it deserves.",
    extensionNotice:
      "Please note that all prices do not come with hair extensions. You can either come along with your own extensions or purchase from our salon.",
    intro: [
      "Glam Room is Asantewaa's dream salon — with two locations across Accra, so your glow up is never far away. Warm vibes, expert stylists, and zero tolerance for bad hair days at every chair.",
      "From silk press to full bridal glam, every appointment comes with main character energy included. Walk in as you are, walk out ready for Accra to stare.",
    ],
    hours: "Mon – Sat: 9am – 6pm · Sun: Closed",
  },

  booking: {
    // Supabase — paste credentials from Project Settings → API
    supabase: {
      url: "https://pksfslkwmlrlttoojluk.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc2ZzbGt3bWxybHR0b29qbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjMyNzcsImV4cCI6MjA5NTYzOTI3N30.put72ryG2V8E7rQLfF6omcGplgrUbHmrep8zLBvEk6M",
    },

    headline: "Book your crowning glory",
    subhead: "Select your service, pick a time, and come shine like a true Ghanaian queen 👑",

    bookingQuote:
      "If your hair ain't talking, you ain't walking! I don't do boring, and my Glam Room doesn't either. Come through, let's make noise!",
    promise: "No rushing, no hurting, just good vibes and fire styles.",
    tagline: "✨ Mama Glam Herself ✨",
    vibeNote: "Braiding while blasting Amapiano & Afrobeats",
    tiktokHandle: "@asantewaaa_official",

    maxReservationsPerDay: 6,

    deposit: {
      enabled: true,
      configured: false,
      provider: "moolre",
      amountGhs: 50,
      currency: "GHS",
      label: "GH₵ 50 commitment deposit",
      note: "Pay a commitment deposit via Mobile Money to instantly confirm your reservation.",
      submitLabel: "PAY DEPOSIT & CONFIRM",
      pendingMessage:
        "Your slot is held. Complete the deposit payment to confirm your reservation.",
      confirmedMessage:
        "You're confirmed! Your deposit secures your chair — see you at Glam Room.",
    },

    timeSlots: [
      { value: "09:00", label: "09:00 AM" },
      { value: "10:00", label: "10:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "12:00", label: "12:00 PM" },
      { value: "13:00", label: "01:00 PM" },
      { value: "14:00", label: "02:00 PM" },
      { value: "15:00", label: "03:00 PM" },
      { value: "16:00", label: "04:00 PM" },
      { value: "17:00", label: "05:00 PM" },
    ],

    services: [
      { value: "Braid Bomb", label: "💥 Braid Bomb", price: "250 GHS" },
      { value: "Mama Glam Special", label: "👩🏾‍🦱 Mama Glam Special", price: "450 GHS" },
      { value: "Glow Up Express", label: "✨ Glow Up Express", price: "150 GHS" },
      { value: "Celebrity Wig Fix", label: "💇🏾‍♀️ Celebrity Wig Fix", price: "300 GHS" },
      { value: "Custom Style", label: "👑 Custom Style", price: "Price on chat" },
    ],
  },

  // Admin dashboard — admin.html (create user in Supabase → Authentication)
  admin: {
    loginEmail: "asantewaa@glamroom.com",
    clearPassword: "glamroom2024",
  },

  findBooking: {
    phonePlaceholder: "024 XXX XXXX or +233 XX XXX XXXX",
    namePlaceholder: "Last 4 letters of your name",
    submitLabel: "Check Status",
    loading: "Checking…",
    invalidPhone: "Enter a valid Ghana number (e.g. 024XXXXXXX).",
    invalidName: "Enter exactly 4 letters — the last 4 letters of the name you booked with.",
    notFound: "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
    unavailable: "Booking lookup isn't connected yet. WhatsApp Glam Room to check your slot.",
    error: "Something went wrong. Please try again or WhatsApp Glam Room.",
  },

  installPrompt: {
    title: "Add Glam Room to your home screen",
    body: "Open like an app — one tap from your phone, no browser bar. Perfect for booking your next slay 👑",
    installButton: "Add to Home Screen",
    iosButton: "Got it",
    laterButton: "Maybe later",
    androidHint: "Tap below to install Glam Room on this device.",
    delayMs: 3000,
  },

  serviceNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "All Services", href: "glam-room.html#services" },
    { label: "Book Appointment", href: "book.html" },
  ],

  homeNavLinks: [
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
    { label: "Partnerships", href: "proposals.html" },
  ],

  aboutNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Analytics", href: "#analytics" },
    { label: "Campaign Pillars", href: "#pillars" },
    { label: "Partnerships", href: "proposals.html" },
  ],

  businessNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Appointment", href: "book.html" },
  ],

  bookingNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
  ],

  proposalsNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Partnerships", href: "proposals.html" },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana 🇬🇭",
  },
};
