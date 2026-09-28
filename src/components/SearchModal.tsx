import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { ALL_ASSETS } from '../data/marketData';
import { MarketAsset } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAssets = ALL_ASSETS.filter((asset) => {
    const matchesQuery =
      asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.exchange.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;
    if (filterType === 'all') return true;
    if (filterType === 'stocks' && asset.category === 'us-stocks') return true;
    if (filterType === 'crypto' && asset.category === 'crypto') return true;
    if (filterType === 'indices' && (asset.category === 'world-stocks' || asset.badgeLabel)) return true;
    if (filterType === 'forex' && asset.category === 'forex') return true;
    if (filterType === 'futures' && asset.category === 'futures') return true;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#f0f3fa] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787b86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, or currency (e.g. NVDA, BTC, S&P 500, EUR)..."
            className="w-full text-sm sm:text-base outline-none text-[#131722] placeholder:text-[#787b86]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787b86] hover:text-[#131722] rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#787b86] hover:text-[#131722] px-2 py-1 rounded bg-[#f0f3fa]"
          >
            ESC
          </button>
        </div>

        {/* Quick Category Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#f0f3fa] bg-[#f8f9fd] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'indices', label: 'Indices' },
            { id: 'forex', label: 'Forex' },
            { id: 'futures', label: 'Futures' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'text-[#787b86] hover:text-[#131722] hover:bg-[#e0e3eb]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asset Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f0f3fa] p-2">
          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center text-[#787b86]">
              <p className="text-sm">No symbols matched &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-[#787b86]/80">
                Try searching for popular tickers like NVDA, BTCUSD, AAPL, SPX, or EURUSD.
              </p>
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isPositive = asset.changePercent >= 0;
              return (
                <button
                  key={asset.symbol}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#f8f9fd] flex items-center justify-between transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0f3fa] group-hover:bg-white flex items-center justify-center font-mono font-bold text-xs text-[#131722] border border-[#e0e3eb]">
                      {asset.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722] group-hover:text-[#2962ff]">
                          {asset.symbol}
                        </span>
                        <span className="text-xs text-[#787b86]">{asset.name}</span>
                      </div>
                      <div className="text-[11px] text-[#787b86]">
                        {asset.exchange} · {asset.category}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <div className="text-sm font-semibold tabular-nums text-[#131722]">
                        {asset.price.toLocaleString(undefined, {
                          minimumFractionDigits: asset.decimals ?? 2,
                          maximumFractionDigits: asset.decimals ?? 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-medium tabular-nums flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>
                          {isPositive ? '+' : ''}
                          {asset.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#787b86] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#f8f9fd] border-t border-[#f0f3fa] text-[11px] text-[#787b86] flex items-center justify-between">
          <span>Click any symbol to open live candlestick chart & technical analytics</span>
          <span>{filteredAssets.length} symbols</span>
        </div>
      </div>
    </div>
  );
};
