import React, { useState } from 'react';
import { Deal } from '../types/deal';
import { formatIndianRupee } from '../utils/telegramParser';
import { ExternalLink, Tag, Clock, ArrowUpRight } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onSelect: (deal: Deal) => void;
  onQuickBuy: (e: React.MouseEvent, deal: Deal) => void;
}

const STORE_THEMES: Record<string, { label: string; textClass: string; borderClass: string; bgClass: string }> = {
  amazon: { label: 'Amazon India', textClass: 'text-amber-400', borderClass: 'border-amber-500/20', bgClass: 'bg-amber-500/10' },
  flipkart: { label: 'Flipkart', textClass: 'text-blue-400', borderClass: 'border-blue-500/20', bgClass: 'bg-blue-500/10' },
  myntra: { label: 'Myntra', textClass: 'text-pink-400', borderClass: 'border-pink-500/20', bgClass: 'bg-pink-500/10' },
  ajio: { label: 'Ajio', textClass: 'text-yellow-400', borderClass: 'border-yellow-500/20', bgClass: 'bg-yellow-500/10' },
  meesho: { label: 'Meesho', textClass: 'text-rose-400', borderClass: 'border-rose-500/20', bgClass: 'bg-rose-500/10' },
  blinkit: { label: 'Blinkit', textClass: 'text-yellow-300', borderClass: 'border-yellow-400/20', bgClass: 'bg-yellow-400/10' },
  zepto: { label: 'Zepto', textClass: 'text-purple-400', borderClass: 'border-purple-500/20', bgClass: 'bg-purple-500/10' },
  croma: { label: 'Croma', textClass: 'text-teal-400', borderClass: 'border-teal-500/20', bgClass: 'bg-teal-500/10' },
};

export const DealCard: React.FC<DealCardProps> = ({ deal, onSelect, onQuickBuy }) => {
  const [imgError, setImgError] = useState(false);
  const theme = STORE_THEMES[deal.store] || {
    label: deal.storeName,
    textClass: 'text-orange-400',
    borderClass: 'border-orange-500/20',
    bgClass: 'bg-orange-500/10',
  };

  return (
    <article
      onClick={() => onSelect(deal)}
      className="group relative flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      <div>
        {/* Card Media Preview */}
        <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
          {!imgError && deal.imageUrl ? (
            <img
              src={deal.imageUrl}
              alt={deal.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-center">
              <span className="text-3xl mb-1">🏷️</span>
              <span className={`text-xs font-semibold ${theme.textClass}`}>{deal.storeName}</span>
              <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">{deal.category}</span>
            </div>
          )}

          {/* Badge Overlay (Top Left) */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-orange-400 shadow-sm">
            <span>{deal.badgeLabel}</span>
          </div>

          {/* Discount Tag (Top Right) */}
          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-extrabold tracking-tight shadow-sm">
            {deal.discountPercent}% OFF
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-2.5">
          {/* Metadata line with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className={`font-semibold ${theme.textClass}`}>{deal.storeName}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="truncate max-w-[120px] text-slate-400">{deal.telegramChannel}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-500 whitespace-nowrap">{deal.postedAt}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors">
            {deal.title}
          </h3>

          {/* Price Block */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xl font-bold text-white tabular-nums tracking-tight">
              {formatIndianRupee(deal.price)}
            </span>
            <span className="text-xs text-slate-500 line-through tabular-nums">
              {formatIndianRupee(deal.mrp)}
            </span>
            <span className="text-xs font-bold text-emerald-400">
              Save {formatIndianRupee(deal.mrp - deal.price)}
            </span>
          </div>

          {/* Coupon or Bank Offer Snippet */}
          {deal.couponCode ? (
            <div className="flex items-center gap-1.5 text-xs text-orange-300/90 font-mono bg-orange-950/40 border border-orange-500/20 rounded-md px-2 py-1">
              <Tag className="w-3 h-3 text-orange-400 shrink-0" />
              <span className="truncate">Code: <strong>{deal.couponCode}</strong></span>
            </div>
          ) : deal.bankOffer ? (
            <div className="text-xs text-slate-400 line-clamp-1 italic">
              {deal.bankOffer}
            </div>
          ) : null}
        </div>
      </div>

      {/* Footer Tap Actions */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-slate-800/60 mt-2">
        <span className="text-xs text-slate-400 group-hover:text-slate-300">
          Tap card for breakdown
        </span>
        <a
          href={deal.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            if (deal.couponCode) {
              navigator.clipboard.writeText(deal.couponCode);
            }
            onQuickBuy(e, deal);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 text-xs font-semibold transition-all min-h-[36px]"
          title={`Buy on ${deal.storeName}`}
        >
          <span>Buy Now</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
