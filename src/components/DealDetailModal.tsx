import React, { useState } from 'react';
import { Deal } from '../types/deal';
import { formatIndianRupee } from '../utils/telegramParser';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  ThumbsUp, 
  AlertTriangle, 
  Smartphone, 
  TrendingDown, 
  Tag, 
  Send,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface DealDetailModalProps {
  deal: Deal | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({ deal, onClose, onToast }) => {
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [reportedExpired, setReportedExpired] = useState(false);

  if (!deal) return null;

  const handleCopyCoupon = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!deal.couponCode) return;
    navigator.clipboard.writeText(deal.couponCode);
    setCopiedCoupon(true);
    onToast(`Coupon "${deal.couponCode}" copied to clipboard!`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleBuyNow = (useAppIntent = true) => {
    // If coupon exists, auto copy to clipboard before opening store
    if (deal.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      onToast(`Coupon "${deal.couponCode}" copied! Opening ${deal.storeName}...`);
    } else {
      onToast(`Opening ${deal.storeName}...`);
    }

    // Try Android App Intent if requested and available, else web URL
    const targetUrl = useAppIntent && deal.androidIntentUrl ? deal.androidIntentUrl : deal.buyUrl;
    
    // Open store link
    window.open(deal.buyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareText = `🔥 LOOT DEAL: ${deal.title} at just ${formatIndianRupee(deal.price)} (${deal.discountPercent}% OFF) on ${deal.storeName}!\nCheck here: ${deal.buyUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: deal.title,
          text: shareText,
          url: deal.buyUrl,
        });
        onToast('Deal shared successfully!');
      } catch (err) {
        // Share dismissed
      }
    } else {
      navigator.clipboard.writeText(shareText);
      onToast('Deal details & link copied to clipboard!');
    }
  };

  const handleUpvote = () => {
    if (!upvoted) {
      setUpvoted(true);
      onToast('Thanks for confirming this deal is active!');
    }
  };

  const handleReport = () => {
    if (!reportedExpired) {
      setReportedExpired(true);
      onToast('Reported. Our moderators will verify stock status.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Container */}
      <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 z-10">
        
        {/* Mobile Pull Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-700 rounded-full mx-auto my-3 shrink-0" />

        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/20">
              {deal.badgeLabel}
            </span>
            <span className="text-xs text-slate-400">
              {deal.storeName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close deal dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Product Media & Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-5 aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
              <img
                src={deal.imageUrl || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80'}
                alt={deal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="sm:col-span-7 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">{deal.discountPercent}% DISCOUNT</span>
                <span>·</span>
                <span className="text-slate-400 font-mono">{deal.postedAt}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {deal.title}
              </h2>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
                  {formatIndianRupee(deal.price)}
                </span>
                <span className="text-sm text-slate-500 line-through tabular-nums">
                  {formatIndianRupee(deal.mrp)}
                </span>
              </div>

              {deal.expiresIn && (
                <div className="text-xs text-amber-400 font-medium">
                  ⏳ {deal.expiresIn}
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown Calculation Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-orange-400" />
              Loot Price Breakdown
            </h4>

            <div className="text-xs space-y-1.5 text-slate-400">
              <div className="flex justify-between">
                <span>Maximum Retail Price (MRP)</span>
                <span className="tabular-nums text-slate-300">{formatIndianRupee(deal.mrp)}</span>
              </div>

              <div className="flex justify-between text-emerald-400">
                <span>Store Instant Discount</span>
                <span className="tabular-nums">-{formatIndianRupee(deal.mrp - deal.price - (deal.couponDiscount || 0))}</span>
              </div>

              {deal.couponCode && (
                <div className="flex justify-between text-orange-400">
                  <span>Coupon Voucher ({deal.couponCode})</span>
                  <span className="tabular-nums">-{formatIndianRupee(deal.couponDiscount || 200)}</span>
                </div>
              )}

              {deal.bankOffer && (
                <div className="flex justify-between text-blue-400">
                  <span className="truncate pr-2">Bank Offer: {deal.bankOffer}</span>
                  <span className="shrink-0 font-medium">Applied</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
                <span>Net Effective Price</span>
                <span className="text-emerald-400 tabular-nums">{formatIndianRupee(deal.price)}</span>
              </div>
            </div>
          </div>

          {/* Coupon Code Copier (If Available) */}
          {deal.couponCode && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-950/20 border border-orange-500/30">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-400" />
                <div>
                  <div className="text-[11px] text-slate-400">Coupon Code (Tap to Copy)</div>
                  <div className="font-mono text-sm font-bold text-orange-300">{deal.couponCode}</div>
                </div>
              </div>

              <button
                onClick={handleCopyCoupon}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white transition-colors"
              >
                {copiedCoupon ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCoupon ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          )}

          {/* How to Avail / Steps */}
          {deal.stepsToAvail && deal.stepsToAvail.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                How to Get This Deal
              </h4>
              <ol className="space-y-1.5 text-xs text-slate-300">
                {deal.stepsToAvail.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Telegram Source Information */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-400" />
              <div>
                <span className="text-slate-400">Sourced from Telegram: </span>
                <span className="font-semibold text-slate-200">{deal.telegramChannel}</span>
              </div>
            </div>

            {deal.telegramPostUrl && (
              <a
                href={deal.telegramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline whitespace-nowrap ml-2"
              >
                View Post
              </a>
            )}
          </div>

          {/* Community Verification Actions */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  upvoted 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' 
                    : 'bg-slate-800/60 border-slate-700/60 hover:text-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Working ({deal.verifiedByCommunity + (upvoted ? 1 : 0)})</span>
              </button>

              <button
                onClick={handleReport}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  reportedExpired 
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 font-semibold' 
                    : 'bg-slate-800/60 border-slate-700/60 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{reportedExpired ? 'Reported' : 'Expired?'}</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>

        {/* Modal Sticky Bottom Action */}
        <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex flex-col gap-2 shrink-0 pb-safe">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={deal.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (deal.couponCode) {
                  navigator.clipboard.writeText(deal.couponCode);
                  onToast(`Copied coupon "${deal.couponCode}"! Opening ${deal.storeName}...`);
                } else {
                  onToast(`Opening ${deal.storeName}...`);
                }
              }}
              className="flex-1 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all text-center cursor-pointer"
            >
              <span>Buy on {deal.storeName} ({formatIndianRupee(deal.price)})</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {deal.androidIntentUrl && (
              <a
                href={deal.androidIntentUrl}
                onClick={() => {
                  if (deal.couponCode) navigator.clipboard.writeText(deal.couponCode);
                  onToast(`Launching ${deal.storeName} Android App...`);
                }}
                className="sm:w-auto px-4 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title="Direct Android App Open"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Open in App</span>
              </a>
            )}
          </div>

          {/* Guaranteed search fallback to prevent blank pages */}
          {deal.directSearchUrl && deal.directSearchUrl !== deal.buyUrl && (
            <a
              href={deal.directSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[11px] text-slate-400 hover:text-orange-400 py-1"
            >
              Alternative link: Search item catalog on {deal.storeName}
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
