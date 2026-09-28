import React from 'react';
import { X, Trash2, ArrowRight, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketAsset } from '../types/market';
import { ALL_ASSETS } from '../data/marketData';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  onRemoveFromWatchlist: (symbol: string) => void;
  onSelectAsset: (asset: MarketAsset) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  onRemoveFromWatchlist,
  onSelectAsset,
}) => {
  if (!isOpen) return null;

  const watchlistedAssets = ALL_ASSETS.filter((a) =>
    watchlistSymbols.includes(a.symbol)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#e0e3eb] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#f0f3fa] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-base font-bold text-[#131722]">My Watchlist</h2>
              <span className="text-xs bg-[#f0f3fa] text-[#787b86] font-mono px-2 py-0.5 rounded-full">
                {watchlistedAssets.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#787b86] hover:text-[#131722] rounded-lg hover:bg-[#f0f3fa]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f0f3fa] p-3">
            {watchlistedAssets.length === 0 ? (
              <div className="py-16 text-center text-[#787b86] px-6">
                <Star className="w-12 h-12 text-[#e0e3eb] mx-auto mb-3" />
                <p className="font-semibold text-sm text-[#131722]">Your watchlist is empty</p>
                <p className="text-xs mt-1 text-[#787b86] leading-relaxed">
                  Star any stock, crypto token, forex pair, or index on the overview page to track them in real-time here.
                </p>
              </div>
            ) : (
              watchlistedAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;
                return (
                  <div
                    key={asset.symbol}
                    className="p-3 rounded-xl hover:bg-[#f8f9fd] transition-colors flex items-center justify-between group cursor-pointer"
                    onClick={() => {
                      onSelectAsset(asset);
                      onClose();
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722] group-hover:text-[#2962ff]">
                          {asset.symbol}
                        </span>
                        <span className="text-xs text-[#787b86] truncate max-w-[120px]">
                          {asset.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#787b86]">{asset.exchange}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
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
                          {isPositive ? '+' : ''}
                          {asset.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFromWatchlist(asset.symbol);
                        }}
                        className="p-1 text-[#787b86] hover:text-[#f23645] opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#f8f9fd] border-t border-[#f0f3fa] text-xs text-[#787b86] flex items-center justify-between">
            <span>TradingView Simulated Portfolio</span>
            <button
              onClick={onClose}
              className="font-semibold text-[#2962ff] hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
