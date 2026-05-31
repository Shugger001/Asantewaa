// data.js?v=20260536
function getLocationLabel(loc) {
  const address = loc.address?.trim();
  if (address) return address;
  if (loc.area?.trim()) return `${loc.name?.trim() || "Glam Room"} \u2014 ${loc.area.trim()}`;
  return loc.name?.trim() || "Glam Room";
}
function getLocationBookingValue(loc) {
  return loc.bookingValue?.trim() || loc.id;
}
function findLocationById(id) {
  return SITE.locations?.find((loc) => loc.id === id);
}
function getLocationLabelById(id) {
  const loc = findLocationById(id);
  return loc ? getLocationLabel(loc) : id;
}
function findServiceById(id) {
  return SITE.services?.find((service) => service.id === id);
}
function findServiceStyle(serviceId, styleId) {
  const service = findServiceById(serviceId);
  return service?.styles?.find((style) => style.id === styleId);
}
function parsePriceAmount(priceStr) {
  if (!priceStr) return null;
  const match = String(priceStr).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}
function getServicePriceRange(service) {
  const amounts = (service?.styles || []).map((style) => parsePriceAmount(style.price)).filter((amount) => amount != null);
  if (!amounts.length) {
    return service?.price || "";
  }
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  if (min === max) {
    return `GH\u20B5 ${min}`;
  }
  return `GH\u20B5 ${min} \u2013 GH\u20B5 ${max}`;
}
var SITE = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  logo: {
    white: "icons/logo-white.png",
    black: "icons/logo-black.png",
    /** Pages 6–7 use the black mark on light backgrounds */
    blackOnPages: ["booking", "admin"]
  },
  tagline: "Accra's baddest hair destination \u2014 where your crown gets the main character energy it deserves.",
  /** Wireframe document — 6 pages (PDF pages 2–7) */
  wireframePages: [
    { id: "01", label: "Home \u2014 Editorial Gateway", href: "index.html" },
    { id: "02", label: "The Enterprise \u2014 Partnerships & Influence", href: "about.html" },
    { id: "02b", label: "The Enterprise \u2014 Campaign Pillars", href: "about.html#pillars" },
    { id: "03", label: "The Glam Room \u2014 Salon Flagship", href: "glam-room.html" },
    { id: "03b", label: "The Glam Room \u2014 Signature Services", href: "glam-room.html#services" },
    { id: "04", label: "Partnerships \u2014 Brand Intake", href: "proposals.html" }
  ],
  globalFooter: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
  // UPDATE THIS with your real WhatsApp number (include country code, e.g. +233XXXXXXXXX)
  whatsapp: "+233XXXXXXXXX",
  whatsappMessage: "Hi Glam Room! I'd like to book an appointment \u{1F485}",
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
      hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-adenta-portrait.png",
      imagePosition: "center top",
      bookingValue: "glam-room-adenta"
    },
    {
      id: "glam-room-sowutuom",
      name: "Glam Room",
      area: "SOWUTUOM",
      address: "Sowutuom, Accra",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/eNIyXIhSW1kZ6rzmF",
      hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-braids-studio.png",
      imagePosition: "center top",
      bookingValue: "glam-room-sowutuom"
    }
  ],
  hero: {
    photoUrl: "images/asantewaa-gown-smile.png",
    photoAlt: "Asantewaa \u2014 Glam Room by Asantewaa",
    typewriterPhrases: ["Your Crown.", "Your Glow.", "Your Glam Room."]
  },
  home: {
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    introLoader: {
      images: [
        "images/asantewaa-kente-bw.png",
        "images/asantewaa-glam-portrait-bw.png",
        "images/asantewaa-beaded-gown-bw.png",
        "images/asantewaa-kente-color.png",
        "images/asantewaa-gown-mirror-bw.png",
        "images/asantewaa-gown-full-bw.png",
        "images/asantewaa-gown-mirror-color.png",
        "images/asantewaa-gown-joy.png",
        "images/glam-red-celebration.png",
        "images/glam-red-studio.png",
        "images/glam-braids-portrait.png",
        "images/glam-red-outdoor.png"
      ],
      slideMs: 90,
      starMs: 180,
      exitMs: 200,
      titleHoldMs: 280,
      titleSlideMs: 950,
      title: "Asantewaa",
      subtitle: "",
      letterStaggerMs: 28
    },
    panels: [
      {
        id: "hero",
        label: "",
        title: "Asantewaa",
        subtitle: "",
        imageUrl: "images/asantewaa-gown-smile.png",
        imagePosition: "center 12%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
        link: null
      },
      {
        id: "discover",
        label: "",
        title: "The Era of Influence",
        subtitle: "Orchestrating Global Dominance",
        imageUrl: "images/asantewaa-kente-color.png",
        imagePosition: "center 18%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 100%)",
        link: "about.html",
        linkText: "The Enterprise"
      },
      {
        id: "visual-2",
        imageOnly: true,
        imageUrl: "images/asantewaa-kente-bw.png",
        imagePosition: "center 15%"
      },
      {
        id: "visual-3",
        imageOnly: true,
        imageUrl: "images/asantewaa-glam-portrait-bw.png",
        imagePosition: "center 22%"
      },
      {
        id: "visual-4",
        imageOnly: true,
        imageUrl: "images/asantewaa-beaded-gown-bw.png",
        imagePosition: "center top"
      },
      {
        id: "glam",
        label: "The Glam Room",
        title: "Your Crown. Your Glow.",
        subtitle: "Accra's Premier Hair Destination",
        imageUrl: "images/asantewaa-gown-mirror-color.png",
        imagePosition: "center 28%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.78) 100%)",
        link: "glam-room.html",
        linkText: "Enter Glam Room"
      },
      {
        id: "visual-5",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-joy.png",
        imagePosition: "center 20%"
      },
      {
        id: "visual-6",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-full-bw.png",
        imagePosition: "center center"
      },
      {
        id: "visual-7",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-mirror-bw.png",
        imagePosition: "center 25%"
      },
      {
        id: "book",
        label: "Book Your Glam",
        title: "Reserve Your EXperience",
        subtitle: "Experience The Artistry",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center 22%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
        link: "book.html",
        linkText: "Book Now"
      },
      {
        id: "find-booking",
        type: "find-booking",
        label: "Track",
        title: "Find My Booking",
        subtitle: "No account needed \u2014 phone & last 4 letters of your name",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 30%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.88) 100%)"
      },
      {
        id: "visual-8",
        imageOnly: true,
        imageUrl: "images/glam-braids-portrait.png",
        imagePosition: "center top",
        link: "glam-room.html"
      }
    ]
  },
  quote: {
    text: "I didn't come to play, I came to SLAY \u2014 and so did your hair when you walk out my door. Baby girl, treat yourself. You deserve to look expensive!",
    attribution: "\u2014 Asantewaa"
  },
  about: {
    headline: "The Queen Behind the Chair",
    paragraphs: [
      "Asantewaa is Ghana's favourite TikTok star \u2014 4 million+ followers who know her for her energy, her humour, and her unapologetic Ghanaian pride. What started as viral content turned into a dream: a salon where every woman walks in feeling like herself and walks out feeling like THAT girl.",
      "Glam Room is her love letter to Accra \u2014 warm vibes, expert hands, and zero tolerance for bad hair days. Whether you're coming for a silk press or a full transformation, you're family here."
    ],
    stats: [
      { value: "4M+", label: "Followers" },
      { value: "Accra", label: "Ghana" },
      { value: "100%", label: "Good Vibes" }
    ]
  },
  enterprise: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "THE ENTERPRISE",
    topbarLeftLink: "about.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    statement: {
      imageUrl: "images/asantewaa-enterprise-statement.png",
      imageAlt: "Asantewaa \u2014 editorial portrait",
      imagePosition: "center 20%",
      displayLines: ["SHAPING", "CULTURE.", "DRIVING", "ENGAGEMENT."],
      statements: [
        "She is not just a creator.",
        "She is a cultural institution."
      ],
      body: [
        [
          "Asantewaa is a leading digital creator",
          "captivating millions weekly through viral",
          "storytelling, lifestyle, and cultural truth."
        ],
        [
          "Her community does not just follow.",
          "They act. They buy. They trust."
        ]
      ]
    },
    metrics: [
      { value: "4,000,000+", label: "TIKTOK FOLLOWERS" },
      { value: "8.4%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 2 to 4%" },
      { value: "1,000,000+", label: "INSTAGRAM FOLLOWERS" },
      { value: "5.2%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 1 to 3%" },
      { value: "12,000,000+", label: "MONTHLY VIDEO VIEWS", sublabel: "Across All Platforms" },
      { value: "18 to 38", label: "CORE AUDIENCE AGE", sublabel: "72% of Total Reach" },
      { variant: "strip", text: "68% FEMALE / 32% MALE" },
      { variant: "strip", text: "PAN-AFRICAN INFLUENCE. GLOBAL REACH." },
      { variant: "strip", text: "89K+ SNAPCHAT SUBSCRIBERS" }
    ],
    brandPartners: {
      items: [
        { name: "BRAND 1" },
        { name: "BRAND 2" },
        { name: "BRAND 3" },
        { name: "BRAND 4" },
        { name: "BRAND 5" },
        { name: "BRAND 6" }
      ]
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
            "conversion. No guesswork."
          ]
        },
        {
          id: "pro-location",
          number: "02",
          title: "PRO LOCATION CAMPAIGNS",
          body: [
            "Asantewaa travels directly to your headquarters,",
            "retail flagship, corporate office, or custom venue.",
            "Shot on location. Owned by your brand story.",
            "Deployed where your audience lives."
          ]
        },
        {
          id: "snapchat",
          number: "03",
          title: "SNAPCHAT ECOSYSTEM AMPLIFICATION",
          body: [
            "Extended campaign lifecycle inside her private",
            "premium Snapchat subscriber network.",
            "High-visibility weekly content integration.",
            "Exclusive access. Unmatched intimacy with audience."
          ]
        }
      ]
    },
    cta: {
      label: "Explore Partnerships",
      href: "proposals.html"
    }
  },
  glamRoom: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" }
    ],
    declaration: {
      title: "THE GLAM ROOM",
      byline: "BY ASANTEWAA",
      tagline: "Where the world's most driven women come to be seen, restored, and elevated."
    },
    bookingOverlay: {
      title: "RESERVE YOUR CHAIR",
      locationPrefix: "GLAM ROOM \u2014",
      submitLabel: "CONFIRM YOUR RESERVATION",
      depositNote: "A commitment deposit confirms your reservation instantly.",
      exitLabel: "X EXIT"
    },
    signatureServices: [
      {
        number: "01",
        title: "LUXURY HAIR INSTALLATION",
        descriptor: "Premier installation service. Every strand, intentional.",
        serviceId: "hair-installation"
      },
      {
        number: "02",
        title: "CUSTOM WIG STYLING & MAINTENANCE",
        descriptor: "Bespoke shaping and care. Built for your identity.",
        serviceId: "hair-reset"
      },
      {
        number: "03",
        title: "PRECISION HAIR COLORING & BLENDING",
        descriptor: "Color that looks like it was born that way.",
        serviceId: "color-highlights"
      },
      {
        number: "04",
        title: "DEEP TREATMENTS & HAIR RESTORATION",
        descriptor: "Repair. Restore. Revive. Results that speak.",
        serviceId: "natural-care"
      },
      {
        number: "05",
        title: "EDITORIAL & BRIDAL GLAM",
        descriptor: "For the moments that define you. No second takes.",
        serviceId: "bridal-glam"
      }
    ]
  },
  proposals: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "PARTNERSHIPS",
    topbarLeftLink: "proposals.html",
    hero: {
      title: "PARTNER WITH ASANTEWAA",
      subline: "Submit your brief. We respond within 48 hours through official channels only."
    },
    form: {
      submitLabel: "SUBMIT STRATEGIC BRIEFING",
      budgetTiers: [
        "Under GH\u20B5 50,000",
        "GH\u20B5 50,000 \u2013 GH\u20B5 150,000",
        "GH\u20B5 150,000 \u2013 GH\u20B5 500,000",
        "GH\u20B5 500,000+"
      ],
      pillars: [
        "01 \u2014 Demonstrative Campaigns",
        "02 \u2014 Pro Location Campaigns",
        "03 \u2014 Snapchat Ecosystem Amplification",
        "Open / Not yet selected"
      ]
    },
    compliance: [
      {
        title: "IMAGE & ASSET RIGHTS",
        body: "All creative assets licensed for 12 months from campaign launch. Organic digital distribution only."
      },
      {
        title: "PAID MEDIA AMPLIFICATION",
        body: "Boosting, dark-posting, or commercial promotion requires pre-approval plus a 30% base package premium."
      },
      {
        title: "MEDIA RESTRICTIONS",
        body: "Assets prohibited on national TV, billboards, print, or any offline or out-of-home media channels."
      },
      {
        title: "ASSET MODIFICATION",
        body: "No re-editing, cropping, or remixing without written authorisation. Unapproved changes void usage rights."
      }
    ],
    contact: {
      intro: "FOR IMMEDIATE ASSISTANCE OR OFFICIAL DOCUMENTATION APPROVALS",
      whatsappLabel: "WhatsApp Management",
      whatsapp: "+233 (0) 247 743 593",
      emailLabel: "Corporate Inbox",
      email: "martinadwamena599@gmail.com",
      locations: "ACCRA, GHANA * NEW JERSEY, USA"
    }
  },
  socials: [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@asantewaaaaa",
      icon: "fa-brands fa-tiktok"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/asantewaaaa",
      icon: "fa-brands fa-instagram"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@asantewaa",
      icon: "fa-brands fa-youtube"
    }
  ],
  services: [
    {
      id: "hair-reset",
      name: "Hair Reset",
      description: "Fresh start energy \u2014 wash, unwind, touch-ups, and quick styles to reset your crown.",
      price: "From GH\u20B5 35",
      duration: "30 min \u2013 2 hrs",
      icon: "fa-solid fa-arrows-rotate",
      badge: "Popular",
      styles: [
        { id: "hair-wash", name: "Hair Wash", description: "Cleanse and refresh your hair.", price: "GH\u20B5 35", duration: "30 min" },
        { id: "hair-wash-cornrows", name: "Hair Wash + Cornrows", description: "Wash plus cornrow styling.", price: "GH\u20B5 55", duration: "1\u20131.5 hrs" },
        { id: "unbraid-hair-wash", name: "Unbraiding & Hair Wash", description: "Take down braids and wash your hair.", price: "GH\u20B5 50", duration: "1\u20132 hrs" },
        { id: "touch-up-salon-relaxer", name: "Touch Up with Salon\u2019s Relaxer", description: "New growth touch-up using Glam Room relaxer.", price: "GH\u20B5 70", duration: "1\u20131.5 hrs" },
        { id: "touch-up-client-relaxer", name: "Touch Up with Client\u2019s Relaxer", description: "New growth touch-up using your own relaxer.", price: "GH\u20B5 50", duration: "1\u20131.5 hrs" },
        { id: "normal-ponytail", name: "Normal Ponytail", description: "Sleek, styled ponytail finish.", price: "GH\u20B5 80", duration: "45 min \u2013 1 hr" }
      ]
    },
    {
      id: "hair-installation",
      name: "Hair Installation Services",
      description: "Closure and frontal installs \u2014 secure, natural, and styled to slay.",
      price: "From GH\u20B5 50",
      duration: "1\u20132 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
      styles: [
        { id: "closure-install", name: "Closure Hair Install", description: "Closure unit installed and styled.", price: "GH\u20B5 50", duration: "1\u20131.5 hrs" },
        { id: "frontal-install", name: "Frontal Hair Install", description: "Frontal unit installed with a natural hairline.", price: "GH\u20B5 100", duration: "1.5\u20132 hrs" },
        { id: "frontal-ponytail", name: "Frontal Ponytail", description: "Frontal install finished in a sleek ponytail style.", price: "GH\u20B5 150", duration: "1.5\u20132 hrs" }
      ]
    },
    {
      id: "braiding-workmanship",
      name: "Braids (Workmanship Only)",
      description: "Expert braiding by length \u2014 you bring the hair, we bring the hands. Workmanship only.",
      price: "From GH\u20B5 150",
      duration: "3\u20138 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
      styles: [
        { id: "shoulder-length", name: "Shoulder Length", description: "Braiding service to shoulder length. Hair not included.", price: "GH\u20B5 150", duration: "3\u20134 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "bra-length", name: "Bra Length", description: "Braiding service to bra strap length. Hair not included.", price: "GH\u20B5 200", duration: "4\u20135 hrs" },
        { id: "hip-length", name: "Hip Length", description: "Braiding service to hip length. Hair not included.", price: "GH\u20B5 250", duration: "5\u20136 hrs" },
        { id: "butt-length", name: "Butt Length", description: "Braiding service to butt length. Hair not included.", price: "GH\u20B5 300", duration: "6\u20137 hrs" },
        { id: "under-butt", name: "Under Butt", description: "Braiding service past butt length. Hair not included.", price: "GH\u20B5 400", duration: "7\u20138 hrs", imageUrl: "images/glam-braids-portrait.png" }
      ]
    },
    {
      id: "natural-care",
      name: "Natural Hair Care",
      description: "Deep conditioning, trims, and treatments that love your natural texture back to life.",
      price: "From GH\u20B5 100",
      duration: "1\u20132 hrs",
      icon: "fa-solid fa-leaf",
      badge: null,
      styles: [
        { id: "deep-condition", name: "Deep Conditioning", description: "Intensive moisture treatment for dry, tired hair.", price: "GH\u20B5 100", duration: "1 hr" },
        { id: "trim-shape", name: "Trim & Shape", description: "Health trim to keep your ends fresh.", price: "GH\u20B5 80", duration: "45 min" },
        { id: "steam-treatment", name: "Steam Treatment", description: "Steam-assisted hydration for max absorption.", price: "GH\u20B5 130", duration: "1\u20131.5 hrs" },
        { id: "protein-treatment", name: "Protein Treatment", description: "Strengthen weak or over-processed strands.", price: "GH\u20B5 140", duration: "1.5 hrs" },
        { id: "wash-go-style", name: "Wash & Go Style", description: "Define and set your natural curl pattern.", price: "GH\u20B5 120", duration: "1\u20132 hrs" }
      ]
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      description: "Bold colour, subtle highlights, or a full transformation \u2014 let's make you unforgettable.",
      price: "From GH\u20B5 250",
      duration: "3\u20134 hrs",
      icon: "fa-solid fa-palette",
      badge: null,
      styles: [
        { id: "full-color", name: "Full Color", description: "All-over colour transformation.", price: "From GH\u20B5 350", duration: "3\u20134 hrs", imageUrl: "images/glam-red-studio.png" },
        { id: "highlights", name: "Highlights", description: "Face-framing or full-head highlights.", price: "From GH\u20B5 280", duration: "3 hrs" },
        { id: "ombre-balayage", name: "Ombr\xE9 / Balayage", description: "Gradual colour melt \u2014 subtle or bold.", price: "From GH\u20B5 400", duration: "4\u20135 hrs" },
        { id: "root-touchup", name: "Root Touch-up", description: "Refresh grown-out roots to match your colour.", price: "GH\u20B5 250", duration: "2 hrs" }
      ]
    },
    {
      id: "bridal-glam",
      name: "Bridal Glam",
      description: "Your big day deserves a crown that stops the room. Bridal packages with all the extras.",
      price: "From GH\u20B5 500",
      duration: "Full day",
      icon: "fa-solid fa-gem",
      badge: "Premium",
      styles: [
        { id: "bridal-hair-makeup", name: "Bridal Hair & Makeup", description: "Full bridal glam \u2014 hair, makeup, and touch-ups.", price: "From GH\u20B5 800", duration: "Full day", imageUrl: "images/glam-red-indoor.png" },
        { id: "bridal-hair-only", name: "Bridal Hair Only", description: "Wedding-day hairstyle with trial session.", price: "From GH\u20B5 500", duration: "4\u20136 hrs" },
        { id: "bridesmaid-package", name: "Bridesmaid Package", description: "Coordinated looks for the bridal party.", price: "From GH\u20B5 350/person", duration: "2\u20133 hrs each" },
        { id: "engagement-look", name: "Engagement Look", description: "Camera-ready hair for your engagement shoot.", price: "From GH\u20B5 400", duration: "3 hrs", imageUrl: "images/glam-red-celebration.png" },
        { id: "traditional-ceremony", name: "Traditional Ceremony Style", description: "Styled for kente, white, or traditional wedding events.", price: "From GH\u20B5 450", duration: "3\u20134 hrs" }
      ]
    }
  ],
  testimonials: [
    {
      text: "Baby girl, when you leave my chair, Accra is NOT ready! Best silk press I've ever had \u2014 I felt like a whole new person.",
      author: "Ama K.",
      role: "Regular Client"
    },
    {
      text: "Asantewaa did my braids and I got stopped on the street THREE times. The energy in that salon? Unmatched!",
      author: "Efua M.",
      role: "First-Timer"
    },
    {
      text: "I came in stressed, I left feeling like a celebrity. The vibes, the music, the hair \u2014 10/10 would recommend to every sis.",
      author: "Akua T.",
      role: "Bridal Client"
    },
    {
      text: "My wig install was so seamless my own mother thought it was my hair. Glam Room is THE spot in Accra, period.",
      author: "Dela S.",
      role: "Wig Install Client"
    }
  ],
  gallery: [
    { id: 1, label: "Butterfly Braids", imageUrl: "images/glam-braids-studio.png", gradient: "linear-gradient(135deg, #C75B39 0%, #D4A853 100%)" },
    { id: 2, label: "Full Glam Portrait", imageUrl: "images/glam-braids-portrait.png", gradient: "linear-gradient(135deg, #006B3F 0%, #D4A853 100%)" },
    { id: 3, label: "Red Carpet Outdoor", imageUrl: "images/glam-red-outdoor.png", gradient: "linear-gradient(135deg, #CE1126 0%, #2C1810 100%)" },
    { id: 4, label: "Bridal Glow", imageUrl: "images/glam-red-indoor.png", gradient: "linear-gradient(135deg, #D4A853 0%, #C75B39 100%)" },
    { id: 5, label: "Studio Slay", imageUrl: "images/glam-red-studio.png", gradient: "linear-gradient(135deg, #2C1810 0%, #006B3F 100%)" },
    { id: 6, label: "Celebration Glam", imageUrl: "images/glam-red-celebration.png", gradient: "linear-gradient(135deg, #CE1126 0%, #FCD116 100%)" },
    { id: 7, label: "Twist Out", gradient: "linear-gradient(135deg, #C75B39 0%, #006B3F 100%)" },
    { id: 8, label: "Glam Room Vibes", gradient: "linear-gradient(135deg, #D4A853 0%, #CE1126 100%)" }
  ],
  business: {
    tagline: "Accra's baddest hair destination \u2014 where your crown gets the main character energy it deserves.",
    extensionNotice: "Please note that all Braids prices do not include hair extensions. You can either come along with your own extensions or purchase from our salon.",
    intro: [
      "Glam Room is Asantewaa's dream salon \u2014 with two locations across Accra, so your glow up is never far away. Warm vibes, expert stylists, and zero tolerance for bad hair days at every chair.",
      "From silk press to full bridal glam, every appointment comes with main character energy included. Walk in as you are, walk out ready for Accra to stare."
    ],
    hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed"
  },
  booking: {
    // Supabase — paste credentials from Project Settings → API
    supabase: {
      url: "https://pksfslkwmlrlttoojluk.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc2ZzbGt3bWxybHR0b29qbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjMyNzcsImV4cCI6MjA5NTYzOTI3N30.put72ryG2V8E7rQLfF6omcGplgrUbHmrep8zLBvEk6M"
    },
    headline: "Book your crowning glory",
    subhead: "Select your service, pick a time, and come shine like a true Ghanaian queen \u{1F451}",
    bookingQuote: "If your hair ain't talking, you ain't walking! I don't do boring, and my Glam Room doesn't either. Come through, let's make noise!",
    promise: "No rushing, no hurting, just good vibes and fire styles.",
    tagline: "\u2728 Mama Glam Herself \u2728",
    vibeNote: "Braiding while blasting Amapiano & Afrobeats",
    tiktokHandle: "@asantewaaa_official",
    maxReservationsPerDay: 12,
    maxReservationsPerSlot: 3,
    deposit: {
      enabled: true,
      configured: false,
      provider: "moolre",
      amountGhs: 50,
      currency: "GHS",
      label: "GH\u20B5 50 commitment deposit",
      note: "Pay a commitment deposit via Mobile Money to instantly confirm your reservation.",
      submitLabel: "PAY DEPOSIT & CONFIRM",
      pendingMessage: "Your slot is held. Complete the deposit payment to confirm your reservation.",
      confirmedMessage: "You're confirmed! Your deposit secures your chair \u2014 see you at Glam Room."
    },
    timeSlots: [
      { value: "08:00", label: "08:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "14:00", label: "02:00 PM" },
      { value: "17:00", label: "05:00 PM" }
    ],
    services: [
      { value: "Braid Bomb", label: "\u{1F4A5} Braid Bomb", price: "250 GHS" },
      { value: "Mama Glam Special", label: "\u{1F469}\u{1F3FE}\u200D\u{1F9B1} Mama Glam Special", price: "450 GHS" },
      { value: "Glow Up Express", label: "\u2728 Glow Up Express", price: "150 GHS" },
      { value: "Celebrity Wig Fix", label: "\u{1F487}\u{1F3FE}\u200D\u2640\uFE0F Celebrity Wig Fix", price: "300 GHS" },
      { value: "Custom Style", label: "\u{1F451} Custom Style", price: "Price on chat" }
    ]
  },
  // Admin dashboard — admin.html (create user in Supabase → Authentication)
  admin: {
    loginEmail: "asantewaa@glamroom.com",
    clearPassword: "glamroom2024"
  },
  findBooking: {
    phonePlaceholder: "024 XXX XXXX or +233 XX XXX XXXX",
    namePlaceholder: "Last 4 letters of your name",
    submitLabel: "Check Status",
    loading: "Checking\u2026",
    invalidPhone: "Enter a valid Ghana number (e.g. 024XXXXXXX).",
    invalidName: "Enter exactly 4 letters \u2014 the last 4 letters of the name you booked with.",
    notFound: "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
    unavailable: "Booking lookup isn't connected yet. WhatsApp Glam Room to check your slot.",
    error: "Something went wrong. Please try again or WhatsApp Glam Room."
  },
  installPrompt: {
    title: "Add Glam Room to your home screen",
    body: "Open like an app \u2014 one tap from your phone, no browser bar. Perfect for booking your next slay \u{1F451}",
    installButton: "Add to Home Screen",
    iosButton: "Got it",
    laterButton: "Maybe later",
    androidHint: "Tap below to install Glam Room on this device.",
    delayMs: 3e3
  },
  serviceNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "All Services", href: "glam-room.html#services" },
    { label: "Book Appointment", href: "book.html" }
  ],
  homeNavLinks: [
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  aboutNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Analytics", href: "#analytics" },
    { label: "Campaign Pillars", href: "#pillars" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  businessNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Appointment", href: "book.html" }
  ],
  bookingNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" }
  ],
  proposalsNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  footer: {
    copyright: `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana \u{1F1EC}\u{1F1ED}"
  }
};

// supabase-client.js?v=20260536
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
var client = null;
function isSupabaseConfigured() {
  const { url, anonKey } = SITE.booking.supabase || {};
  return Boolean(
    url && anonKey && !url.includes("YOUR_SUPABASE") && !anonKey.includes("YOUR_SUPABASE")
  );
}
function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(SITE.booking.supabase.url, SITE.booking.supabase.anonKey);
  }
  return client;
}

// booking-capacity.js?v=20260536
function getMaxReservationsPerDay() {
  return SITE.booking?.maxReservationsPerDay ?? 12;
}
function getMaxReservationsPerSlot() {
  return SITE.booking?.maxReservationsPerSlot ?? 3;
}
function formatDateYmd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function countBookingsByDate(rows) {
  const counts = {};
  for (const row of rows || []) {
    const key = row.booking_date;
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}
function countBookingsByTimeSlot(rows) {
  const counts = {};
  for (const row of rows || []) {
    const key = row.booking_time;
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}
function isDateFullyBooked(dateStr, countsByDate, max = getMaxReservationsPerDay()) {
  if (!dateStr) return false;
  return (countsByDate[dateStr] || 0) >= max;
}
function isSlotFullyBooked(time, countsBySlot, max = getMaxReservationsPerSlot()) {
  if (!time) return false;
  return (countsBySlot[time] || 0) >= max;
}
function getSlotSpotsRemaining(time, countsBySlot, max = getMaxReservationsPerSlot()) {
  if (!time) return max;
  return Math.max(0, max - (countsBySlot[time] || 0));
}
function buildDateDisableFunctions(countsByDate, maxPerDay = getMaxReservationsPerDay()) {
  return [
    (date) => date.getDay() === 0,
    (date) => isDateFullyBooked(formatDateYmd(date), countsByDate, maxPerDay)
  ];
}
function isMissingColumnError(error) {
  return error?.code === "42703" || error?.code === "PGRST204";
}
async function fetchBookingCountsByDate(supabase, locationId, minDate, maxDate) {
  if (!supabase || !locationId) return {};
  const minStr = typeof minDate === "string" ? minDate : formatDateYmd(minDate);
  const maxStr = typeof maxDate === "string" ? maxDate : formatDateYmd(maxDate);
  try {
    let { data, error } = await supabase.from("bookings").select("booking_date").eq("location_id", locationId).gte("booking_date", minStr).lte("booking_date", maxStr).in("status", ["pending", "confirmed"]);
    if (isMissingColumnError(error)) {
      ({ data, error } = await supabase.from("bookings").select("booking_date").gte("booking_date", minStr).lte("booking_date", maxStr).in("status", ["pending", "confirmed"]));
    }
    if (error) throw error;
    return countBookingsByDate(data);
  } catch {
    return {};
  }
}
async function getDailyBookingCount(supabase, date, locationId) {
  if (!supabase || !date || !locationId) return 0;
  try {
    let { count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("booking_date", date).eq("location_id", locationId).in("status", ["pending", "confirmed"]);
    if (isMissingColumnError(error)) {
      ({ count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("booking_date", date).in("status", ["pending", "confirmed"]));
    }
    if (error) throw error;
    return count || 0;
  } catch {
    return 0;
  }
}
async function getSlotBookingCount(supabase, date, time, locationId) {
  if (!supabase || !date || !time || !locationId) return 0;
  try {
    let { count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("booking_date", date).eq("booking_time", time).eq("location_id", locationId).in("status", ["pending", "confirmed"]);
    if (isMissingColumnError(error)) {
      ({ count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("booking_date", date).eq("booking_time", time).in("status", ["pending", "confirmed"]));
    }
    if (error) throw error;
    return count || 0;
  } catch {
    return 0;
  }
}
function getBookingWindowDates(daysAhead = 60) {
  const minDate = /* @__PURE__ */ new Date();
  const maxDate = /* @__PURE__ */ new Date();
  maxDate.setDate(minDate.getDate() + daysAhead);
  return { minDate, maxDate };
}
function applyCapacityToDatePicker(picker, countsByDate) {
  if (!picker) return;
  picker.set("disable", buildDateDisableFunctions(countsByDate));
  picker.redraw();
}

// data.js?v=20260537
var SITE2 = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  logo: {
    white: "icons/logo-white.png",
    black: "icons/logo-black.png",
    /** Pages 6–7 use the black mark on light backgrounds */
    blackOnPages: ["booking", "admin"]
  },
  tagline: "Accra's baddest hair destination \u2014 where your crown gets the main character energy it deserves.",
  /** Wireframe document — 6 pages (PDF pages 2–7) */
  wireframePages: [
    { id: "01", label: "Home \u2014 Editorial Gateway", href: "index.html" },
    { id: "02", label: "The Enterprise \u2014 Partnerships & Influence", href: "about.html" },
    { id: "02b", label: "The Enterprise \u2014 Campaign Pillars", href: "about.html#pillars" },
    { id: "03", label: "The Glam Room \u2014 Salon Flagship", href: "glam-room.html" },
    { id: "03b", label: "The Glam Room \u2014 Signature Services", href: "glam-room.html#services" },
    { id: "04", label: "Partnerships \u2014 Brand Intake", href: "proposals.html" }
  ],
  globalFooter: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
  // UPDATE THIS with your real WhatsApp number (include country code, e.g. +233XXXXXXXXX)
  whatsapp: "+233XXXXXXXXX",
  whatsappMessage: "Hi Glam Room! I'd like to book an appointment \u{1F485}",
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
      hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-adenta-portrait.png",
      imagePosition: "center top",
      bookingValue: "glam-room-adenta"
    },
    {
      id: "glam-room-sowutuom",
      name: "Glam Room",
      area: "SOWUTUOM",
      address: "Sowutuom, Accra",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/eNIyXIhSW1kZ6rzmF",
      hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-braids-studio.png",
      imagePosition: "center top",
      bookingValue: "glam-room-sowutuom"
    }
  ],
  hero: {
    photoUrl: "images/asantewaa-gown-smile.png",
    photoAlt: "Asantewaa \u2014 Glam Room by Asantewaa",
    typewriterPhrases: ["Your Crown.", "Your Glow.", "Your Glam Room."]
  },
  home: {
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    introLoader: {
      images: [
        "images/asantewaa-kente-bw.png",
        "images/asantewaa-glam-portrait-bw.png",
        "images/asantewaa-beaded-gown-bw.png",
        "images/asantewaa-kente-color.png",
        "images/asantewaa-gown-mirror-bw.png",
        "images/asantewaa-gown-full-bw.png",
        "images/asantewaa-gown-mirror-color.png",
        "images/asantewaa-gown-joy.png",
        "images/glam-red-celebration.png",
        "images/glam-red-studio.png",
        "images/glam-braids-portrait.png",
        "images/glam-red-outdoor.png"
      ],
      slideMs: 90,
      starMs: 180,
      exitMs: 200,
      titleHoldMs: 280,
      titleSlideMs: 950,
      title: "Asantewaa",
      subtitle: "",
      letterStaggerMs: 28
    },
    panels: [
      {
        id: "hero",
        label: "",
        title: "Asantewaa",
        subtitle: "",
        imageUrl: "images/asantewaa-gown-smile.png",
        imagePosition: "center 12%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
        link: null
      },
      {
        id: "discover",
        label: "",
        title: "The Era of Influence",
        subtitle: "Orchestrating Global Dominance",
        imageUrl: "images/asantewaa-kente-color.png",
        imagePosition: "center 18%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 100%)",
        link: "about.html",
        linkText: "The Enterprise"
      },
      {
        id: "visual-2",
        imageOnly: true,
        imageUrl: "images/asantewaa-kente-bw.png",
        imagePosition: "center 15%"
      },
      {
        id: "visual-3",
        imageOnly: true,
        imageUrl: "images/asantewaa-glam-portrait-bw.png",
        imagePosition: "center 22%"
      },
      {
        id: "visual-4",
        imageOnly: true,
        imageUrl: "images/asantewaa-beaded-gown-bw.png",
        imagePosition: "center top"
      },
      {
        id: "glam",
        label: "The Glam Room",
        title: "Your Crown. Your Glow.",
        subtitle: "Accra's Premier Hair Destination",
        imageUrl: "images/asantewaa-gown-mirror-color.png",
        imagePosition: "center 28%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.78) 100%)",
        link: "glam-room.html",
        linkText: "Enter Glam Room"
      },
      {
        id: "visual-5",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-joy.png",
        imagePosition: "center 20%"
      },
      {
        id: "visual-6",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-full-bw.png",
        imagePosition: "center center"
      },
      {
        id: "visual-7",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-mirror-bw.png",
        imagePosition: "center 25%"
      },
      {
        id: "book",
        label: "Book Your Glam",
        title: "Reserve Your EXperience",
        subtitle: "Experience The Artistry",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center 22%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
        link: "book.html",
        linkText: "Book Now"
      },
      {
        id: "find-booking",
        type: "find-booking",
        label: "Track",
        title: "Find My Booking",
        subtitle: "No account needed \u2014 phone & last 4 letters of your name",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 30%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.88) 100%)"
      },
      {
        id: "visual-8",
        imageOnly: true,
        imageUrl: "images/glam-braids-portrait.png",
        imagePosition: "center top",
        link: "glam-room.html"
      }
    ]
  },
  quote: {
    text: "I didn't come to play, I came to SLAY \u2014 and so did your hair when you walk out my door. Baby girl, treat yourself. You deserve to look expensive!",
    attribution: "\u2014 Asantewaa"
  },
  about: {
    headline: "The Queen Behind the Chair",
    paragraphs: [
      "Asantewaa is Ghana's favourite TikTok star \u2014 4 million+ followers who know her for her energy, her humour, and her unapologetic Ghanaian pride. What started as viral content turned into a dream: a salon where every woman walks in feeling like herself and walks out feeling like THAT girl.",
      "Glam Room is her love letter to Accra \u2014 warm vibes, expert hands, and zero tolerance for bad hair days. Whether you're coming for a silk press or a full transformation, you're family here."
    ],
    stats: [
      { value: "4M+", label: "Followers" },
      { value: "Accra", label: "Ghana" },
      { value: "100%", label: "Good Vibes" }
    ]
  },
  enterprise: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "THE ENTERPRISE",
    topbarLeftLink: "about.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    statement: {
      imageUrl: "images/asantewaa-enterprise-statement.png",
      imageAlt: "Asantewaa \u2014 editorial portrait",
      imagePosition: "center 20%",
      displayLines: ["SHAPING", "CULTURE.", "DRIVING", "ENGAGEMENT."],
      statements: [
        "She is not just a creator.",
        "She is a cultural institution."
      ],
      body: [
        [
          "Asantewaa is a leading digital creator",
          "captivating millions weekly through viral",
          "storytelling, lifestyle, and cultural truth."
        ],
        [
          "Her community does not just follow.",
          "They act. They buy. They trust."
        ]
      ]
    },
    metrics: [
      { value: "4,000,000+", label: "TIKTOK FOLLOWERS" },
      { value: "8.4%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 2 to 4%" },
      { value: "1,000,000+", label: "INSTAGRAM FOLLOWERS" },
      { value: "5.2%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 1 to 3%" },
      { value: "12,000,000+", label: "MONTHLY VIDEO VIEWS", sublabel: "Across All Platforms" },
      { value: "18 to 38", label: "CORE AUDIENCE AGE", sublabel: "72% of Total Reach" },
      { variant: "strip", text: "68% FEMALE / 32% MALE" },
      { variant: "strip", text: "PAN-AFRICAN INFLUENCE. GLOBAL REACH." },
      { variant: "strip", text: "89K+ SNAPCHAT SUBSCRIBERS" }
    ],
    brandPartners: {
      items: [
        { name: "BRAND 1" },
        { name: "BRAND 2" },
        { name: "BRAND 3" },
        { name: "BRAND 4" },
        { name: "BRAND 5" },
        { name: "BRAND 6" }
      ]
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
            "conversion. No guesswork."
          ]
        },
        {
          id: "pro-location",
          number: "02",
          title: "PRO LOCATION CAMPAIGNS",
          body: [
            "Asantewaa travels directly to your headquarters,",
            "retail flagship, corporate office, or custom venue.",
            "Shot on location. Owned by your brand story.",
            "Deployed where your audience lives."
          ]
        },
        {
          id: "snapchat",
          number: "03",
          title: "SNAPCHAT ECOSYSTEM AMPLIFICATION",
          body: [
            "Extended campaign lifecycle inside her private",
            "premium Snapchat subscriber network.",
            "High-visibility weekly content integration.",
            "Exclusive access. Unmatched intimacy with audience."
          ]
        }
      ]
    },
    cta: {
      label: "Explore Partnerships",
      href: "proposals.html"
    }
  },
  glamRoom: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" }
    ],
    declaration: {
      title: "THE GLAM ROOM",
      byline: "BY ASANTEWAA",
      tagline: "Where the world's most driven women come to be seen, restored, and elevated."
    },
    bookingOverlay: {
      title: "RESERVE YOUR CHAIR",
      locationPrefix: "GLAM ROOM \u2014",
      submitLabel: "CONFIRM YOUR RESERVATION",
      depositNote: "A commitment deposit confirms your reservation instantly.",
      exitLabel: "X EXIT"
    },
    signatureServices: [
      {
        number: "01",
        title: "LUXURY HAIR INSTALLATION",
        descriptor: "Premier installation service. Every strand, intentional.",
        serviceId: "hair-installation"
      },
      {
        number: "02",
        title: "CUSTOM WIG STYLING & MAINTENANCE",
        descriptor: "Bespoke shaping and care. Built for your identity.",
        serviceId: "hair-reset"
      },
      {
        number: "03",
        title: "PRECISION HAIR COLORING & BLENDING",
        descriptor: "Color that looks like it was born that way.",
        serviceId: "color-highlights"
      },
      {
        number: "04",
        title: "DEEP TREATMENTS & HAIR RESTORATION",
        descriptor: "Repair. Restore. Revive. Results that speak.",
        serviceId: "natural-care"
      },
      {
        number: "05",
        title: "EDITORIAL & BRIDAL GLAM",
        descriptor: "For the moments that define you. No second takes.",
        serviceId: "bridal-glam"
      }
    ]
  },
  proposals: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "PARTNERSHIPS",
    topbarLeftLink: "proposals.html",
    hero: {
      title: "PARTNER WITH ASANTEWAA",
      subline: "Submit your brief. We respond within 48 hours through official channels only."
    },
    form: {
      submitLabel: "SUBMIT STRATEGIC BRIEFING",
      budgetTiers: [
        "Under GH\u20B5 50,000",
        "GH\u20B5 50,000 \u2013 GH\u20B5 150,000",
        "GH\u20B5 150,000 \u2013 GH\u20B5 500,000",
        "GH\u20B5 500,000+"
      ],
      pillars: [
        "01 \u2014 Demonstrative Campaigns",
        "02 \u2014 Pro Location Campaigns",
        "03 \u2014 Snapchat Ecosystem Amplification",
        "Open / Not yet selected"
      ]
    },
    compliance: [
      {
        title: "IMAGE & ASSET RIGHTS",
        body: "All creative assets licensed for 12 months from campaign launch. Organic digital distribution only."
      },
      {
        title: "PAID MEDIA AMPLIFICATION",
        body: "Boosting, dark-posting, or commercial promotion requires pre-approval plus a 30% base package premium."
      },
      {
        title: "MEDIA RESTRICTIONS",
        body: "Assets prohibited on national TV, billboards, print, or any offline or out-of-home media channels."
      },
      {
        title: "ASSET MODIFICATION",
        body: "No re-editing, cropping, or remixing without written authorisation. Unapproved changes void usage rights."
      }
    ],
    contact: {
      intro: "FOR IMMEDIATE ASSISTANCE OR OFFICIAL DOCUMENTATION APPROVALS",
      whatsappLabel: "WhatsApp Management",
      whatsapp: "+233 (0) 247 743 593",
      emailLabel: "Corporate Inbox",
      email: "martinadwamena599@gmail.com",
      locations: "ACCRA, GHANA * NEW JERSEY, USA"
    }
  },
  socials: [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@asantewaaaaa",
      icon: "fa-brands fa-tiktok"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/asantewaaaa",
      icon: "fa-brands fa-instagram"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@asantewaa",
      icon: "fa-brands fa-youtube"
    }
  ],
  services: [
    {
      id: "hair-reset",
      name: "Hair Reset",
      description: "Fresh start energy \u2014 wash, unwind, touch-ups, and quick styles to reset your crown.",
      price: "From GH\u20B5 35",
      duration: "30 min \u2013 2 hrs",
      icon: "fa-solid fa-arrows-rotate",
      badge: "Popular",
      styles: [
        { id: "hair-wash", name: "Hair Wash", description: "Cleanse and refresh your hair.", price: "GH\u20B5 35", duration: "30 min" },
        { id: "hair-wash-cornrows", name: "Hair Wash + Cornrows", description: "Wash plus cornrow styling.", price: "GH\u20B5 55", duration: "1\u20131.5 hrs" },
        { id: "unbraid-hair-wash", name: "Unbraiding & Hair Wash", description: "Take down braids and wash your hair.", price: "GH\u20B5 50", duration: "1\u20132 hrs" },
        { id: "touch-up-salon-relaxer", name: "Touch Up with Salon\u2019s Relaxer", description: "New growth touch-up using Glam Room relaxer.", price: "GH\u20B5 70", duration: "1\u20131.5 hrs" },
        { id: "touch-up-client-relaxer", name: "Touch Up with Client\u2019s Relaxer", description: "New growth touch-up using your own relaxer.", price: "GH\u20B5 50", duration: "1\u20131.5 hrs" },
        { id: "normal-ponytail", name: "Normal Ponytail", description: "Sleek, styled ponytail finish.", price: "GH\u20B5 80", duration: "45 min \u2013 1 hr" }
      ]
    },
    {
      id: "hair-installation",
      name: "Hair Installation Services",
      description: "Closure and frontal installs \u2014 secure, natural, and styled to slay.",
      price: "From GH\u20B5 50",
      duration: "1\u20132 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
      styles: [
        { id: "closure-install", name: "Closure Hair Install", description: "Closure unit installed and styled.", price: "GH\u20B5 50", duration: "1\u20131.5 hrs" },
        { id: "frontal-install", name: "Frontal Hair Install", description: "Frontal unit installed with a natural hairline.", price: "GH\u20B5 100", duration: "1.5\u20132 hrs" },
        { id: "frontal-ponytail", name: "Frontal Ponytail", description: "Frontal install finished in a sleek ponytail style.", price: "GH\u20B5 150", duration: "1.5\u20132 hrs" }
      ]
    },
    {
      id: "braiding-workmanship",
      name: "Braids (Workmanship Only)",
      description: "Expert braiding by length \u2014 you bring the hair, we bring the hands. Workmanship only.",
      price: "From GH\u20B5 150",
      duration: "3\u20138 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
      styles: [
        { id: "shoulder-length", name: "Shoulder Length", description: "Braiding service to shoulder length. Hair not included.", price: "GH\u20B5 150", duration: "3\u20134 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "bra-length", name: "Bra Length", description: "Braiding service to bra strap length. Hair not included.", price: "GH\u20B5 200", duration: "4\u20135 hrs" },
        { id: "hip-length", name: "Hip Length", description: "Braiding service to hip length. Hair not included.", price: "GH\u20B5 250", duration: "5\u20136 hrs" },
        { id: "butt-length", name: "Butt Length", description: "Braiding service to butt length. Hair not included.", price: "GH\u20B5 300", duration: "6\u20137 hrs" },
        { id: "under-butt", name: "Under Butt", description: "Braiding service past butt length. Hair not included.", price: "GH\u20B5 400", duration: "7\u20138 hrs", imageUrl: "images/glam-braids-portrait.png" }
      ]
    },
    {
      id: "natural-care",
      name: "Natural Hair Care",
      description: "Deep conditioning, trims, and treatments that love your natural texture back to life.",
      price: "From GH\u20B5 100",
      duration: "1\u20132 hrs",
      icon: "fa-solid fa-leaf",
      badge: null,
      styles: [
        { id: "deep-condition", name: "Deep Conditioning", description: "Intensive moisture treatment for dry, tired hair.", price: "GH\u20B5 100", duration: "1 hr" },
        { id: "trim-shape", name: "Trim & Shape", description: "Health trim to keep your ends fresh.", price: "GH\u20B5 80", duration: "45 min" },
        { id: "steam-treatment", name: "Steam Treatment", description: "Steam-assisted hydration for max absorption.", price: "GH\u20B5 130", duration: "1\u20131.5 hrs" },
        { id: "protein-treatment", name: "Protein Treatment", description: "Strengthen weak or over-processed strands.", price: "GH\u20B5 140", duration: "1.5 hrs" },
        { id: "wash-go-style", name: "Wash & Go Style", description: "Define and set your natural curl pattern.", price: "GH\u20B5 120", duration: "1\u20132 hrs" }
      ]
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      description: "Bold colour, subtle highlights, or a full transformation \u2014 let's make you unforgettable.",
      price: "From GH\u20B5 250",
      duration: "3\u20134 hrs",
      icon: "fa-solid fa-palette",
      badge: null,
      styles: [
        { id: "full-color", name: "Full Color", description: "All-over colour transformation.", price: "From GH\u20B5 350", duration: "3\u20134 hrs", imageUrl: "images/glam-red-studio.png" },
        { id: "highlights", name: "Highlights", description: "Face-framing or full-head highlights.", price: "From GH\u20B5 280", duration: "3 hrs" },
        { id: "ombre-balayage", name: "Ombr\xE9 / Balayage", description: "Gradual colour melt \u2014 subtle or bold.", price: "From GH\u20B5 400", duration: "4\u20135 hrs" },
        { id: "root-touchup", name: "Root Touch-up", description: "Refresh grown-out roots to match your colour.", price: "GH\u20B5 250", duration: "2 hrs" }
      ]
    },
    {
      id: "bridal-glam",
      name: "Bridal Glam",
      description: "Your big day deserves a crown that stops the room. Bridal packages with all the extras.",
      price: "From GH\u20B5 500",
      duration: "Full day",
      icon: "fa-solid fa-gem",
      badge: "Premium",
      styles: [
        { id: "bridal-hair-makeup", name: "Bridal Hair & Makeup", description: "Full bridal glam \u2014 hair, makeup, and touch-ups.", price: "From GH\u20B5 800", duration: "Full day", imageUrl: "images/glam-red-indoor.png" },
        { id: "bridal-hair-only", name: "Bridal Hair Only", description: "Wedding-day hairstyle with trial session.", price: "From GH\u20B5 500", duration: "4\u20136 hrs" },
        { id: "bridesmaid-package", name: "Bridesmaid Package", description: "Coordinated looks for the bridal party.", price: "From GH\u20B5 350/person", duration: "2\u20133 hrs each" },
        { id: "engagement-look", name: "Engagement Look", description: "Camera-ready hair for your engagement shoot.", price: "From GH\u20B5 400", duration: "3 hrs", imageUrl: "images/glam-red-celebration.png" },
        { id: "traditional-ceremony", name: "Traditional Ceremony Style", description: "Styled for kente, white, or traditional wedding events.", price: "From GH\u20B5 450", duration: "3\u20134 hrs" }
      ]
    }
  ],
  testimonials: [
    {
      text: "Baby girl, when you leave my chair, Accra is NOT ready! Best silk press I've ever had \u2014 I felt like a whole new person.",
      author: "Ama K.",
      role: "Regular Client"
    },
    {
      text: "Asantewaa did my braids and I got stopped on the street THREE times. The energy in that salon? Unmatched!",
      author: "Efua M.",
      role: "First-Timer"
    },
    {
      text: "I came in stressed, I left feeling like a celebrity. The vibes, the music, the hair \u2014 10/10 would recommend to every sis.",
      author: "Akua T.",
      role: "Bridal Client"
    },
    {
      text: "My wig install was so seamless my own mother thought it was my hair. Glam Room is THE spot in Accra, period.",
      author: "Dela S.",
      role: "Wig Install Client"
    }
  ],
  gallery: [
    { id: 1, label: "Butterfly Braids", imageUrl: "images/glam-braids-studio.png", gradient: "linear-gradient(135deg, #C75B39 0%, #D4A853 100%)" },
    { id: 2, label: "Full Glam Portrait", imageUrl: "images/glam-braids-portrait.png", gradient: "linear-gradient(135deg, #006B3F 0%, #D4A853 100%)" },
    { id: 3, label: "Red Carpet Outdoor", imageUrl: "images/glam-red-outdoor.png", gradient: "linear-gradient(135deg, #CE1126 0%, #2C1810 100%)" },
    { id: 4, label: "Bridal Glow", imageUrl: "images/glam-red-indoor.png", gradient: "linear-gradient(135deg, #D4A853 0%, #C75B39 100%)" },
    { id: 5, label: "Studio Slay", imageUrl: "images/glam-red-studio.png", gradient: "linear-gradient(135deg, #2C1810 0%, #006B3F 100%)" },
    { id: 6, label: "Celebration Glam", imageUrl: "images/glam-red-celebration.png", gradient: "linear-gradient(135deg, #CE1126 0%, #FCD116 100%)" },
    { id: 7, label: "Twist Out", gradient: "linear-gradient(135deg, #C75B39 0%, #006B3F 100%)" },
    { id: 8, label: "Glam Room Vibes", gradient: "linear-gradient(135deg, #D4A853 0%, #CE1126 100%)" }
  ],
  business: {
    tagline: "Accra's baddest hair destination \u2014 where your crown gets the main character energy it deserves.",
    extensionNotice: "Please note that all Braids prices do not include hair extensions. You can either come along with your own extensions or purchase from our salon.",
    intro: [
      "Glam Room is Asantewaa's dream salon \u2014 with two locations across Accra, so your glow up is never far away. Warm vibes, expert stylists, and zero tolerance for bad hair days at every chair.",
      "From silk press to full bridal glam, every appointment comes with main character energy included. Walk in as you are, walk out ready for Accra to stare."
    ],
    hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed"
  },
  booking: {
    // Supabase — paste credentials from Project Settings → API
    supabase: {
      url: "https://pksfslkwmlrlttoojluk.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc2ZzbGt3bWxybHR0b29qbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjMyNzcsImV4cCI6MjA5NTYzOTI3N30.put72ryG2V8E7rQLfF6omcGplgrUbHmrep8zLBvEk6M"
    },
    headline: "Book your crowning glory",
    subhead: "Select your service, pick a time, and come shine like a true Ghanaian queen \u{1F451}",
    bookingQuote: "If your hair ain't talking, you ain't walking! I don't do boring, and my Glam Room doesn't either. Come through, let's make noise!",
    promise: "No rushing, no hurting, just good vibes and fire styles.",
    tagline: "\u2728 Mama Glam Herself \u2728",
    vibeNote: "Braiding while blasting Amapiano & Afrobeats",
    tiktokHandle: "@asantewaaa_official",
    maxReservationsPerDay: 12,
    maxReservationsPerSlot: 3,
    deposit: {
      enabled: true,
      configured: false,
      provider: "moolre",
      amountGhs: 50,
      currency: "GHS",
      label: "GH\u20B5 50 commitment deposit",
      note: "Pay a commitment deposit via Mobile Money to instantly confirm your reservation.",
      submitLabel: "PAY DEPOSIT & CONFIRM",
      pendingMessage: "Your slot is held. Complete the deposit payment to confirm your reservation.",
      confirmedMessage: "You're confirmed! Your deposit secures your chair \u2014 see you at Glam Room."
    },
    timeSlots: [
      { value: "08:00", label: "08:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "14:00", label: "02:00 PM" },
      { value: "17:00", label: "05:00 PM" }
    ],
    services: [
      { value: "Braid Bomb", label: "\u{1F4A5} Braid Bomb", price: "250 GHS" },
      { value: "Mama Glam Special", label: "\u{1F469}\u{1F3FE}\u200D\u{1F9B1} Mama Glam Special", price: "450 GHS" },
      { value: "Glow Up Express", label: "\u2728 Glow Up Express", price: "150 GHS" },
      { value: "Celebrity Wig Fix", label: "\u{1F487}\u{1F3FE}\u200D\u2640\uFE0F Celebrity Wig Fix", price: "300 GHS" },
      { value: "Custom Style", label: "\u{1F451} Custom Style", price: "Price on chat" }
    ]
  },
  // Admin dashboard — admin.html (create user in Supabase → Authentication)
  admin: {
    loginEmail: "asantewaa@glamroom.com",
    clearPassword: "glamroom2024"
  },
  findBooking: {
    phonePlaceholder: "024 XXX XXXX or +233 XX XXX XXXX",
    namePlaceholder: "Last 4 letters of your name",
    submitLabel: "Check Status",
    loading: "Checking\u2026",
    invalidPhone: "Enter a valid Ghana number (e.g. 024XXXXXXX).",
    invalidName: "Enter exactly 4 letters \u2014 the last 4 letters of the name you booked with.",
    notFound: "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
    unavailable: "Booking lookup isn't connected yet. WhatsApp Glam Room to check your slot.",
    error: "Something went wrong. Please try again or WhatsApp Glam Room."
  },
  installPrompt: {
    title: "Add Glam Room to your home screen",
    body: "Open like an app \u2014 one tap from your phone, no browser bar. Perfect for booking your next slay \u{1F451}",
    installButton: "Add to Home Screen",
    iosButton: "Got it",
    laterButton: "Maybe later",
    androidHint: "Tap below to install Glam Room on this device.",
    delayMs: 3e3
  },
  serviceNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "All Services", href: "glam-room.html#services" },
    { label: "Book Appointment", href: "book.html" }
  ],
  homeNavLinks: [
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  aboutNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Analytics", href: "#analytics" },
    { label: "Campaign Pillars", href: "#pillars" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  businessNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Appointment", href: "book.html" }
  ],
  bookingNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" }
  ],
  proposalsNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  footer: {
    copyright: `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana \u{1F1EC}\u{1F1ED}"
  }
};

// supabase-client.js?v=20260537
import { createClient as createClient2 } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
var client2 = null;
function isSupabaseConfigured2() {
  const { url, anonKey } = SITE.booking.supabase || {};
  return Boolean(
    url && anonKey && !url.includes("YOUR_SUPABASE") && !anonKey.includes("YOUR_SUPABASE")
  );
}
function getSupabase2() {
  if (!isSupabaseConfigured2()) return null;
  if (!client2) {
    client2 = createClient2(SITE.booking.supabase.url, SITE.booking.supabase.anonKey);
  }
  return client2;
}

// booking-payment.js?v=20260537
function getDepositConfig() {
  return SITE2.booking?.deposit || {};
}
function isDepositPaymentEnabled() {
  const deposit = getDepositConfig();
  return Boolean(deposit.enabled && deposit.provider === "moolre" && deposit.configured);
}
async function confirmDepositPayment(reference, bookingId) {
  const supabase = getSupabase2();
  if (!supabase) throw new Error("Booking system unavailable.");
  const { data, error } = await supabase.functions.invoke("confirm-deposit", {
    body: { reference, booking_id: bookingId }
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  if (!data?.ok) throw new Error("Deposit could not be verified.");
  return data;
}
async function startDepositPayment({ bookingId, email, phone, fullName, returnPath }) {
  if (!isDepositPaymentEnabled()) {
    throw new Error("Deposit payments are not configured yet.");
  }
  const supabase = getSupabase2();
  if (!supabase) throw new Error("Booking system unavailable.");
  const { data, error } = await supabase.functions.invoke("initiate-deposit", {
    body: {
      booking_id: bookingId,
      email: email || "",
      phone,
      full_name: fullName,
      return_path: returnPath || window.location.pathname
    }
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  if (!data?.authorization_url) throw new Error("Could not start payment.");
  sessionStorage.setItem(
    "grPendingDeposit",
    JSON.stringify({ bookingId, reference: data.reference })
  );
  window.location.href = data.authorization_url;
}
function clearDepositReturnParams() {
  const url = new URL(window.location.href);
  url.searchParams.delete("deposit");
  url.searchParams.delete("booking_id");
  url.searchParams.delete("ref");
  history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}
function showDepositReturnBanner(message, type = "success") {
  let banner = document.getElementById("deposit-return-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "deposit-return-banner";
    banner.className = "deposit-return-banner";
    document.body.prepend(banner);
  }
  banner.textContent = message;
  banner.dataset.type = type;
  banner.hidden = false;
}
async function handleDepositReturn(handlers = {}) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("deposit") !== "return") return false;
  const bookingId = params.get("booking_id");
  const reference = params.get("ref");
  if (!bookingId || !reference) return false;
  try {
    await confirmDepositPayment(reference, bookingId);
    sessionStorage.removeItem("grPendingDeposit");
    clearDepositReturnParams();
    const message = getDepositConfig().confirmedMessage || "You're confirmed! Your deposit secures your reservation.";
    if (handlers.onSuccess) {
      handlers.onSuccess(message);
    } else {
      showDepositReturnBanner(message, "success");
    }
    return true;
  } catch (err) {
    clearDepositReturnParams();
    const message = getDepositConfig().pendingMessage || "Your slot is held. Complete the deposit to confirm your reservation.";
    if (handlers.onPending) {
      handlers.onPending(message, err);
    } else {
      showDepositReturnBanner(message, "pending");
    }
    return false;
  }
}

// booking.js?v=20260541
var slotBookingCounts = {};
var datePicker = null;
var capacityByDate = {};
function populateServiceCategories() {
  const categorySelect = document.getElementById("serviceCategory");
  if (!categorySelect) return;
  categorySelect.innerHTML = '<option value="">\u2014 Select category \u2014</option>' + SITE.services.map((service) => `<option value="${service.id}">${service.name}</option>`).join("");
}
function populateServiceStyles(serviceId, selectedStyleId = "") {
  const styleSelect = document.getElementById("serviceStyle");
  if (!styleSelect) return;
  const service = findServiceById(serviceId);
  const styles = service?.styles || [];
  if (!serviceId || !styles.length) {
    styleSelect.innerHTML = '<option value="">\u2014 Select category first \u2014</option>';
    styleSelect.value = "";
    styleSelect.disabled = true;
    return;
  }
  styleSelect.disabled = false;
  styleSelect.innerHTML = '<option value="">\u2014 Select service \u2014</option>' + styles.map((style) => `<option value="${style.id}">${style.name} \u2014 ${style.price}</option>`).join("");
  if (selectedStyleId && styles.some((style) => style.id === selectedStyleId)) {
    styleSelect.value = selectedStyleId;
  }
}
function getSelectedBookingService() {
  const serviceId = document.getElementById("serviceCategory")?.value || "";
  const styleId = document.getElementById("serviceStyle")?.value || "";
  const service = findServiceById(serviceId);
  const style = findServiceStyle(serviceId, styleId);
  if (!service || !style) return "";
  return `${service.name} \u2014 ${style.name}`;
}
function applyBookingServiceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("service");
  const styleId = params.get("style");
  if (!serviceId) return;
  const categorySelect = document.getElementById("serviceCategory");
  if (categorySelect && findServiceById(serviceId)) {
    categorySelect.value = serviceId;
    populateServiceStyles(serviceId, styleId || "");
    updateSummary();
  }
}
function applyBookingLocationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const locationValue = params.get("location");
  if (!locationValue) return;
  const locationSelect = document.getElementById("location");
  if (!locationSelect) return;
  const hasOption = Array.from(locationSelect.options).some(
    (option) => option.value === locationValue
  );
  if (!hasOption) return;
  locationSelect.value = locationValue;
  locationSelect.dispatchEvent(new Event("change"));
  updateSummary();
}
function populateBookingPage() {
  document.getElementById("booking-subhead").textContent = SITE.booking.subhead;
  document.getElementById("booking-quote").innerHTML = `
    <i class="fas fa-quote-left" style="color: var(--gold); margin-right: 0.4rem;"></i>
    "${SITE.booking.bookingQuote}"
    <div style="margin-top: 0.5rem; font-weight: 600; font-style: normal;">\u2014 ${SITE.owner} \u{1F1EC}\u{1F1ED}</div>
  `;
  document.getElementById("booking-promise").innerHTML = `
    <i class="fas fa-gem" style="color: var(--gold);"></i>
    <strong>Mama Glam's Promise:</strong> ${SITE.booking.promise}
  `;
  document.getElementById("booking-tag").textContent = SITE.booking.tagline;
  const locationsList = document.getElementById("booking-locations-list");
  if (locationsList) {
    locationsList.innerHTML = SITE.locations.map((loc) => {
      const label = getLocationLabel(loc);
      const brand = loc.name?.trim();
      const showBrand = brand && label !== brand;
      return `
      <li>
        <i class="fas fa-map-marker-alt"></i>
        <strong>${label}</strong>
        ${showBrand ? `<br><span style="opacity:0.85;font-size:0.88em">${brand}</span>` : ""}
      </li>
    `;
    }).join("");
  }
  const locationSelect = document.getElementById("location");
  if (locationSelect) {
    locationSelect.innerHTML = '<option value="">\u2014 Select location \u2014</option>' + SITE.locations.map((loc) => {
      const label = getLocationLabel(loc);
      return `<option value="${getLocationBookingValue(loc)}">${label}</option>`;
    }).join("");
  }
  document.getElementById("booking-hours").textContent = SITE.booking.hours || SITE.business.hours;
  document.getElementById("booking-tiktok").textContent = `Follow me: ${SITE.booking.tiktokHandle}`;
  document.getElementById("booking-vibe").textContent = SITE.booking.vibeNote;
  populateServiceCategories();
  populateServiceStyles("");
  applyBookingServiceFromUrl();
  const timeSelect = document.getElementById("time");
  timeSelect.innerHTML = '<option value="">Select time</option>' + SITE.booking.timeSlots.map((t) => `<option value="${t.value}">${t.label}</option>`).join("");
  const waAlt = document.getElementById("booking-wa-alt");
  if (waAlt) {
    const num = SITE.whatsapp.replace(/[^0-9+]/g, "").replace("+", "");
    waAlt.href = `https://wa.me/${num}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
    waAlt.setAttribute("target", "_blank");
    waAlt.setAttribute("rel", "noopener noreferrer");
  }
}
function markFullyBookedCalendarDays(_dObj, _dStr, _fp, dayElem) {
  const dateStr = formatDateYmd(dayElem.dateObj);
  if (isDateFullyBooked(dateStr, capacityByDate)) {
    dayElem.classList.add("fully-booked-day");
    dayElem.setAttribute("title", "Fully booked");
    dayElem.setAttribute("aria-disabled", "true");
  }
}
function initDatePicker() {
  if (typeof flatpickr === "undefined") return;
  const { minDate, maxDate } = getBookingWindowDates();
  datePicker = flatpickr("#date", {
    minDate,
    maxDate,
    dateFormat: "Y-m-d",
    disable: buildDateDisableFunctions(capacityByDate),
    onDayCreate: markFullyBookedCalendarDays,
    onChange(_selectedDates, dateStr) {
      updateSummary();
      fetchBookedSlots(dateStr);
    }
  });
}
async function refreshBookingDateCapacity() {
  const locationId = getSelectedLocationId();
  const supabase = getSupabase();
  if (!supabase || !locationId) {
    capacityByDate = {};
    applyCapacityToDatePicker(datePicker, capacityByDate);
    return;
  }
  const { minDate, maxDate } = getBookingWindowDates();
  capacityByDate = await fetchBookingCountsByDate(supabase, locationId, minDate, maxDate);
  applyCapacityToDatePicker(datePicker, capacityByDate);
  const selectedDate = document.getElementById("date")?.value;
  if (selectedDate && isDateFullyBooked(selectedDate, capacityByDate)) {
    datePicker?.clear();
    slotBookingCounts = {};
    updateTimeSlotAvailability();
    updateSummary();
  }
}
function getSelectedLocationId() {
  return document.getElementById("location")?.value || "";
}
function isMissingColumnError2(error) {
  return error?.code === "42703" || error?.code === "PGRST204";
}
function toDbRow(booking, withLocationColumns) {
  const row = {
    full_name: booking.fullName,
    phone: booking.phone,
    email: booking.email || null,
    service: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    status: "pending",
    payment_status: "pending"
  };
  if (withLocationColumns) {
    row.location_id = booking.locationId;
    row.location = booking.location;
    row.notes = booking.notes || null;
  } else {
    const locationLine = booking.location ? `[Location: ${booking.location}]` : "";
    row.notes = [locationLine, booking.notes].filter(Boolean).join("\n").trim() || null;
  }
  return row;
}
async function insertBooking(supabase, booking) {
  let result = await supabase.from("bookings").insert([toDbRow(booking, true)]).select("id").single();
  if (isMissingColumnError2(result.error)) {
    result = await supabase.from("bookings").insert([toDbRow(booking, false)]).select("id").single();
  }
  if (result.error) throw result.error;
  return result.data?.id;
}
async function fetchBookedSlots(date) {
  const locationId = getSelectedLocationId();
  if (!date || !locationId) {
    slotBookingCounts = {};
    updateTimeSlotAvailability();
    return;
  }
  const supabase = getSupabase();
  if (!supabase) {
    slotBookingCounts = {};
    updateTimeSlotAvailability();
    return;
  }
  try {
    let { data, error } = await supabase.from("bookings").select("booking_time").eq("booking_date", date).eq("location_id", locationId).in("status", ["pending", "confirmed"]);
    if (isMissingColumnError2(error)) {
      ({ data, error } = await supabase.from("bookings").select("booking_time").eq("booking_date", date).in("status", ["pending", "confirmed"]));
    }
    if (error) throw error;
    slotBookingCounts = countBookingsByTimeSlot(data);
    updateTimeSlotAvailability();
  } catch (err) {
    console.error("Error fetching bookings:", err);
    slotBookingCounts = {};
    updateTimeSlotAvailability();
  }
}
function formatTimeSlotLabel(label, timeValue) {
  const max = getMaxReservationsPerSlot();
  const booked = slotBookingCounts[timeValue] || 0;
  const remaining = getSlotSpotsRemaining(timeValue, slotBookingCounts, max);
  if (remaining <= 0) {
    return `${label} \u2014 Full`;
  }
  if (booked > 0) {
    const spotWord = remaining === 1 ? "spot" : "spots";
    return `${label} \u2014 ${remaining} ${spotWord} left`;
  }
  return label;
}
function updateTimeSlotAvailability() {
  const timeSelect = document.getElementById("time");
  if (!timeSelect) return;
  const selectedTime = timeSelect.value;
  SITE.booking.timeSlots.forEach(({ value, label }) => {
    const option = timeSelect.querySelector(`option[value="${value}"]`);
    if (!option) return;
    if (isSlotFullyBooked(value, slotBookingCounts)) {
      option.disabled = true;
      option.textContent = `${label} \u2014 Full`;
    } else {
      option.disabled = false;
      option.textContent = formatTimeSlotLabel(label, value);
    }
  });
  if (selectedTime && isSlotFullyBooked(selectedTime, slotBookingCounts)) {
    timeSelect.value = "";
  }
}
function updateSummary() {
  const name = document.getElementById("fullName").value.trim() || "Queen";
  const locationId = getSelectedLocationId();
  const location = getLocationLabelById(locationId);
  const service = getSelectedBookingService();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const summaryDiv = document.getElementById("liveSummary");
  if (service && locationId && date && time) {
    summaryDiv.innerHTML = `
      <i class="fas fa-check-circle" style="color: var(--terracotta);"></i>
      <strong>Booking summary:</strong><br>
      \u{1F451} ${name} \xB7 ${service}<br>
      \u{1F4CD} ${location}<br>
      \u{1F4C5} ${date} at ${time}<br>
      <span style="font-size: 0.82rem;">\u{1F4B0} Pay at salon. Mama Glam dey wait you!</span>
    `;
  } else if (service && locationId) {
    summaryDiv.innerHTML = `<i class="fas fa-info-circle"></i> Pick date and time to complete your booking.`;
  } else if (service) {
    summaryDiv.innerHTML = `<i class="fas fa-info-circle"></i> Pick date and time to complete your booking.`;
  } else {
    summaryDiv.innerHTML = `<i class="fas fa-info-circle"></i> Select a general service and specific style to see your summary.`;
  }
}
function validatePhone(phone) {
  return /^(\+233|0)[0-9]{9}$/.test(phone.replace(/\s/g, ""));
}
function showSuccess(message) {
  const el = document.getElementById("successMessage");
  document.getElementById("successText").innerHTML = message;
  el.style.display = "block";
  document.getElementById("errorMessage").style.display = "none";
  setTimeout(() => {
    el.style.display = "none";
  }, 1e4);
}
function showError(message, { html = false } = {}) {
  const el = document.getElementById("errorMessage");
  const textEl = document.getElementById("errorText");
  if (html) {
    textEl.innerHTML = message;
  } else {
    textEl.textContent = message;
  }
  el.style.display = "block";
  document.getElementById("successMessage").style.display = "none";
  setTimeout(() => {
    el.style.display = "none";
  }, 6e3);
}
function resetButton(btn) {
  btn.innerHTML = '<i class="fas fa-calendar-plus"></i> Book My Glam Session';
  btn.disabled = false;
}
function getWhatsAppFallbackUrl(bookingData) {
  const num = SITE.whatsapp.replace(/[^0-9+]/g, "").replace("+", "");
  const msg = encodeURIComponent(
    `Hi Asantewaa! I'd like to book:

Name: ${bookingData.fullName}
Location: ${bookingData.location}
Service: ${bookingData.service}
Date: ${bookingData.date}
Time: ${bookingData.time}
` + (bookingData.notes ? `Notes: ${bookingData.notes}` : "")
  );
  return `https://wa.me/${num}?text=${msg}`;
}
async function handleSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerHTML = '<span class="booking-loader"></span> Abeg small, booking...';
  submitBtn.disabled = true;
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("errorMessage").style.display = "none";
  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const locationId = getSelectedLocationId();
  const location = getLocationLabelById(locationId);
  const service = getSelectedBookingService();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const notes = document.getElementById("notes").value.trim();
  if (!fullName) {
    showError("Abeg, tell us who's coming to slay! \u{1F481}\u{1F3FE}\u200D\u2640\uFE0F");
    resetButton(submitBtn);
    return;
  }
  if (!validatePhone(phone)) {
    showError("Chale! Enter correct Ghana number (e.g., 024XXXXXXX or +233XXXXXXXXX) \u{1F4F1}");
    resetButton(submitBtn);
    return;
  }
  if (!locationId) {
    showError("Pick which Glam Room location you dey come to! \u{1F4CD}");
    resetButton(submitBtn);
    return;
  }
  if (!getSelectedBookingService()) {
    showError("Pick a general service and specific style, mama! We no fit guess your hair dreams \u{1F525}");
    resetButton(submitBtn);
    return;
  }
  if (!date) {
    showError("Pick date. Make you no just show anyhow o! \u{1F4C5}");
    resetButton(submitBtn);
    return;
  }
  if (!time) {
    showError("Select time. Asantewaa no dey sleep for shop \u{1F634}");
    resetButton(submitBtn);
    return;
  }
  if (isSlotFullyBooked(time, slotBookingCounts)) {
    showError("Eh! This time slot is full. Choose another time, queen \u{1F451}");
    resetButton(submitBtn);
    return;
  }
  const bookingData = {
    fullName,
    phone,
    email,
    locationId,
    location,
    service: getSelectedBookingService(),
    date,
    time,
    notes
  };
  if (!isSupabaseConfigured()) {
    const waUrl = getWhatsAppFallbackUrl(bookingData);
    showSuccess(`\u26A0\uFE0F Online booking isn't connected yet. WhatsApp Asantewaa to confirm: <a href="${waUrl}" target="_blank" rel="noopener noreferrer">Tap to chat on WhatsApp</a>`);
    resetButton(submitBtn);
    return;
  }
  const supabase = getSupabase();
  try {
    const dailyCount = await getDailyBookingCount(supabase, date, locationId);
    if (dailyCount >= getMaxReservationsPerDay()) {
      showError("This date is fully booked at this location. Please choose another day.");
      resetButton(submitBtn);
      datePicker?.clear();
      await refreshBookingDateCapacity();
      return;
    }
    const slotCount = await getSlotBookingCount(supabase, date, time, locationId);
    if (slotCount >= getMaxReservationsPerSlot()) {
      showError("Eh! This time slot is full. Choose another time, queen \u{1F451}");
      resetButton(submitBtn);
      await fetchBookedSlots(date);
      return;
    }
    const bookingId = await insertBooking(supabase, bookingData);
    if (isDepositPaymentEnabled() && bookingId) {
      showSuccess("Redirecting to secure payment\u2026");
      await startDepositPayment({
        bookingId,
        email,
        phone,
        fullName,
        returnPath: window.location.pathname
      });
      return;
    }
    showSuccess(
      `\u{1F525} SUCCESS! ${fullName}, your booking at <strong>${location}</strong> for ${service} on ${date} at ${time} don land in our system! Asantewaa go confirm via WhatsApp soon. Come slay! \u{1F451}`
    );
    document.getElementById("fullName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("location").value = "";
    document.getElementById("serviceCategory").value = "";
    populateServiceStyles("");
    if (datePicker) datePicker.clear();
    document.getElementById("time").value = "";
    updateSummary();
    await refreshBookingDateCapacity();
    await fetchBookedSlots(date);
  } catch (err) {
    console.error("Booking error:", err);
    const limitReached = err?.message?.includes("Daily booking limit") || err?.details?.includes("Daily booking limit") || err?.message?.includes("Time slot fully booked") || err?.details?.includes("Time slot fully booked");
    if (limitReached) {
      const slotFull = err?.message?.includes("Time slot fully booked") || err?.details?.includes("Time slot fully booked");
      showError(
        slotFull ? "Eh! This time slot is full. Choose another time, queen \u{1F451}" : "This date is fully booked at this location. Please choose another day."
      );
      if (!slotFull) datePicker?.clear();
      await refreshBookingDateCapacity();
      await fetchBookedSlots(document.getElementById("date")?.value || "");
      resetButton(submitBtn);
      return;
    }
    const waUrl = getWhatsAppFallbackUrl(bookingData);
    showError(
      `Something went wrong: ${err.message || "Please try again"}. Or <a href="${waUrl}" target="_blank" rel="noopener noreferrer">WhatsApp Asantewaa directly</a>.`,
      { html: true }
    );
  }
  resetButton(submitBtn);
}
function initBookingForm() {
  populateBookingPage();
  initDatePicker();
  handleDepositReturn({
    onSuccess: (message) => showSuccess(message)
  });
  document.getElementById("fullName")?.addEventListener("input", updateSummary);
  document.getElementById("location")?.addEventListener("change", async () => {
    updateSummary();
    await refreshBookingDateCapacity();
    await fetchBookedSlots(document.getElementById("date")?.value || "");
  });
  document.getElementById("serviceCategory")?.addEventListener("change", (e) => {
    populateServiceStyles(e.target.value);
    updateSummary();
  });
  document.getElementById("serviceStyle")?.addEventListener("change", updateSummary);
  document.getElementById("time")?.addEventListener("change", updateSummary);
  document.getElementById("bookingForm")?.addEventListener("submit", handleSubmit);
  applyBookingLocationFromUrl();
}

// data.js?v=20260541
function getLocationBookingValue2(loc) {
  return loc.bookingValue?.trim() || loc.id;
}
function findLocationById2(id) {
  return SITE3.locations?.find((loc) => loc.id === id);
}
var SITE3 = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  logo: {
    white: "icons/logo-white.png",
    black: "icons/logo-black.png",
    /** Pages 6–7 use the black mark on light backgrounds */
    blackOnPages: ["booking", "admin"]
  },
  tagline: "Accra's baddest hair destination \u2014 where your crown gets the main character energy it deserves.",
  /** Wireframe document — 6 pages (PDF pages 2–7) */
  wireframePages: [
    { id: "01", label: "Home \u2014 Editorial Gateway", href: "index.html" },
    { id: "02", label: "The Enterprise \u2014 Partnerships & Influence", href: "about.html" },
    { id: "02b", label: "The Enterprise \u2014 Campaign Pillars", href: "about.html#pillars" },
    { id: "03", label: "The Glam Room \u2014 Salon Flagship", href: "glam-room.html" },
    { id: "03b", label: "The Glam Room \u2014 Signature Services", href: "glam-room.html#services" },
    { id: "04", label: "Partnerships \u2014 Brand Intake", href: "proposals.html" }
  ],
  globalFooter: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
  // UPDATE THIS with your real WhatsApp number (include country code, e.g. +233XXXXXXXXX)
  whatsapp: "+233XXXXXXXXX",
  whatsappMessage: "Hi Glam Room! I'd like to book an appointment \u{1F485}",
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
      hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-adenta-portrait.png",
      imagePosition: "center top",
      bookingValue: "glam-room-adenta"
    },
    {
      id: "glam-room-sowutuom",
      name: "Glam Room",
      area: "SOWUTUOM",
      address: "Sowutuom, Accra",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/eNIyXIhSW1kZ6rzmF",
      hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-braids-studio.png",
      imagePosition: "center top",
      bookingValue: "glam-room-sowutuom"
    }
  ],
  hero: {
    photoUrl: "images/asantewaa-gown-smile.png",
    photoAlt: "Asantewaa \u2014 Glam Room by Asantewaa",
    typewriterPhrases: ["Your Crown.", "Your Glow.", "Your Glam Room."]
  },
  home: {
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    introLoader: {
      images: [
        "images/asantewaa-kente-bw.png",
        "images/asantewaa-glam-portrait-bw.png",
        "images/asantewaa-beaded-gown-bw.png",
        "images/asantewaa-kente-color.png",
        "images/asantewaa-gown-mirror-bw.png",
        "images/asantewaa-gown-full-bw.png",
        "images/asantewaa-gown-mirror-color.png",
        "images/asantewaa-gown-joy.png",
        "images/glam-red-celebration.png",
        "images/glam-red-studio.png",
        "images/glam-braids-portrait.png",
        "images/glam-red-outdoor.png"
      ],
      slideMs: 90,
      starMs: 180,
      exitMs: 200,
      titleHoldMs: 280,
      titleSlideMs: 950,
      title: "Asantewaa",
      subtitle: "",
      letterStaggerMs: 28
    },
    panels: [
      {
        id: "hero",
        label: "",
        title: "Asantewaa",
        subtitle: "",
        imageUrl: "images/asantewaa-gown-smile.png",
        imagePosition: "center 12%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
        link: null
      },
      {
        id: "discover",
        label: "",
        title: "The Era of Influence",
        subtitle: "Orchestrating Global Dominance",
        imageUrl: "images/asantewaa-kente-color.png",
        imagePosition: "center 18%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 100%)",
        link: "about.html",
        linkText: "The Enterprise"
      },
      {
        id: "visual-2",
        imageOnly: true,
        imageUrl: "images/asantewaa-kente-bw.png",
        imagePosition: "center 15%"
      },
      {
        id: "visual-3",
        imageOnly: true,
        imageUrl: "images/asantewaa-glam-portrait-bw.png",
        imagePosition: "center 22%"
      },
      {
        id: "visual-4",
        imageOnly: true,
        imageUrl: "images/asantewaa-beaded-gown-bw.png",
        imagePosition: "center top"
      },
      {
        id: "glam",
        label: "The Glam Room",
        title: "Your Crown. Your Glow.",
        subtitle: "Accra's Premier Hair Destination",
        imageUrl: "images/asantewaa-gown-mirror-color.png",
        imagePosition: "center 28%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.78) 100%)",
        link: "glam-room.html",
        linkText: "Enter Glam Room"
      },
      {
        id: "visual-5",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-joy.png",
        imagePosition: "center 20%"
      },
      {
        id: "visual-6",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-full-bw.png",
        imagePosition: "center center"
      },
      {
        id: "visual-7",
        imageOnly: true,
        imageUrl: "images/asantewaa-gown-mirror-bw.png",
        imagePosition: "center 25%"
      },
      {
        id: "book",
        label: "Book Your Glam",
        title: "Reserve Your EXperience",
        subtitle: "Experience The Artistry",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center 22%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
        link: "book.html",
        linkText: "Book Now"
      },
      {
        id: "find-booking",
        type: "find-booking",
        label: "Track",
        title: "Find My Booking",
        subtitle: "No account needed \u2014 phone & last 4 letters of your name",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 30%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.88) 100%)"
      },
      {
        id: "visual-8",
        imageOnly: true,
        imageUrl: "images/glam-braids-portrait.png",
        imagePosition: "center top",
        link: "glam-room.html"
      }
    ]
  },
  quote: {
    text: "I didn't come to play, I came to SLAY \u2014 and so did your hair when you walk out my door. Baby girl, treat yourself. You deserve to look expensive!",
    attribution: "\u2014 Asantewaa"
  },
  about: {
    headline: "The Queen Behind the Chair",
    paragraphs: [
      "Asantewaa is Ghana's favourite TikTok star \u2014 4 million+ followers who know her for her energy, her humour, and her unapologetic Ghanaian pride. What started as viral content turned into a dream: a salon where every woman walks in feeling like herself and walks out feeling like THAT girl.",
      "Glam Room is her love letter to Accra \u2014 warm vibes, expert hands, and zero tolerance for bad hair days. Whether you're coming for a silk press or a full transformation, you're family here."
    ],
    stats: [
      { value: "4M+", label: "Followers" },
      { value: "Accra", label: "Ghana" },
      { value: "100%", label: "Good Vibes" }
    ]
  },
  enterprise: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "THE ENTERPRISE",
    topbarLeftLink: "about.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    statement: {
      imageUrl: "images/asantewaa-enterprise-statement.png",
      imageAlt: "Asantewaa \u2014 editorial portrait",
      imagePosition: "center 20%",
      displayLines: ["SHAPING", "CULTURE.", "DRIVING", "ENGAGEMENT."],
      statements: [
        "She is not just a creator.",
        "She is a cultural institution."
      ],
      body: [
        [
          "Asantewaa is a leading digital creator",
          "captivating millions weekly through viral",
          "storytelling, lifestyle, and cultural truth."
        ],
        [
          "Her community does not just follow.",
          "They act. They buy. They trust."
        ]
      ]
    },
    metrics: [
      { value: "4,000,000+", label: "TIKTOK FOLLOWERS" },
      { value: "8.4%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 2 to 4%" },
      { value: "1,000,000+", label: "INSTAGRAM FOLLOWERS" },
      { value: "5.2%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 1 to 3%" },
      { value: "12,000,000+", label: "MONTHLY VIDEO VIEWS", sublabel: "Across All Platforms" },
      { value: "18 to 38", label: "CORE AUDIENCE AGE", sublabel: "72% of Total Reach" },
      { variant: "strip", text: "68% FEMALE / 32% MALE" },
      { variant: "strip", text: "PAN-AFRICAN INFLUENCE. GLOBAL REACH." },
      { variant: "strip", text: "89K+ SNAPCHAT SUBSCRIBERS" }
    ],
    brandPartners: {
      items: [
        { name: "BRAND 1" },
        { name: "BRAND 2" },
        { name: "BRAND 3" },
        { name: "BRAND 4" },
        { name: "BRAND 5" },
        { name: "BRAND 6" }
      ]
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
            "conversion. No guesswork."
          ]
        },
        {
          id: "pro-location",
          number: "02",
          title: "PRO LOCATION CAMPAIGNS",
          body: [
            "Asantewaa travels directly to your headquarters,",
            "retail flagship, corporate office, or custom venue.",
            "Shot on location. Owned by your brand story.",
            "Deployed where your audience lives."
          ]
        },
        {
          id: "snapchat",
          number: "03",
          title: "SNAPCHAT ECOSYSTEM AMPLIFICATION",
          body: [
            "Extended campaign lifecycle inside her private",
            "premium Snapchat subscriber network.",
            "High-visibility weekly content integration.",
            "Exclusive access. Unmatched intimacy with audience."
          ]
        }
      ]
    },
    cta: {
      label: "Explore Partnerships",
      href: "proposals.html"
    }
  },
  glamRoom: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "GLAM ROOM",
    topbarLeftLink: "glam-room.html",
    menuLinks: [
      { label: "Home", href: "index.html" },
      { label: "The Enterprise", href: "about.html" },
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" }
    ],
    declaration: {
      title: "THE GLAM ROOM",
      byline: "BY ASANTEWAA",
      tagline: "Where the world's most driven women come to be seen, restored, and elevated."
    },
    bookingOverlay: {
      title: "RESERVE YOUR CHAIR",
      locationPrefix: "GLAM ROOM \u2014",
      submitLabel: "CONFIRM YOUR RESERVATION",
      depositNote: "A commitment deposit confirms your reservation instantly.",
      exitLabel: "X EXIT"
    },
    signatureServices: [
      {
        number: "01",
        title: "LUXURY HAIR INSTALLATION",
        descriptor: "Premier installation service. Every strand, intentional.",
        serviceId: "hair-installation"
      },
      {
        number: "02",
        title: "CUSTOM WIG STYLING & MAINTENANCE",
        descriptor: "Bespoke shaping and care. Built for your identity.",
        serviceId: "hair-reset"
      },
      {
        number: "03",
        title: "PRECISION HAIR COLORING & BLENDING",
        descriptor: "Color that looks like it was born that way.",
        serviceId: "color-highlights"
      },
      {
        number: "04",
        title: "DEEP TREATMENTS & HAIR RESTORATION",
        descriptor: "Repair. Restore. Revive. Results that speak.",
        serviceId: "natural-care"
      },
      {
        number: "05",
        title: "EDITORIAL & BRIDAL GLAM",
        descriptor: "For the moments that define you. No second takes.",
        serviceId: "bridal-glam"
      }
    ]
  },
  proposals: {
    footer: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
    topbarLeft: "PARTNERSHIPS",
    topbarLeftLink: "proposals.html",
    hero: {
      title: "PARTNER WITH ASANTEWAA",
      subline: "Submit your brief. We respond within 48 hours through official channels only."
    },
    form: {
      submitLabel: "SUBMIT STRATEGIC BRIEFING",
      budgetTiers: [
        "Under GH\u20B5 50,000",
        "GH\u20B5 50,000 \u2013 GH\u20B5 150,000",
        "GH\u20B5 150,000 \u2013 GH\u20B5 500,000",
        "GH\u20B5 500,000+"
      ],
      pillars: [
        "01 \u2014 Demonstrative Campaigns",
        "02 \u2014 Pro Location Campaigns",
        "03 \u2014 Snapchat Ecosystem Amplification",
        "Open / Not yet selected"
      ]
    },
    compliance: [
      {
        title: "IMAGE & ASSET RIGHTS",
        body: "All creative assets licensed for 12 months from campaign launch. Organic digital distribution only."
      },
      {
        title: "PAID MEDIA AMPLIFICATION",
        body: "Boosting, dark-posting, or commercial promotion requires pre-approval plus a 30% base package premium."
      },
      {
        title: "MEDIA RESTRICTIONS",
        body: "Assets prohibited on national TV, billboards, print, or any offline or out-of-home media channels."
      },
      {
        title: "ASSET MODIFICATION",
        body: "No re-editing, cropping, or remixing without written authorisation. Unapproved changes void usage rights."
      }
    ],
    contact: {
      intro: "FOR IMMEDIATE ASSISTANCE OR OFFICIAL DOCUMENTATION APPROVALS",
      whatsappLabel: "WhatsApp Management",
      whatsapp: "+233 (0) 247 743 593",
      emailLabel: "Corporate Inbox",
      email: "martinadwamena599@gmail.com",
      locations: "ACCRA, GHANA * NEW JERSEY, USA"
    }
  },
  socials: [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@asantewaaaaa",
      icon: "fa-brands fa-tiktok"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/asantewaaaa",
      icon: "fa-brands fa-instagram"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@asantewaa",
      icon: "fa-brands fa-youtube"
    }
  ],
  services: [
    {
      id: "hair-reset",
      name: "Hair Reset",
      description: "Fresh start energy \u2014 wash, unwind, touch-ups, and quick styles to reset your crown.",
      price: "From GH\u20B5 35",
      duration: "30 min \u2013 2 hrs",
      icon: "fa-solid fa-arrows-rotate",
      badge: "Popular",
      styles: [
        { id: "hair-wash", name: "Hair Wash", description: "Cleanse and refresh your hair.", price: "GH\u20B5 35", duration: "30 min" },
        { id: "hair-wash-cornrows", name: "Hair Wash + Cornrows", description: "Wash plus cornrow styling.", price: "GH\u20B5 55", duration: "1\u20131.5 hrs" },
        { id: "unbraid-hair-wash", name: "Unbraiding & Hair Wash", description: "Take down braids and wash your hair.", price: "GH\u20B5 50", duration: "1\u20132 hrs" },
        { id: "touch-up-salon-relaxer", name: "Touch Up with Salon\u2019s Relaxer", description: "New growth touch-up using Glam Room relaxer.", price: "GH\u20B5 70", duration: "1\u20131.5 hrs" },
        { id: "touch-up-client-relaxer", name: "Touch Up with Client\u2019s Relaxer", description: "New growth touch-up using your own relaxer.", price: "GH\u20B5 50", duration: "1\u20131.5 hrs" },
        { id: "normal-ponytail", name: "Normal Ponytail", description: "Sleek, styled ponytail finish.", price: "GH\u20B5 80", duration: "45 min \u2013 1 hr" }
      ]
    },
    {
      id: "hair-installation",
      name: "Hair Installation Services",
      description: "Closure and frontal installs \u2014 secure, natural, and styled to slay.",
      price: "From GH\u20B5 50",
      duration: "1\u20132 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
      styles: [
        { id: "closure-install", name: "Closure Hair Install", description: "Closure unit installed and styled.", price: "GH\u20B5 50", duration: "1\u20131.5 hrs" },
        { id: "frontal-install", name: "Frontal Hair Install", description: "Frontal unit installed with a natural hairline.", price: "GH\u20B5 100", duration: "1.5\u20132 hrs" },
        { id: "frontal-ponytail", name: "Frontal Ponytail", description: "Frontal install finished in a sleek ponytail style.", price: "GH\u20B5 150", duration: "1.5\u20132 hrs" }
      ]
    },
    {
      id: "braiding-workmanship",
      name: "Braids (Workmanship Only)",
      description: "Expert braiding by length \u2014 you bring the hair, we bring the hands. Workmanship only.",
      price: "From GH\u20B5 150",
      duration: "3\u20138 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
      styles: [
        { id: "shoulder-length", name: "Shoulder Length", description: "Braiding service to shoulder length. Hair not included.", price: "GH\u20B5 150", duration: "3\u20134 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "bra-length", name: "Bra Length", description: "Braiding service to bra strap length. Hair not included.", price: "GH\u20B5 200", duration: "4\u20135 hrs" },
        { id: "hip-length", name: "Hip Length", description: "Braiding service to hip length. Hair not included.", price: "GH\u20B5 250", duration: "5\u20136 hrs" },
        { id: "butt-length", name: "Butt Length", description: "Braiding service to butt length. Hair not included.", price: "GH\u20B5 300", duration: "6\u20137 hrs" },
        { id: "under-butt", name: "Under Butt", description: "Braiding service past butt length. Hair not included.", price: "GH\u20B5 400", duration: "7\u20138 hrs", imageUrl: "images/glam-braids-portrait.png" }
      ]
    },
    {
      id: "natural-care",
      name: "Natural Hair Care",
      description: "Deep conditioning, trims, and treatments that love your natural texture back to life.",
      price: "From GH\u20B5 100",
      duration: "1\u20132 hrs",
      icon: "fa-solid fa-leaf",
      badge: null,
      styles: [
        { id: "deep-condition", name: "Deep Conditioning", description: "Intensive moisture treatment for dry, tired hair.", price: "GH\u20B5 100", duration: "1 hr" },
        { id: "trim-shape", name: "Trim & Shape", description: "Health trim to keep your ends fresh.", price: "GH\u20B5 80", duration: "45 min" },
        { id: "steam-treatment", name: "Steam Treatment", description: "Steam-assisted hydration for max absorption.", price: "GH\u20B5 130", duration: "1\u20131.5 hrs" },
        { id: "protein-treatment", name: "Protein Treatment", description: "Strengthen weak or over-processed strands.", price: "GH\u20B5 140", duration: "1.5 hrs" },
        { id: "wash-go-style", name: "Wash & Go Style", description: "Define and set your natural curl pattern.", price: "GH\u20B5 120", duration: "1\u20132 hrs" }
      ]
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      description: "Bold colour, subtle highlights, or a full transformation \u2014 let's make you unforgettable.",
      price: "From GH\u20B5 250",
      duration: "3\u20134 hrs",
      icon: "fa-solid fa-palette",
      badge: null,
      styles: [
        { id: "full-color", name: "Full Color", description: "All-over colour transformation.", price: "From GH\u20B5 350", duration: "3\u20134 hrs", imageUrl: "images/glam-red-studio.png" },
        { id: "highlights", name: "Highlights", description: "Face-framing or full-head highlights.", price: "From GH\u20B5 280", duration: "3 hrs" },
        { id: "ombre-balayage", name: "Ombr\xE9 / Balayage", description: "Gradual colour melt \u2014 subtle or bold.", price: "From GH\u20B5 400", duration: "4\u20135 hrs" },
        { id: "root-touchup", name: "Root Touch-up", description: "Refresh grown-out roots to match your colour.", price: "GH\u20B5 250", duration: "2 hrs" }
      ]
    },
    {
      id: "bridal-glam",
      name: "Bridal Glam",
      description: "Your big day deserves a crown that stops the room. Bridal packages with all the extras.",
      price: "From GH\u20B5 500",
      duration: "Full day",
      icon: "fa-solid fa-gem",
      badge: "Premium",
      styles: [
        { id: "bridal-hair-makeup", name: "Bridal Hair & Makeup", description: "Full bridal glam \u2014 hair, makeup, and touch-ups.", price: "From GH\u20B5 800", duration: "Full day", imageUrl: "images/glam-red-indoor.png" },
        { id: "bridal-hair-only", name: "Bridal Hair Only", description: "Wedding-day hairstyle with trial session.", price: "From GH\u20B5 500", duration: "4\u20136 hrs" },
        { id: "bridesmaid-package", name: "Bridesmaid Package", description: "Coordinated looks for the bridal party.", price: "From GH\u20B5 350/person", duration: "2\u20133 hrs each" },
        { id: "engagement-look", name: "Engagement Look", description: "Camera-ready hair for your engagement shoot.", price: "From GH\u20B5 400", duration: "3 hrs", imageUrl: "images/glam-red-celebration.png" },
        { id: "traditional-ceremony", name: "Traditional Ceremony Style", description: "Styled for kente, white, or traditional wedding events.", price: "From GH\u20B5 450", duration: "3\u20134 hrs" }
      ]
    }
  ],
  testimonials: [
    {
      text: "Baby girl, when you leave my chair, Accra is NOT ready! Best silk press I've ever had \u2014 I felt like a whole new person.",
      author: "Ama K.",
      role: "Regular Client"
    },
    {
      text: "Asantewaa did my braids and I got stopped on the street THREE times. The energy in that salon? Unmatched!",
      author: "Efua M.",
      role: "First-Timer"
    },
    {
      text: "I came in stressed, I left feeling like a celebrity. The vibes, the music, the hair \u2014 10/10 would recommend to every sis.",
      author: "Akua T.",
      role: "Bridal Client"
    },
    {
      text: "My wig install was so seamless my own mother thought it was my hair. Glam Room is THE spot in Accra, period.",
      author: "Dela S.",
      role: "Wig Install Client"
    }
  ],
  gallery: [
    { id: 1, label: "Butterfly Braids", imageUrl: "images/glam-braids-studio.png", gradient: "linear-gradient(135deg, #C75B39 0%, #D4A853 100%)" },
    { id: 2, label: "Full Glam Portrait", imageUrl: "images/glam-braids-portrait.png", gradient: "linear-gradient(135deg, #006B3F 0%, #D4A853 100%)" },
    { id: 3, label: "Red Carpet Outdoor", imageUrl: "images/glam-red-outdoor.png", gradient: "linear-gradient(135deg, #CE1126 0%, #2C1810 100%)" },
    { id: 4, label: "Bridal Glow", imageUrl: "images/glam-red-indoor.png", gradient: "linear-gradient(135deg, #D4A853 0%, #C75B39 100%)" },
    { id: 5, label: "Studio Slay", imageUrl: "images/glam-red-studio.png", gradient: "linear-gradient(135deg, #2C1810 0%, #006B3F 100%)" },
    { id: 6, label: "Celebration Glam", imageUrl: "images/glam-red-celebration.png", gradient: "linear-gradient(135deg, #CE1126 0%, #FCD116 100%)" },
    { id: 7, label: "Twist Out", gradient: "linear-gradient(135deg, #C75B39 0%, #006B3F 100%)" },
    { id: 8, label: "Glam Room Vibes", gradient: "linear-gradient(135deg, #D4A853 0%, #CE1126 100%)" }
  ],
  business: {
    tagline: "Accra's baddest hair destination \u2014 where your crown gets the main character energy it deserves.",
    extensionNotice: "Please note that all Braids prices do not include hair extensions. You can either come along with your own extensions or purchase from our salon.",
    intro: [
      "Glam Room is Asantewaa's dream salon \u2014 with two locations across Accra, so your glow up is never far away. Warm vibes, expert stylists, and zero tolerance for bad hair days at every chair.",
      "From silk press to full bridal glam, every appointment comes with main character energy included. Walk in as you are, walk out ready for Accra to stare."
    ],
    hours: "Mon \u2013 Sat: 9am \u2013 6pm \xB7 Sun: Closed"
  },
  booking: {
    // Supabase — paste credentials from Project Settings → API
    supabase: {
      url: "https://pksfslkwmlrlttoojluk.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc2ZzbGt3bWxybHR0b29qbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjMyNzcsImV4cCI6MjA5NTYzOTI3N30.put72ryG2V8E7rQLfF6omcGplgrUbHmrep8zLBvEk6M"
    },
    headline: "Book your crowning glory",
    subhead: "Select your service, pick a time, and come shine like a true Ghanaian queen \u{1F451}",
    bookingQuote: "If your hair ain't talking, you ain't walking! I don't do boring, and my Glam Room doesn't either. Come through, let's make noise!",
    promise: "No rushing, no hurting, just good vibes and fire styles.",
    tagline: "\u2728 Mama Glam Herself \u2728",
    vibeNote: "Braiding while blasting Amapiano & Afrobeats",
    tiktokHandle: "@asantewaaa_official",
    maxReservationsPerDay: 12,
    maxReservationsPerSlot: 3,
    deposit: {
      enabled: true,
      configured: false,
      provider: "moolre",
      amountGhs: 50,
      currency: "GHS",
      label: "GH\u20B5 50 commitment deposit",
      note: "Pay a commitment deposit via Mobile Money to instantly confirm your reservation.",
      submitLabel: "PAY DEPOSIT & CONFIRM",
      pendingMessage: "Your slot is held. Complete the deposit payment to confirm your reservation.",
      confirmedMessage: "You're confirmed! Your deposit secures your chair \u2014 see you at Glam Room."
    },
    timeSlots: [
      { value: "08:00", label: "08:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "14:00", label: "02:00 PM" },
      { value: "17:00", label: "05:00 PM" }
    ],
    services: [
      { value: "Braid Bomb", label: "\u{1F4A5} Braid Bomb", price: "250 GHS" },
      { value: "Mama Glam Special", label: "\u{1F469}\u{1F3FE}\u200D\u{1F9B1} Mama Glam Special", price: "450 GHS" },
      { value: "Glow Up Express", label: "\u2728 Glow Up Express", price: "150 GHS" },
      { value: "Celebrity Wig Fix", label: "\u{1F487}\u{1F3FE}\u200D\u2640\uFE0F Celebrity Wig Fix", price: "300 GHS" },
      { value: "Custom Style", label: "\u{1F451} Custom Style", price: "Price on chat" }
    ]
  },
  // Admin dashboard — admin.html (create user in Supabase → Authentication)
  admin: {
    loginEmail: "asantewaa@glamroom.com",
    clearPassword: "glamroom2024"
  },
  findBooking: {
    phonePlaceholder: "024 XXX XXXX or +233 XX XXX XXXX",
    namePlaceholder: "Last 4 letters of your name",
    submitLabel: "Check Status",
    loading: "Checking\u2026",
    invalidPhone: "Enter a valid Ghana number (e.g. 024XXXXXXX).",
    invalidName: "Enter exactly 4 letters \u2014 the last 4 letters of the name you booked with.",
    notFound: "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
    unavailable: "Booking lookup isn't connected yet. WhatsApp Glam Room to check your slot.",
    error: "Something went wrong. Please try again or WhatsApp Glam Room."
  },
  installPrompt: {
    title: "Add Glam Room to your home screen",
    body: "Open like an app \u2014 one tap from your phone, no browser bar. Perfect for booking your next slay \u{1F451}",
    installButton: "Add to Home Screen",
    iosButton: "Got it",
    laterButton: "Maybe later",
    androidHint: "Tap below to install Glam Room on this device.",
    delayMs: 3e3
  },
  serviceNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "All Services", href: "glam-room.html#services" },
    { label: "Book Appointment", href: "book.html" }
  ],
  homeNavLinks: [
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  aboutNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Analytics", href: "#analytics" },
    { label: "Campaign Pillars", href: "#pillars" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  businessNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Appointment", href: "book.html" }
  ],
  bookingNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" }
  ],
  proposalsNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "The Enterprise", href: "about.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  footer: {
    copyright: `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana \u{1F1EC}\u{1F1ED}"
  }
};

// glam-booking.js?v=20260541
function openBookingPage(location) {
  const locationValue = location ? getLocationBookingValue2(location) : "";
  const url = locationValue ? `book.html?location=${encodeURIComponent(locationValue)}` : "book.html";
  window.location.href = url;
}
function bindSanctuaryBookingButtons() {
  document.querySelectorAll("[data-location-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const loc = findLocationById2(button.dataset.locationId);
      if (loc) openBookingPage(loc);
    });
  });
}

// proposals.js?v=20260536
function initProposalsForm() {
  const form = document.getElementById("prop-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("prop-name").value.trim();
    const email = document.getElementById("prop-email").value.trim();
    const pillar = document.getElementById("prop-pillar").value;
    const budget = document.getElementById("prop-budget").value;
    const brief = document.getElementById("prop-brief").value.trim();
    const msgEl = document.getElementById("prop-msg");
    const contact = SITE.proposals?.contact || {};
    const body = encodeURIComponent(
      `Strategic Briefing \u2014 Partner with Asantewaa

Name / Company: ${name}
Email: ${email}
Collaboration Pillar: ${pillar}
Budget Tier: ${budget}

Brief:
${brief || "(none provided)"}`
    );
    const mailto = `mailto:${contact.email || "martinadwamena599@gmail.com"}?subject=${encodeURIComponent("Strategic Briefing \u2014 " + name)}&body=${body}`;
    msgEl.textContent = "Opening your email client to submit the briefing\u2026";
    msgEl.hidden = false;
    window.location.href = mailto;
  });
}

// find-booking.js?v=20260536
function normalizePhoneDigits(phone) {
  return phone.replace(/\D/g, "");
}
function phoneVariants(phone) {
  const digits = normalizePhoneDigits(phone);
  const variants = /* @__PURE__ */ new Set([digits]);
  if (digits.startsWith("233") && digits.length >= 12) {
    variants.add(`0${digits.slice(3)}`);
  }
  if (digits.startsWith("0") && digits.length >= 10) {
    variants.add(`233${digits.slice(1)}`);
  }
  return [...variants];
}
function nameSuffixMatches(fullName, suffix) {
  const letters = (fullName || "").replace(/[^a-zA-Z]/g, "");
  const expected = suffix.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (expected.length !== 4) return false;
  return letters.slice(-4).toLowerCase() === expected;
}
function formatBookingDate(dateStr) {
  return (/* @__PURE__ */ new Date(`${dateStr}T12:00:00`)).toLocaleDateString("en-GH", {
    month: "short",
    day: "numeric"
  });
}
function formatBookingTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}${m ? `:${String(m).padStart(2, "0")}` : ""}${period}`;
}
function statusLabel(status) {
  return (status || "pending").toUpperCase();
}
function renderResultMessage(booking) {
  const date = formatBookingDate(booking.booking_date);
  const time = formatBookingTime(booking.booking_time);
  const status = statusLabel(booking.status);
  const paymentPending = booking.payment_status === "pending" && booking.status === "pending";
  const paymentNote = paymentPending ? " Deposit not yet paid \u2014 your slot is not confirmed." : booking.payment_status === "paid" ? " Deposit received." : "";
  return `Your booking on <strong>${date}</strong> at <strong>${time}</strong> is <strong>${status}</strong>.${paymentNote}`;
}
async function lookupViaRpc(supabase, phone, nameSuffix) {
  const { data, error } = await supabase.rpc("find_my_bookings", {
    p_phone: phone,
    p_name_suffix: nameSuffix
  });
  if (error) throw error;
  return data || [];
}
async function lookupViaTable(supabase, phone, nameSuffix) {
  const matches = [];
  const seen = /* @__PURE__ */ new Set();
  for (const variant of phoneVariants(phone)) {
    const { data, error } = await supabase.from("bookings").select("booking_date, booking_time, status, payment_status, service, location, full_name, phone").eq("phone", variant);
    if (error) throw error;
    for (const row of data || []) {
      if (!nameSuffixMatches(row.full_name, nameSuffix)) continue;
      const key = `${row.booking_date}-${row.booking_time}-${row.status}`;
      if (seen.has(key)) continue;
      seen.add(key);
      matches.push({
        booking_date: row.booking_date,
        booking_time: row.booking_time,
        status: row.status,
        payment_status: row.payment_status,
        service: row.service,
        location: row.location
      });
    }
  }
  return matches.sort((a, b) => {
    const d = b.booking_date.localeCompare(a.booking_date);
    return d !== 0 ? d : b.booking_time.localeCompare(a.booking_time);
  });
}
async function findBookings(phone, nameSuffix) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Booking lookup is not available right now.");
  }
  try {
    return await lookupViaRpc(supabase, phone, nameSuffix);
  } catch (rpcError) {
    if (!rpcError.message?.includes("find_my_bookings")) throw rpcError;
    return lookupViaTable(supabase, phone, nameSuffix);
  }
}
function showResult(el, html, type = "success") {
  el.hidden = false;
  el.className = `find-booking-result find-booking-result--${type}`;
  el.innerHTML = html;
}
function initFindBooking() {
  const form = document.getElementById("findBookingForm");
  const resultEl = document.getElementById("findBookingResult");
  if (!form || !resultEl) return;
  const copy = SITE.findBooking || {};
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const phone = form.querySelector("#findPhone")?.value.trim() || "";
    const nameSuffix = form.querySelector("#findNameSuffix")?.value.trim() || "";
    const submitBtn = form.querySelector('button[type="submit"]');
    resultEl.hidden = true;
    if (!/^(\+233|0)[0-9]{9}$/.test(phone.replace(/\s/g, ""))) {
      showResult(resultEl, copy.invalidPhone || "Enter a valid Ghana number (e.g. 024XXXXXXX).", "error");
      return;
    }
    if (!/^[a-zA-Z]{4}$/.test(nameSuffix)) {
      showResult(
        resultEl,
        copy.invalidName || "Enter exactly 4 letters \u2014 the last 4 letters of the name you booked with.",
        "error"
      );
      return;
    }
    if (!isSupabaseConfigured()) {
      showResult(resultEl, copy.unavailable || "Booking lookup is not connected yet. WhatsApp Glam Room instead.", "error");
      return;
    }
    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = copy.loading || "Checking\u2026";
    try {
      const bookings = await findBookings(phone, nameSuffix);
      if (!bookings.length) {
        showResult(
          resultEl,
          copy.notFound || "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
          "error"
        );
        return;
      }
      const messages = bookings.map((b) => `<p>${renderResultMessage(b)}</p>`).join("");
      showResult(resultEl, messages, "success");
    } catch (err) {
      showResult(
        resultEl,
        copy.error || `Something went wrong: ${err.message || "Please try again."}`,
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });
}

// install-prompt.js?v=20260536
var STORAGE_KEY = "glamroom_install_dismissed";
var DISMISS_DAYS = 14;
var deferredPrompt = null;
function isMobileDevice() {
  return window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || navigator.standalone === true;
}
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function wasDismissedRecently() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { at } = JSON.parse(raw);
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1e3;
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
  document.getElementById("installPrompt")?.remove();
  document.getElementById("installPromptBackdrop")?.remove();
  document.body.classList.remove("install-prompt-open");
}
function showPrompt(mode = "android") {
  if (document.getElementById("installPrompt")) return;
  const copy = getCopy();
  const isIosMode = mode === "ios";
  const backdrop = document.createElement("div");
  backdrop.id = "installPromptBackdrop";
  backdrop.className = "install-prompt-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  const el = document.createElement("div");
  el.id = "installPrompt";
  el.className = "install-prompt";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-labelledby", "installPromptTitle");
  el.setAttribute("aria-modal", "true");
  el.innerHTML = `
    <button type="button" class="install-prompt-close" id="installPromptClose" aria-label="Close">\xD7</button>
    <div class="install-prompt-icon" aria-hidden="true"><i class="fa-solid fa-mobile-screen-button"></i></div>
    <h2 id="installPromptTitle" class="install-prompt-title">${copy.title || "Add Glam Room to your home screen"}</h2>
    <p class="install-prompt-body">${copy.body || "Open like an app \u2014 one tap from your phone, no browser bar."}</p>
    ${isIosMode ? `<ol class="install-prompt-steps">
            <li><span class="install-prompt-step-icon"><i class="fa-solid fa-arrow-up-from-bracket"></i></span> Tap <strong>Share</strong> in Safari</li>
            <li><span class="install-prompt-step-icon"><i class="fa-solid fa-plus"></i></span> Choose <strong>Add to Home Screen</strong></li>
            <li><span class="install-prompt-step-icon"><i class="fa-solid fa-check"></i></span> Tap <strong>Add</strong></li>
          </ol>` : `<p class="install-prompt-hint">${copy.androidHint || "Tap below to install Glam Room on this device."}</p>`}
    <div class="install-prompt-actions">
      ${isIosMode ? `<button type="button" class="install-prompt-btn install-prompt-btn--primary" id="installPromptGotIt">${copy.iosButton || "Got it"}</button>` : `<button type="button" class="install-prompt-btn install-prompt-btn--primary" id="installPromptInstall">${copy.installButton || "Add to Home Screen"}</button>`}
      <button type="button" class="install-prompt-btn install-prompt-btn--ghost" id="installPromptLater">${copy.laterButton || "Maybe later"}</button>
    </div>
  `;
  document.body.appendChild(backdrop);
  document.body.appendChild(el);
  document.body.classList.add("install-prompt-open");
  backdrop.addEventListener("click", () => {
    markDismissed();
    removePrompt();
  });
  document.getElementById("installPromptClose")?.addEventListener("click", () => {
    markDismissed();
    removePrompt();
  });
  document.getElementById("installPromptLater")?.addEventListener("click", () => {
    markDismissed();
    removePrompt();
  });
  document.getElementById("installPromptGotIt")?.addEventListener("click", () => {
    markDismissed();
    removePrompt();
  });
  document.getElementById("installPromptInstall")?.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      markDismissed();
      removePrompt();
      if (outcome === "accepted") return;
    }
    markDismissed();
    removePrompt();
  });
  requestAnimationFrame(() => {
    el.classList.add("install-prompt--visible");
    backdrop.classList.add("install-prompt-backdrop--visible");
  });
}
var promptScheduled = false;
function schedulePrompt(mode) {
  if (promptScheduled || wasDismissedRecently() || isStandaloneApp()) return;
  promptScheduled = true;
  const delay = getCopy().delayMs ?? 2500;
  setTimeout(() => {
    if (wasDismissedRecently() || isStandaloneApp()) return;
    showPrompt(mode);
  }, delay);
}
function initInstallPrompt() {
  if (!isMobileDevice() || isStandaloneApp() || wasDismissedRecently()) return;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    schedulePrompt("android");
  });
  if (isIOS()) {
    schedulePrompt("ios");
  }
}

// app.js
function getWhatsAppUrl() {
  const number = SITE.whatsapp.replace(/[^0-9+]/g, "");
  const msg = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${number.replace("+", "")}?text=${msg}`;
}
function openWhatsApp() {
  window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
}
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  grid.innerHTML = Array.from(
    { length: SITE.services.length },
    () => '<div class="skeleton"></div>'
  ).join("");
  setTimeout(() => {
    grid.innerHTML = SITE.services.map(
      (service, i) => `
      <a href="service.html?id=${encodeURIComponent(service.id)}" class="service-card-link reveal reveal-delay-${i % 4 + 1}">
        <article class="glass-card service-card" data-service="${service.id}">
          <div class="service-card-header">
            <div class="service-icon"><i class="${service.icon}"></i></div>
            ${service.badge ? `<span class="service-badge">${service.badge}</span>` : ""}
          </div>
          <h3 class="service-name">${service.name}</h3>
          <p class="service-desc">${service.description}</p>
          <div class="service-meta">
            <span class="service-price">${getServicePriceRange(service)}</span>
            <span class="service-duration"><i class="fa-regular fa-clock"></i> ${service.duration}</span>
          </div>
          <div class="service-card-footer">
            <span>${service.styles?.length || 0} styles</span>
            <span>View <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </article>
      </a>
    `
    ).join("");
    observeRevealElements(grid.querySelectorAll(".reveal"));
  }, 400);
}
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function renderServiceDetail() {
  const serviceId = getQueryParam("id");
  const service = findServiceById(serviceId);
  if (!service) {
    window.location.replace("glam-room.html#services");
    return;
  }
  document.title = `${service.name} | Glam Room \u2014 Asantewaa`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${service.name} at Glam Room \u2014 ${service.description}`;
  }
  const iconEl = document.getElementById("service-icon");
  if (iconEl) iconEl.innerHTML = `<i class="${service.icon}"></i>`;
  const titleEl = document.getElementById("service-title");
  if (titleEl) titleEl.textContent = service.name;
  const descEl = document.getElementById("service-desc");
  if (descEl) descEl.textContent = service.description;
  const metaEl = document.getElementById("service-meta");
  if (metaEl) {
    metaEl.innerHTML = `
      <span><i class="fa-solid fa-tag"></i> ${getServicePriceRange(service)}</span>
      <span><i class="fa-regular fa-clock"></i> ${service.duration}</span>
      <span><i class="fa-solid fa-scissors"></i> ${service.styles?.length || 0} styles</span>
    `;
  }
  const introEl = document.getElementById("service-styles-intro");
  if (introEl) {
    introEl.textContent = `Pick a specific ${service.name.toLowerCase()} style below, then book your slot.`;
  }
  const grid = document.getElementById("service-styles-grid");
  if (!grid || !service.styles?.length) return;
  grid.innerHTML = service.styles.map((style, i) => {
    const bookUrl = `book.html?service=${encodeURIComponent(service.id)}&style=${encodeURIComponent(style.id)}`;
    const mediaStyle = style.imageUrl ? `background-image: url('${style.imageUrl}');` : "";
    const mediaClass = style.imageUrl ? "" : " style-card-media--placeholder";
    const mediaInner = style.imageUrl ? "" : '<i class="fa-solid fa-scissors"></i>';
    return `
        <article class="glass-card style-card reveal reveal-delay-${i % 4 + 1}">
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
  }).join("");
  observeRevealElements(grid.querySelectorAll(".reveal"));
  const noticeEl = document.querySelector(".services-extension-notice");
  const extensionNotice = SITE.business?.extensionNotice;
  if (noticeEl) {
    if (service.id === "braiding-workmanship" && extensionNotice) {
      noticeEl.hidden = false;
      noticeEl.innerHTML = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>${extensionNotice}</span>`;
    } else {
      noticeEl.hidden = true;
      noticeEl.innerHTML = "";
    }
  }
}
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = SITE.gallery.map(
    (item, i) => `
    <div class="gallery-item reveal visible reveal-delay-${i % 4 + 1}" data-gallery-id="${item.id}">
      <div class="gallery-item-inner" style="${item.imageUrl ? `background-image: url('${item.imageUrl}'); background-size: cover; background-position: center top;` : `background: ${item.gradient}`}">
        ${item.imageUrl ? "" : '<i class="fa-solid fa-camera gallery-placeholder-icon"></i>'}
      </div>
      <div class="gallery-overlay">
        <span>${item.label}${item.imageUrl ? "" : "<br><small>Coming Soon</small>"}</span>
      </div>
    </div>
  `
  ).join("");
  observeRevealElements(grid.querySelectorAll(".reveal"));
}
function renderAbout() {
  const statsEl = document.getElementById("about-stats");
  if (statsEl) {
    statsEl.innerHTML = SITE.about.stats.map(
      (stat) => `
      <div class="glass-card stat-item">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `
    ).join("");
  }
  const aboutParagraphs = document.getElementById("about-paragraphs");
  if (aboutParagraphs) {
    aboutParagraphs.innerHTML = SITE.about.paragraphs.map((p) => `<p>${p}</p>`).join("");
  }
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  if (quoteText) quoteText.textContent = SITE.quote.text;
  if (quoteAuthor) quoteAuthor.textContent = SITE.quote.attribution;
}
function initEnterpriseAccordion(container) {
  if (!container) return;
  const items = container.querySelectorAll(".ent-accordion-item");
  items.forEach((item) => {
    const trigger = item.querySelector(".ent-accordion-trigger");
    trigger?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".ent-accordion-trigger")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}
function renderEnterprise() {
  const data = SITE.enterprise;
  if (!data) return;
  document.title = "The Enterprise | Asantewaa";
  const statement = data.statement;
  const statementImage = document.getElementById("enterprise-statement-image");
  if (statementImage && statement) {
    statementImage.src = statement.imageUrl || SITE.hero?.photoUrl || "";
    statementImage.alt = statement.imageAlt || "Asantewaa";
    if (statement.imagePosition) {
      statementImage.style.objectPosition = statement.imagePosition;
    }
  }
  const headlinesEl = document.getElementById("enterprise-headlines");
  if (headlinesEl && statement?.displayLines) {
    headlinesEl.innerHTML = statement.displayLines.map((line) => `<span class="ent-display-line">${line}</span>`).join("");
  }
  const statementsEl = document.getElementById("enterprise-statements");
  if (statementsEl && statement?.statements) {
    statementsEl.innerHTML = statement.statements.map((line) => `<p class="ent-bold-line">${line}</p>`).join("");
  }
  const bodyEl = document.getElementById("enterprise-body");
  if (bodyEl && statement?.body) {
    bodyEl.innerHTML = statement.body.map((block, index) => {
      const lines = block.map((line) => `<p class="ent-body-line">${line}</p>`).join("");
      const gap = index < statement.body.length - 1 ? '<div class="ent-body-gap" aria-hidden="true"></div>' : "";
      return lines + gap;
    }).join("");
  }
  const metricsEl = document.getElementById("enterprise-metrics");
  if (metricsEl && data.metrics) {
    const strips = data.metrics.filter((metric) => metric.variant === "strip");
    const cards = data.metrics.filter((metric) => metric.variant !== "strip");
    const cardsHtml = cards.map(
      (metric) => `
      <div class="ent-metric">
        <p class="ent-metric-value">${metric.value}</p>
        <p class="ent-metric-label">${metric.label}</p>
        ${metric.sublabel ? `<p class="ent-metric-sub">${metric.sublabel}</p>` : ""}
        ${metric.benchmark ? `<p class="ent-metric-faint">${metric.benchmark}</p>` : ""}
      </div>
    `
    ).join("");
    const stripsHtml = strips.length ? `
      <div class="ent-metric-strip-row" role="group" aria-label="Audience reach summary">
        ${strips.map(
      (metric) => `
          <span class="ent-metric-strip-item">${metric.text}</span>
        `
    ).join("")}
      </div>
    ` : "";
    metricsEl.innerHTML = cardsHtml + stripsHtml;
  }
  const brandsEl = document.getElementById("enterprise-brands");
  if (brandsEl && data.brandPartners?.items) {
    brandsEl.innerHTML = data.brandPartners.items.map(
      (brand) => `
      <span class="ent-brand">${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="${brand.name}">` : brand.name}</span>
    `
    ).join("");
  }
  const pillarsEl = document.getElementById("enterprise-pillars");
  if (pillarsEl && data.campaignPillars?.items) {
    pillarsEl.innerHTML = data.campaignPillars.items.map(
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
              ${(Array.isArray(pillar.body) ? pillar.body : [pillar.body]).map((line) => `<p class="ent-accordion-body-line">${line}</p>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `
    ).join("");
    initEnterpriseAccordion(pillarsEl);
  }
  const footerMid = document.getElementById("enterprise-footer-mid");
  if (footerMid && data.footer) footerMid.textContent = data.footer;
  const footerEnd = document.getElementById("enterprise-footer-end");
  if (footerEnd && data.footer) footerEnd.textContent = data.footer;
  renderHomeContact();
}
function renderGlamRoom() {
  const data = SITE.glamRoom;
  if (!data) return;
  document.title = "The Glam Room | Asantewaa";
  const decl = data.declaration;
  const titleEl = document.getElementById("gr-declaration-title");
  if (titleEl && decl?.title) titleEl.textContent = decl.title;
  const bylineEl = document.getElementById("gr-declaration-byline");
  if (bylineEl && decl?.byline) bylineEl.textContent = decl.byline;
  const taglineEl = document.getElementById("gr-declaration-tagline");
  if (taglineEl && decl?.tagline) taglineEl.textContent = decl.tagline;
  const sanctuariesEl = document.getElementById("gr-sanctuaries");
  if (sanctuariesEl) {
    sanctuariesEl.innerHTML = SITE.locations.map(
      (loc) => `
      <button type="button" class="gr-sanctuary" data-location-id="${loc.id}">
        <div class="gr-sanctuary__media" aria-hidden="true">
          <img src="${loc.imageUrl || SITE.hero.photoUrl}" alt="" loading="lazy" decoding="async"${loc.imagePosition ? ` style="object-position: ${loc.imagePosition}"` : ""}>
        </div>
        <div class="gr-sanctuary__shade" aria-hidden="true"></div>
        <div class="gr-sanctuary__content">
          <p class="gr-sanctuary__brand">${loc.name?.toUpperCase() || "GLAM ROOM"}</p>
          <p class="gr-sanctuary__area">${loc.area || loc.city || "ACCRA"}</p>
          <span class="gr-sanctuary__cta">RESERVE YOUR CHAIR</span>
        </div>
      </button>
    `
    ).join("");
  }
  const servicesEl = document.getElementById("gr-services-list");
  if (servicesEl && data.signatureServices) {
    servicesEl.innerHTML = data.signatureServices.map(
      (item) => `
      <a href="service.html?id=${item.serviceId}" class="gr-service-row">
        <span class="gr-service-row__num">${item.number}</span>
        <div class="gr-service-row__main">
          <p class="gr-service-row__title">${item.title}</p>
        </div>
        <p class="gr-service-row__desc">${item.descriptor}</p>
      </a>
    `
    ).join("");
  }
  const footerMid = document.getElementById("gr-footer-mid");
  if (footerMid) footerMid.textContent = data.footer || SITE.globalFooter;
  const footerEnd = document.getElementById("gr-footer-end");
  if (footerEnd) footerEnd.textContent = data.footer || SITE.globalFooter;
  bindSanctuaryBookingButtons();
  renderBusiness();
  renderServices();
  renderGallery();
  new TestimonialCarousel();
  initReveal();
}
function renderProposals() {
  const data = SITE.proposals;
  if (!data) return;
  document.title = "Partnerships | Asantewaa";
  const titleEl = document.getElementById("prop-hero-title");
  if (titleEl && data.hero?.title) titleEl.textContent = data.hero.title;
  const sublineEl = document.getElementById("prop-hero-subline");
  if (sublineEl && data.hero?.subline) sublineEl.textContent = data.hero.subline;
  const pillarSelect = document.getElementById("prop-pillar");
  if (pillarSelect && data.form?.pillars) {
    pillarSelect.innerHTML = data.form.pillars.map((p) => `<option value="${p}">${p}</option>`).join("");
  }
  const budgetSelect = document.getElementById("prop-budget");
  if (budgetSelect && data.form?.budgetTiers) {
    budgetSelect.innerHTML = '<option value="">\u2014 Select tier \u2014</option>' + data.form.budgetTiers.map((t) => `<option value="${t}">${t}</option>`).join("");
  }
  const submitBtn = document.getElementById("prop-submit");
  if (submitBtn && data.form?.submitLabel) submitBtn.textContent = data.form.submitLabel;
  const complianceEl = document.getElementById("prop-compliance");
  if (complianceEl && data.compliance) {
    complianceEl.innerHTML = data.compliance.map(
      (item) => `
      <div class="prop-compliance__item">
        <p class="prop-compliance__title">${item.title}</p>
        <p class="prop-compliance__body">${item.body}</p>
      </div>
    `
    ).join("");
  }
  const contactEl = document.getElementById("prop-contact");
  const contact = data.contact;
  if (contactEl && contact) {
    const waNum = contact.whatsapp?.replace(/[^0-9+]/g, "") || "";
    contactEl.innerHTML = `
      <p class="prop-contact__intro">${contact.intro || ""}</p>
      <div class="prop-contact__row">
        <span class="prop-contact__label">${contact.whatsappLabel || "WhatsApp Management"}</span>
        <a class="prop-contact__value" href="https://wa.me/${waNum.replace("+", "")}" target="_blank" rel="noopener noreferrer">${contact.whatsapp || ""}</a>
      </div>
      <div class="prop-contact__row">
        <span class="prop-contact__label">${contact.emailLabel || "Corporate Inbox"}</span>
        <a class="prop-contact__value" href="mailto:${contact.email || ""}">${contact.email || ""}</a>
      </div>
      <p class="prop-contact__locations">${contact.locations || ""}</p>
    `;
  }
  const footerEl = document.getElementById("prop-footer");
  if (footerEl) footerEl.textContent = data.footer || SITE.globalFooter;
  initProposalsForm();
}
function renderBusiness() {
  const taglineEl = document.getElementById("business-tagline");
  if (taglineEl) taglineEl.textContent = SITE.business.tagline;
  const introEl = document.getElementById("business-intro");
  if (introEl) {
    introEl.innerHTML = SITE.business.intro.map((p) => `<p>${p}</p>`).join("");
  }
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  if (quoteText) quoteText.textContent = SITE.quote.text;
  if (quoteAuthor) quoteAuthor.textContent = SITE.quote.attribution;
  const hoursEl = document.getElementById("business-hours");
  if (hoursEl) {
    hoursEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${SITE.business.hours}`;
  }
}
function renderHomeContact() {
  const socialsEl = document.getElementById("contact-socials");
  if (socialsEl) {
    socialsEl.innerHTML = SITE.socials.map(
      (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
    ).join("");
  }
  const footerSocials = document.getElementById("footer-socials");
  if (footerSocials) {
    footerSocials.innerHTML = SITE.socials.map(
      (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
    ).join("");
  }
}
function renderLocations(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !SITE.locations?.length) return;
  el.innerHTML = SITE.locations.map((loc) => {
    const address = loc.address?.trim();
    const title = getLocationLabel(loc);
    const showBrandLine = address && loc.name && address !== loc.name;
    return `
    <div class="glass-card location-card">
      <h3 class="location-card-name"><i class="fa-solid fa-location-dot"></i> ${title}</h3>
      ${showBrandLine ? `<p class="location-card-brand">${loc.name}</p>` : ""}
      ${address ? "" : `<p class="location-card-address">Open Google Maps for the full address.</p>`}
      <p class="location-card-meta">${loc.city}, ${loc.country}</p>
      ${loc.hours ? `<p class="location-card-hours"><i class="fa-regular fa-clock"></i> ${loc.hours}</p>` : ""}
      <a href="${loc.mapUrl}" class="location-card-map" target="_blank" rel="noopener noreferrer">
        View on Google Maps <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `;
  }).join("");
}
function renderContact() {
  renderLocations("contact-locations");
  const socialsEl = document.getElementById("contact-socials");
  if (socialsEl) {
    socialsEl.innerHTML = SITE.socials.map(
      (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
    ).join("");
  }
  const footerSocials = document.getElementById("footer-socials");
  if (footerSocials) {
    footerSocials.innerHTML = SITE.socials.map(
      (s) => `
      <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
        <i class="${s.icon}"></i>
      </a>
    `
    ).join("");
  }
}
function populateStaticContent() {
  const page = document.body.dataset.page || "home";
  const titles = {
    home: SITE.owner,
    enterprise: "The Enterprise | Asantewaa",
    "glam-room": "The Glam Room | Asantewaa",
    proposals: "Partnerships | Asantewaa",
    about: `About ${SITE.owner} | Glam Room`,
    business: `Glam Room | Hair Salon Accra \u2014 ${SITE.owner}`,
    booking: `Book Your Glam | ${SITE.brand}`
  };
  document.title = titles[page] || titles.home;
  const brandEls = document.querySelectorAll("[data-brand]");
  brandEls.forEach((el) => {
    el.innerHTML = `Glam Room <span>by Asantewaa</span>`;
  });
  const taglineEl = document.getElementById("hero-tagline");
  if (taglineEl) taglineEl.textContent = SITE.tagline;
  const footerCopy = document.getElementById("footer-copyright");
  if (footerCopy) footerCopy.textContent = SITE.footer.copyright;
  const footerTag = document.getElementById("footer-tagline");
  if (footerTag) footerTag.textContent = SITE.footer.tagline;
  const heroImg = document.getElementById("hero-photo");
  if (heroImg && SITE.hero.photoUrl) {
    heroImg.src = SITE.hero.photoUrl;
    heroImg.alt = SITE.hero.photoAlt;
    heroImg.style.display = "block";
    document.getElementById("hero-placeholder")?.remove();
  }
  const extensionNotice = SITE.business?.extensionNotice;
  if (extensionNotice) {
    document.querySelectorAll(".services-extension-notice").forEach((el) => {
      if (document.body.dataset.page === "service") return;
      el.innerHTML = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i><span>${extensionNotice}</span>`;
    });
  }
}
function getPageChrome() {
  const page = document.body.dataset.page || "home";
  if (page === "enterprise") {
    return {
      topbarLeft: SITE.enterprise?.topbarLeft || "THE ENTERPRISE",
      topbarLeftLink: SITE.enterprise?.topbarLeftLink || "about.html",
      menuLinks: SITE.enterprise?.menuLinks || SITE.aboutNavLinks
    };
  }
  if (page === "proposals") {
    return {
      topbarLeft: SITE.proposals?.topbarLeft || "PARTNERSHIPS",
      topbarLeftLink: SITE.proposals?.topbarLeftLink || "proposals.html",
      menuLinks: SITE.proposalsNavLinks || SITE.enterprise?.menuLinks || []
    };
  }
  if (page === "glam-room" || page === "booking" || page === "business" || page === "service") {
    return {
      topbarLeft: SITE.glamRoom?.topbarLeft || "GLAM ROOM",
      topbarLeftLink: SITE.glamRoom?.topbarLeftLink || "glam-room.html",
      menuLinks: page === "service" ? SITE.serviceNavLinks : SITE.glamRoom?.menuLinks || SITE.bookingNavLinks
    };
  }
  return {
    topbarLeft: SITE.home?.topbarLeft || "GLAM ROOM",
    topbarLeftLink: SITE.home?.topbarLeftLink || "index.html",
    menuLinks: SITE.home?.menuLinks || SITE.homeNavLinks
  };
}
function renderFindBookingPanel(panel, i, bgStyle, panelClass) {
  const copy = SITE.findBooking || {};
  const labelHtml = panel.label ? `<p class="home-panel-label">${panel.label}</p>` : "";
  return `
    <section class="${panelClass} home-panel--find-booking" id="${panel.id}">
      <div class="home-panel-bg" style="${bgStyle}"></div>
      <div class="home-panel-overlay"></div>
      <div class="home-panel-content home-panel-content--form">
        ${labelHtml}
        <h2 class="home-panel-title">${panel.title}</h2>
        ${panel.subtitle ? `<p class="home-panel-subtitle">${panel.subtitle}</p>` : ""}
        <form id="findBookingForm" class="find-booking-form" autocomplete="off">
          <label class="find-booking-field">
            <span>WhatsApp / phone number</span>
            <input type="tel" id="findPhone" required placeholder="${copy.phonePlaceholder || "+233 XX XXX XXXX"}">
          </label>
          <label class="find-booking-field">
            <span>Last 4 letters of your name</span>
            <input type="text" id="findNameSuffix" required maxlength="4" minlength="4"
              placeholder="${copy.namePlaceholder || "e.g. nsah"}" autocapitalize="characters" spellcheck="false">
          </label>
          <button type="submit" class="find-booking-submit">${copy.submitLabel || "Check Status"}</button>
        </form>
        <div id="findBookingResult" class="find-booking-result" hidden></div>
      </div>
    </section>
  `;
}
function renderHomePanels() {
  const container = document.getElementById("home-panels");
  if (!container || !SITE.home?.panels) return;
  container.innerHTML = SITE.home.panels.map((panel, i) => {
    const introHeroImage = i === 0 ? getHeroIntroImageUrl() : "";
    const imageUrl = introHeroImage || panel.imageUrl || (i === 0 ? SITE.hero.photoUrl : "");
    const imagePosition = panel.imagePosition || "center top";
    const overlay = panel.imageOnly ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)" : panel.gradient || "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)";
    const bgStyle = imageUrl ? `background-image: ${overlay}, url('${imageUrl}'); background-position: ${imagePosition};` : `background: ${panel.gradient || "#1a0f0a"};`;
    const isVisual = panel.imageOnly;
    const panelClass = `home-panel${i === 0 ? " in-view" : ""}${isVisual ? " home-panel--visual" : ""}`;
    if (panel.type === "find-booking") {
      return renderFindBookingPanel(panel, i, bgStyle, panelClass);
    }
    const linkOverlay = panel.link ? `<a href="${panel.link}" class="home-panel-link" aria-label="${panel.linkText || panel.labelLeft || panel.title || "View"}"></a>` : "";
    if (isVisual) {
      const hasLabels = Boolean(panel.labelLeft || panel.labelRight);
      const labelsHtml = hasLabels ? `<div class="home-panel-visual-labels">
            <span>${panel.labelLeft || ""}</span>
            <span>${panel.labelRight || ""}</span>
          </div>` : "";
      const ariaLabel = [panel.labelLeft, panel.labelRight].filter(Boolean).join(" ") || "Photo";
      return `
        <section class="${panelClass}" id="${panel.id}">
          <div class="home-panel-bg" style="${bgStyle}" role="img" aria-label="${ariaLabel}"></div>
          ${linkOverlay}
          ${labelsHtml}
        </section>
      `;
    }
    const titleClass = i === 0 ? "home-panel-title hero-name" : "home-panel-title";
    const labelHtml = panel.label ? `<p class="home-panel-label">${panel.label}</p>` : "";
    const headingTag = i === 0 ? "h1" : "h2";
    const ctaHtml = panel.link ? `<a href="${panel.link}" class="home-panel-cta">${panel.linkText || "Explore"}</a>` : "";
    const heroBrandHtml = i === 0 && SITE.home?.introLoader ? (() => {
      const { html, letterStaggerMs } = buildIntroTitleMarkup(SITE.home.introLoader);
      return `<div id="home-hero-brand" class="home-hero-brand" style="--letter-stagger:${letterStaggerMs}ms" aria-hidden="true">${html}</div>`;
    })() : "";
    const useHeroBrand = Boolean(heroBrandHtml);
    const headingHtml = useHeroBrand ? "" : `<${headingTag} class="${titleClass}">${panel.title}</${headingTag}>`;
    return `
        <section class="${panelClass}" id="${panel.id}">
          <div class="home-panel-bg" style="${bgStyle}"></div>
          <div class="home-panel-overlay"></div>
          ${linkOverlay}
          <div class="home-panel-content${useHeroBrand ? " home-panel-content--hero" : ""}">
            ${heroBrandHtml}
            ${labelHtml}
            ${headingHtml}
            ${!useHeroBrand && panel.subtitle ? `<p class="home-panel-subtitle">${panel.subtitle}</p>` : ""}
            ${ctaHtml}
          </div>
        </section>
      `;
  }).join("");
}
function initEditorialMenu() {
  const openBtn = document.getElementById("home-menu-open");
  const closeBtn = document.getElementById("home-menu-close");
  const panel = document.getElementById("home-menu-panel");
  const overlay = document.getElementById("home-menu-overlay");
  const chrome = getPageChrome();
  const menuLinks = document.getElementById("home-menu-links");
  if (menuLinks) {
    menuLinks.innerHTML = chrome.menuLinks.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("");
  }
  const menuSocials = document.getElementById("home-menu-socials");
  if (menuSocials) {
    menuSocials.innerHTML = SITE.socials.map(
      (s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}"><i class="${s.icon}"></i></a>`
    ).join("");
  }
  const topbarLeft = document.getElementById("home-topbar-left");
  if (topbarLeft) {
    topbarLeft.textContent = chrome.topbarLeft;
    topbarLeft.href = chrome.topbarLeftLink;
  }
  const copyright = document.getElementById("home-copyright");
  if (copyright) copyright.textContent = `${SITE.owner} \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()}`;
  const menuFooter = document.getElementById("home-menu-footer");
  if (menuFooter) menuFooter.textContent = SITE.footer.tagline;
  function setMenu(open) {
    panel?.classList.toggle("open", open);
    overlay?.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  openBtn?.addEventListener("click", () => setMenu(true));
  closeBtn?.addEventListener("click", () => setMenu(false));
  overlay?.addEventListener("click", () => setMenu(false));
  panel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function buildIntroTitleMarkup(config) {
  const title = (config?.title || SITE.owner || "Asantewaa").toUpperCase();
  const subtitle = (config?.subtitle || "").toUpperCase();
  const letterStaggerMs = config?.letterStaggerMs ?? 28;
  const titleLetters = [...title].map((ch, i) => {
    const safe = ch === " " ? "\xA0" : escapeHtml(ch);
    return `<span class="home-intro-letter" style="--i:${i}">${safe}</span>`;
  }).join("");
  return {
    title,
    subtitle,
    letterStaggerMs,
    html: `
      <div class="home-intro-title-line">${titleLetters}</div>
      ${subtitle ? `<p class="home-intro-subtitle" style="--i:${title.length + 1}">${escapeHtml(subtitle)}</p>` : ""}
    `
  };
}
function getHeroIntroImageUrl() {
  const heroPanel = SITE.home?.panels?.[0];
  if (heroPanel?.imageUrl) return heroPanel.imageUrl;
  const introImages = SITE.home?.introLoader?.images?.filter(Boolean);
  if (introImages?.length) return introImages[introImages.length - 1];
  return SITE.hero?.photoUrl || "";
}
function setBrandSlideDistance(hero, brand) {
  if (!hero || !brand) return;
  const content = hero.querySelector(".home-panel-content");
  const bottomPadding = content ? parseFloat(getComputedStyle(content).paddingBottom) || 72 : 72;
  const heroRect = hero.getBoundingClientRect();
  const brandHeight = brand.offsetHeight || 100;
  const settledCenterY = heroRect.bottom - bottomPadding - brandHeight / 2;
  const viewportCenterY = window.innerHeight / 2;
  const shift = settledCenterY - viewportCenterY;
  brand.style.setProperty("--hero-brand-shift", `${shift}px`);
}
function showHeroBrandImmediately(hero, brand) {
  if (!brand) return;
  brand.classList.add("show-title", "is-settled");
  brand.removeAttribute("aria-hidden");
  hero?.classList.add("home-hero-title-settled");
  document.body.classList.add("home-intro-done", "home-hero-title-done");
}
function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (url) => new Promise((resolve) => {
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
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!images?.length || reducedMotion) {
    showHeroBrandImmediately(
      document.getElementById("hero"),
      document.getElementById("home-hero-brand")
    );
    onComplete();
    return;
  }
  document.body.classList.add("home-intro-active");
  const loader = document.createElement("div");
  loader.className = "home-intro-loader";
  loader.setAttribute("role", "presentation");
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
  const slidesEl = loader.querySelector(".home-intro-loader__slides");
  const slides = images.map((src) => {
    const slide = document.createElement("div");
    slide.className = "home-intro-slide";
    slide.innerHTML = `<img src="${src}" alt="" decoding="async">`;
    slidesEl.appendChild(slide);
    return slide;
  });
  document.body.appendChild(loader);
  await preloadImages(images);
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const slideMs = config.slideMs ?? 480;
  const starMs = config.starMs ?? 650;
  const exitMs = config.exitMs ?? 750;
  slides[0]?.classList.add("is-active");
  for (let i = 1; i < slides.length; i += 1) {
    await sleep(slideMs);
    slides[i - 1]?.classList.remove("is-active");
    slides[i]?.classList.add("is-active");
  }
  await sleep(slideMs);
  loader.classList.add("show-stars");
  await sleep(starMs);
  loader.classList.add("is-exiting");
  document.body.classList.remove("home-intro-active");
  document.body.classList.add("home-intro-done", "home-hero-title-active");
  await sleep(exitMs);
  loader.remove();
  await initHeroTitleSequence();
  onComplete();
}
async function initHeroTitleSequence() {
  const config = SITE.home?.introLoader;
  const hero = document.getElementById("hero");
  const brand = document.getElementById("home-hero-brand");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!brand || !config || reducedMotion) {
    showHeroBrandImmediately(hero, brand);
    return;
  }
  brand.classList.add("is-revealing");
  await sleep(120);
  brand.classList.add("show-title");
  const { title } = buildIntroTitleMarkup(config);
  const letterStaggerMs = config.letterStaggerMs ?? 28;
  const titleHoldMs = config.titleHoldMs ?? 280;
  const titleSlideMs = config.titleSlideMs ?? 950;
  const titleRevealMs = title.length * letterStaggerMs + 220;
  await sleep(titleRevealMs + titleHoldMs);
  brand.style.setProperty("--hero-brand-shift", "0px");
  await new Promise((resolve) => requestAnimationFrame(resolve));
  setBrandSlideDistance(hero, brand);
  brand.classList.add("is-sliding");
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await sleep(titleSlideMs);
  brand.classList.remove("is-revealing", "is-sliding");
  brand.classList.add("is-settled");
  brand.removeAttribute("aria-hidden");
  document.body.classList.remove("home-hero-title-active");
  document.body.classList.add("home-hero-title-done");
  hero?.classList.add("home-hero-title-settled");
  const recalc = () => setBrandSlideDistance(hero, brand);
  window.addEventListener("resize", recalc, { passive: true });
}
function isHomeHorizontalScroll() {
  return window.matchMedia("(min-width: 1024px)").matches;
}
function initHomeScrollEffects() {
  const scrollEl = document.getElementById("home-scroll");
  const hint = document.getElementById("home-scroll-hint");
  const panels = document.querySelectorAll(".home-panel");
  const dotsContainer = document.getElementById("home-scroll-dots");
  if (dotsContainer && panels.length) {
    dotsContainer.innerHTML = Array.from(
      panels,
      (_, i) => `<span class="home-scroll-dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`
    ).join("");
  }
  const dots = dotsContainer?.querySelectorAll(".home-scroll-dot");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function updateActivePanel() {
    const horizontal = isHomeHorizontalScroll();
    let activeIndex = 0;
    panels.forEach((panel, i) => {
      const rect = panel.getBoundingClientRect();
      const inView = horizontal ? rect.left < window.innerWidth * 0.55 && rect.right > window.innerWidth * 0.45 : rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45;
      panel.classList.toggle("in-view", inView);
      if (inView) activeIndex = i;
      const bg = panel.querySelector(".home-panel-bg");
      if (bg && !reducedMotion.matches) {
        if (horizontal) {
          const center = rect.left + rect.width / 2;
          const viewportCenter = window.innerWidth / 2;
          const offset = (center - viewportCenter) / window.innerWidth * 36;
          bg.style.setProperty("--parallax-x", `${offset.toFixed(1)}px`);
          bg.style.setProperty("--parallax-y", "0px");
        } else {
          const center = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const offset = (center - viewportCenter) / window.innerHeight * 36;
          bg.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
          bg.style.setProperty("--parallax-x", "0px");
        }
      }
    });
    dots?.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
  }
  if (!scrollEl) return;
  scrollEl.addEventListener("scroll", () => {
    const horizontal = isHomeHorizontalScroll();
    const scrolled = horizontal ? scrollEl.scrollLeft : scrollEl.scrollTop;
    if (scrolled > 80) hint?.classList.add("hidden");
    updateActivePanel();
  }, { passive: true });
  scrollEl.addEventListener("wheel", (e) => {
    if (!isHomeHorizontalScroll() || e.ctrlKey) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    scrollEl.scrollLeft += e.deltaY;
  }, { passive: false });
  dots?.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      const panel = panels[index];
      if (!panel) return;
      panel.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "nearest",
        inline: isHomeHorizontalScroll() ? "start" : "nearest"
      });
    });
  });
  window.addEventListener("resize", updateActivePanel, { passive: true });
  updateActivePanel();
}
var TestimonialCarousel = class {
  constructor() {
    this.track = document.getElementById("testimonial-track");
    this.dotsContainer = document.getElementById("carousel-dots");
    this.prevBtn = document.getElementById("carousel-prev");
    this.nextBtn = document.getElementById("carousel-next");
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
    this.track.innerHTML = SITE.testimonials.map(
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
    ).join("");
  }
  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = SITE.testimonials.map(
      (_, i) => `<button class="carousel-dot${i === 0 ? " active" : ""}" aria-label="Go to testimonial ${i + 1}" data-index="${i}"></button>`
    ).join("");
  }
  goTo(index) {
    this.current = (index % this.total + this.total) % this.total;
    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    this.dotsContainer?.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.current);
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
    this.autoInterval = setInterval(() => this.next(), 5e3);
  }
  stopAuto() {
    if (this.autoInterval) clearInterval(this.autoInterval);
  }
  bindEvents() {
    this.prevBtn?.addEventListener("click", () => {
      this.prev();
      this.startAuto();
    });
    this.nextBtn?.addEventListener("click", () => {
      this.next();
      this.startAuto();
    });
    this.dotsContainer?.addEventListener("click", (e) => {
      const dot = e.target.closest(".carousel-dot");
      if (dot) {
        this.goTo(parseInt(dot.dataset.index, 10));
        this.startAuto();
      }
    });
    const wrapper = document.querySelector(".testimonial-carousel");
    wrapper?.addEventListener("mouseenter", () => this.stopAuto());
    wrapper?.addEventListener("mouseleave", () => this.startAuto());
    wrapper?.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    wrapper?.addEventListener(
      "touchend",
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
};
function initParallax() {
  const layer = document.getElementById("hero-parallax");
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  document.addEventListener("mousemove", (e) => {
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
function initCustomCursor() {
  if (document.body.classList.contains("enterprise-page")) return;
  const isTouch = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(max-width: 768px)").matches;
  if (isTouch) {
    document.body.classList.add("no-custom-cursor");
    return;
  }
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  document.querySelectorAll("a, button, .gallery-item, .service-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
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
var revealObserver;
function observeRevealElements(elements) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
  }
  elements.forEach((el) => revealObserver.observe(el));
}
function initReveal() {
  observeRevealElements(document.querySelectorAll(".reveal"));
}
function initButtons() {
  const page = document.body.dataset.page || "home";
  document.getElementById("btn-view-services")?.addEventListener("click", () => {
    scrollToSection("#services");
  });
  if (page === "business" || page === "glam-room") {
    document.getElementById("btn-contact-whatsapp")?.addEventListener("click", openWhatsApp);
  }
  if (page === "glam-room") {
    const openDefaultBooking = () => {
      openBookingPage();
    };
    document.getElementById("btn-hero-book")?.addEventListener("click", openDefaultBooking);
    document.getElementById("btn-contact-book")?.addEventListener("click", openDefaultBooking);
  }
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
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
function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.hasAttribute("target")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}
function bootApp() {
  const page = document.body.dataset.page || "home";
  populateStaticContent();
  initEditorialMenu();
  initCustomCursor();
  if (page !== "home") {
    renderContact();
    initReveal();
    initButtons();
  }
  initExternalLinks();
  if (page === "home") {
    renderHomePanels();
    initFindBooking();
    initInstallPrompt();
    initHomeIntroLoader(() => {
      initHomeScrollEffects();
    });
  } else if (page === "business") {
    renderServices();
    renderBusiness();
    renderGallery();
    new TestimonialCarousel();
    initParallax();
  } else if (page === "service") {
    renderServiceDetail();
    initParallax();
  } else if (page === "enterprise") {
    renderEnterprise();
  } else if (page === "glam-room") {
    renderGlamRoom();
    initParallax();
  } else if (page === "proposals") {
    renderProposals();
  } else if (page === "about") {
    renderAbout();
    initParallax();
  } else if (page === "booking") {
    initBookingForm();
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  bootApp();
}
