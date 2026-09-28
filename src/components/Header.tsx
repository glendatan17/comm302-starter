import React, { useState } from 'react';
import { Search, Globe, User, Star, Activity, Sparkles, ChevronDown, Check } from 'lucide-react';
import { ActiveTab } from '../types/market';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  isLiveFeed: boolean;
  onToggleLiveFeed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenAuth,
  onOpenWatchlist,
  watchlistCount,
  isLiveFeed,
  onToggleLiveFeed,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '中文' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#f0f3fa]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Search Section */}
        <div className="flex items-center gap-6">
          {/* TradingView Logo Mark */}
          <button
            onClick={() => onSelectTab('markets')}
            className="flex items-center gap-2 group focus:outline-none"
            title="TradingView Home"
          >
            <svg
              className="w-8 h-7 fill-current text-black transition-transform group-hover:scale-105"
              fill="none"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 10h-7v18h7V10z"></path>
            </svg>
          </button>

          {/* Search Bar with Shortcut */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center bg-[#f0f3fa] hover:bg-[#e4e7ee] transition-colors rounded-full px-3.5 py-2 w-64 text-sm text-[#787b86] cursor-pointer group text-left"
          >
            <Search className="w-4 h-4 mr-2.5 text-[#787b86] group-hover:text-[#131722] transition-colors shrink-0" />
            <span className="text-xs font-normal flex-1">Search (Ctrl+K)</span>
            <kbd className="hidden lg:inline-block text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#e0e3eb] text-[#787b86]">
              ⌘K
            </kbd>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-[14px] font-medium relative">
            <div className="relative">
              <button
                onClick={() => setShowProductsMenu(!showProductsMenu)}
                className={`flex items-center gap-1 transition-colors py-5 ${
                  activeTab === 'supercharts' || activeTab === 'screener'
                    ? 'text-[#2962ff] font-semibold'
                    : 'text-[#131722] hover:text-[#2962ff]'
                }`}
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#787b86]" />
              </button>

              {showProductsMenu && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#e0e3eb] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => {
                      onSelectTab('supercharts');
                      setShowProductsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#f0f3fa] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-sm">Supercharts</div>
                      <div className="text-[11px] text-[#787b86]">Next-gen technical charts</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('screener');
                      setShowProductsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#f0f3fa] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-sm">Screeners</div>
                      <div className="text-[11px] text-[#787b86]">Filter stocks, crypto & forex</div>
                    </div>
                  </button>
                  <div className="border-t border-[#f0f3fa] my-1"></div>
                  <button
                    onClick={() => {
                      onSelectTab('markets');
                      setShowProductsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#f0f3fa]"
                  >
                    Market Heatmaps
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('markets');
                      setShowProductsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#f0f3fa]"
                  >
                    Pine Script®
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectTab('community')}
              className={`transition-colors py-5 ${
                activeTab === 'community'
                  ? 'text-[#2962ff] font-semibold border-b-2 border-[#2962ff]'
                  : 'text-[#131722] hover:text-[#2962ff]'
              }`}
            >
              Community
            </button>

            <button
              onClick={() => onSelectTab('markets')}
              className={`transition-colors py-5 relative ${
                activeTab === 'markets'
                  ? 'text-[#2962ff] font-semibold border-b-2 border-[#2962ff]'
                  : 'text-[#131722] hover:text-[#2962ff]'
              }`}
            >
              Markets
            </button>

            <button
              onClick={() => onSelectTab('brokers')}
              className={`transition-colors py-5 ${
                activeTab === 'brokers'
                  ? 'text-[#2962ff] font-semibold border-b-2 border-[#2962ff]'
                  : 'text-[#131722] hover:text-[#2962ff]'
              }`}
            >
              Brokers
            </button>

            <button
              onClick={() => onOpenSearch()}
              className="text-[#131722] hover:text-[#2962ff] transition-colors py-5"
            >
              More
            </button>
          </nav>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Live Data Toggle Indicator */}
          <button
            onClick={onToggleLiveFeed}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
              isLiveFeed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
            title="Toggle Live Ticker Pulse"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveFeed ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span className="text-[11px] font-mono">{isLiveFeed ? 'LIVE' : 'PAUSED'}</span>
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="flex items-center gap-1 text-xs font-medium text-[#131722] hover:text-[#2962ff] p-1.5 rounded-lg hover:bg-[#f0f3fa] transition-colors relative"
            title="View Watchlist"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span className="hidden sm:inline text-xs font-semibold">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-[#2962ff] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 text-xs font-medium text-[#131722] hover:text-[#2962ff] p-1.5 rounded-lg hover:bg-[#f0f3fa] transition-colors"
              title="Select Language"
            >
              <Globe className="w-4 h-4 text-[#131722]" />
              <span className="font-semibold text-xs tracking-wide">{selectedLang}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-[#e0e3eb] rounded-xl shadow-lg py-1.5 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#131722] hover:bg-[#f0f3fa] flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962ff]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar / Icon */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1.5 text-[#131722] hover:text-[#2962ff] hover:bg-[#f0f3fa] rounded-lg transition-colors"
              title="Account"
            >
              <User className="w-5 h-5 text-[#131722]" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e0e3eb] rounded-xl shadow-lg py-1.5 z-50">
                <div className="px-3 py-2 border-b border-[#f0f3fa]">
                  <p className="text-xs font-semibold text-[#131722]">Guest Trader</p>
                  <p className="text-[11px] text-[#787b86]">Standard Tier</p>
                </div>
                <button
                  onClick={() => {
                    onOpenWatchlist();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#131722] hover:bg-[#f0f3fa] flex items-center gap-2"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>My Watchlist ({watchlistCount})</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTab('supercharts');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#131722] hover:bg-[#f0f3fa] flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-[#2962ff]" />
                  <span>Launch Supercharts</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAuth();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#2962ff] font-medium hover:bg-blue-50"
                >
                  Sign in / Register
                </button>
              </div>
            )}
          </div>

          {/* Get Started Action Button */}
          <button
            onClick={onOpenAuth}
            className="bg-gradient-to-r from-[#0052ff] via-[#2962ff] to-[#a855f7] hover:opacity-95 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition duration-150 whitespace-nowrap cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
