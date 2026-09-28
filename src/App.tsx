import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  MarketAsset,
  MarketCategory,
  MarketRegion,
  ActiveTab,
} from './types/market';
import {
  PRIMARY_INDICES,
  WORLD_INDICES,
  HIGHEST_VOLUME_STOCKS,
  CRYPTO_RANKINGS,
  FUTURES_COMMODITIES,
  FOREX_CURRENCIES,
  BONDS_ASSETS,
  ETF_ASSETS,
  ALL_ASSETS,
} from './data/marketData';
import { Header } from './components/Header';
import { IndicesRow } from './components/IndicesRow';
import { MarketDataGrid } from './components/MarketDataGrid';
import { CommoditiesForexSection } from './components/CommoditiesForexSection';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { AuthModal } from './components/AuthModal';
import { SuperchartsView } from './components/SuperchartsView';
import { ScreenerView } from './components/ScreenerView';
import { CommunityView } from './components/CommunityView';
import { BrokersView } from './components/BrokersView';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & active view state
  const [activeTab, setActiveTab] = useState<ActiveTab>('markets');
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('us-stocks');
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>('everywhere');
  const [showRegionMenu, setShowRegionMenu] = useState(false);

  // Asset detail modal
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);

  // Search, Watchlist, Auth Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // User watchlist (persisted in localStorage or initial defaults)
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'BTCUSD', 'SPX']);

  // Real-time market feed simulation
  const [isLiveFeed, setIsLiveFeed] = useState(true);
  const [primaryIndices, setPrimaryIndices] = useState<MarketAsset[]>(PRIMARY_INDICES);
  const [worldIndices, setWorldIndices] = useState<MarketAsset[]>(WORLD_INDICES);
  const [volumeStocks, setVolumeStocks] = useState<MarketAsset[]>(HIGHEST_VOLUME_STOCKS);
  const [cryptoRankings, setCryptoRankings] = useState<MarketAsset[]>(CRYPTO_RANKINGS);
  const [commodities, setCommodities] = useState<MarketAsset[]>(FUTURES_COMMODITIES);
  const [forexPairs, setForexPairs] = useState<MarketAsset[]>(FOREX_CURRENCIES);
  const [flashSymbols, setFlashSymbols] = useState<Record<string, 'up' | 'down'>>({});

  // Real-time gentle tick simulation
  useEffect(() => {
    if (!isLiveFeed) return;

    const interval = setInterval(() => {
      // Pick 1-2 random assets across all categories to tick
      const pools = [
        { pool: primaryIndices, setter: setPrimaryIndices },
        { pool: volumeStocks, setter: setVolumeStocks },
        { pool: cryptoRankings, setter: setCryptoRankings },
        { pool: worldIndices, setter: setWorldIndices },
        { pool: commodities, setter: setCommodities },
        { pool: forexPairs, setter: setForexPairs },
      ];

      const randomTarget = pools[Math.floor(Math.random() * pools.length)];
      if (!randomTarget || randomTarget.pool.length === 0) return;

      const idx = Math.floor(Math.random() * randomTarget.pool.length);
      const asset = randomTarget.pool[idx];
      const deltaPercent = (Math.random() - 0.48) * 0.18; // -0.09% to +0.09%
      const newPrice = Math.max(0.0001, asset.price * (1 + deltaPercent / 100));
      const priceDiff = newPrice - asset.price;
      const isUp = priceDiff >= 0;

      // Update item
      randomTarget.setter((prev) =>
        prev.map((item, i) =>
          i === idx
            ? {
                ...item,
                price: Number(newPrice.toFixed(item.decimals ?? 2)),
                change: Number((item.change + priceDiff).toFixed(item.decimals ?? 2)),
                changePercent: Number((item.changePercent + deltaPercent).toFixed(2)),
              }
            : item
        )
      );

      // Flash effect
      setFlashSymbols((prev) => ({ ...prev, [asset.symbol]: isUp ? 'up' : 'down' }));
      setTimeout(() => {
        setFlashSymbols((prev) => {
          const next = { ...prev };
          delete next[asset.symbol];
          return next;
        });
      }, 1200);
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveFeed, primaryIndices, volumeStocks, cryptoRankings, worldIndices, commodities, forexPairs]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleWatchlist = useCallback((asset: MarketAsset) => {
    setWatchlist((prev) =>
      prev.includes(asset.symbol)
        ? prev.filter((s) => s !== asset.symbol)
        : [...prev, asset.symbol]
    );
  }, []);

  const handleRemoveFromWatchlist = useCallback((symbol: string) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol));
  }, []);

  // Filter or highlight based on category pill
  const handleSelectCategory = (cat: MarketCategory) => {
    setSelectedCategory(cat);
    if (cat === 'us-stocks' || cat === 'world-stocks' || cat === 'crypto' || cat === 'futures' || cat === 'forex') {
      // If user clicks a specific category, we can focus that section or view
    }
  };

  const handleOpenInSupercharts = (asset: MarketAsset) => {
    setSelectedAsset(asset);
    setActiveTab('supercharts');
  };

  const handleOpenAssetFromSymbol = (symbol: string) => {
    const found = ALL_ASSETS.find((a) => a.symbol === symbol) || PRIMARY_INDICES[0];
    setSelectedAsset(found);
  };

  // Region display titles
  const regionTitles: Record<MarketRegion, string> = {
    everywhere: 'Markets, everywhere',
    us: 'Markets, United States',
    europe: 'Markets, Europe',
    asia: 'Markets, Asia-Pacific',
    americas: 'Markets, Americas',
    emerging: 'Markets, Emerging economies',
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#131722] selection:bg-blue-100 font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        isLiveFeed={isLiveFeed}
        onToggleLiveFeed={() => setIsLiveFeed(!isLiveFeed)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'supercharts' ? (
          <SuperchartsView
            selectedAsset={selectedAsset || HIGHEST_VOLUME_STOCKS[0]}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            onBackToOverview={() => setActiveTab('markets')}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        ) : activeTab === 'screener' ? (
          <ScreenerView
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            onBackToOverview={() => setActiveTab('markets')}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        ) : activeTab === 'community' ? (
          <CommunityView
            onBackToOverview={() => setActiveTab('markets')}
            onOpenAssetDetail={handleOpenAssetFromSymbol}
          />
        ) : activeTab === 'brokers' ? (
          <BrokersView onBackToOverview={() => setActiveTab('markets')} />
        ) : (
          /* Default: Markets Overview (The Exact Screenshot Screen) */
          <main className="pb-16">
            {/* Hero / Title Section */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center">
              {/* Dropdown Header: "Markets, everywhere ⌵" */}
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setShowRegionMenu(!showRegionMenu)}
                  className="inline-flex items-center justify-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131722]">
                    {regionTitles[selectedRegion]}
                  </h1>
                  <ChevronDown
                    className={`w-6 h-6 sm:w-7 sm:h-7 stroke-current text-[#131722] stroke-[2.5] pt-1 transition-transform duration-200 ${
                      showRegionMenu ? 'rotate-180' : 'group-hover:translate-y-0.5'
                    }`}
                  />
                </button>

                {showRegionMenu && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-[#e0e3eb] rounded-2xl shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                    {(
                      [
                        { id: 'everywhere', label: 'Markets, everywhere' },
                        { id: 'us', label: 'United States' },
                        { id: 'europe', label: 'Europe' },
                        { id: 'asia', label: 'Asia-Pacific' },
                        { id: 'americas', label: 'Americas' },
                        { id: 'emerging', label: 'Emerging economies' },
                      ] as { id: MarketRegion; label: string }[]
                    ).map((region) => (
                      <button
                        key={region.id}
                        onClick={() => {
                          setSelectedRegion(region.id);
                          setShowRegionMenu(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#131722] hover:bg-[#f0f3fa] flex items-center justify-between"
                      >
                        <span>{region.label}</span>
                        {selectedRegion === region.id && (
                          <Check className="w-4 h-4 text-[#2962ff]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Market Category Pills Navigation */}
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#e0e3eb] rounded-full overflow-x-auto no-scrollbar max-w-full shadow-xs">
                  {[
                    { id: 'us-stocks', label: 'US stocks' },
                    { id: 'world-stocks', label: 'World stocks' },
                    { id: 'crypto', label: 'Crypto' },
                    { id: 'futures', label: 'Futures' },
                    { id: 'forex', label: 'Forex' },
                    { id: 'bonds-gov', label: 'Government bonds' },
                    { id: 'bonds-corp', label: 'Corporate bonds' },
                    { id: 'etfs', label: 'ETFs' },
                    { id: 'economy', label: 'Economy' },
                  ].map((category) => {
                    const isActive = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleSelectCategory(category.id as MarketCategory)}
                        className={`text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#1e222d] text-white shadow-xs'
                            : 'text-[#131722] hover:bg-[#f0f3fa]'
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Primary Indices Row (S&P 500, Nasdaq 100, Dow 30) */}
            <IndicesRow
              indices={primaryIndices}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onExploreAllIndices={() => setActiveTab('screener')}
              flashSymbols={flashSymbols}
            />

            {/* Market Data Grids (World indices, Highest volume stocks, Crypto rankings) */}
            <MarketDataGrid
              worldIndices={worldIndices}
              volumeStocks={volumeStocks}
              cryptoRankings={cryptoRankings}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onExploreSection={() => setActiveTab('screener')}
              flashSymbols={flashSymbols}
            />

            {/* Commodities & Forex Section */}
            <CommoditiesForexSection
              commodities={commodities}
              forexPairs={forexPairs}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onExploreCommodities={() => setActiveTab('screener')}
              onExploreForex={() => setActiveTab('screener')}
              flashSymbols={flashSymbols}
            />
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer
        onSelectProduct={(product) => {
          if (product === 'supercharts') setActiveTab('supercharts');
          if (product === 'screener') setActiveTab('screener');
        }}
      />

      {/* Asset Detail & Chart Modal */}
      {selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          isWatchlisted={watchlist.includes(selectedAsset.symbol)}
          onToggleWatchlist={handleToggleWatchlist}
          onOpenInSupercharts={handleOpenInSupercharts}
        />
      )}

      {/* Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlist}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Get Started / Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
