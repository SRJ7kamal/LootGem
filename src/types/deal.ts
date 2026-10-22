export type StoreId = 
  | 'amazon' 
  | 'flipkart' 
  | 'myntra' 
  | 'ajio' 
  | 'meesho' 
  | 'blinkit' 
  | 'zepto' 
  | 'croma';

export type DealCategory = 
  | 'all' 
  | 'glitch' 
  | 'electronics' 
  | 'fashion' 
  | 'quick_commerce' 
  | 'under_99' 
  | 'home_kitchen' 
  | 'beauty';

export type DealBadge = 
  | 'price_glitch' 
  | 'loot_deal' 
  | 'coupon_stack' 
  | '10min_delivery' 
  | 'all_time_low'
  | 'under_99';

export interface TelegramChannel {
  id: string;
  name: string;
  handle: string; // e.g. @desidime
  avatarUrl?: string;
  subscribers: string;
  category: string;
  verified: boolean;
  description: string;
  sampleDealCount: number;
}

export interface Deal {
  id: string;
  title: string;
  store: StoreId;
  storeName: string;
  category: DealCategory;
  badge: DealBadge;
  badgeLabel: string;
  price: number; // Final loot price in INR
  mrp: number; // Maximum Retail Price
  discountPercent: number;
  couponCode?: string;
  couponDiscount?: number;
  bankOffer?: string; // e.g. "10% Instant Off on HDFC Cards"
  buyUrl: string;
  directSearchUrl?: string; // Guaranteed store search fallback to avoid blank 404 pages
  androidAppPackage?: string;
  androidIntentUrl?: string;
  imageUrl: string;
  telegramChannel: string; // e.g. "@LootDealsIndia"
  telegramPostUrl?: string;
  postedAt: string; // ISO string or relative time
  expiresIn?: string; // e.g. "Likely expires in 25 mins"
  verifiedByCommunity: number; // Upvotes
  stockStatus: 'in_stock' | 'low_stock' | 'expired';
  description: string;
  lootScore: number; // e.g. 9.7 out of 10
  priceHistory?: {
    recordedAt: string;
    price: number;
  }[];
  stepsToAvail?: string[];
}
