import React from 'react';
import { MarketAsset } from '../types/market';

interface CommoditiesForexSectionProps {
  commodities: MarketAsset[];
  forexPairs: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onExploreCommodities: () => void;
  onExploreForex: () => void;
  flashSymbols: Record<string, 'up' | 'down'>;
}

export const CommoditiesForexSection: React.FC<CommoditiesForexSectionProps> = ({
  commodities,
  forexPairs,
  onSelectAsset,
  onExploreCommodities,
  onExploreForex,
  flashSymbols,
}) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Futures and Commodities Card */}
        <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f3fa]">
            <div>
              <h2 className="text-lg font-bold text-[#131722]">Futures &amp; commodities</h2>
              <p className="text-xs text-[#787b86]">Energy, metals and softs</p>
            </div>
            <button
              onClick={onExploreCommodities}
              className="text-xs font-semibold text-[#2962ff] hover:underline"
            >
              Explore
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {commodities.slice(0, 6).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashSymbols[item.symbol];

              return (
                <div
                  key={item.symbol}
                  onClick={() => onSelectAsset(item)}
                  className={`p-3 bg-[#f8f9fd] hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer border border-transparent hover:border-[#e0e3eb] ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div className="text-xs font-bold text-[#131722] hover:text-[#2962ff] truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#787b86] truncate">
                    {item.symbol} · {item.exchange}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[#131722] tabular-nums">
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.decimals ?? 2,
                      maximumFractionDigits: item.decimals ?? 2,
                    })}
                  </div>
                  <div
                    className={`text-xs font-medium tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Forex Major Pairs Card */}
        <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f3fa]">
            <div>
              <h2 className="text-lg font-bold text-[#131722]">Forex &amp; currencies</h2>
              <p className="text-xs text-[#787b86]">World currency exchanges and rates</p>
            </div>
            <button
              onClick={onExploreForex}
              className="text-xs font-semibold text-[#2962ff] hover:underline"
            >
              Explore
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {forexPairs.slice(0, 6).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashSymbols[item.symbol];

              return (
                <div
                  key={item.symbol}
                  onClick={() => onSelectAsset(item)}
                  className={`p-3 bg-[#f8f9fd] hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer border border-transparent hover:border-[#e0e3eb] ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div className="text-xs font-bold text-[#131722] hover:text-[#2962ff] truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#787b86] truncate">
                    {item.exchange}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[#131722] tabular-nums">
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.decimals ?? 4,
                      maximumFractionDigits: item.decimals ?? 4,
                    })}
                  </div>
                  <div
                    className={`text-xs font-medium tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
