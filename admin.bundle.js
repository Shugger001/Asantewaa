// data.js
var SITE = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  logo: {
    white: "icons/logo-white.png",
    black: "icons/logo-black.png",
    /** Pages 6–7 use the black mark on light backgrounds */
    blackOnPages: ["booking", "admin"]
  },
  tagline: "Accra's baddest hair destination where your crown gets the main character energy it deserves.",
  /** Wireframe document — 6 pages (PDF pages 2–7) */
  wireframePages: [
    { id: "01", label: "Home \xB7 Editorial Gateway", href: "index.html" },
    { id: "02", label: "The Enterprise \xB7 Partnerships & Influence", href: "about.html" },
    { id: "02b", label: "The Enterprise \xB7 Campaign Pillars", href: "about.html#pillars" },
    { id: "03", label: "The Glam Room \xB7 Salon Flagship", href: "glam-room.html" },
    { id: "03b", label: "The Glam Room \xB7 Signature Services", href: "glam-room.html#services" },
    { id: "04", label: "Partnerships \xB7 Brand Intake", href: "proposals.html" }
  ],
  globalFooter: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
  url: "https://shugger001.github.io/Asantewaaa",
  whatsapp: "+233247743593",
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
      hours: "Mon to Sat: 9am to 6pm \xB7 Sun: Closed",
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
      hours: "Mon to Sat: 9am to 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-braids-studio.png",
      imagePosition: "center top",
      bookingValue: "glam-room-sowutuom"
    }
  ],
  hero: {
    photoUrl: "images/asantewaa-gown-smile.png",
    photoAlt: "Asantewaa at Glam Room by Asantewaa",
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
      slideMs: 240,
      starMs: 320,
      exitMs: 480,
      titleHoldMs: 420,
      titleSlideMs: 1e3,
      title: "Asantewaa",
      subtitle: "Accra \xB7 Glam Room",
      letterStaggerMs: 32
    },
    panels: [
      {
        id: "hero",
        label: "",
        title: "Asantewaa",
        subtitle: "",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center 22%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.82) 100%)",
        link: null
      },
      {
        id: "discover",
        label: "The Enterprise",
        title: "The Era of Influence",
        subtitle: "Orchestrating Global Dominance",
        imageUrl: "images/asantewaa-kente-color.png",
        imagePosition: "center 18%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.88) 100%)",
        link: "about.html",
        linkText: "The Enterprise"
      },
      {
        id: "glam",
        label: "The Glam Room",
        title: "Your Crown. Your Glow.",
        subtitle: "Accra's Premier Hair Destination",
        imageUrl: "images/asantewaa-gown-mirror-color.png",
        imagePosition: "center 28%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.9) 100%)",
        link: "glam-room.html",
        linkText: "Enter Glam Room"
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
        id: "visual-2",
        imageOnly: true,
        imageUrl: "images/asantewaa-kente-bw.png",
        imagePosition: "center 15%"
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
        imageUrl: "images/asantewaa-gown-smile.png",
        imagePosition: "center 12%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.92) 100%)",
        link: "book.html",
        linkText: "Book Now"
      },
      {
        id: "find-booking",
        type: "find-booking",
        label: "Track",
        title: "Find My Booking",
        subtitle: "Phone and last 4 letters of your name",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 30%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.92) 100%)"
      },
      {
        id: "visual-8",
        imageOnly: true,
        imageUrl: "images/glam-red-outdoor.png",
        imagePosition: "center 22%"
      },
      {
        id: "visual-9",
        imageOnly: true,
        imageUrl: "images/glam-red-studio.png",
        imagePosition: "center 18%"
      }
    ]
  },
  quote: {
    text: "I didn't come to play, I came to SLAY, and so did your hair when you walk out my door. Baby girl, treat yourself. You deserve to look expensive!",
    attribution: "Asantewaa"
  },
  about: {
    headline: "The Queen Behind the Chair",
    paragraphs: [
      "Asantewaa is Ghana's favourite TikTok star with 4 million+ followers who know her for her energy, her humour, and her unapologetic Ghanaian pride. What started as viral content turned into a dream: a salon where every woman walks in feeling like herself and walks out feeling like THAT girl.",
      "Glam Room is her love letter to Accra: warm vibes, expert hands, and zero tolerance for bad hair days. Whether you're coming for a silk press or a full transformation, you're family here."
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
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    statement: {
      imageUrl: "images/asantewaa-enterprise-statement.png",
      imageAlt: "Asantewaa editorial portrait",
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
      { value: "4M+", label: "TIKTOK FOLLOWERS" },
      { value: "8.4%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 2 to 4%" },
      { value: "1M+", label: "INSTAGRAM FOLLOWERS" },
      { value: "5.2%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 1 to 3%" },
      { value: "12M+", label: "MONTHLY VIDEO VIEWS", sublabel: "Across All Platforms" },
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
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    declaration: {
      title: "THE GLAM ROOM",
      byline: "BY ASANTEWAA",
      tagline: "Where the world's most driven women come to be seen, restored, and elevated."
    },
    bookingOverlay: {
      title: "RESERVE YOUR CHAIR",
      locationPrefix: "GLAM ROOM \xB7",
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
        "GH\u20B5 50,000 to GH\u20B5 150,000",
        "GH\u20B5 150,000 to GH\u20B5 500,000",
        "GH\u20B5 500,000+"
      ],
      pillars: [
        "01 \xB7 Demonstrative Campaigns",
        "02 \xB7 Pro Location Campaigns",
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
      description: "Fresh start energy: wash, unwind, touch-ups, and quick styles to reset your crown.",
      price: "From GH\u20B5 35",
      duration: "30 min to 2 hrs",
      icon: "fa-solid fa-arrows-rotate",
      badge: "Popular",
      styles: [
        { id: "hair-wash", name: "Hair Wash", description: "Cleanse and refresh your hair.", price: "GH\u20B5 35", duration: "30 min", imageUrl: "images/glam-adenta-portrait.png" },
        { id: "hair-wash-cornrows", name: "Hair Wash + Cornrows", description: "Wash plus cornrow styling.", price: "GH\u20B5 55", duration: "1 to 1.5 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "unbraid-hair-wash", name: "Unbraiding & Hair Wash", description: "Take down braids and wash your hair.", price: "GH\u20B5 50", duration: "1 to 2 hrs", imageUrl: "images/glam-braids-portrait.png" },
        { id: "touch-up-salon-relaxer", name: "Touch Up with Salon\u2019s Relaxer", description: "New growth touch-up using Glam Room relaxer.", price: "GH\u20B5 70", duration: "1 to 1.5 hrs", imageUrl: "images/glam-gallery-waves-front.png" },
        { id: "touch-up-client-relaxer", name: "Touch Up with Client\u2019s Relaxer", description: "New growth touch-up using your own relaxer.", price: "GH\u20B5 50", duration: "1 to 1.5 hrs", imageUrl: "images/glam-gallery-waves-profile.png" },
        { id: "normal-ponytail", name: "Normal Ponytail", description: "Sleek, styled ponytail finish.", price: "GH\u20B5 80", duration: "45 min to 1 hr", imageUrl: "images/glam-red-outdoor.png" }
      ]
    },
    {
      id: "hair-installation",
      name: "Hair Installation Services",
      description: "Closure and frontal installs: secure, natural, and styled to slay.",
      price: "From GH\u20B5 50",
      duration: "1 to 2 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
      styles: [
        { id: "closure-install", name: "Closure Hair Install", description: "Closure unit installed and styled.", price: "GH\u20B5 50", duration: "1 to 1.5 hrs", imageUrl: "images/glam-red-studio.png" },
        { id: "frontal-install", name: "Frontal Hair Install", description: "Frontal unit installed with a natural hairline.", price: "GH\u20B5 100", duration: "1.5 to 2 hrs", imageUrl: "images/glam-red-indoor.png" },
        { id: "frontal-ponytail", name: "Frontal Ponytail", description: "Frontal install finished in a sleek ponytail style.", price: "GH\u20B5 150", duration: "1.5 to 2 hrs", imageUrl: "images/glam-red-celebration.png" }
      ]
    },
    {
      id: "braiding-workmanship",
      name: "Braids (Workmanship Only)",
      description: "Expert braiding by length. You bring the hair, we bring the hands. Workmanship only.",
      price: "From GH\u20B5 150",
      duration: "3 to 8 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
      styles: [
        { id: "shoulder-length", name: "Shoulder Length", description: "Braiding service to shoulder length. Hair not included.", price: "GH\u20B5 150", duration: "3 to 4 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "bra-length", name: "Bra Length", description: "Braiding service to bra strap length. Hair not included.", price: "GH\u20B5 200", duration: "4 to 5 hrs", imageUrl: "images/glam-gallery-braids-bw.png" },
        { id: "hip-length", name: "Hip Length", description: "Braiding service to hip length. Hair not included.", price: "GH\u20B5 250", duration: "5 to 6 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "butt-length", name: "Butt Length", description: "Braiding service to butt length. Hair not included.", price: "GH\u20B5 300", duration: "6 to 7 hrs", imageUrl: "images/glam-braids-portrait.png" },
        { id: "under-butt", name: "Under Butt", description: "Braiding service past butt length. Hair not included.", price: "GH\u20B5 400", duration: "7 to 8 hrs", imageUrl: "images/glam-braids-portrait.png" }
      ]
    }
  ],
  testimonials: [
    {
      text: "Baby girl, when you leave my chair, Accra is NOT ready! Best silk press I've ever had. I felt like a whole new person.",
      author: "Ama K.",
      role: "Regular Client"
    },
    {
      text: "Asantewaa did my braids and I got stopped on the street THREE times. The energy in that salon? Unmatched!",
      author: "Efua M.",
      role: "First-Timer"
    },
    {
      text: "I came in stressed, I left feeling like a celebrity. The vibes, the music, the hair. 10/10 would recommend to every sis.",
      author: "Akua T.",
      role: "Glam Room Client"
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
    { id: 4, label: "Signature Glam", imageUrl: "images/glam-red-indoor.png", gradient: "linear-gradient(135deg, #D4A853 0%, #C75B39 100%)" },
    { id: 5, label: "Studio Slay", imageUrl: "images/glam-red-studio.png", gradient: "linear-gradient(135deg, #2C1810 0%, #006B3F 100%)" },
    { id: 6, label: "Celebration Glam", imageUrl: "images/glam-red-celebration.png", gradient: "linear-gradient(135deg, #CE1126 0%, #FCD116 100%)" },
    { id: 7, label: "Silk Waves Profile", imageUrl: "images/glam-gallery-waves-profile.png", gradient: "linear-gradient(135deg, #C75B39 0%, #006B3F 100%)" },
    { id: 8, label: "Butterfly Braids B&W", imageUrl: "images/glam-gallery-braids-bw.png", gradient: "linear-gradient(135deg, #2C1810 0%, #666 100%)" },
    { id: 9, label: "Hollywood Waves", imageUrl: "images/glam-gallery-waves-front.png", gradient: "linear-gradient(135deg, #D4A853 0%, #CE1126 100%)" }
  ],
  business: {
    tagline: "Where beauty meets influence, and every detail is designed to make a statement.",
    extensionNotice: "Please note that all Braids prices do not include hair extensions. You can either come along with your own extensions or purchase from our salon.",
    intro: [
      "Glam Room is a destination for modern beauty. Designed for women who value excellence, every service is delivered with precision, care, and an uncompromising attention to detail.",
      "From everyday refinement to life's defining moments, our stylists create looks that feel effortless, elevated, and uniquely yours."
    ],
    hours: "Mon to Sat: 9am to 6pm \xB7 Sun: Closed"
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
      confirmedMessage: "You're confirmed! Your deposit secures your chair. See you at Glam Room."
    },
    timeSlots: [
      { value: "08:00", label: "08:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "14:00", label: "02:00 PM" },
      { value: "17:00", label: "05:00 PM" }
    ]
  },
  // Admin dashboard — admin.html (create user via supabase/create-admin-lesley.sql)
  admin: {},
  findBooking: {
    phonePlaceholder: "024 XXX XXXX or +233 XX XXX XXXX",
    namePlaceholder: "Last 4 letters of your name",
    submitLabel: "Check Status",
    loading: "Checking\u2026",
    invalidPhone: "Enter a valid Ghana number (e.g. 024XXXXXXX).",
    invalidName: "Enter exactly 4 letters: the last 4 letters of the name you booked with.",
    notFound: "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
    unavailable: "Booking lookup is not available yet. WhatsApp Glam Room to check your slot.",
    error: "Something went wrong. Please try again or WhatsApp Glam Room."
  },
  installPrompt: {
    title: "Add Glam Room to your home screen",
    body: "Open like an app: one tap from your phone, no browser bar. Perfect for booking your next slay \u{1F451}",
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
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  footer: {
    copyright: `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana \u{1F1EC}\u{1F1ED}"
  }
};

// supabase-client.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// data.js?v=20260536
var SITE2 = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  logo: {
    white: "icons/logo-white.png",
    black: "icons/logo-black.png",
    /** Pages 6–7 use the black mark on light backgrounds */
    blackOnPages: ["booking", "admin"]
  },
  tagline: "Accra's baddest hair destination where your crown gets the main character energy it deserves.",
  /** Wireframe document — 6 pages (PDF pages 2–7) */
  wireframePages: [
    { id: "01", label: "Home \xB7 Editorial Gateway", href: "index.html" },
    { id: "02", label: "The Enterprise \xB7 Partnerships & Influence", href: "about.html" },
    { id: "02b", label: "The Enterprise \xB7 Campaign Pillars", href: "about.html#pillars" },
    { id: "03", label: "The Glam Room \xB7 Salon Flagship", href: "glam-room.html" },
    { id: "03b", label: "The Glam Room \xB7 Signature Services", href: "glam-room.html#services" },
    { id: "04", label: "Partnerships \xB7 Brand Intake", href: "proposals.html" }
  ],
  globalFooter: "\xA9 2026 THE HOUSE OF ASANTEWAA. ALL RIGHTS RESERVED.",
  url: "https://shugger001.github.io/Asantewaaa",
  whatsapp: "+233247743593",
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
      hours: "Mon to Sat: 9am to 6pm \xB7 Sun: Closed",
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
      hours: "Mon to Sat: 9am to 6pm \xB7 Sun: Closed",
      imageUrl: "images/glam-braids-studio.png",
      imagePosition: "center top",
      bookingValue: "glam-room-sowutuom"
    }
  ],
  hero: {
    photoUrl: "images/asantewaa-gown-smile.png",
    photoAlt: "Asantewaa at Glam Room by Asantewaa",
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
      slideMs: 240,
      starMs: 320,
      exitMs: 480,
      titleHoldMs: 420,
      titleSlideMs: 1e3,
      title: "Asantewaa",
      subtitle: "Accra \xB7 Glam Room",
      letterStaggerMs: 32
    },
    panels: [
      {
        id: "hero",
        label: "",
        title: "Asantewaa",
        subtitle: "",
        imageUrl: "images/glam-red-celebration.png",
        imagePosition: "center 22%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.82) 100%)",
        link: null
      },
      {
        id: "discover",
        label: "The Enterprise",
        title: "The Era of Influence",
        subtitle: "Orchestrating Global Dominance",
        imageUrl: "images/asantewaa-kente-color.png",
        imagePosition: "center 18%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.88) 100%)",
        link: "about.html",
        linkText: "The Enterprise"
      },
      {
        id: "glam",
        label: "The Glam Room",
        title: "Your Crown. Your Glow.",
        subtitle: "Accra's Premier Hair Destination",
        imageUrl: "images/asantewaa-gown-mirror-color.png",
        imagePosition: "center 28%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.9) 100%)",
        link: "glam-room.html",
        linkText: "Enter Glam Room"
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
        id: "visual-2",
        imageOnly: true,
        imageUrl: "images/asantewaa-kente-bw.png",
        imagePosition: "center 15%"
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
        imageUrl: "images/asantewaa-gown-smile.png",
        imagePosition: "center 12%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.92) 100%)",
        link: "book.html",
        linkText: "Book Now"
      },
      {
        id: "find-booking",
        type: "find-booking",
        label: "Track",
        title: "Find My Booking",
        subtitle: "Phone and last 4 letters of your name",
        imageUrl: "images/glam-red-indoor.png",
        imagePosition: "center 30%",
        gradient: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.92) 100%)"
      },
      {
        id: "visual-8",
        imageOnly: true,
        imageUrl: "images/glam-red-outdoor.png",
        imagePosition: "center 22%"
      },
      {
        id: "visual-9",
        imageOnly: true,
        imageUrl: "images/glam-red-studio.png",
        imagePosition: "center 18%"
      }
    ]
  },
  quote: {
    text: "I didn't come to play, I came to SLAY, and so did your hair when you walk out my door. Baby girl, treat yourself. You deserve to look expensive!",
    attribution: "Asantewaa"
  },
  about: {
    headline: "The Queen Behind the Chair",
    paragraphs: [
      "Asantewaa is Ghana's favourite TikTok star with 4 million+ followers who know her for her energy, her humour, and her unapologetic Ghanaian pride. What started as viral content turned into a dream: a salon where every woman walks in feeling like herself and walks out feeling like THAT girl.",
      "Glam Room is her love letter to Accra: warm vibes, expert hands, and zero tolerance for bad hair days. Whether you're coming for a silk press or a full transformation, you're family here."
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
      { label: "The Glam Room", href: "glam-room.html" },
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    statement: {
      imageUrl: "images/asantewaa-enterprise-statement.png",
      imageAlt: "Asantewaa editorial portrait",
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
      { value: "4M+", label: "TIKTOK FOLLOWERS" },
      { value: "8.4%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 2 to 4%" },
      { value: "1M+", label: "INSTAGRAM FOLLOWERS" },
      { value: "5.2%", label: "AVG ENGAGEMENT RATE", benchmark: "Industry avg: 1 to 3%" },
      { value: "12M+", label: "MONTHLY VIDEO VIEWS", sublabel: "Across All Platforms" },
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
      { label: "Book Appointment", href: "book.html" },
      { label: "Partnerships", href: "proposals.html" }
    ],
    declaration: {
      title: "THE GLAM ROOM",
      byline: "BY ASANTEWAA",
      tagline: "Where the world's most driven women come to be seen, restored, and elevated."
    },
    bookingOverlay: {
      title: "RESERVE YOUR CHAIR",
      locationPrefix: "GLAM ROOM \xB7",
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
        "GH\u20B5 50,000 to GH\u20B5 150,000",
        "GH\u20B5 150,000 to GH\u20B5 500,000",
        "GH\u20B5 500,000+"
      ],
      pillars: [
        "01 \xB7 Demonstrative Campaigns",
        "02 \xB7 Pro Location Campaigns",
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
      description: "Fresh start energy: wash, unwind, touch-ups, and quick styles to reset your crown.",
      price: "From GH\u20B5 35",
      duration: "30 min to 2 hrs",
      icon: "fa-solid fa-arrows-rotate",
      badge: "Popular",
      styles: [
        { id: "hair-wash", name: "Hair Wash", description: "Cleanse and refresh your hair.", price: "GH\u20B5 35", duration: "30 min", imageUrl: "images/glam-adenta-portrait.png" },
        { id: "hair-wash-cornrows", name: "Hair Wash + Cornrows", description: "Wash plus cornrow styling.", price: "GH\u20B5 55", duration: "1 to 1.5 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "unbraid-hair-wash", name: "Unbraiding & Hair Wash", description: "Take down braids and wash your hair.", price: "GH\u20B5 50", duration: "1 to 2 hrs", imageUrl: "images/glam-braids-portrait.png" },
        { id: "touch-up-salon-relaxer", name: "Touch Up with Salon\u2019s Relaxer", description: "New growth touch-up using Glam Room relaxer.", price: "GH\u20B5 70", duration: "1 to 1.5 hrs", imageUrl: "images/glam-gallery-waves-front.png" },
        { id: "touch-up-client-relaxer", name: "Touch Up with Client\u2019s Relaxer", description: "New growth touch-up using your own relaxer.", price: "GH\u20B5 50", duration: "1 to 1.5 hrs", imageUrl: "images/glam-gallery-waves-profile.png" },
        { id: "normal-ponytail", name: "Normal Ponytail", description: "Sleek, styled ponytail finish.", price: "GH\u20B5 80", duration: "45 min to 1 hr", imageUrl: "images/glam-red-outdoor.png" }
      ]
    },
    {
      id: "hair-installation",
      name: "Hair Installation Services",
      description: "Closure and frontal installs: secure, natural, and styled to slay.",
      price: "From GH\u20B5 50",
      duration: "1 to 2 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
      styles: [
        { id: "closure-install", name: "Closure Hair Install", description: "Closure unit installed and styled.", price: "GH\u20B5 50", duration: "1 to 1.5 hrs", imageUrl: "images/glam-red-studio.png" },
        { id: "frontal-install", name: "Frontal Hair Install", description: "Frontal unit installed with a natural hairline.", price: "GH\u20B5 100", duration: "1.5 to 2 hrs", imageUrl: "images/glam-red-indoor.png" },
        { id: "frontal-ponytail", name: "Frontal Ponytail", description: "Frontal install finished in a sleek ponytail style.", price: "GH\u20B5 150", duration: "1.5 to 2 hrs", imageUrl: "images/glam-red-celebration.png" }
      ]
    },
    {
      id: "braiding-workmanship",
      name: "Braids (Workmanship Only)",
      description: "Expert braiding by length. You bring the hair, we bring the hands. Workmanship only.",
      price: "From GH\u20B5 150",
      duration: "3 to 8 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
      styles: [
        { id: "shoulder-length", name: "Shoulder Length", description: "Braiding service to shoulder length. Hair not included.", price: "GH\u20B5 150", duration: "3 to 4 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "bra-length", name: "Bra Length", description: "Braiding service to bra strap length. Hair not included.", price: "GH\u20B5 200", duration: "4 to 5 hrs", imageUrl: "images/glam-gallery-braids-bw.png" },
        { id: "hip-length", name: "Hip Length", description: "Braiding service to hip length. Hair not included.", price: "GH\u20B5 250", duration: "5 to 6 hrs", imageUrl: "images/glam-braids-studio.png" },
        { id: "butt-length", name: "Butt Length", description: "Braiding service to butt length. Hair not included.", price: "GH\u20B5 300", duration: "6 to 7 hrs", imageUrl: "images/glam-braids-portrait.png" },
        { id: "under-butt", name: "Under Butt", description: "Braiding service past butt length. Hair not included.", price: "GH\u20B5 400", duration: "7 to 8 hrs", imageUrl: "images/glam-braids-portrait.png" }
      ]
    }
  ],
  testimonials: [
    {
      text: "Baby girl, when you leave my chair, Accra is NOT ready! Best silk press I've ever had. I felt like a whole new person.",
      author: "Ama K.",
      role: "Regular Client"
    },
    {
      text: "Asantewaa did my braids and I got stopped on the street THREE times. The energy in that salon? Unmatched!",
      author: "Efua M.",
      role: "First-Timer"
    },
    {
      text: "I came in stressed, I left feeling like a celebrity. The vibes, the music, the hair. 10/10 would recommend to every sis.",
      author: "Akua T.",
      role: "Glam Room Client"
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
    { id: 4, label: "Signature Glam", imageUrl: "images/glam-red-indoor.png", gradient: "linear-gradient(135deg, #D4A853 0%, #C75B39 100%)" },
    { id: 5, label: "Studio Slay", imageUrl: "images/glam-red-studio.png", gradient: "linear-gradient(135deg, #2C1810 0%, #006B3F 100%)" },
    { id: 6, label: "Celebration Glam", imageUrl: "images/glam-red-celebration.png", gradient: "linear-gradient(135deg, #CE1126 0%, #FCD116 100%)" },
    { id: 7, label: "Silk Waves Profile", imageUrl: "images/glam-gallery-waves-profile.png", gradient: "linear-gradient(135deg, #C75B39 0%, #006B3F 100%)" },
    { id: 8, label: "Butterfly Braids B&W", imageUrl: "images/glam-gallery-braids-bw.png", gradient: "linear-gradient(135deg, #2C1810 0%, #666 100%)" },
    { id: 9, label: "Hollywood Waves", imageUrl: "images/glam-gallery-waves-front.png", gradient: "linear-gradient(135deg, #D4A853 0%, #CE1126 100%)" }
  ],
  business: {
    tagline: "Where beauty meets influence, and every detail is designed to make a statement.",
    extensionNotice: "Please note that all Braids prices do not include hair extensions. You can either come along with your own extensions or purchase from our salon.",
    intro: [
      "Glam Room is a destination for modern beauty. Designed for women who value excellence, every service is delivered with precision, care, and an uncompromising attention to detail.",
      "From everyday refinement to life's defining moments, our stylists create looks that feel effortless, elevated, and uniquely yours."
    ],
    hours: "Mon to Sat: 9am to 6pm \xB7 Sun: Closed"
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
      confirmedMessage: "You're confirmed! Your deposit secures your chair. See you at Glam Room."
    },
    timeSlots: [
      { value: "08:00", label: "08:00 AM" },
      { value: "11:00", label: "11:00 AM" },
      { value: "14:00", label: "02:00 PM" },
      { value: "17:00", label: "05:00 PM" }
    ]
  },
  // Admin dashboard — admin.html (create user via supabase/create-admin-lesley.sql)
  admin: {},
  findBooking: {
    phonePlaceholder: "024 XXX XXXX or +233 XX XXX XXXX",
    namePlaceholder: "Last 4 letters of your name",
    submitLabel: "Check Status",
    loading: "Checking\u2026",
    invalidPhone: "Enter a valid Ghana number (e.g. 024XXXXXXX).",
    invalidName: "Enter exactly 4 letters: the last 4 letters of the name you booked with.",
    notFound: "No booking found. Double-check your phone and the last 4 letters of the name you used when booking.",
    unavailable: "Booking lookup is not available yet. WhatsApp Glam Room to check your slot.",
    error: "Something went wrong. Please try again or WhatsApp Glam Room."
  },
  installPrompt: {
    title: "Add Glam Room to your home screen",
    body: "Open like an app: one tap from your phone, no browser bar. Perfect for booking your next slay \u{1F451}",
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
    { label: "The Glam Room", href: "glam-room.html" },
    { label: "Book Appointment", href: "book.html" },
    { label: "Partnerships", href: "proposals.html" }
  ],
  footer: {
    copyright: `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana \u{1F1EC}\u{1F1ED}"
  }
};

// supabase-client.js
function isSupabaseConfigured() {
  const { url, anonKey } = SITE2.booking.supabase || {};
  return Boolean(
    url && anonKey && !url.includes("YOUR_SUPABASE") && !anonKey.includes("YOUR_SUPABASE")
  );
}

// admin.js
import { createClient as createClient2 } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
var adminSupabase = null;
function getAdminSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!adminSupabase) {
    const { url, anonKey } = SITE.booking.supabase;
    adminSupabase = createClient2(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "glam-admin-auth"
      }
    });
  }
  return adminSupabase;
}
var adminContent = document.getElementById("adminContent");
var loginContainer = document.getElementById("loginContainer");
var loginForm = document.getElementById("loginForm");
var loginError = document.getElementById("loginError");
var bookingsBody = document.getElementById("bookingsBody");
var emptyState = document.getElementById("emptyState");
var allBookings = [];
var filteredBookings = [];
var cachedLoginPassword = null;
var activeQuickFilter = "all";
var BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"];
var STATUS_CONFIRM = {
  confirmed: {
    title: "Confirm booking?",
    text: (name) => `Confirm ${name}'s reservation. They should receive your usual confirmation message.`,
    confirmLabel: "Confirm"
  },
  completed: {
    title: "Mark as completed?",
    text: (name) => `Mark ${name}'s visit as completed. This closes the appointment.`,
    confirmLabel: "Mark completed"
  },
  cancelled: {
    title: "Cancel booking?",
    text: (name) => `Cancel ${name}'s reservation. This cannot be undone from the client side.`,
    confirmLabel: "Cancel booking",
    danger: true
  },
  pending: {
    title: "Revert to pending?",
    text: (name) => `Set ${name}'s booking back to pending. Use this if you need to reopen the slot.`,
    confirmLabel: "Revert to pending"
  }
};
function needsStatusConfirm(fromStatus, toStatus) {
  if (fromStatus === toStatus) return false;
  return Boolean(STATUS_CONFIRM[toStatus]) || toStatus === "pending" && fromStatus !== "pending";
}
function showLogin(message = "") {
  adminContent.hidden = true;
  adminContent.setAttribute("aria-hidden", "true");
  loginContainer.hidden = false;
  loginContainer.removeAttribute("aria-hidden");
  document.body.classList.remove("admin-is-signed-in");
  loginError.textContent = message;
  if (message) {
    loginError.classList.add("is-visible");
    loginError.hidden = false;
    loginError.style.removeProperty("display");
  } else {
    loginError.classList.remove("is-visible");
    loginError.hidden = true;
    loginError.style.removeProperty("display");
  }
}
function showAdmin() {
  loginContainer.hidden = true;
  loginContainer.setAttribute("aria-hidden", "true");
  adminContent.hidden = false;
  adminContent.removeAttribute("aria-hidden");
  document.body.classList.add("admin-is-signed-in");
  loginError.classList.remove("is-visible");
  loginError.hidden = true;
  loginError.textContent = "";
}
function formatTime(time) {
  if (!time) return "N/A";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}
function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  return (/* @__PURE__ */ new Date(`${dateStr}T12:00:00`)).toLocaleDateString("en-GH", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function whatsAppHref(phone) {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "233");
  return `https://wa.me/${digits}`;
}
function statusBadge(status, type = "status") {
  const safe = (status || "pending").toLowerCase().replace(/\s+/g, "-");
  const paymentClass = type === "payment" && !["paid", "pending", "failed", "unpaid", "cancelled", "refunded"].includes(safe) ? "payment-pending" : type === "payment" ? `payment-${safe}` : "";
  const className = paymentClass || `status-${safe}`;
  return `<span class="status-badge ${className}">${escapeHtml(safe.replace(/-/g, " "))}</span>`;
}
function escapeHtml(str) {
  return String(str ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function todayYmd() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function statusSelectHtml(booking) {
  const status = (booking.status || "pending").toLowerCase();
  const options = BOOKING_STATUSES.map(
    (value) => `<option value="${value}"${value === status ? " selected" : ""}>${value.charAt(0).toUpperCase() + value.slice(1)}</option>`
  ).join("");
  return `<select class="status-select" data-action="status-select" data-id="${booking.id}" data-name="${escapeHtml(booking.full_name)}" data-prev="${status}" aria-label="Booking status for ${escapeHtml(booking.full_name)}">${options}</select>`;
}
function setActiveQuickFilter(key) {
  activeQuickFilter = key;
  document.querySelectorAll(".admin-chip[data-quick]").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.quick === key);
  });
  document.querySelectorAll(".stat-card[data-quick-filter]").forEach((card) => {
    card.classList.toggle("is-filter-active", card.dataset.quickFilter === key);
  });
}
function applyQuickFilter(key) {
  const statusFilter = document.getElementById("statusFilter");
  const dateFilter = document.getElementById("dateFilter");
  const phoneFilter = document.getElementById("phoneFilter");
  const today = todayYmd();
  setActiveQuickFilter(key);
  if (phoneFilter) phoneFilter.value = "";
  if (key === "today") {
    if (statusFilter) statusFilter.value = "all";
    if (dateFilter) dateFilter.value = today;
    applyFilters();
    return;
  }
  if (key === "pending") {
    if (statusFilter) statusFilter.value = "pending";
    if (dateFilter) dateFilter.value = "";
    applyFilters();
    return;
  }
  if (key === "confirmed") {
    if (statusFilter) statusFilter.value = "confirmed";
    if (dateFilter) dateFilter.value = "";
    applyFilters();
    return;
  }
  if (key === "upcoming") {
    if (statusFilter) statusFilter.value = "all";
    if (dateFilter) dateFilter.value = "";
    const filtered = allBookings.filter(
      (b) => b.booking_date >= today && b.status !== "cancelled"
    );
    renderBookings(filtered);
    return;
  }
  if (statusFilter) statusFilter.value = "all";
  if (dateFilter) dateFilter.value = "";
  applyFilters();
}
function showToast(message, isError = false) {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("p");
    toast.id = "adminToast";
    toast.className = "admin-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.toggle("admin-toast--error", isError);
  toast.classList.add("is-visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
function closeActionModal() {
  document.getElementById("adminActionModal")?.remove();
  if (!document.getElementById("clearConfirmModal")) {
    document.body.classList.remove("admin-modal-open");
  }
}
function openStatusConfirmModal({ name, fromStatus, toStatus, onConfirm }) {
  closeActionModal();
  const config = STATUS_CONFIRM[toStatus];
  if (!config) {
    onConfirm();
    return;
  }
  const backdrop = document.createElement("div");
  backdrop.id = "adminActionModal";
  backdrop.className = "admin-modal-backdrop is-open";
  backdrop.setAttribute("role", "presentation");
  backdrop.innerHTML = `
    <div class="admin-modal" role="dialog" aria-labelledby="actionModalTitle" aria-modal="true">
      <h3 id="actionModalTitle">${escapeHtml(config.title)}</h3>
      <p class="admin-modal-text">${escapeHtml(config.text(name))}</p>
      <p class="admin-modal-meta">Status: ${escapeHtml(fromStatus)} \u2192 ${escapeHtml(toStatus)}</p>
      <div class="admin-modal-actions">
        <button type="button" class="btn-primary${config.danger ? " btn-danger" : ""}" id="actionModalConfirm">${escapeHtml(config.confirmLabel)}</button>
        <button type="button" class="btn-primary btn-dark" id="actionModalCancel">Go back</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);
  document.body.classList.add("admin-modal-open");
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.querySelector("#actionModalCancel")?.click();
  });
  backdrop.querySelector(".admin-modal")?.addEventListener("click", (e) => e.stopPropagation());
  backdrop.querySelector("#actionModalCancel")?.addEventListener("click", () => {
    closeActionModal();
    onConfirm(false);
  });
  backdrop.querySelector("#actionModalConfirm")?.addEventListener("click", async () => {
    const btn = backdrop.querySelector("#actionModalConfirm");
    btn.disabled = true;
    btn.textContent = "Saving\u2026";
    await onConfirm(true);
    closeActionModal();
  });
  document.addEventListener(
    "keydown",
    function escHandler(e) {
      if (e.key === "Escape" && document.getElementById("adminActionModal")) {
        document.removeEventListener("keydown", escHandler);
        backdrop.querySelector("#actionModalCancel")?.click();
      }
    },
    { once: true }
  );
}
function updateStats(bookings) {
  const today = todayYmd();
  document.getElementById("totalBookings").textContent = bookings.length;
  document.getElementById("pendingBookings").textContent = bookings.filter((b) => b.status === "pending").length;
  document.getElementById("confirmedBookings").textContent = bookings.filter((b) => b.status === "confirmed").length;
  document.getElementById("todayBookings").textContent = bookings.filter((b) => b.booking_date === today).length;
}
function renderBookings(bookings) {
  filteredBookings = bookings;
  emptyState.hidden = bookings.length > 0;
  if (!bookings.length) {
    bookingsBody.innerHTML = '<tr><td colspan="9" class="table-empty">No bookings found</td></tr>';
    return;
  }
  bookingsBody.innerHTML = bookings.map((b) => {
    const location = b.location || b.notes?.match(/\[Location: ([^\]]+)\]/)?.[1] || "N/A";
    return `
        <tr data-id="${b.id}">
          <td>${formatDate(b.booking_date)}</td>
          <td>${formatTime(b.booking_time)}</td>
          <td><strong>${escapeHtml(b.full_name)}</strong></td>
          <td><a class="phone-link" href="${whatsAppHref(b.phone)}" target="_blank" rel="noopener noreferrer">${escapeHtml(b.phone)}</a></td>
          <td>${escapeHtml(location)}</td>
          <td class="service-cell">${escapeHtml(b.service)}</td>
          <td>${statusSelectHtml(b)}</td>
          <td>${statusBadge(b.payment_status || "pending", "payment")}</td>
          <td>
            <div class="row-actions">
              <a class="action-pill action-pill--wa" href="${whatsAppHref(b.phone)}" target="_blank" rel="noopener noreferrer" title="WhatsApp client" aria-label="WhatsApp ${escapeHtml(b.full_name)}"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </td>
        </tr>
      `;
  }).join("");
}
function clearQuickFilterUi() {
  activeQuickFilter = "";
  document.querySelectorAll(".admin-chip").forEach((c) => c.classList.remove("is-active"));
  document.querySelectorAll(".stat-card[data-quick-filter]").forEach((c) => c.classList.remove("is-filter-active"));
}
function applyFilters() {
  const status = document.getElementById("statusFilter").value;
  const date = document.getElementById("dateFilter").value;
  const phone = document.getElementById("phoneFilter").value.trim().toLowerCase();
  let filtered = [...allBookings];
  if (status !== "all") filtered = filtered.filter((b) => b.status === status);
  if (date) filtered = filtered.filter((b) => b.booking_date === date);
  if (phone) filtered = filtered.filter((b) => b.phone.toLowerCase().includes(phone));
  renderBookings(filtered);
}
async function loadBookings() {
  const supabase = getAdminSupabase();
  if (!supabase) {
    showLogin("Supabase is not configured in data.js.");
    return;
  }
  bookingsBody.innerHTML = '<tr><td colspan="9" class="table-loading">Loading bookings\u2026</td></tr>';
  emptyState.hidden = true;
  const { data, error } = await supabase.from("bookings").select("*").order("booking_date", { ascending: false }).order("booking_time", { ascending: false });
  if (error) {
    if (error.message?.includes("JWT") || error.code === "PGRST301") {
      showLogin("Session expired. Please log in again.");
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
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
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
  const name = select.dataset.name || "this client";
  const fromStatus = select.dataset.prev || "pending";
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
    showToast("No bookings to export.", true);
    return;
  }
  const headers = [
    "Full Name",
    "Phone",
    "Location",
    "Service",
    "Date",
    "Time",
    "Status",
    "Deposit",
    "Notes",
    "Created At"
  ];
  const csvRows = rows.map((b) => [
    b.full_name,
    b.phone,
    b.location || "",
    b.service,
    b.booking_date,
    b.booking_time,
    b.status,
    b.payment_status || "",
    b.notes || "",
    b.created_at || ""
  ]);
  const csvContent = [headers, ...csvRows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `glam-room-bookings-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Exported ${rows.length} booking${rows.length === 1 ? "" : "s"}.`);
}
function formatAuthError(error) {
  const msg = error?.message || "Sign-in failed.";
  if (/invalid login credentials/i.test(msg)) {
    return "Incorrect staff login or password. Type your Supabase staff login manually \u2014 saved browser autofill often uses the wrong account.";
  }
  if (/email not confirmed/i.test(msg)) {
    return "Staff account is not confirmed. In Supabase, run supabase/create-admin-lesley.sql again.";
  }
  if (/network|fetch/i.test(msg)) {
    return "Network error. Check your connection and try again.";
  }
  return msg;
}
function isValidStaffLogin(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
async function login(email, password) {
  const supabase = getAdminSupabase();
  if (!supabase) {
    showLogin("Supabase is not configured in data.js.");
    return false;
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidStaffLogin(normalizedEmail)) {
    showLogin("Enter a valid staff login (must be an email address).");
    return false;
  }
  if (!password) {
    showLogin("Enter your password.");
    return false;
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password
  });
  if (error) {
    showLogin(formatAuthError(error));
    return false;
  }
  if (!data?.session) {
    showLogin("Sign-in did not create a session. Try again or use a private browser window.");
    return false;
  }
  cachedLoginPassword = password;
  showAdmin();
  await loadBookings();
  return true;
}
function resetFilters() {
  const statusFilter = document.getElementById("statusFilter");
  const dateFilter = document.getElementById("dateFilter");
  const phoneFilter = document.getElementById("phoneFilter");
  if (statusFilter) {
    statusFilter.value = "all";
    statusFilter.selectedIndex = 0;
  }
  if (dateFilter) {
    dateFilter.value = "";
    dateFilter.defaultValue = "";
    dateFilter.valueAsDate = null;
  }
  if (phoneFilter) {
    phoneFilter.value = "";
  }
  applyQuickFilter("all");
}
async function deleteAllBookings() {
  const supabase = getAdminSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data: rows, error: readError } = await supabase.from("bookings").select("id");
  if (readError) throw new Error(readError.message);
  if (!rows?.length) {
    allBookings = [];
    resetFilters();
    updateStats([]);
    return;
  }
  const { error: deleteError } = await supabase.from("bookings").delete().in("id", rows.map((row) => row.id));
  if (deleteError) throw new Error(deleteError.message);
  allBookings = [];
  resetFilters();
  updateStats([]);
}
function showClearSuccess(message = "All bookings cleared from the site.") {
  let toast = document.getElementById("clearFiltersToast");
  if (!toast) {
    toast = document.createElement("p");
    toast.id = "clearFiltersToast";
    toast.className = "clear-filters-toast";
    toast.setAttribute("role", "status");
    document.querySelector(".admin-filters")?.appendChild(toast);
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
  const tempClient = createClient2(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
  const { data, error } = await tempClient.auth.signInWithPassword({ email, password: trimmed });
  return Boolean(data?.session && !error);
}
function openClearConfirmModal() {
  closeClearConfirmModal();
  const backdrop = document.createElement("div");
  backdrop.id = "clearConfirmModal";
  backdrop.className = "admin-modal-backdrop is-open";
  backdrop.setAttribute("role", "presentation");
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
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeClearConfirmModal();
  });
  backdrop.querySelector(".admin-modal")?.addEventListener("click", (e) => e.stopPropagation());
  document.getElementById("clearConfirmCancel")?.addEventListener("click", closeClearConfirmModal);
  document.getElementById("clearConfirmSubmit")?.addEventListener("click", handleClearWithPassword);
  document.getElementById("clearConfirmPassword")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClearWithPassword();
    }
    if (e.key === "Escape") closeClearConfirmModal();
  });
  document.body.classList.add("admin-modal-open");
  setTimeout(() => document.getElementById("clearConfirmPassword")?.focus(), 50);
}
function closeClearConfirmModal() {
  document.getElementById("clearConfirmModal")?.remove();
  document.body.classList.remove("admin-modal-open");
}
async function handleClearWithPassword() {
  const errorEl = document.getElementById("clearConfirmError");
  const passwordInput = document.getElementById("clearConfirmPassword");
  const submitBtn = document.getElementById("clearConfirmSubmit");
  if (!errorEl || !passwordInput || !submitBtn) return;
  errorEl.style.display = "none";
  submitBtn.disabled = true;
  try {
    const ok = await verifyClearPassword(passwordInput.value);
    if (!ok) {
      errorEl.textContent = "Wrong password. Bookings were not cleared.";
      errorEl.style.display = "block";
      return;
    }
    submitBtn.textContent = "Clearing\u2026";
    await deleteAllBookings();
    showClearSuccess();
    closeClearConfirmModal();
  } catch (err) {
    errorEl.textContent = err?.message || "Could not clear bookings. Try again.";
    errorEl.style.display = "block";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Clear all bookings";
  }
}
async function logout() {
  const supabase = getAdminSupabase();
  if (supabase) await supabase.auth.signOut();
  cachedLoginPassword = null;
  showLogin();
}
function bindPasswordToggle() {
  const input = document.getElementById("adminPassword");
  const toggle = document.getElementById("toggleAdminPassword");
  if (!input || !toggle) return;
  toggle.addEventListener("click", () => {
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    toggle.setAttribute("aria-pressed", show ? "true" : "false");
    toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
    const icon = toggle.querySelector("i");
    if (icon) {
      icon.className = show ? "fa-solid fa-eye-slash" : "fa-regular fa-eye";
    }
  });
}
async function init() {
  const supabase = getAdminSupabase();
  bindPasswordToggle();
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("loginBtn");
    const emailInput = document.getElementById("adminEmail");
    const passwordInput = document.getElementById("adminPassword");
    btn.disabled = true;
    btn.textContent = "Signing in\u2026";
    showLogin("");
    const ok = await login(emailInput?.value || "", passwordInput?.value || "");
    if (!ok) {
      passwordInput?.focus();
    }
    btn.disabled = false;
    btn.textContent = "Sign in";
  });
  document.getElementById("applyFilterBtn").addEventListener("click", () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById("resetFilterBtn").addEventListener("click", resetFilters);
  document.getElementById("statusFilter").addEventListener("change", () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById("dateFilter").addEventListener("change", () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById("phoneFilter").addEventListener("input", () => {
    clearQuickFilterUi();
    applyFilters();
  });
  document.getElementById("exportBtn").addEventListener("click", exportToCSV);
  document.getElementById("clearAllBtn").addEventListener("click", openClearConfirmModal);
  document.getElementById("refreshBtn").addEventListener("click", loadBookings);
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.querySelectorAll(".admin-chip[data-quick]").forEach((chip) => {
    chip.addEventListener("click", () => applyQuickFilter(chip.dataset.quick));
  });
  document.querySelectorAll(".stat-card[data-quick-filter]").forEach((card) => {
    card.addEventListener("click", () => applyQuickFilter(card.dataset.quickFilter));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        applyQuickFilter(card.dataset.quickFilter);
      }
    });
  });
  bookingsBody.addEventListener("change", (e) => {
    const select = e.target.closest(".status-select");
    if (select) handleStatusSelectChange(select);
  });
  if (!supabase) {
    showLogin("Supabase is not configured in data.js.");
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
  document.body.innerHTML = '<p style="color:#fff;padding:2rem;font-family:sans-serif">Admin page failed to load. Refresh or try another browser.</p>';
} else {
  init().catch((err) => {
    console.error(err);
    showLogin(err?.message || "Admin failed to start. Refresh the page.");
  });
}
