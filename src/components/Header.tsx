import React from 'react';
import { Sparkles, Download, PlusCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: 'deals' | 'stores' | 'telegram' | 'android-guide') => void;
  onOpenIngestModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onOpenIngestModal }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => onSelectTab('deals')}
          className="text-left flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-base shadow-sm shadow-orange-500/20">
            ₹
          </span>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            LootGem <span className="text-orange-400">India</span>
          </span>
        </button>

        {/* Zone 2: 4 concise single-line text navigation links (hidden on mobile, visible on desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button 
            onClick={() => onSelectTab('deals')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'deals' ? 'text-orange-400 font-semibold border-b-2 border-orange-400' : 'hover:text-slate-200'
            }`}
          >
            Loot Feed
          </button>
          <button 
            onClick={() => onSelectTab('stores')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'stores' ? 'text-orange-400 font-semibold border-b-2 border-orange-400' : 'hover:text-slate-200'
            }`}
          >
            Stores & Apps
          </button>
          <button 
            onClick={() => onSelectTab('telegram')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'telegram' ? 'text-orange-400 font-semibold border-b-2 border-orange-400' : 'hover:text-slate-200'
            }`}
          >
            Telegram Hub
          </button>
          <button 
            onClick={() => onSelectTab('android-guide')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'android-guide' ? 'text-orange-400 font-semibold border-b-2 border-orange-400' : 'hover:text-slate-200'
            }`}
          >
            Android Guide
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isInstallable && !isInstalled ? (
            <button
              onClick={install}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 text-xs font-semibold text-white shadow-sm transition-all whitespace-nowrap shrink-0 min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          ) : (
            <button
              onClick={onOpenIngestModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-xs font-semibold text-orange-300 hover:text-orange-200 active:scale-95 transition-all whitespace-nowrap shrink-0 min-h-[36px]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-orange-400" />
              <span>+ Parse Deal</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
