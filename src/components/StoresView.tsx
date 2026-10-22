import React, { useState } from 'react';
import { Deal, StoreId } from '../types/deal';
import { DealCard } from './DealCard';
import { ExternalLink, ArrowRight, ShoppingBag, Zap, ShieldAlert, Sparkles } from 'lucide-react';

interface StoresViewProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onQuickBuy: (e: React.MouseEvent, deal: Deal) => void;
}

interface StoreMeta {
  id: StoreId;
  name: string;
  tagline: string;
  badge: string;
  domainUrl: string;
  androidPackage: string;
  dealWindow: string;
  discountTypical: string;
  accentBg: string;
  accentText: string;
}

const INDIAN_STORES: StoreMeta[] = [
  {
    id: 'amazon',
    name: 'Amazon India',
    tagline: 'Lightning deals, checkbox coupons, and Prime error pricing',
    badge: 'Coupons & Lightning',
    domainUrl: 'https://www.amazon.in',
    androidPackage: 'com.amazon.mShop.android.shopping',
    dealWindow: '12:00 AM & 12:00 PM drops',
    discountTypical: '50% to 85% Off',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    accentText: 'text-amber-400'
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    tagline: 'Big Billion price glitches, SuperCoin steals, and flash offers',
    badge: 'SuperCoins & Glitches',
    domainUrl: 'https://www.flipkart.com',
    androidPackage: 'com.flipkart.android',
    dealWindow: 'Every hour flash deals',
    discountTypical: '60% to 90% Off',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
    accentText: 'text-blue-400'
  },
  {
    id: 'myntra',
    name: 'Myntra',
    tagline: 'Brand clearance, coupon stacking, and insider fashion drops',
    badge: 'Fashion Clearance',
    domainUrl: 'https://www.myntra.com',
    androidPackage: 'com.myntra.android',
    dealWindow: 'Midnight 12 AM resets',
    discountTypical: '70% to 85% Off',
    accentBg: 'bg-pink-500/10 border-pink-500/20',
    accentText: 'text-pink-400'
  },
  {
    id: 'ajio',
    name: 'Ajio Mania',
    tagline: 'Reliance Trends, flat 80% clearances & footwear steals',
    badge: 'Ajio Mania',
    domainUrl: 'https://www.ajio.com',
    androidPackage: 'com.rims.ajiouser',
    dealWindow: 'Morning 8 AM & Evening 8 PM',
    discountTypical: '65% to 85% Off',
    accentBg: 'bg-yellow-500/10 border-yellow-500/20',
    accentText: 'text-yellow-400'
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    tagline: '10-minute grocery crashes, ₹1 flash deals, and midnight snacks',
    badge: '10-Min Flash',
    domainUrl: 'https://blinkit.com',
    androidPackage: 'com.grofers.customerapp',
    dealWindow: 'Live dark store quotas',
    discountTypical: '40% to 70% Off',
    accentBg: 'bg-yellow-500/10 border-yellow-400/20',
    accentText: 'text-yellow-300'
  },
  {
    id: 'zepto',
    name: 'Zepto',
    tagline: 'Zepto Pass exclusive pricing and instant grocery loot',
    badge: '10-Min SuperSaver',
    domainUrl: 'https://www.zeptonow.com',
    androidPackage: 'com.zeptonow.android',
    dealWindow: 'Early morning & Late night',
    discountTypical: '40% to 65% Off',
    accentBg: 'bg-purple-500/10 border-purple-500/20',
    accentText: 'text-purple-400'
  },
  {
    id: 'meesho',
    name: 'Meesho',
    tagline: 'Direct factory pricing, zero commissions, free delivery',
    badge: 'Under ₹99 Loots',
    domainUrl: 'https://www.meesho.com',
    androidPackage: 'com.meesho.supply',
    dealWindow: 'Daily 2 PM flash stores',
    discountTypical: '75% to 90% Off',
    accentBg: 'bg-rose-500/10 border-rose-500/20',
    accentText: 'text-rose-400'
  }
];

export const StoresView: React.FC<StoresViewProps> = ({ deals, onSelectDeal, onQuickBuy }) => {
  const [selectedStore, setSelectedStore] = useState<StoreId | 'all'>('all');

  const filteredDeals = selectedStore === 'all' 
    ? deals 
    : deals.filter(d => d.store === selectedStore);

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Supported Indian Ecommerce Stores
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Telegram deal channels monitor these platforms 24/7 for algorithmic price glitches, secret coupons, and clearance loots.
        </p>
      </div>

      {/* Stores Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {INDIAN_STORES.map((store) => {
          const storeDealCount = deals.filter(d => d.store === store.id).length;
          const isSelected = selectedStore === store.id;

          return (
            <div
              key={store.id}
              onClick={() => setSelectedStore(isSelected ? 'all' : store.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-slate-900 border-orange-500 shadow-md shadow-orange-500/10' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${store.accentText}`}>
                    {store.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {storeDealCount} {storeDealCount === 1 ? 'Loot' : 'Loots'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                  {store.tagline}
                </p>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">{store.discountTypical}</span>
                  <span>·</span>
                  <span>{store.dealWindow}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-medium text-orange-400 flex items-center gap-1">
                  {isSelected ? 'Viewing Deals' : 'Filter Store Deals'}
                  <ArrowRight className="w-3 h-3" />
                </span>

                <a
                  href={store.domainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-white p-1"
                  title="Visit website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtered Store Deals Section */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>
              {selectedStore === 'all' 
                ? 'All Store Deals' 
                : `${INDIAN_STORES.find(s => s.id === selectedStore)?.name} Loots (${filteredDeals.length})`}
            </span>
          </h3>

          {selectedStore !== 'all' && (
            <button
              onClick={() => setSelectedStore('all')}
              className="text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              Show All Stores
            </button>
          )}
        </div>

        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onSelect={onSelectDeal}
                onQuickBuy={onQuickBuy}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400">
              No active deals currently tracked for this store.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              You can paste and ingest new deals directly from Telegram anytime!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
