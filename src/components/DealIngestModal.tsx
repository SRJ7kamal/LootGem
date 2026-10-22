import React, { useState } from 'react';
import { parseTelegramDealMessage } from '../utils/telegramParser';
import { Deal } from '../types/deal';
import { X, Send, Sparkles, Check, Clipboard } from 'lucide-react';

interface DealIngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDeal: (deal: Deal) => void;
  onToast: (msg: string) => void;
}

const SAMPLE_TELEGRAM_POSTS = [
  {
    title: 'Flipkart Price Glitch Sample',
    channel: '@lootdeals_india',
    text: `⚡⚡ FLIPKART BIG PRICE GLITCH ⚡⚡\nNoise ColorFit Pro 5 AMOLED Smartwatch at Just ₹1,299 (MRP ₹6,999)!\nApply ₹200 seller coupon + 10% HDFC Bank Discount!\nLink: https://www.flipkart.com/noise-colorfit-pro-5/p/itm1234\nCode: FKRTNOISE200\nHurry, will expire in 20 minutes!`,
  },
  {
    title: 'Blinkit 10-Min Flash Loot',
    channel: '@quick_commerce_deals',
    text: `🚨 BLINKIT 10-MIN LOOT ALERT 🚨\nCadbury Celebrations Rich Dry Fruit Box (450g) @ ₹149 (MRP ₹450)!\nFree instant delivery in 10 minutes.\nDirect buy: https://blinkit.com/prn/cadbury-celebrations/prid/9921\nApply code BLINKIT100 at cart!`,
  },
  {
    title: 'Myntra Kurta Set Stacking Deal',
    channel: '@fashion_loots_in',
    text: `🔥 MYNTRA FASHION CLEARANCE 🔥\nAnouk Women Pure Cotton Printed Anarkali Kurta Set\nMRP: ₹3,999\nDeal Price: ₹799 (80% Off)\nUse coupon: MYNTRA500 + Extra ₹100 on Kotak Card\nLink: https://www.myntra.com/anouk-kurta-set/12903\nSteal deal, grab before sizes run out!`,
  }
];

export const DealIngestModal: React.FC<DealIngestModalProps> = ({ isOpen, onClose, onAddDeal, onToast }) => {
  const [rawText, setRawText] = useState('');
  const [channelHandle, setChannelHandle] = useState('@my_telegram_channel');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRawText(text);
        onToast('Pasted deal text from clipboard!');
      }
    } catch (err) {
      onToast('Please paste manually into the text box.');
    }
  };

  const handleParseAndAdd = async () => {
    if (!rawText.trim()) {
      onToast('Please paste a Telegram deal message first.');
      return;
    }

    setIsProcessing(true);

    try {
      // First try backend parse
      let dealData: Partial<Deal> | null = null;
      try {
        const res = await fetch('/api/parse-deal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rawText, channelHandle })
        });
        const data = await res.json();
        if (data.deal) {
          dealData = data.deal;
        }
      } catch (e) {
        // Fallback to local regex parser
      }

      if (!dealData) {
        dealData = parseTelegramDealMessage(rawText, channelHandle);
      }

      const fullDeal: Deal = {
        id: `custom-${Date.now()}`,
        title: dealData.title || 'Curated Indian Loot Deal',
        store: dealData.store || 'amazon',
        storeName: dealData.storeName || 'Amazon India',
        category: dealData.category || 'electronics',
        badge: dealData.badge || 'price_glitch',
        badgeLabel: dealData.badgeLabel || 'Price Glitch 🔥',
        price: dealData.price || 999,
        mrp: dealData.mrp || 2999,
        discountPercent: dealData.discountPercent || 67,
        couponCode: dealData.couponCode,
        bankOffer: dealData.bankOffer,
        buyUrl: dealData.buyUrl || 'https://www.amazon.in',
        androidAppPackage: dealData.androidAppPackage || 'com.amazon.mShop.android.shopping',
        androidIntentUrl: dealData.androidIntentUrl,
        imageUrl: dealData.imageUrl || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
        telegramChannel: channelHandle.startsWith('@') ? channelHandle : `@${channelHandle}`,
        telegramPostUrl: `https://t.me/${channelHandle.replace('@', '')}`,
        postedAt: 'Just now',
        stockStatus: 'in_stock',
        lootScore: dealData.lootScore || 9.6,
        description: rawText.slice(0, 300),
        verifiedByCommunity: 1,
        stepsToAvail: [
          'Tap "Buy Now" to open store app or website.',
          dealData.couponCode ? `Apply coupon voucher ${dealData.couponCode} at payment.` : 'Proceed to checkout before price changes.',
          'Verify final discounted total at payment screen.'
        ]
      };

      onAddDeal(fullDeal);
      onToast(`Deal "${fullDeal.title.slice(0, 30)}..." added to feed!`);
      setRawText('');
      onClose();
    } catch (err: any) {
      onToast(`Failed to parse: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_TELEGRAM_POSTS[0]) => {
    setRawText(sample.text);
    setChannelHandle(sample.channel);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100 z-10 flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Ingest Telegram Deal</h3>
              <p className="text-xs text-slate-400">Paste raw deal text copied from any Telegram channel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channel Handle Input */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Source Telegram Channel Handle
          </label>
          <input
            type="text"
            value={channelHandle}
            onChange={(e) => setChannelHandle(e.target.value)}
            placeholder="@lootdeals_india"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Message Input with Paste Shortcut */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-300">
              Raw Deal Text Message
            </label>
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium"
            >
              <Clipboard className="w-3 h-3" />
              <span>Paste from Clipboard</span>
            </button>
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={5}
            placeholder="Paste Telegram message here... e.g. '🔥 Flipkart Loot: Smartwatch @ ₹1,299 (MRP ₹6,999) Link: https://...' "
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
          />
        </div>

        {/* Sample Templates */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
            Quick Fill Sample Telegram Posts
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_TELEGRAM_POSTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleParseAndAdd}
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isProcessing ? 'Parsing Deal...' : 'Parse & Add to Feed'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
