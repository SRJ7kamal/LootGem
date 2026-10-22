import React from 'react';
import { StoreId, DealCategory } from '../types/deal';
import { Search, SlidersHorizontal, Sparkles, Zap, Flame } from 'lucide-react';

interface FeedFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedStore: StoreId | 'all';
  onSelectStore: (store: StoreId | 'all') => void;
  selectedCategory: DealCategory;
  onSelectCategory: (cat: DealCategory) => void;
  sortBy: 'discount' | 'price_asc' | 'recent' | 'loot_score';
  onSortChange: (sort: 'discount' | 'price_asc' | 'recent' | 'loot_score') => void;
}

const STORES: { id: StoreId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Stores' },
  { id: 'amazon', label: 'Amazon' },
  { id: 'flipkart', label: 'Flipkart' },
  { id: 'myntra', label: 'Myntra' },
  { id: 'ajio', label: 'Ajio' },
  { id: 'meesho', label: 'Meesho' },
  { id: 'blinkit', label: 'Blinkit' },
  { id: 'zepto', label: 'Zepto' },
];

const CATEGORIES: { id: DealCategory; label: string }[] = [
  { id: 'all', label: 'All Loots' },
  { id: 'glitch', label: 'Price Glitches 🔥' },
  { id: 'quick_commerce', label: '10-Min Delivery' },
  { id: 'electronics', label: 'Electronics & Audio' },
  { id: 'fashion', label: 'Fashion & Sneakers' },
  { id: 'under_99', label: 'Under ₹99' },
];

export const FeedFilters: React.FC<FeedFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedStore,
  onSelectStore,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="space-y-3">
      {/* Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deals, products, brands (Noise, boAt, HDFC)..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs text-slate-400 hidden sm:inline whitespace-nowrap">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-orange-500"
          >
            <option value="discount">Highest Discount %</option>
            <option value="recent">Most Recent Drops</option>
            <option value="price_asc">Lowest Price (₹)</option>
            <option value="loot_score">Top Loot Score</option>
          </select>
        </div>
      </div>

      {/* Store Filter Tabs (Horizontal Scrollable Segmented Controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {STORES.map((s) => {
          const isActive = selectedStore === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectStore(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus:outline-none cursor-pointer ${
                isActive
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus:outline-none cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
