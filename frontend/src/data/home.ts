export const HERO_BULLETS = ["Discount for new clients", "Reply in 10 min", "500+ clients"];

export const WHY_US_PHOTOS = [
  { src: "/images/why-1.jpg", name: "Anna Müller",        service: "Sofa Cleaning, Berlin" },
  { src: "/images/why-2.jpg", name: "Laura Schreiber",    service: "Apartment Cleaning, Mitte" },
  { src: "/images/why-3.jpg", name: "Felix & Jana Becker",service: "Apartment Cleaning, Berlin" },
  { src: "/images/why-4.jpg", name: "Markus Hoffmann",    service: "Window Cleaning, Kreuzberg" },
];

export type ServiceCardData = {
  id: string;
  img: string;
  name: string;
  price: string;
  bullets: string[];
  footnote?: string;
};

export const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: "windows",
    img: "/images/service-windows.jpg",
    name: "Window Cleaning",
    price: "€60",
    bullets: [
      "Interior and exterior cleaning of all panes, including hard-to-reach areas",
      "Streak-free result using professional squeegee equipment and cleaning solution",
      "Frames, window sills and tracks carefully cleaned by hand after each panel",
    ],
  },
  {
    id: "upholstery",
    img: "/images/service-upholstery.jpg",
    name: "Upholstery & Carpet Cleaning",
    price: "€80",
    bullets: [
      "Deep cleaning for sofas, mattresses, carpets, rugs and soft furniture",
      "Removes stubborn stains, odors, pet hair and allergens from deep in the fabric",
      "Safe for all fabric types including delicate, mixed and everyday upholstery",
    ],
  },
  {
    id: "apartment",
    img: "/images/service-apartment.jpg",
    name: "Apartment & House Cleaning",
    price: "€120",
    bullets: [
      "Thorough cleaning of every room including hallways, storage areas and balconies",
      "Kitchens, bathrooms, floors and all surfaces cleaned carefully with professional products",
      "Available as a one-time deep clean or as a regular recurring service",
    ],
  },
  {
    id: "driveway",
    img: "/images/service-driveway.jpg",
    name: "Driveway & Patio Washing",
    price: "€90",
    bullets: [
      "High-pressure washing for brick driveways, patios and yard surfaces",
      "Removes moss, dirt, oil stains and weathering from paving stones",
      "Includes kerbs, path edges and hard-to-reach corners",
    ],
  },
  {
    id: "car",
    img: "/images/service-car.jpg",
    name: "Car Interior Detailing",
    price: "€80",
    bullets: [
      "Full interior cleaning: seats, ceiling, door panels and trunk",
      "Extractor deep clean removes dirt and odors from deep in the fabric",
      "Leather and plastic care: protected and refreshed",
    ],
    footnote: "* Access to a standard 220V outlet required",
  },
];

export const BEFORE_AFTER_SLIDES = [
  {
    before: "/images/before-sofa.jpg",
    after: "/images/after-sofa.jpg",
    title: "Sofa Deep Cleaning",
    location: "Deep-cleaned fabric sofa · Charlottenburg",
  },
  {
    before: "/images/before-kitchen.jpg",
    after: "/images/after-kitchen.jpg",
    title: "Deep Kitchen Cleaning",
    location: "Residential kitchen cleaning · Mitte",
  },
  {
    before: "/images/before-windows.jpg",
    after: "/images/after-windows.jpg",
    title: "Professional Window Cleaning",
    location: "Full interior & exterior cleaning · Kreuzberg",
  },
];

export const REWARD_BUBBLES = [
  { size: 45, left: 10, duration: 15, delay: -2,  wobble: 4   },
  { size: 25, left: 25, duration: 18, delay: -12, wobble: 3   },
  { size: 55, left: 45, duration: 12, delay: -5,  wobble: 5   },
  { size: 30, left: 65, duration: 16, delay: -8,  wobble: 3.5 },
  { size: 40, left: 85, duration: 14, delay: -1,  wobble: 4.5 },
  { size: 20, left: 15, duration: 19, delay: -15, wobble: 3   },
  { size: 50, left: 35, duration: 13, delay: -4,  wobble: 6   },
  { size: 35, left: 55, duration: 17, delay: -9,  wobble: 4   },
  { size: 60, left: 75, duration: 11, delay: -6,  wobble: 5.5 },
  { size: 28, left: 90, duration: 15, delay: -11, wobble: 3.2 },
  { size: 48, left: 5,  duration: 14, delay: -3,  wobble: 4.8 },
  { size: 32, left: 50, duration: 16, delay: -10, wobble: 3.8 },
  { size: 22, left: 80, duration: 18, delay: -14, wobble: 3.1 },
  { size: 52, left: 20, duration: 12, delay: -7,  wobble: 5.2 },
  { size: 38, left: 70, duration: 15, delay: -13, wobble: 4.1 },
];

export const FAQ_DATA = [
  {
    q: "What should I prepare before the cleaning?",
    a: "Please ensure access to water and electricity, and clear the areas to be cleaned from personal items. This helps us work efficiently and deliver the best result.",
  },
  {
    q: "How do I pay?",
    a: "We accept cash, bank transfer and PayPal. Payment is made after the service is completed and you are happy with the result. We will confirm the payment details when we call to confirm your booking.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes, you can cancel or reschedule free of charge up to 24 hours before the appointment. For cancellations with less than 24 hours notice, a small travel fee may apply. Just call or message us and we will sort it out.",
  },
  {
    q: "How much does a cleaning cost?",
    a: "Prices start from €60 for window cleaning, €80 for upholstery/carpet, €120 for apartments. Final price depends on size and condition — we give you an exact quote before starting.",
  },
  {
    q: "Do you bring your own equipment?",
    a: "Yes, absolutely. Our team brings all professional cleaning equipment and eco-friendly products. You don't need to provide anything except access to water and a standard power outlet.",
  },
  {
    q: "What areas do you cover?",
    a: "We cover Berlin and all surrounding areas within a 100 km radius. If you're unsure whether we service your area, just ask — we'll confirm within minutes.",
  },
];

export const REVIEWS = [
  {
    name: "Lena Fischer",
    location: "Friedrichshain, Berlin",
    text: "Had my sofa deep cleaned after two years. The difference is incredible — no more stains or pet hair. Done in under two hours, no mess left behind. Worth every penny!",
    photo: "/images/review-lena.jpg",
  },
  {
    name: "Petra Hartmann",
    location: "Kreuzberg, Berlin",
    text: "Booked them for a full apartment clean before my parents visited. Kitchen, bathroom, floors — all spotless. They even cleaned behind the furniture. My mother was absolutely delighted!",
    photo: "/images/review-petra.jpg",
  },
  {
    name: "Sandra Müller",
    location: "Charlottenburg, Berlin",
    text: "Used their window cleaning for our floor-to-ceiling windows. Eight large panes, inside and out, zero streaks. The apartment looks completely different when the light pours in!",
    photo: "/images/review-sandra.jpg",
  },
  {
    name: "Tobias Schulz",
    location: "Prenzlauer Berg, Berlin",
    text: "Had the driveway and patio pressure-washed after years of moss and grime. Completely unrecognizable — like a new surface. Fast, tidy, and exactly what we needed.",
    photo: "/images/review-tobias.jpg",
  },
  {
    name: "Jan Weber",
    location: "Mitte, Berlin",
    text: "Booked a full apartment clean after renovation work. Dust everywhere, paint residue on floors — they tackled everything in one visit. Would absolutely recommend to anyone.",
    photo: "/images/review-jan.jpg",
  },
];
