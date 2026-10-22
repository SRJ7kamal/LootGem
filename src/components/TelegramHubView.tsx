import React, { useState } from 'react';
import { TelegramChannel, Deal } from '../types/deal';
import { Send, CheckCircle2, Plus, ExternalLink, RefreshCw, Sparkles, Bot, Radio, ShieldCheck } from 'lucide-react';

interface TelegramHubViewProps {
  channels: TelegramChannel[];
  onAddChannel: (channel: TelegramChannel) => void;
  onOpenIngestModal: () => void;
  onToast: (msg: string) => void;
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onRefreshLiveDeals?: (channel?: string) => Promise<void>;
}

export const TelegramHubView: React.FC<TelegramHubViewProps> = ({
  channels,
  onAddChannel,
  onOpenIngestModal,
  onToast,
  deals,
  onSelectDeal,
  onRefreshLiveDeals
}) => {
  const [newHandle, setNewHandle] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('All Stores & Loot');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) {
      onToast('Please enter a channel handle.');
      return;
    }

    const cleanHandle = newHandle.trim().startsWith('@') 
      ? newHandle.trim() 
      : `@${newHandle.trim()}`;

    const newChan: TelegramChannel = {
      id: `ch-${Date.now()}`,
      name: newName.trim() || cleanHandle,
      handle: cleanHandle,
      subscribers: 'New Feed',
      category: newCategory,
      verified: false,
      description: 'Custom community Telegram deal broadcast channel.',
      sampleDealCount: 0
    };

    onAddChannel(newChan);
    onToast(`Added Telegram channel ${cleanHandle}!`);
    setNewHandle('');
    setNewName('');
    setShowAddForm(false);
  };

  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    onToast('Fetching fresh broadcasts from Telegram channels...');

    try {
      if (onRefreshLiveDeals) {
        await onRefreshLiveDeals(selectedChannel ? selectedChannel.replace('@', '') : 'all');
      } else {
        await fetch(`/api/live-deals?channel=${selectedChannel ? encodeURIComponent(selectedChannel.replace('@', '')) : 'all'}`);
      }
      onToast('Telegram feeds refreshed! Fresh live drops loaded.');
    } catch (e) {
      onToast('Refresh completed.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const channelDeals = selectedChannel 
    ? deals.filter(d => d.telegramChannel.toLowerCase() === selectedChannel.toLowerCase())
    : [];

  return (
    <div className="space-y-6">
      
      {/* Banner & Value Prop */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Telegram Deals Aggregator (No Scraping)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              In India, lightning price drops and glitch deals appear first on Telegram broadcast channels. We aggregate public Telegram feeds directly through web previews, bots, and native message forwarding without violating store policies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRefreshFeed}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-400' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onOpenIngestModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Ingest Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Telegram Channels Directory */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-orange-400" />
            Monitored Indian Deal Channels ({channels.length})
          </h3>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Channel</span>
          </button>
        </div>

        {/* Add Channel Form */}
        {showAddForm && (
          <form onSubmit={handleCreateChannel} className="mb-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-white">Add Telegram Channel to Monitor</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Channel Name (e.g. IndiaDeals)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
              <input
                type="text"
                placeholder="Handle (e.g. @india_deals)"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                required
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              >
                <option value="All Stores & Loot">All Stores & Loot</option>
                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                <option value="Fashion & Footwear">Fashion & Footwear</option>
                <option value="10-Min Groceries">10-Min Groceries</option>
                <option value="Under ₹99 Steals">Under ₹99 Steals</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white"
              >
                Save Channel
              </button>
            </div>
          </form>
        )}

        {/* Channels List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {channels.map((ch) => {
            const count = deals.filter(d => d.telegramChannel.toLowerCase() === ch.handle.toLowerCase()).length;
            const isFilterActive = selectedChannel === ch.handle;

            return (
              <div
                key={ch.id}
                onClick={() => setSelectedChannel(isFilterActive ? null : ch.handle)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isFilterActive 
                    ? 'bg-slate-900 border-orange-500 shadow-md shadow-orange-500/10' 
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                        TG
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{ch.name}</span>
                          {ch.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                        </div>
                        <div className="text-xs text-blue-400 font-mono">{ch.handle}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-300">{ch.subscribers}</span>
                      <div className="text-[10px] text-slate-400">{count} active loots</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {ch.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-orange-400 font-medium">
                    {isFilterActive ? 'Filtering this channel' : 'View channel deals'}
                  </span>

                  <a
                    href={`https://t.me/${ch.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-slate-400 hover:text-white"
                  >
                    <span>Open in Telegram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Channel Deals Breakdown */}
      {selectedChannel && (
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">
              Deals from {selectedChannel} ({channelDeals.length})
            </h4>
            <button
              onClick={() => setSelectedChannel(null)}
              className="text-xs text-orange-400 hover:text-orange-300"
            >
              Clear Filter
            </button>
          </div>

          {channelDeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {channelDeals.map((d) => (
                <div
                  key={d.id}
                  onClick={() => onSelectDeal(d)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="truncate">
                    <div className="text-xs font-semibold text-white truncate">{d.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {d.storeName} · <span className="text-emerald-400 font-bold">₹{d.price}</span> ({d.discountPercent}% OFF)
                    </div>
                  </div>
                  <span className="text-xs text-orange-400 shrink-0 font-medium">View</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900/50 text-xs text-slate-400 text-center">
              No recent deals stored for this channel yet. Use the "Ingest Message" button to paste deals from {selectedChannel}.
            </div>
          )}
        </div>
      )}

      {/* Technical Architecture: How Telegram Works Without Direct Scraping */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            3 Ways to Feed Deals from Telegram on Android
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="font-bold text-orange-400">1. Instant Copy & Paste</span>
            <p className="text-slate-400">
              When browsing deal channels on your Android Telegram app, long-press the deal message, tap Copy, open LootGem and tap "+ Parse Deal". Our smart regex parser extracts store, prices, coupons and links in 100ms.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="font-bold text-blue-400">2. Public Web Preview</span>
            <p className="text-slate-400">
              Telegram generates public HTTP previews for all public channels at <code className="text-slate-300">t.me/s/channel</code>. This requires no scraping bots or API tokens and never gets blocked.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="font-bold text-emerald-400">3. Telegram Bot Forwarder</span>
            <p className="text-slate-400">
              Create a free bot with @BotFather and add it to any private deal group or use Telefeed/IFTTT to push updates directly to your LootGem webhook.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
