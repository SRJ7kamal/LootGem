import React, { useState, useEffect, useCallback } from 'react';
import { Deal, TelegramChannel, StoreId, DealCategory } from './types/deal';
import { INITIAL_DEALS } from './data/dealsData';
import { INITIAL_TELEGRAM_CHANNELS } from './data/channelsData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DealCard } from './components/DealCard';
import { DealDetailModal } from './components/DealDetailModal';
import { DealIngestModal } from './components/DealIngestModal';
import { StoresView } from './components/StoresView';
import { TelegramHubView } from './components/TelegramHubView';
import { AndroidGuideView } from './components/AndroidGuideView';
import { FeedFilters } from './components/FeedFilters';
import { Toast } from './components/Toast';
import { 
  Flame, 
  Send, 
  Smartphone, 
  Sparkles, 
  WifiOff, 
  ArrowUpRight, 
  RefreshCw,
  Clock,
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<'deals' | 'stores' | 'telegram' | 'android-guide'>('deals');

  // Deals State with localStorage persistence
  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const saved = localStorage.getItem('lootgem_deals');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_DEALS;
  });

  // Telegram Channels State
  const [channels, setChannels] = useState<TelegramChannel[]>(() => {
    try {
      const saved = localStorage.getItem('lootgem_channels');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_TELEGRAM_CHANNELS;
  });

  // Modals & Interactive Overlays
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<DealCategory>('all');
  const [selectedTelegramChannel, setSelectedTelegramChannel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'discount' | 'price_asc' | 'recent' | 'loot_score'>('recent');

  // Live Refresh & Polling State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('Just now');
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);

  // Network Online/Offline status
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lootgem_deals', JSON.stringify(deals));
    } catch (e) {}
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem('lootgem_channels', JSON.stringify(channels));
    } catch (e) {}
  }, [channels]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleAddDeal = (newDeal: Deal) => {
    setDeals((prev) => [newDeal, ...prev]);
  };

  const handleAddChannel = (newChannel: TelegramChannel) => {
    setChannels((prev) => [newChannel, ...prev]);
  };

  // Fetch live deals from Telegram server API
  const fetchLiveDeals = useCallback(async (channelParam: string = 'all', notify = true) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/live-deals?channel=${encodeURIComponent(channelParam)}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.deals) && data.deals.length > 0) {
        setDeals((prevDeals) => {
          // Merge avoiding duplicates by id or exact title
          const existingIds = new Set(prevDeals.map((d) => d.id));
          const existingTitles = new Set(prevDeals.map((d) => d.title.toLowerCase()));

          const freshItems: Deal[] = [];
          for (const item of data.deals) {
            if (!existingIds.has(item.id) && !existingTitles.has(item.title.toLowerCase())) {
              freshItems.push(item);
            }
          }

          // If all already exist, push the top fresh ones anyway with updated timestamps
          if (freshItems.length === 0) {
            return [...data.deals.slice(0, 3), ...prevDeals.slice(0, 15)];
          }

          return [...freshItems, ...prevDeals];
        });

        const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastRefreshedAt(timeStr);

        if (notify) {
          showToast(`⚡ Pulled ${data.count} fresh deals from Telegram!`);
        }
      }
    } catch (err: any) {
      console.warn('Live fetch error:', err);
      if (notify) {
        showToast('Using cached feed. Will retry sync in 45s.');
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and auto-refresh interval
  useEffect(() => {
    // Fetch once on mount
    fetchLiveDeals('all', false);

    if (!autoRefreshEnabled) return;

    // Poll every 45 seconds for fresh Telegram drops
    const interval = setInterval(() => {
      fetchLiveDeals(selectedTelegramChannel, false);
    }, 45000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, selectedTelegramChannel, fetchLiveDeals]);

  // Quick buy action on card
  const handleQuickBuy = (e: React.MouseEvent, deal: Deal) => {
    e.stopPropagation();
    if (deal.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      showToast(`Coupon "${deal.couponCode}" copied! Opening ${deal.storeName}...`);
    } else {
      showToast(`Opening ${deal.storeName}...`);
    }
  };

  // Filter & Sort Logic
  const filteredDeals = deals.filter((deal) => {
    // Store filter
    if (selectedStore !== 'all' && deal.store !== selectedStore) return false;

    // Telegram Channel filter
    if (selectedTelegramChannel !== 'all' && deal.telegramChannel.toLowerCase() !== selectedTelegramChannel.toLowerCase()) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'glitch' && deal.badge !== 'price_glitch') return false;
      if (selectedCategory === 'quick_commerce' && deal.category !== 'quick_commerce') return false;
      if (selectedCategory === 'under_99' && deal.price > 99) return false;
      if (selectedCategory === 'electronics' && deal.category !== 'electronics') return false;
      if (selectedCategory === 'fashion' && deal.category !== 'fashion') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = deal.title.toLowerCase().includes(q);
      const matchStore = deal.storeName.toLowerCase().includes(q);
      const matchChannel = deal.telegramChannel.toLowerCase().includes(q);
      const matchCoupon = deal.couponCode?.toLowerCase().includes(q);
      const matchBank = deal.bankOffer?.toLowerCase().includes(q);
      if (!matchTitle && !matchStore && !matchChannel && !matchCoupon && !matchBank) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'loot_score') return b.lootScore - a.lootScore;
    return 0; // 'recent' maintains list order
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white pb-20 md:pb-8">
      
      {/* Offline Alert Badge */}
      {!isOnline && (
        <div className="bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2 flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode — Cached Indian loot deals remain accessible.</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenIngestModal={() => setIsIngestModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        
        {/* TAB 1: DEALS FEED */}
        {currentTab === 'deals' && (
          <div className="space-y-5">
            
            {/* Live Telegram Alert & Refresh Bar */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                
                <div className="text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Live Telegram Deals Feed</span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      · Last sync: <strong className="text-slate-200">{lastRefreshedAt}</strong>
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Aggregating price errors, flash deals & coupons from verified Indian channels.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Refresh & Auto-Sync Toggle */}
              <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                <button
                  onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                    autoRefreshEnabled 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' 
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                  title="Toggle auto polling every 45 seconds"
                >
                  Auto-Sync: {autoRefreshEnabled ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => fetchLiveDeals(selectedTelegramChannel, true)}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-xs font-bold text-white shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer min-h-[36px]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh Deals'}</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <FeedFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Telegram Channel Horizontal Scroller */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs text-slate-400 shrink-0 font-medium flex items-center gap-1">
                <Radio className="w-3 h-3 text-orange-400" />
                Telegram Channel:
              </span>
              
              <button
                onClick={() => setSelectedTelegramChannel('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedTelegramChannel === 'all'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                }`}
              >
                All Channels ({deals.length})
              </button>

              {channels.map((ch) => {
                const count = deals.filter(d => d.telegramChannel.toLowerCase() === ch.handle.toLowerCase()).length;
                const isSelected = selectedTelegramChannel.toLowerCase() === ch.handle.toLowerCase();
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedTelegramChannel(ch.handle);
                      fetchLiveDeals(ch.handle.replace('@', ''), true);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-500 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {ch.handle} ({count})
                  </button>
                );
              })}
            </div>

            {/* Results Counter & Active Criteria */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div>
                Showing <strong className="text-slate-200 tabular-nums">{filteredDeals.length}</strong> active deals
                {selectedStore !== 'all' && <span> on <span className="text-orange-400 font-semibold capitalize">{selectedStore}</span></span>}
                {selectedTelegramChannel !== 'all' && <span> from <span className="text-blue-400 font-semibold">{selectedTelegramChannel}</span></span>}
              </div>

              {(searchQuery || selectedStore !== 'all' || selectedCategory !== 'all' || selectedTelegramChannel !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStore('all');
                    setSelectedCategory('all');
                    setSelectedTelegramChannel('all');
                  }}
                  className="text-orange-400 hover:text-orange-300 font-medium"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Deals Grid */}
            {filteredDeals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDeals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onSelect={(d) => setSelectedDeal(d)}
                    onQuickBuy={handleQuickBuy}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
                <div className="text-3xl">🔍</div>
                <h3 className="text-base font-bold text-white">No deals match your criteria</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try tapping "Refresh Deals" or select another Telegram channel. You can also paste fresh deal text.
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => fetchLiveDeals('all', true)}
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white"
                  >
                    Fetch Latest Deals
                  </button>
                  <button
                    onClick={() => setIsIngestModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                  >
                    Paste Telegram Deal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STORES VIEW */}
        {currentTab === 'stores' && (
          <StoresView
            deals={deals}
            onSelectDeal={(d) => setSelectedDeal(d)}
            onQuickBuy={handleQuickBuy}
          />
        )}

        {/* TAB 3: TELEGRAM HUB VIEW */}
        {currentTab === 'telegram' && (
          <TelegramHubView
            channels={channels}
            onAddChannel={handleAddChannel}
            onOpenIngestModal={() => setIsIngestModalOpen(true)}
            onToast={showToast}
            deals={deals}
            onSelectDeal={(d) => setSelectedDeal(d)}
            onRefreshLiveDeals={fetchLiveDeals}
          />
        )}

        {/* TAB 4: ANDROID GUIDE */}
        {currentTab === 'android-guide' && (
          <AndroidGuideView onToast={showToast} />
        )}

      </main>

      {/* Deal Detail Bottom Sheet / Modal (Opens on card click) */}
      <DealDetailModal
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onToast={showToast}
      />

      {/* Telegram Deal Ingestion Modal */}
      <DealIngestModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onAddDeal={handleAddDeal}
        onToast={showToast}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
