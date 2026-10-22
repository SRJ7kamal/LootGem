import { TelegramChannel } from '../types/deal';

export const INITIAL_TELEGRAM_CHANNELS: TelegramChannel[] = [
  {
    id: 'ch-desidime',
    name: 'DesiDime Official Deals',
    handle: '@desidime',
    subscribers: '480K',
    category: 'All Stores & Bank Offers',
    verified: true,
    description: 'India\'s largest shopping community for curated coupons, hidden price drops, and bank card discounts.',
    sampleDealCount: 142
  },
  {
    id: 'ch-lootdeals',
    name: 'Indian Loot Deals & Glitches',
    handle: '@lootdeals_india',
    subscribers: '620K',
    category: 'Price Glitches & Steals',
    verified: true,
    description: 'Instant notification channel for algorithm error prices, clearance stock, and 80%+ discount loot.',
    sampleDealCount: 215
  },
  {
    id: 'ch-fashion-loots',
    name: 'Myntra & Ajio Secret Deals',
    handle: '@fashion_loots_in',
    subscribers: '310K',
    category: 'Fashion & Footwear',
    verified: true,
    description: 'Stacked coupon codes, buy-3-get-1-free offers, and luxury fashion clearance across Myntra, Ajio & Nykaa.',
    sampleDealCount: 89
  },
  {
    id: 'ch-quick-commerce',
    name: 'Blinkit & Zepto 10-Min Loots',
    handle: '@quick_commerce_deals',
    subscribers: '190K',
    category: '10-Min Groceries & Snacks',
    verified: true,
    description: 'Flash ₹1 grocery deals, midnight snack cashbacks, and instant 10-minute electronics delivery offers.',
    sampleDealCount: 76
  },
  {
    id: 'ch-meesho-finds',
    name: 'Meesho Wholesale & Hidden Gems',
    handle: '@meesho_wholesale_gems',
    subscribers: '145K',
    category: 'Budget Under ₹99',
    verified: false,
    description: 'Direct manufacturer pricing, unbranded gems, free cash-on-delivery deals, and home essentials.',
    sampleDealCount: 54
  }
];
