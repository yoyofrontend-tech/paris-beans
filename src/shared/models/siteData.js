// Centralised content & image data for Paris Beans.
// Replace placeholder SVG paths with real project assets when available.

import { galleryImages, menuImages } from '../assets/images'

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

// Gallery page content. Ordered `images` drive each section's grid layout
// (position is derived from index in the section component).
export const gallerySections = [
  {
    id: 'atmosphere',
    eyebrow: '— PARISIAN ATMOSPHERE',
    title: 'Moments Worth Slowing Down For.',
    description:
      'A little time to pause, enjoy your coffee, and take in the Paris-inspired atmosphere at HAIR RAP BY YOYO.',
    images: ['g1', 'g4', 'g5', 'g7'],
  },
  {
    id: 'wall-art',
    eyebrow: '— PARIS WALL ART',
    title: 'A Little Corner of Paris.',
    description:
      'Paris-inspired artwork brings the feeling of a Parisian street into the heart of HAIR RAP BY YOYO.',
    images: ['g4', 'g1', 'g7', 'g2', 'g6'],
  },
  {
    id: 'coffee-food',
    eyebrow: '— COFFEE & FOOD',
    title: 'Made for the Moment.',
    description: 'Simple café pleasures designed to complement your salon experience.',
    images: ['g2', 'g3', 'g6', 'g1', 'g4', 'g7', 'g5'],
  },
  {
    id: 'salon-cafe',
    eyebrow: '— SALON + CAFÉ',
    title: 'Where Beauty Meets Café Culture.',
    description:
      'A salon appointment, a coffee, and an atmosphere designed to make your time feel special.',
    images: ['g2', 'g6', 'g5', 'g1', 'g4'],
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
  email: 'support@parisbeans.com',
  hours: {
    allWeek: '10:00 AM – 9:00 PM',
    days: 'Monday – Sunday',
  },
  social: {
    instagram: 'https://instagram.com/parisbeans',
    youtube: 'https://www.youtube.com/@parisbeans',
    facebook: 'https://www.facebook.com/parisbeans',
  },
  mapLink: 'https://maps.app.goo.gl/GRAojmhWejJByVhY6',
  mapBbox: '72.50, 22.90, 72.65, 23.10',
  mapCenter: '72.57, 23.02',
  mapZoom: '13',
}

export const cafeCardPrices = {
  'Hummus': '₹199',
  'Virgin Mojito': '₹229',
  'Lemon Mint Elixir': '₹249',
  'Blush Sunset': '₹269',
  'Aglio E Olio': '₹349',
  'Sundowner Mocktail': '₹279',
}
