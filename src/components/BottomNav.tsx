import React from 'react';
import { Flame, Store, Send, Smartphone } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'deals' | 'stores' | 'telegram' | 'android-guide';
  onSelectTab: (tab: 'deals' | 'stores' | 'telegram' | 'android-guide') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 pb-safe">
      <div className="grid grid-cols-4 items-center h-15">
        
        <button
          onClick={() => onSelectTab('deals')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors focus:outline-none ${
            currentTab === 'deals' ? 'text-orange-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className={`w-5 h-5 ${currentTab === 'deals' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 whitespace-nowrap">Deals</span>
        </button>

        <button
          onClick={() => onSelectTab('stores')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors focus:outline-none ${
            currentTab === 'stores' ? 'text-orange-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Store className={`w-5 h-5 ${currentTab === 'stores' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 whitespace-nowrap">Stores</span>
        </button>

        <button
          onClick={() => onSelectTab('telegram')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors focus:outline-none ${
            currentTab === 'telegram' ? 'text-orange-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send className={`w-5 h-5 ${currentTab === 'telegram' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 whitespace-nowrap">Telegram</span>
        </button>

        <button
          onClick={() => onSelectTab('android-guide')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors focus:outline-none ${
            currentTab === 'android-guide' ? 'text-orange-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className={`w-5 h-5 ${currentTab === 'android-guide' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 whitespace-nowrap">Android</span>
        </button>

      </div>
    </nav>
  );
};
