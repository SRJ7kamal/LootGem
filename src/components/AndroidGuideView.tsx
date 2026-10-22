import React, { useState } from 'react';
import { 
  Smartphone, 
  Terminal, 
  Download, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Code2, 
  Layers, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidGuideViewProps {
  onToast: (msg: string) => void;
}

export const AndroidGuideView: React.FC<AndroidGuideViewProps> = ({ onToast }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    onToast('Code snippet copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero: Building on Android */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Smartphone className="w-4 h-4" />
              <span>Android-Only Developer & User Manual</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Guide: Building & Using LootGem on an Android Device
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              You can build, iterate, and run this entire ecommerce deals app on your Android phone without needing a laptop or PC. Here is your complete roadmap.
            </p>
          </div>

          {/* Quick Install Button for Android */}
          <div className="shrink-0 w-full sm:w-auto">
            {isInstalled ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Installed on Your Device</span>
              </div>
            ) : isInstallable ? (
              <button
                onClick={install}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Install LootGem on Android</span>
              </button>
            ) : (
              <div className="text-xs text-slate-400 p-2 text-center sm:text-right">
                Tap Chrome <strong>⋮ menu</strong> &gt; <strong>Add to Home screen</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Core Pillars for Android Development */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pillar 1: Install as PWA */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-sm font-bold text-white">Install as an Android Native App (PWA)</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Progressive Web Apps on Android run in their own standalone window with zero browser URL bar, custom splash screen, and full performance:
          </p>

          <ol className="text-xs text-slate-300 space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <span>Open this application URL in <strong>Google Chrome</strong> or <strong>Brave</strong> on Android.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <span>Tap the <strong>3 dots (⋮)</strong> menu at the top-right corner.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <span>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <span>The LootGem icon will appear in your Android app drawer just like any Google Play Store app!</span>
            </li>
          </ol>
        </div>

        {/* Pillar 2: Android Deep Linking */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-sm font-bold text-white">How Indian Store Deep Linking Works</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            When you tap <strong>"Buy Now"</strong>, the app triggers Android intent URIs so deals launch straight in your installed store apps:
          </p>

          <div className="space-y-1.5 text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <div>Amazon: <span className="text-amber-400">com.amazon.mShop.android.shopping</span></div>
            <div>Flipkart: <span className="text-blue-400">com.flipkart.android</span></div>
            <div>Myntra: <span className="text-pink-400">com.myntra.android</span></div>
            <div>Blinkit: <span className="text-yellow-300">com.grofers.customerapp</span></div>
            <div>Zepto: <span className="text-purple-400">com.zeptonow.android</span></div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            This avoids web login walls and applies your saved UPI, addresses, and SuperCoins automatically!
          </p>
        </div>

        {/* Pillar 3: Workflow with Telegram on Android */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-sm font-bold text-white">Capturing Deals from Telegram on Android</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            To capture deals on Android without manual typing:
          </p>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-bold text-purple-400">Split-Screen / Floating Window:</span>
              <p className="text-slate-400 mt-1">
                Open Telegram on the top half and LootGem on the bottom half. Copy the deal alert in Telegram and tap <strong>Paste from Clipboard</strong> in LootGem.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-bold text-purple-400">Android Share Sheet:</span>
              <p className="text-slate-400 mt-1">
                In Telegram, tap Share on any deal post and send it directly to your browser/LootGem.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 4: Local Android Dev Setup (Termux) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-sm font-bold text-white">Developing Offline via Termux (Android)</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            If you ever want to run Node.js and code completely offline on your Android phone:
          </p>

          <div className="relative bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1">
            <button
              onClick={() => copySnippet('pkg update && pkg install nodejs-lts git\ngit clone <your-repo>\ncd <your-repo>\nnpm install\nnpm run dev', 'termux')}
              className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1"
            >
              {copiedCode === 'termux' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'termux' ? 'Copied' : 'Copy'}</span>
            </button>
            <div># 1. Install Node.js in Termux</div>
            <div>pkg install nodejs git</div>
            <div># 2. Run developer server</div>
            <div>npm run dev</div>
            <div># 3. Open in Chrome on Android:</div>
            <div>http://localhost:3000</div>
          </div>
        </div>

      </div>

      {/* Recommended Android Dev Apps Checklist */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-400" />
          Recommended Android Apps for Web Developers
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="font-bold text-orange-400">1. Acode / Spck Editor</div>
            <p className="text-slate-400 mt-1">
              Full-featured code editors on Android with syntax highlighting, Git support, and live browser preview.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="font-bold text-blue-400">2. Termux</div>
            <p className="text-slate-400 mt-1">
              Terminal emulator and Linux environment for Android with Node.js, Python, and Git.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="font-bold text-emerald-400">3. Telegram & Telegram X</div>
            <p className="text-slate-400 mt-1">
              Join channels like @desidime, @lootdeals_india and forward messages directly into LootGem.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
