export const WHY_US_PHOTOS = [
  { src: "/images/why-1.jpg", name: "Anna Müller",         service: "Sofa Cleaning, Berlin" },
  { src: "/images/why-2.jpg", name: "Laura Schreiber",     service: "Apartment Cleaning, Mitte" },
  { src: "/images/why-3.jpg", name: "Felix & Jana Becker", service: "Apartment Cleaning, Berlin" },
  { src: "/images/why-4.jpg", name: "Markus Hoffmann",     service: "Window Cleaning, Kreuzberg" },
];

export type ServiceCardAsset = {
  id: string;
  img: string;
  price: string;
  hasFootnote?: boolean;
};

export const SERVICE_CARD_ASSETS: ServiceCardAsset[] = [
  { id: "windows",    img: "/images/service-windows.jpg",    price: "€60" },
  { id: "upholstery", img: "/images/service-upholstery.jpg", price: "€80" },
  { id: "apartment",  img: "/images/service-apartment.jpg",  price: "€120" },
  { id: "driveway",   img: "/images/service-driveway.jpg",   price: "€90" },
  { id: "car",        img: "/images/service-car.jpg",        price: "€80", hasFootnote: true },
];

export type BeforeAfterAsset = {
  id: string;
  before: string;
  after: string;
};

export const BEFORE_AFTER_ASSETS: BeforeAfterAsset[] = [
  { id: "sofa",    before: "/images/before-sofa.jpg",    after: "/images/after-sofa.jpg" },
  { id: "kitchen", before: "/images/before-kitchen.jpg", after: "/images/after-kitchen.jpg" },
  { id: "windows", before: "/images/before-windows.jpg", after: "/images/after-windows.jpg" },
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

export type ReviewAsset = {
  name: string;
  location: string;
  photo: string;
};

export const REVIEWS: ReviewAsset[] = [
  { name: "Lena Fischer",   location: "Friedrichshain, Berlin",   photo: "/images/review-lena.jpg" },
  { name: "Petra Hartmann", location: "Kreuzberg, Berlin",        photo: "/images/review-petra.jpg" },
  { name: "Sandra Müller",  location: "Charlottenburg, Berlin",   photo: "/images/review-sandra.jpg" },
  { name: "Tobias Schulz",  location: "Prenzlauer Berg, Berlin",  photo: "/images/review-tobias.jpg" },
  { name: "Jan Weber",      location: "Mitte, Berlin",            photo: "/images/review-jan.jpg" },
];
