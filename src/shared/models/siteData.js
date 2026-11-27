// Centralised content & image data for Paris Beans.
// Replace placeholder SVG paths with real project assets when available.

import { galleryImages, menuImages } from '../assets/images'
import atmosphere6 from '../assets/images/gallery-sections/atmosphere-6.webp'
import atmosphere5 from '../assets/images/gallery-sections/atmosphere-5.webp'
import atmosphere4 from '../assets/images/gallery-sections/atmosphere-4.webp'
import atmosphere1 from '../assets/images/gallery-sections/atmosphere-1.webp'
import atmosphere3 from '../assets/images/gallery-sections/atmosphere-3.webp'
import atmosphere2 from '../assets/images/gallery-sections/atmosphere-2.webp'
import wallArt2 from '../assets/images/gallery-sections/wall-art-2.webp'
import wallArt3 from '../assets/images/gallery-sections/wall-art-3.webp'
import wallArt4 from '../assets/images/gallery-sections/wall-art-4.webp'
import wallArt5 from '../assets/images/gallery-sections/wall-art-5.webp'
import wallArt1 from '../assets/images/gallery-sections/wall-art-1.webp'
import coffeeFood2 from '../assets/images/gallery-sections/coffee-food-2.webp'
import coffeeFood3 from '../assets/images/gallery-sections/coffee-food-3.webp'
import coffeeFood4 from '../assets/images/gallery-sections/coffee-food-4.webp'
import coffeeFood5 from '../assets/images/gallery-sections/coffee-food-5.webp'
import coffeeFood6 from '../assets/images/gallery-sections/coffee-food-6.webp'
import coffeeFood1 from '../assets/images/gallery-sections/coffee-food-1.webp'
import coffeeFood7 from '../assets/images/gallery-sections/coffee-food-7.webp'
import salonCafe1 from '../assets/images/gallery-sections/salon-cafe-1.webp'
import salonCafe3 from '../assets/images/gallery-sections/salon-cafe-3.webp'
import salonCafe4 from '../assets/images/gallery-sections/salon-cafe-4.webp'
import salonCafe2 from '../assets/images/gallery-sections/salon-cafe-2.webp'
import salonCafe5 from '../assets/images/gallery-sections/salon-cafe-5.webp'

export { galleryImages }

export const menuItems = [
  { title: 'Hummus', image: menuImages.hummus, price: '₹199' },
  { title: 'Virgin Mojito', image: menuImages['virgin-mojito'], price: '₹229' },
  { title: 'Lemon Mint Elixir', image: menuImages['lemon-mint'], price: '₹249' },
  { title: 'Espresso Martini', image: menuImages['espresso-martini'], price: '₹299' },
  { title: 'Galaxy Cocktail', image: menuImages.galaxy, price: '₹329' },
  { title: 'Aglio E Olio', image: menuImages['aglio-olio'], price: '₹349' },
  { title: 'Sundowner Mocktail', image: menuImages.sundowner, price: '₹279' },
  { title: 'Blush Sunset', image: menuImages['blush-sunset'], price: '₹269' },
]

export const cafeCardTitles = [
  'Hummus',
  'Virgin Mojito',
  'Lemon Mint Elixir',
  'Blush Sunset',
  'Aglio E Olio',
  'Sundowner Mocktail',
]

export const gallery = [
  { key: 'g1', alt: 'Warm Parisian café corner' },
  { key: 'g2', alt: 'Espresso being poured' },
  { key: 'g3', alt: 'Croissant and coffee' },
  { key: 'g4', alt: 'Café interior details' },
  { key: 'g5', alt: 'Styling session at the salon' },
  { key: 'g6', alt: 'Coffee and pastry flat lay' },
  { key: 'g7', alt: 'Paris inspired decor' },
]

// Intrinsic dimensions of the gallery images — used to give <img>
// explicit width/height so the browser can reserve space (no CLS).
export const galleryDims = {
  g1: { width: 248, height: 360 },
  g2: { width: 320, height: 460 },
  g3: { width: 388, height: 560 },
  g4: { width: 460, height: 660 },
  g5: { width: 388, height: 560 },
  g6: { width: 320, height: 460 },
  g7: { width: 248, height: 360 },
}

export const galleryAlt = (key) => {
  const item = gallery.find((i) => i.key === key)
  return item ? item.alt : key
}

const sectionPhoto = (src, alt, width, height) => ({
  key: src,
  src,
  alt,
  width,
  height,
})

// Gallery photos are ordered left to right, then top to bottom in each section.
export const gallerySections = [
  {
    id: 'atmosphere',
    eyebrow: '— PARISIAN ATMOSPHERE',
    title: 'Moments Worth Slowing Down For.',
    description:
      'A little time to pause, enjoy your coffee, and take in the Paris-inspired atmosphere at HAIR RAP BY YOYO.',
    images: [
      sectionPhoto(atmosphere6, 'A guest enjoying a drink beside the salon window', 276, 420),
      sectionPhoto(atmosphere5, 'A server offering drinks to a seated guest', 266, 420),
      sectionPhoto(atmosphere4, 'A guest tasting pasta at the café counter', 624, 420),
      sectionPhoto(atmosphere1, 'A barista preparing a drink at the counter', 280, 420),
      sectionPhoto(atmosphere3, 'Two bowls of pasta and a plate of nachos', 630, 420),
      sectionPhoto(atmosphere2, 'Two colorful layered drinks on the counter', 370, 420),
    ],
  },
  {
    id: 'wall-art',
    eyebrow: '— PARIS WALL ART',
    title: 'A Little Corner of Paris.',
    description:
      'Paris-inspired artwork brings the feeling of a Parisian street into the heart of HAIR RAP BY YOYO.',
    images: [
      sectionPhoto(wallArt2, 'The café counter with stools under a chandelier', 416, 276),
      sectionPhoto(wallArt3, 'The café counter beside a view of the Arc de Triomphe', 416, 276),
      sectionPhoto(wallArt4, 'The illuminated Paris Beans sign above the café counter', 580, 872),
      sectionPhoto(wallArt5, 'An espresso machine beneath the Paris-inspired display', 280, 420),
      sectionPhoto(wallArt1, 'Decorated café cups and miniature Eiffel Towers', 404, 420),
    ],
  },
  {
    id: 'coffee-food',
    eyebrow: '— COFFEE & FOOD',
    title: 'Made for the Moment.',
    description: 'Simple café pleasures designed to complement your salon experience.',
    images: [
      sectionPhoto(coffeeFood2, 'Two amber and ruby layered drinks on a tray', 280, 420),
      sectionPhoto(coffeeFood3, 'Two lime and mint drinks in tall glasses', 630, 420),
      sectionPhoto(coffeeFood4, 'A bowl of nachos with olives and cheese', 280, 420),
      sectionPhoto(coffeeFood5, 'Pasta served in a floral bowl', 280, 420),
      sectionPhoto(coffeeFood6, 'A pale green drink with a curled garnish', 280, 420),
      sectionPhoto(coffeeFood1, 'A drink in a coupe glass garnished with lemon', 280, 420),
      sectionPhoto(coffeeFood7, 'A blue and red layered drink over ice', 280, 420),
    ],
  },
  {
    id: 'salon-cafe',
    eyebrow: '— SALON + CAFÉ',
    title: 'Where Beauty Meets Café Culture.',
    description:
      'A salon appointment, a coffee, and an atmosphere designed to make your time feel special.',
    images: [
      sectionPhoto(salonCafe1, 'A guest sipping from a café cup in a salon chair', 295, 420),
      sectionPhoto(salonCafe3, 'A young guest enjoying a milkshake', 580, 872),
      sectionPhoto(salonCafe4, 'A seated guest in blue enjoying a drink', 416, 276),
      sectionPhoto(salonCafe2, 'A server bringing refreshments to a salon guest', 295, 420),
      sectionPhoto(salonCafe5, 'A young guest taking a sip during a haircut', 295, 420),
    ],
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Visit & Contact', href: '/visit-contact' },
]

export const exploreLinks = navLinks

// ── Contact (single source of truth) ────────────────────────────────
export const contact = {
  location: 'Paris Beans at HAIR RAP BY YOYO',
  address: '1st floor, Shilp Satved, Sindhubhavan Rd, Bodakdev, Ahmedabad, Gujarat 380059',
  city: 'Ahmedabad, Gujarat',
  country: 'India',
  phone: '+91 90999 38886',
  phoneTel: '+919099938886',
  email: 'hello@hairrapbyyoyo.com',
  hours: {
    allWeek: '10:00 AM – 9:00 PM',
    days: 'Monday – Sunday',
  },
  social: {
    instagram: 'https://www.instagram.com/parisbeanscoffee/',
    youtube: 'https://www.youtube.com/@parisbeans',
    facebook: 'https://www.facebook.com/ParisBeansCoffee/',
  },
  mapLink: 'https://maps.app.goo.gl/GRAojmhWejJByVhY6',
  mapBbox: '72.50, 22.90, 72.65, 23.10',
  mapCenter: '72.57, 23.02',
  mapZoom: '13',
}

const appointmentMessage = 'Hi HAIR RAP BY YOYO, I would like to book a salon appointment. Could you please share your available dates and times?'
export const appointmentWhatsAppUrl = `https://wa.me/${contact.phoneTel.replace(/^\+/, '')}?text=${encodeURIComponent(appointmentMessage)}`

export const cafeCardPrices = {
  'Hummus': '₹199',
  'Virgin Mojito': '₹229',
  'Lemon Mint Elixir': '₹249',
  'Blush Sunset': '₹269',
  'Aglio E Olio': '₹349',
  'Sundowner Mocktail': '₹279',
}
