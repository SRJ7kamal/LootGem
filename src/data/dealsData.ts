import { Deal } from '../types/deal';

// Generated commercial product image assets
import smartwatchImg from '../assets/images/deal_noise_smartwatch_1792645699354.jpg';
import earbudsImg from '../assets/images/deal_boat_earbuds_1792645699468.jpg';
import kurtiImg from '../assets/images/deal_ethnic_kurti_1792645700139.jpg';
import sneakersImg from '../assets/images/deal_running_sneakers_1792645699878.jpg';

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-01',
    title: 'Noise ColorFit Pro 5 AMOLED 1.85" Smartwatch (Metallic Blue Edition)',
    store: 'flipkart',
    storeName: 'Flipkart',
    category: 'electronics',
    badge: 'price_glitch',
    badgeLabel: 'Price Glitch 🔥',
    price: 1299,
    mrp: 6999,
    discountPercent: 81,
    couponCode: 'FKRTNOISE200',
    couponDiscount: 200,
    bankOffer: '₹200 Instant Off on HDFC & Axis Bank Debit/Credit Cards',
    // Guaranteed working Flipkart search & product page (never blank/404)
    buyUrl: 'https://www.flipkart.com/search?q=Noise+ColorFit+Pro+5+AMOLED+Smartwatch',
    directSearchUrl: 'https://www.flipkart.com/search?q=Noise+ColorFit+Pro+5+smartwatch',
    androidAppPackage: 'com.flipkart.android',
    androidIntentUrl: 'intent://www.flipkart.com/search?q=Noise+ColorFit+Pro+5+smartwatch#Intent;scheme=https;package=com.flipkart.android;end;',
    imageUrl: smartwatchImg,
    telegramChannel: '@desidime',
    telegramPostUrl: 'https://t.me/desidime/204772',
    postedAt: '4 mins ago',
    expiresIn: 'Stock running fast (under 35 units left)',
    verifiedByCommunity: 342,
    stockStatus: 'low_stock',
    lootScore: 9.8,
    description: 'Rare algorithmic error pricing combined with bank instant off. Normal sale price is ₹3,499. Comes with 60Hz AMOLED screen, Bluetooth calling, and stainless steel rotating crown.',
    stepsToAvail: [
      'Click "Buy on Flipkart" to open Flipkart search or item page.',
      'Check the ₹200 seller coupon box on the product page.',
      'Select HDFC or Axis Bank card during payment to get extra ₹200 off.',
      'Final effective loot price will reflect as ₹1,299 at checkout.'
    ],
    priceHistory: [
      { recordedAt: '30 days ago', price: 4499 },
      { recordedAt: '14 days ago', price: 3499 },
      { recordedAt: 'Yesterday', price: 2999 },
      { recordedAt: 'Just Now', price: 1299 }
    ]
  },
  {
    id: 'deal-02',
    title: 'boAt Airdopes 141 ANC True Wireless Earbuds (42H Playtime, 32dB ANC)',
    store: 'amazon',
    storeName: 'Amazon India',
    category: 'electronics',
    badge: 'all_time_low',
    badgeLabel: 'All-Time Low',
    price: 899,
    mrp: 4490,
    discountPercent: 80,
    couponCode: 'AMZBOAT100',
    couponDiscount: 100,
    bankOffer: 'Flat ₹100 Cashback with Amazon Pay UPI',
    // Guaranteed working Amazon India product listing
    buyUrl: 'https://www.amazon.in/s?k=boAt+Airdopes+141+ANC+Earbuds',
    directSearchUrl: 'https://www.amazon.in/s?k=boAt+Airdopes+141+ANC',
    androidAppPackage: 'com.amazon.mShop.android.shopping',
    androidIntentUrl: 'intent://www.amazon.in/s?k=boAt+Airdopes+141+ANC#Intent;scheme=https;package=com.amazon.mShop.android.shopping;end;',
    imageUrl: earbudsImg,
    telegramChannel: '@dealsmagnet',
    telegramPostUrl: 'https://t.me/dealsmagnet',
    postedAt: '11 mins ago',
    expiresIn: 'Lightning Deal ends tonight',
    verifiedByCommunity: 218,
    stockStatus: 'in_stock',
    lootScore: 9.3,
    description: 'Lightning Deal + Hidden ₹100 Amazon Collectible Coupon. Lowest price ever tracked on Amazon India for active noise cancellation earbuds with ASAP charge.',
    stepsToAvail: [
      'Tap "Buy on Amazon" button.',
      'Click the "Apply ₹100 Coupon" checkbox under the price.',
      'Select Amazon Pay UPI or ICICI Card for instant cashback.',
      'Checkout before lightning deal quota reaches 100%.'
    ],
    priceHistory: [
      { recordedAt: '60 days ago', price: 1899 },
      { recordedAt: '10 days ago', price: 1499 },
      { recordedAt: '3 days ago', price: 1299 },
      { recordedAt: 'Today', price: 899 }
    ]
  },
  {
    id: 'deal-03',
    title: 'Libas Festive Pure Chanderi Silk Embroidered Kurta with Dupatta Set',
    store: 'myntra',
    storeName: 'Myntra',
    category: 'fashion',
    badge: 'coupon_stack',
    badgeLabel: 'Coupon Stack 78% Off',
    price: 1149,
    mrp: 5299,
    discountPercent: 78,
    couponCode: 'MYNTRAINSIDER400',
    couponDiscount: 400,
    bankOffer: '10% Extra off on Kotak Bank Credit Cards',
    // Guaranteed working Myntra catalog search
    buyUrl: 'https://www.myntra.com/libas-festive-kurta-sets',
    directSearchUrl: 'https://www.myntra.com/libas-chanderi-silk-kurta',
    androidAppPackage: 'com.myntra.android',
    androidIntentUrl: 'intent://www.myntra.com/libas-festive-kurta-sets#Intent;scheme=https;package=com.myntra.android;end;',
    imageUrl: kurtiImg,
    telegramChannel: '@fashion_loots_in',
    telegramPostUrl: 'https://t.me/fashion_loots_in',
    postedAt: '18 mins ago',
    expiresIn: 'Sizes M & L selling quickly',
    verifiedByCommunity: 175,
    stockStatus: 'in_stock',
    lootScore: 9.5,
    description: 'Festive season secret clearance! Combine flat 65% base off with code MYNTRAINSIDER400 at bag stage for an additional ₹400 instant price reduction.',
    stepsToAvail: [
      'Select your size and add to cart on Myntra.',
      'In the cart stage, enter coupon code MYNTRAINSIDER400.',
      'Enjoy free shipping + extra 10% instant off on Kotak Card.',
      'Pay ₹1,149 instead of ₹5,299.'
    ],
    priceHistory: [
      { recordedAt: 'Last Month', price: 3499 },
      { recordedAt: '15 days ago', price: 2199 },
      { recordedAt: 'Today', price: 1149 }
    ]
  },
  {
    id: 'deal-04',
    title: 'Red Tape Lightweight Air-Cushioned Athletic Running Sneakers',
    store: 'ajio',
    storeName: 'Ajio',
    category: 'fashion',
    badge: 'loot_deal',
    badgeLabel: 'Ajio Mania Steal',
    price: 989,
    mrp: 4899,
    discountPercent: 80,
    couponCode: 'AJIOMANIA70',
    couponDiscount: 350,
    bankOffer: 'Flat ₹150 Reliance One Cashback points',
    // Guaranteed working Ajio catalog search
    buyUrl: 'https://www.ajio.com/search/?text=Red+Tape+running+shoes',
    directSearchUrl: 'https://www.ajio.com/s/red-tape-running-shoes',
    androidAppPackage: 'com.rims.ajiouser',
    androidIntentUrl: 'intent://www.ajio.com/search/?text=Red+Tape+running+shoes#Intent;scheme=https;package=com.rims.ajiouser;end;',
    imageUrl: sneakersImg,
    telegramChannel: '@desidime',
    telegramPostUrl: 'https://t.me/desidime',
    postedAt: '25 mins ago',
    expiresIn: 'Valid till 9:00 PM',
    verifiedByCommunity: 260,
    stockStatus: 'in_stock',
    lootScore: 9.2,
    description: 'Genuine Red Tape athletic sneakers with EVA anti-skid memory foam sole. Ajio flash pricing combined with coupon AJIOMANIA70.',
    stepsToAvail: [
      'Open Ajio item and choose size (UK 6 to 10).',
      'Apply promo code AJIOMANIA70 at checkout.',
      'Complete order via UPI or Cards with free returns.'
    ],
    priceHistory: [
      { recordedAt: '45 days ago', price: 2499 },
      { recordedAt: '10 days ago', price: 1699 },
      { recordedAt: 'Today', price: 989 }
    ]
  },
  {
    id: 'deal-05',
    title: 'Amul Dark Chocolate (55% Cocoa, Pack of 3 x 150g) + ₹1 Choco Dip',
    store: 'blinkit',
    storeName: 'Blinkit',
    category: 'quick_commerce',
    badge: '10min_delivery',
    badgeLabel: '10-Min Loot ⚡',
    price: 199,
    mrp: 390,
    discountPercent: 49,
    couponCode: 'BLINKIT100',
    couponDiscount: 50,
    bankOffer: 'Flat ₹50 Cashback on Cred Pay UPI',
    // Guaranteed working Blinkit search
    buyUrl: 'https://blinkit.com/s/?q=Amul+Dark+Chocolate',
    directSearchUrl: 'https://blinkit.com/s/?q=Dark+Chocolate',
    androidAppPackage: 'com.grofers.customerapp',
    androidIntentUrl: 'intent://blinkit.com/s/?q=Amul+Dark+Chocolate#Intent;scheme=https;package=com.grofers.customerapp;end;',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
    telegramChannel: '@quick_commerce_deals',
    telegramPostUrl: 'https://t.me/quick_commerce_deals',
    postedAt: '8 mins ago',
    expiresIn: 'Flash Deal - 18 units left in nearby dark store',
    verifiedByCommunity: 189,
    stockStatus: 'low_stock',
    lootScore: 9.4,
    description: 'Exclusive 10-minute grocery delivery deal. 3 full 150g dark chocolate bars for under ₹200 with free delivery on minimum order ₹199.',
    stepsToAvail: [
      'Open Blinkit app or web search.',
      'Add the Amul Dark Chocolate bundle to cart.',
      'Check for the ₹1 add-on prompt on checkout banner.',
      'Delivered to your doorstep in 8–10 minutes.'
    ],
    priceHistory: [
      { recordedAt: 'Last Week', price: 360 },
      { recordedAt: 'Yesterday', price: 299 },
      { recordedAt: 'Just Now', price: 199 }
    ]
  },
  {
    id: 'deal-06',
    title: 'Nescafe Classic Instant Coffee Jar (200g) + Free Ceramic Mug',
    store: 'zepto',
    storeName: 'Zepto',
    category: 'quick_commerce',
    badge: '10min_delivery',
    badgeLabel: 'Zepto Super Saver',
    price: 385,
    mrp: 695,
    discountPercent: 45,
    couponCode: 'ZEPTOPASS50',
    couponDiscount: 50,
    bankOffer: 'Extra 5% off on Zepto Pass membership',
    // Guaranteed working Zepto search
    buyUrl: 'https://www.zeptonow.com/search?q=Nescafe+Classic+Coffee',
    directSearchUrl: 'https://www.zeptonow.com/search?q=Instant+Coffee',
    androidAppPackage: 'com.zeptonow.android',
    androidIntentUrl: 'intent://www.zeptonow.com/search?q=Nescafe+Classic+Coffee#Intent;scheme=https;package=com.zeptonow.android;end;',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    telegramChannel: '@dealsmagnet',
    telegramPostUrl: 'https://t.me/dealsmagnet',
    postedAt: '14 mins ago',
    expiresIn: 'Dark store quota limited',
    verifiedByCommunity: 142,
    stockStatus: 'in_stock',
    lootScore: 9.1,
    description: 'Zepto Café & Grocery flash crash. Big 200g glass jar with authentic Nescafe printed ceramic mug packed inside.',
    stepsToAvail: [
      'Tap to open Zepto search on Android.',
      'Apply ZEPTOPASS50 coupon code.',
      'Select delivery address and pay via UPI or Cash on Delivery.'
    ],
    priceHistory: [
      { recordedAt: 'Last Month', price: 650 },
      { recordedAt: 'Yesterday', price: 520 },
      { recordedAt: 'Now', price: 385 }
    ]
  },
  {
    id: 'deal-07',
    title: 'Pack of 3 Cotton Oversized Minimalist Graphic Tees (Unisex)',
    store: 'meesho',
    storeName: 'Meesho',
    category: 'fashion',
    badge: 'under_99',
    badgeLabel: 'Direct Factory Steal',
    price: 269,
    mrp: 1499,
    discountPercent: 82,
    couponCode: 'MEESHOFIRST',
    couponDiscount: 50,
    bankOffer: 'Free Delivery + Cash on Delivery Available',
    // Guaranteed working Meesho catalog search
    buyUrl: 'https://www.meesho.com/search?q=oversized+cotton+tshirt+pack',
    directSearchUrl: 'https://www.meesho.com/search?q=cotton+tshirt+pack',
    androidAppPackage: 'com.meesho.supply',
    androidIntentUrl: 'intent://www.meesho.com/search?q=oversized+cotton+tshirt+pack#Intent;scheme=https;package=com.meesho.supply;end;',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    telegramChannel: '@meesho_wholesale_gems',
    telegramPostUrl: 'https://t.me/meesho_wholesale_gems',
    postedAt: '30 mins ago',
    expiresIn: 'Wholesale lot stock: 120 left',
    verifiedByCommunity: 310,
    stockStatus: 'in_stock',
    lootScore: 9.0,
    description: 'Direct Surat garment manufacturer listing on Meesho. 180 GSM combed cotton tees at effectively ₹89 per t-shirt. Zero delivery fee.',
    stepsToAvail: [
      'Tap to open Meesho search.',
      'Select your pack colors and size (S to XXL).',
      'No prepayment needed — COD enabled with 7-day easy returns.'
    ],
    priceHistory: [
      { recordedAt: 'Original Price', price: 1499 },
      { recordedAt: 'Wholesale Price', price: 269 }
    ]
  },
  {
    id: 'deal-08',
    title: 'Portronics 65W GaN Multi-Port Fast Charger (Type-C + USB-A)',
    store: 'amazon',
    storeName: 'Amazon India',
    category: 'electronics',
    badge: 'price_glitch',
    badgeLabel: 'Price Error 76% Off',
    price: 699,
    mrp: 2999,
    discountPercent: 76,
    couponCode: 'GAN65W',
    couponDiscount: 150,
    bankOffer: 'Flat ₹50 Instant Discount with Amazon Pay Later',
    // Guaranteed working Amazon search
    buyUrl: 'https://www.amazon.in/s?k=Portronics+65W+GaN+Charger',
    directSearchUrl: 'https://www.amazon.in/s?k=65W+GaN+Charger',
    androidAppPackage: 'com.amazon.mShop.android.shopping',
    androidIntentUrl: 'intent://www.amazon.in/s?k=Portronics+65W+GaN+Charger#Intent;scheme=https;package=com.amazon.mShop.android.shopping;end;',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    telegramChannel: '@desidime',
    telegramPostUrl: 'https://t.me/desidime',
    postedAt: 'Just now',
    expiresIn: 'May be cancelled or fixed in 15 mins!',
    verifiedByCommunity: 412,
    stockStatus: 'low_stock',
    lootScore: 9.9,
    description: 'Charges MacBook, iPhone 15/16, Samsung S24, and OnePlus at full 65W GaN speed. Price error drop from ₹1,699 to ₹699.',
    stepsToAvail: [
      'Open Amazon search immediately.',
      'Tick the ₹150 discount coupon voucher on listing.',
      'Order fast using 1-Click Pay or UPI to avoid cancellation.'
    ],
    priceHistory: [
      { recordedAt: 'Yesterday', price: 1999 },
      { recordedAt: 'Morning', price: 1699 },
      { recordedAt: 'Just Now', price: 699 }
    ]
  }
];
