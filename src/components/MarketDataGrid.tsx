import React from 'react';
import { MarketAsset } from '../types/market';

interface MarketDataGridProps {
  worldIndices: MarketAsset[];
  volumeStocks: MarketAsset[];
  cryptoRankings: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onExploreSection: (section: 'indices' | 'stocks' | 'crypto') => void;
  flashSymbols: Record<string, 'up' | 'down'>;
}

export const MarketDataGrid: React.FC<MarketDataGridProps> = ({
  worldIndices,
  volumeStocks,
  cryptoRankings,
  onSelectAsset,
  onExploreSection,
  flashSymbols,
}) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Column 1: World Indices */}
      <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f3fa]">
            <div>
              <h2 className="text-lg font-bold text-[#131722]">World indices</h2>
              <p className="text-xs text-[#787b86]">Major global benchmark performances</p>
            </div>
            <button
              onClick={() => onExploreSection('indices')}
              className="text-xs font-semibold text-[#2962ff] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="divide-y divide-[#f0f3fa] mt-2">
            {worldIndices.slice(0, 6).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashSymbols[item.symbol];

              return (
                <div
                  key={item.symbol}
                  onClick={() => onSelectAsset(item)}
                  className={`py-2.5 px-1.5 -mx-1.5 rounded-lg flex items-center justify-between hover:bg-[#f8f9fd] transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#131722] hover:text-[#2962ff]">
                        {item.symbol}
                      </span>
                      <span className="text-[11px] text-[#787b86]">{item.name}</span>
                    </div>
                    <div className="text-[11px] text-[#787b86]">{item.exchange}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold tabular-nums text-[#131722]">
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
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
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => onExploreSection('indices')}
          className="mt-4 block w-full text-center text-xs font-medium text-[#787b86] hover:text-[#2962ff] pt-2 border-t border-[#f0f3fa] transition-colors"
        >
          See all major indices →
        </button>
      </div>

      {/* Column 2: Highest Volume Stocks */}
      <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f3fa]">
            <div>
              <h2 className="text-lg font-bold text-[#131722]">Highest volume stocks</h2>
              <p className="text-xs text-[#787b86]">Most actively traded equities today</p>
            </div>
            <button
              onClick={() => onExploreSection('stocks')}
              className="text-xs font-semibold text-[#2962ff] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="divide-y divide-[#f0f3fa] mt-2">
            {volumeStocks.slice(0, 6).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashSymbols[item.symbol];

              return (
                <div
                  key={item.symbol}
                  onClick={() => onSelectAsset(item)}
                  className={`py-2.5 px-1.5 -mx-1.5 rounded-lg flex items-center justify-between hover:bg-[#f8f9fd] transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#131722] hover:text-[#2962ff]">
                        {item.symbol}
                      </span>
                      <span className="text-[11px] text-[#787b86]">{item.name}</span>
                    </div>
                    <div className="text-[11px] text-[#787b86]">{item.volume}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold tabular-nums text-[#131722]">
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
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
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => onExploreSection('stocks')}
          className="mt-4 block w-full text-center text-xs font-medium text-[#787b86] hover:text-[#2962ff] pt-2 border-t border-[#f0f3fa] transition-colors"
        >
          See all active stocks →
        </button>
      </div>

      {/* Column 3: Crypto Market Overview */}
      <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f3fa]">
            <div>
              <h2 className="text-lg font-bold text-[#131722]">Crypto rankings</h2>
              <p className="text-xs text-[#787b86]">Top digital assets by market cap</p>
            </div>
            <button
              onClick={() => onExploreSection('crypto')}
              className="text-xs font-semibold text-[#2962ff] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="divide-y divide-[#f0f3fa] mt-2">
            {cryptoRankings.slice(0, 6).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashSymbols[item.symbol];

              return (
                <div
                  key={item.symbol}
                  onClick={() => onSelectAsset(item)}
                  className={`py-2.5 px-1.5 -mx-1.5 rounded-lg flex items-center justify-between hover:bg-[#f8f9fd] transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#131722] hover:text-[#2962ff]">
                        {item.symbol}
                      </span>
                      <span className="text-[11px] text-[#787b86]">{item.name}</span>
                    </div>
                    <div className="text-[11px] text-[#787b86]">{item.marketCap}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold tabular-nums text-[#131722]">
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
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => onExploreSection('crypto')}
          className="mt-4 block w-full text-center text-xs font-medium text-[#787b86] hover:text-[#2962ff] pt-2 border-t border-[#f0f3fa] transition-colors"
        >
          See all coins →
        </button>
      </div>
    </section>
  );
};
