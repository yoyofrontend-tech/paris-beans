import { menuImages } from '../assets/images'

const hotCoffee = { image: menuImages.tab1, imageAlt: 'Coffee with leaf-shaped latte art' }
const coldCoffee = { image: menuImages.tab2, imageAlt: 'A chilled blended coffee' }
const refresher = { image: menuImages.tab3, imageAlt: 'A chilled lemon mint drink' }

export const cafeMenus = [
  {
    id: 'stylist',
    label: 'The House Selection',
    categories: [
      {
        id: 'stylist-hot',
        label: 'Hot Beverages',
        ...hotCoffee,
        items: [
          { name: 'Espresso (32 ml)', price: '₹249', desc: 'A bold, concentrated shot of pure espresso with a rich crema.' },
          { name: 'Classic Americano', price: '₹249', desc: 'Smooth double shot of espresso diluted with hot water for a crisp, clean taste.' },
          { name: 'Latte', price: '₹279', desc: 'Velvet-steamed milk poured over rich espresso for a smooth, comforting classic.' },
          { name: 'Flat White', price: '₹289', desc: 'Double shot of espresso layered under dense, velvety microfoam.' },
          { name: 'Classic Cappuccino', price: '₹269', desc: 'Perfectly balanced espresso topped with equal parts steamed milk and airy foam.' },
          { name: 'Mocha', price: '₹299', desc: 'Decadent dark chocolate melted into espresso and velvety steamed milk.' },
          { name: 'Doppio (64 ml)', price: '₹259', desc: 'Double shot of intense, full-bodied espresso for a rich energy boost.' },
        ],
      },
      {
        id: 'stylist-cold-iced',
        label: 'Cold Iced Beverages',
        ...coldCoffee,
        items: [
          { name: 'Iced Americano', price: '₹249', desc: 'Bold espresso poured over chilled water and ice for a crisp, refreshing pick-me-up.' },
          { name: 'Salted Caramel Cappuccino', price: '₹359', desc: 'Classic cappuccino elevated with sea-salted caramel syrup.' },
          { name: 'Spanish Latte', price: '₹379', desc: 'Sweet condensed milk layered with robust espresso and microfoam.' },
        ],
      },
      {
        id: 'stylist-cold',
        label: 'Cold Beverages',
        ...coldCoffee,
        items: [
          { name: 'Classic Cold Blend', price: '₹359', desc: 'Signature iced coffee whipped to a light, smooth, frothy texture.' },
          { name: 'Oreo Cold Blend', price: '₹389', desc: 'Decadent cold coffee spun with crunchy Oreo cookie crumbles.' },
          { name: 'Biscoff Cold Blend', price: '₹439', desc: 'Creamy iced coffee infused with spiced Lotus Biscoff speculoos.' },
          { name: 'Mocha Cold Blend', price: '₹379', desc: 'Velvety chocolate syrup blended into icy cold coffee.' },
          { name: 'Salted Caramel Cold Blend', price: '₹379', desc: 'Iced blended espresso swirled with rich sea-salted caramel.' },
        ],
      },
      {
        id: 'stylist-iced-coffee',
        label: 'Iced Coffee',
        ...coldCoffee,
        items: [
          { name: 'Strawberry Iced Latte', price: '₹369', desc: 'Fresh strawberry puree layered beneath chilled espresso and milk.' },
          { name: 'Litchi Iced Coffee', price: '₹349', desc: 'Exotic sweet litchi syrup combined with chilled cold brew espresso.' },
          { name: 'Citrus Iced Espresso', price: '₹339', desc: 'Tangy citrus essence shaken with chilled espresso over ice.' },
          { name: 'French Vanilla Iced Latte', price: '₹349', desc: 'Chilled espresso and milk scented with luxurious French vanilla.' },
          { name: 'Spanish Iced Latte', price: '₹379', desc: 'Creamy sweet milk poured over ice and topped with a dark espresso shot.' },
          { name: 'Hazelnut Iced Latte', price: '₹349', desc: 'Cold espresso and milk flavored with roasted hazelnut syrup.' },
          { name: 'Iced Espresso', price: '₹299', desc: 'Pure intense espresso poured directly over clean mineral ice.' },
        ],
      },
      {
        id: 'stylist-milkshakes',
        label: 'Milkshakes',
        image: menuImages.tab2,
        imageAlt: 'Caramel shake topped with whipped cream',
        items: [
          { name: 'Vanilla Milk Shake', price: '₹349', desc: 'Classic rich Madagascar vanilla bean blended into a thick milk shake.' },
          { name: 'Chocolate Milk Shake', price: '₹399', desc: 'Decadent Belgian cocoa powder spun into a creamy thick shake.' },
          { name: 'Strawberry Milk Shake', price: '₹449', desc: 'Lush ripe strawberry pulp blended into a smooth, refreshing shake.' },
          { name: 'Mango Milk Shake', price: '₹449', desc: 'Tropical Alphonso mango pulp churned with chilled whole milk.' },
          { name: 'Caramel Milk Shake', price: '₹449', desc: 'Golden buttery caramel sauce swirled into a rich milk shake.' },
        ],
      },
      {
        id: 'stylist-food',
        label: 'Food Items',
        image: menuImages.stylistFood,
        imageAlt: 'A golden chocolate-chip cookie floating in midair',
        items: [
          { name: 'Fries', price: '₹249', desc: 'Golden crispy potato fries lightly seasoned and served hot.' },
          { name: 'Cookies', price: '₹399', desc: 'Freshly baked artisanal butter cookies with rich chocolate chips.' },
        ],
      },
    ],
  },
  {
    id: 'vip',
    label: 'The Reserve Selection',
    categories: [
      {
        id: 'vip-hot',
        label: 'Hot Beverages',
        ...hotCoffee,
        items: [
          { name: 'Espresso', price: '₹289', desc: 'Premium rich espresso shot roasted to perfection.' },
          { name: 'Cortado', price: '₹299', desc: 'Equal parts rich espresso and warm textured milk for a bold, smooth profile.' },
          { name: 'Cappuccino', price: '₹319', desc: 'Italian classic with velvety microfoam floating on robust espresso.' },
          { name: 'Café Latte', price: '₹329', desc: 'Smooth dark espresso balanced with creamy steamed milk.' },
          { name: 'Café Mocha', price: '₹349', desc: 'Indulgent cocoa powder expertly layered with rich espresso and warm milk.' },
        ],
      },
      {
        id: 'vip-refreshers',
        label: 'Refreshing Drinks',
        ...refresher,
        items: [
          { name: 'Tonic Water with Espresso', price: '₹329', desc: 'Effervescent tonic water topped with a bold shot of espresso over ice.' },
          { name: 'Red Bull Bomb', price: '₹379', desc: 'High-energy Red Bull base topped with a refreshing citrus splash.' },
          { name: 'Sky Bomb', price: '₹359', desc: 'Sparkling blue curacao soda layered with energy-boosting notes.' },
          { name: 'Gingerale with Espresso', price: '₹329', desc: 'Spicy ginger ale paired with dark roasted espresso over ice.' },
          { name: 'Blue Ocean', price: '₹359', desc: 'Vibrant electric blue tropical mocktail with a cool citrus finish.' },
        ],
      },
      {
        id: 'vip-soft-drinks',
        label: 'Soft Drinks',
        image: menuImages.softDrinks,
        imageAlt: 'A tall glass of iced cola floating in midair',
        items: [
          { name: 'Coconut Water', price: '₹159', desc: 'Pure hydrating fresh coconut water served chilled.' },
          { name: 'Red Bull', price: '₹259', desc: 'Premium energy drink to revitalize your day.' },
          { name: 'Diet Coke', price: '₹110', desc: 'Zero-calorie crisp cola refreshment.' },
          { name: 'Tonic Water', price: '₹110', desc: 'Crisp bubbly botanical mixer served over ice.' },
          { name: 'Sprite', price: '₹110', desc: 'Crisp lemon-lime sparkling soft drink.' },
          { name: 'Ginger Ale', price: '₹110', desc: 'Effervescent ginger-flavored soda with a subtle spice kick.' },
        ],
      },
      {
        id: 'vip-food',
        label: 'Food Options',
        image: menuImages.vipFood,
        imageAlt: 'Two stacked triangular halves of a grilled cheese and vegetable sandwich',
        items: [
          { name: 'Veg Grilled Sandwich', price: '₹359', desc: 'Golden toasted bread filled with fresh seasoned vegetables.' },
          { name: 'Cheese Chutney Sandwich', price: '₹349', desc: 'Savory Indian sandwich filled with melted cheese and spicy mint chutney.' },
          { name: 'French Fries Peri Peri', price: '₹299', desc: 'Crispy potato fries dusted with fiery peri-peri seasoning.' },
          { name: 'French Fries Salted', price: '₹249', desc: 'Classic golden crispy potato fries sprinkled with sea salt.' },
          { name: 'Cheesy French Fries', price: '₹349', desc: 'Hot french fries smothered in rich warm melted cheese sauce.' },
          { name: 'Classic Wedges', price: '₹249', desc: 'Seasoned thick-cut potato wedges baked to crispy perfection.' },
          { name: 'Paris Beans Mixed Platter', price: '₹409', desc: 'Gourmet assortment of spiced beans, fresh garden greens, and house delicacies.' },
        ],
      },
      {
        id: 'vip-thick-shakes',
        label: 'Thick Shakes',
        image: menuImages.thickShakes,
        imageAlt: 'A strawberry and cookie shake with whipped cream',
        items: [
          { name: 'Oreo Strawberry Shake', price: '₹479', desc: 'Indulgent fusion of crunchy Oreo cookies and ripe strawberry swirl.' },
          { name: 'Ferrero Rocher Shake', price: '₹489', desc: 'Ultra-luxurious hazelnut chocolate shake topped with Ferrero crunch.' },
          { name: 'Biscoff Thick Shake', price: '₹469', desc: 'Rich thick milk shake infused with creamy caramelized Biscoff spread.' },
          { name: 'Mango Thick Shake', price: '₹449', desc: 'Decadent velvety mango milk shake made with luscious mango pulp.' },
          { name: 'Nutella Thick Shake', price: '₹459', desc: 'Rich creamy chocolate hazelnut Nutella spread whipped into a dense shake.' },
        ],
      },
      {
        id: 'vip-specialty-coffee',
        label: 'Specialty Coffee',
        ...hotCoffee,
        items: [
          { name: 'Pour Over', price: '₹329', desc: 'Hand-poured pour-over artisanal filter coffee highlighting nuanced floral notes.' },
          { name: 'AeroPress', price: '₹339', desc: 'Smooth low-acidity coffee extracted under gentle air pressure.' },
          { name: 'French Press', price: '₹349', desc: 'Full-bodied traditional plunge coffee steeped to rich perfection.' },
          { name: 'Vietnamese Filter Coffee', price: '₹379', desc: 'Traditional slow-drip dark coffee sweetened with rich condensed milk.' },
          { name: 'Kerala Filter Kaapi', price: '₹329', desc: 'Authentic chicory-infused South Indian filter coffee brewed strong.' },
        ],
      },
      {
        id: 'vip-mocktails',
        label: 'Mocktails',
        ...refresher,
        items: [
          { name: 'Chili Guava', price: '₹329', desc: 'Sweet guava juice rimmed with spicy chili powder and a hit of lime.' },
          { name: 'Berry Blast', price: '₹329', desc: 'Explosive sparkling drink packed with forest berries and crushed ice.' },
          { name: 'Mango on the Rocks', price: '₹359', desc: 'Refreshing chilled mango juice served over ice with subtle spice notes.' },
          { name: 'Masala Lemonade', price: '₹339', desc: 'Tangy lemonade infused with aromatic Indian spices.' },
          { name: 'Mint Mojito', price: '₹319', desc: 'Classic refreshing blend of fresh garden mint, lime, and soda.' },
        ],
      },
      {
        id: 'vip-add-ons',
        label: 'Flavor Add-ons',
        image: menuImages.flavorAddOns,
        imageAlt: 'Three bottles of café syrup with hazelnuts, vanilla, and cocoa',
        items: [
          { name: 'Hazelnut', price: '₹99', desc: 'Smooth nutty roasted hazelnut syrup.' },
          { name: 'Tiramisu', price: '₹99', desc: 'Rich Italian dessert syrup with notes of cocoa and mascarpone.' },
          { name: 'French Vanilla', price: '₹99', desc: 'Sweet aromatic French vanilla bean syrup.' },
        ],
      },
    ],
  },
]
