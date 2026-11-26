import g1 from './gallery/g1.svg'
import g2 from './gallery/g2.svg'
import g3 from './gallery/g3.svg'
import g4 from './gallery/g4.svg'
import g5 from './gallery/g5.svg'
import g6 from './gallery/g6.svg'
import g7 from './gallery/g7.svg'

import photoRectangle from './gallery_hero/Photo rectangle_hq.jpg'
import photoRectangle1 from './gallery_hero/Photo rectangle (1)_hq.jpg'
import photoRectangle2 from './gallery_hero/Photo rectangle (2)_hq.jpg'
import photoRectangle3 from './gallery_hero/Photo rectangle (3)_hq.jpg'
import photoRectangle4 from './gallery_hero/Photo rectangle (4)_hq.jpg'
import photoRectangle5 from './gallery_hero/Photo rectangle (5)_hq.jpg'
import photoRectangle6 from './gallery_hero/Photo rectangle (6)_hq.jpg'

import salonInterior from './hero/salon-interior.svg'

import aglioOlio from './menu/aglio-olio.svg'
import blushSunset from './menu/blush-sunset.svg'
import espressoMartini from './menu/espresso-martini.svg'
import galaxy from './menu/galaxy.svg'
import menuBackground from './menu/menu_background.jpg'
import menuHero from './menu/hero.svg'
import hummus from './menu/hummus.svg'
import lemonMint from './menu/lemon-mint.svg'
import menuDecoBottomRight from './menu/Menu bottom Right.svg'
import menuDecoTopLeft from './menu/Menu Top Left.svg'
import sundowner from './menu/sundowner.svg'
import tab1 from './menu/tab1.png'
import tab2 from './menu/tab2.png'
import tab3 from './menu/tab3.png'
import virginMojito from './menu/virgin-mojito.svg'
import stylistFood from './menu/stylist-food.webp'
import vipFood from './menu/vip-food.webp'
import softDrinks from './menu/soft-drinks.webp'
import thickShakes from './menu/thick-shakes.webp'
import flavorAddOns from './menu/flavor-add-ons.webp'
import houseHotBeverages from './menu/house-hot-beverages.webp'
import houseColdIcedBeverages from './menu/house-cold-iced-beverages.webp'
import houseColdBeverages from './menu/house-cold-beverages.webp'
import houseIcedCoffee from './menu/house-iced-coffee.webp'
import houseMilkshakes from './menu/house-milkshakes.webp'

import storyFrame48096320 from './story/frame-48096320.svg'
/* Phone-tier section decorations, cut out of mobile_menu.svg: pale art with no
   ground of its own, so they can sit over the section colour at any size. */
import decoBeans from './story/deco-beans.svg'
import decoCupCroissant from './story/deco-cup-croissant.svg'
import photo from './story/photo.svg'
import rectangle69 from './story/Rectangle 69.svg'
import rectangle71 from './story/Rectangle 71.svg'
import rectangle72 from './story/Rectangle 72.svg'
import rectangle73 from './story/Rectangle 73.svg'
import rectangle74 from './story/Rectangle 74.svg'
import rectangle75 from './story/Rectangle 75.svg'

export const galleryImages = {
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g7,
}

export const galleryHeroImages = [
  photoRectangle,
  photoRectangle1,
  photoRectangle2,
  photoRectangle3,
  photoRectangle4,
  photoRectangle5,
  photoRectangle6,
]

export const heroImages = {
  salonInterior,
}

export const menuImages = {
  'aglio-olio': aglioOlio,
  'blush-sunset': blushSunset,
  'espresso-martini': espressoMartini,
  galaxy,
  hero: menuHero,
  background: menuBackground,
  hummus,
  'lemon-mint': lemonMint,
  sundowner,
  tab1,
  tab2,
  tab3,
  stylistFood,
  vipFood,
  softDrinks,
  thickShakes,
  flavorAddOns,
  houseHotBeverages,
  houseColdIcedBeverages,
  houseColdBeverages,
  houseIcedCoffee,
  houseMilkshakes,
  'virgin-mojito': virginMojito,
}

/* Corner art for the Home "From the Café" section. Both are thin #A66A3F
   squiggles on a transparent ground, sized in vw per screen band and anchored
   to the section's own corners, so the overflow: hidden on .cafe crops them
   the way the Figma frames do. */
export const menuDeco = {
  topLeft: menuDecoTopLeft,
  bottomRight: menuDecoBottomRight,
}

export const storyImages = {
  frame48096320: storyFrame48096320,
  decoBeans,
  decoCupCroissant,
  desktopStoryPage: '/images/Desktop.svg',
  phoneStoryPage: '/images/phone.svg',
  photo,
  rectangle69,
  rectangle71,
  rectangle72,
  rectangle73,
  rectangle74,
  rectangle75,
}
