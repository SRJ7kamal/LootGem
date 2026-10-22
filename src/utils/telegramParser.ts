import { Deal, StoreId, DealCategory, DealBadge } from '../types/deal';

export function parseTelegramDealMessage(rawText: string, channelHandle: string = '@custom_telegram'): Partial<Deal> {
  const text = rawText.trim();
  
  // 1. Detect Store
  let store: StoreId = 'amazon';
  let storeName = 'Amazon India';
  let appPackage = 'com.amazon.mShop.android.shopping';
  
  const lower = text.toLowerCase();
  if (lower.includes('flipkart') || lower.includes('fkrt.it') || lower.includes('flipkart.com')) {
    store = 'flipkart';
    storeName = 'Flipkart';
    appPackage = 'com.flipkart.android';
  } else if (lower.includes('myntra') || lower.includes('myntr.it') || lower.includes('myntra.com')) {
    store = 'myntra';
    storeName = 'Myntra';
    appPackage = 'com.myntra.android';
  } else if (lower.includes('ajio') || lower.includes('ajio.com')) {
    store = 'ajio';
    storeName = 'Ajio';
    appPackage = 'com.rims.ajiouser';
  } else if (lower.includes('meesho') || lower.includes('meesho.com')) {
    store = 'meesho';
    storeName = 'Meesho';
    appPackage = 'com.meesho.supply';
  } else if (lower.includes('blinkit') || lower.includes('grofers')) {
    store = 'blinkit';
    storeName = 'Blinkit';
    appPackage = 'com.grofers.customerapp';
  } else if (lower.includes('zepto') || lower.includes('zeptonow')) {
    store = 'zepto';
    storeName = 'Zepto';
    appPackage = 'com.zeptonow.android';
  } else if (lower.includes('croma')) {
    store = 'croma';
    storeName = 'Croma';
    appPackage = 'com.croma.android';
  }

  // 2. Extract Buy Link
  const urlMatch = text.match(/https?:\/\/[^\s]+/i);
  const buyUrl = urlMatch ? urlMatch[0] : 'https://www.amazon.in';

  // 3. Extract Price & MRP in INR
  // Look for patterns like "₹999", "Rs. 999", "at 999", "@ 999", "MRP 4999"
  let price = 999;
  let mrp = 2999;

  const priceMatches = Array.from(text.matchAll(/(?:₹|rs\.?|inr|@|\bat)\s*([0-9,]+)/gi));
  const numbers: number[] = [];
  for (const match of priceMatches) {
    const val = parseInt(match[1].replace(/,/g, ''), 10);
    if (!isNaN(val) && val > 0 && val < 1000000) {
      numbers.push(val);
    }
  }

  // Check if MRP is explicitly mentioned
  const mrpMatch = text.match(/(?:mrp|original|was)\s*(?:₹|rs\.?|inr)?\s*([0-9,]+)/i);
  if (mrpMatch) {
    mrp = parseInt(mrpMatch[1].replace(/,/g, ''), 10);
  }

  if (numbers.length > 0) {
    // Usually the lowest positive number is the deal price
    const sorted = [...numbers].sort((a, b) => a - b);
    price = sorted[0];
    if (!mrpMatch && sorted.length > 1) {
      mrp = sorted[sorted.length - 1];
    }
  }

  if (mrp <= price) {
    mrp = Math.round(price * 2.2);
  }

  const discountPercent = Math.min(95, Math.max(10, Math.round(((mrp - price) / mrp) * 100)));

  // 4. Extract Coupon Code
  let couponCode: string | undefined = undefined;
  const couponMatch = text.match(/(?:code|coupon|use|apply)\s*:?\s*([A-Z0-9_-]{4,15})\b/i);
  if (couponMatch) {
    couponCode = couponMatch[1].toUpperCase();
  }

  // 5. Extract Bank Offer
  let bankOffer: string | undefined = undefined;
  if (/hdfc|icici|sbi|axis|kotak|bob|onecard|credit card|debit card/i.test(text)) {
    const bankLine = text.split('\n').find(l => /hdfc|icici|sbi|axis|kotak|card/i.test(l));
    bankOffer = bankLine ? bankLine.trim().replace(/^[-•*🔥⚡]\s*/, '') : 'Instant Bank Card Discount Available';
  }

  // 6. Extract Product Title
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let title = 'Exciting Loot Deal';
  for (const line of lines) {
    // Avoid header lines like "🔥 LOOT 🔥" or pure links
    if (line.length > 10 && !line.startsWith('http') && !line.startsWith('@') && !/^(loot|deal|steal|offer|hurry)/i.test(line.replace(/[^a-zA-Z]/g, ''))) {
      title = line.replace(/^[🔥⚡🚨🏷️💥⭐👉\s*#]+/, '').replace(/[\s*#]+$/, '');
      break;
    }
  }
  if (title.length < 5 && lines.length > 0) {
    title = lines[0].replace(/^[🔥⚡🚨🏷️💥⭐👉\s*#]+/, '');
  }

  // 7. Category & Badge
  let category: DealCategory = 'electronics';
  let badge: DealBadge = 'loot_deal';
  let badgeLabel = 'Loot Deal';

  if (store === 'blinkit' || store === 'zepto') {
    category = 'quick_commerce';
    badge = '10min_delivery';
    badgeLabel = '10-Min Loot ⚡';
  } else if (store === 'myntra' || store === 'ajio' || /shirt|kurta|shoes|sneakers|dress|jeans|hoodie/i.test(text)) {
    category = 'fashion';
    badge = couponCode ? 'coupon_stack' : 'loot_deal';
    badgeLabel = couponCode ? 'Coupon Stack' : 'Fashion Loot';
  } else if (/glitch|error|price bug|wrong price|price drop/i.test(text) || discountPercent >= 80) {
    badge = 'price_glitch';
    badgeLabel = 'Price Glitch 🔥';
  }

  if (price < 100) {
    category = 'under_99';
    badgeLabel = 'Under ₹99 Steal';
  }

  // Android intent URL
  const androidIntentUrl = `intent://${buyUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=${appPackage};end;`;

  return {
    id: `deal-${Date.now()}`,
    title: title.slice(0, 100),
    store,
    storeName,
    category,
    badge,
    badgeLabel,
    price,
    mrp,
    discountPercent,
    couponCode,
    bankOffer,
    buyUrl,
    androidAppPackage: appPackage,
    androidIntentUrl,
    imageUrl: '', // Will be assigned fallback or user/store placeholder
    telegramChannel: channelHandle.startsWith('@') ? channelHandle : `@${channelHandle}`,
    postedAt: 'Just now',
    stockStatus: 'in_stock',
    lootScore: Math.min(9.9, Math.round((7.5 + (discountPercent / 40)) * 10) / 10),
    description: text.slice(0, 300)
  };
}

export function formatIndianRupee(num: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
}
