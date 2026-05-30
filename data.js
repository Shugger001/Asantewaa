/**
 * Glam Room by Asantewaa — Site Configuration
 * Edit this file to update all content without touching HTML.
 */

/** Primary label: Maps formatted address, else business name from the pin */
export function getLocationLabel(loc) {
  const address = loc.address?.trim();
  return address || loc.name?.trim() || "Glam Room";
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

export const SITE = {
  brand: "Glam Room by Asantewaa",
  owner: "Asantewaa",
  tagline: "Accra's baddest hair destination — where your crown gets the main character energy it deserves.",

  // UPDATE THIS with your real WhatsApp number (include country code, e.g. +233XXXXXXXXX)
  whatsapp: "+233XXXXXXXXX",
  whatsappMessage: "Hi Glam Room! I'd like to book an appointment 💅",

  // Two Glam Room shops — names/addresses match Google Maps pins (not area labels)
  locations: [
    {
      id: "glam-room-tn4f",
      name: "Glam Room",
      address: "Behind Tasty Fried Chicken, Abelemkpe, Accra",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/TN4FohAFQiJ6UgK4b",
      hours: "Mon – Sat: 9am – 6pm · Sun: Closed",
    },
    {
      id: "glam-room-eniy",
      name: "Glam Room",
      address: "",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://share.google/eNIyXIhSW1kZ6rzmF",
      hours: "Mon – Sat: 9am – 6pm · Sun: Closed",
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
      { label: "Discover More", href: "about.html" },
      { label: "Glam Room", href: "glam-room.html" },
      { label: "Book", href: "book.html" },
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
      slideMs: 280,
      starMs: 350,
      exitMs: 400,
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
        linkText: "Discover More",
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
        label: "Glam Room",
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
        label: "Book",
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

  socials: [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@asantewaa",
      icon: "fa-brands fa-tiktok",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/asantewaa",
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
      id: "silk-press",
      name: "Silk Press",
      description: "Silky smooth, bouncy, and ready to turn heads. No crunch, no drama — just pure slay.",
      price: "From GH₵ 150",
      duration: "2–3 hrs",
      icon: "fa-solid fa-wind",
      badge: "Popular",
    },
    {
      id: "braids-twists",
      name: "Braids & Twists",
      description: "Knotless, box braids, passion twists — whatever your vibe, we got you covered, sis.",
      price: "From GH₵ 200",
      duration: "4–6 hrs",
      icon: "fa-solid fa-grip-lines",
      badge: null,
    },
    {
      id: "wig-install",
      name: "Wig Install",
      description: "Glueless, lace front, full glam — your wig will look so natural they'll ask if it's yours.",
      price: "From GH₵ 180",
      duration: "1–2 hrs",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Hot",
    },
    {
      id: "natural-care",
      name: "Natural Hair Care",
      description: "Deep conditioning, trims, and treatments that love your natural texture back to life.",
      price: "From GH₵ 100",
      duration: "1–2 hrs",
      icon: "fa-solid fa-leaf",
      badge: null,
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      description: "Bold colour, subtle highlights, or a full transformation — let's make you unforgettable.",
      price: "From GH₵ 250",
      duration: "3–4 hrs",
      icon: "fa-solid fa-palette",
      badge: null,
    },
    {
      id: "bridal-glam",
      name: "Bridal Glam",
      description: "Your big day deserves a crown that stops the room. Bridal packages with all the extras.",
      price: "From GH₵ 500",
      duration: "Full day",
      icon: "fa-solid fa-gem",
      badge: "Premium",
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

  homeNavLinks: [
    { label: "Discover More", href: "about.html" },
    { label: "Glam Room", href: "glam-room.html" },
    { label: "Book", href: "book.html" },
  ],

  aboutNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "About", href: "#about" },
    { label: "Glam Room", href: "glam-room.html" },
  ],

  businessNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book", href: "book.html" },
  ],

  bookingNavLinks: [
    { label: "Home", href: "index.html" },
    { label: "Glam Room", href: "glam-room.html" },
    { label: "Book", href: "#booking" },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Glam Room by Asantewaa. All rights reserved.`,
    tagline: "Made with love in Accra, Ghana 🇬🇭",
  },
};
