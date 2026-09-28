import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface IndicesRowProps {
  indices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onExploreAllIndices: () => void;
  flashSymbols: Record<string, 'up' | 'down'>;
}

export const IndicesRow: React.FC<IndicesRowProps> = ({
  indices,
  onSelectAsset,
  onExploreAllIndices,
  flashSymbols,
}) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExploreAllIndices}
          className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight text-[#131722] hover:text-[#2962ff] transition-colors group cursor-pointer text-left"
        >
          <span>Indices</span>
          <ChevronRight className="w-5 h-5 stroke-[2.5] mt-0.5 text-[#131722] group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-transform" />
        </button>
        <div className="text-xs text-[#787b86] font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#089981]"></span>
          <span>Regular market hours</span>
        </div>
      </div>

      {/* Top Major Indices Card Slider/Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {indices.map((index) => {
          const isPositive = index.changePercent >= 0;
          const flash = flashSymbols[index.symbol];

          // Badge background mapping based on user screenshot/html
          let badgeBg = 'bg-[#f23645]'; // default red
          if (index.badgeColor === 'cyan') badgeBg = 'bg-[#00bcd4]';
          if (index.badgeColor === 'blue') badgeBg = 'bg-[#0089ff]';

          return (
            <div
              key={index.symbol}
              onClick={() => onSelectAsset(index)}
              className={`p-4 bg-[#f8f9fd] hover:bg-slate-100 rounded-2xl border border-transparent hover:border-[#e0e3eb] transition duration-200 cursor-pointer shadow-xs ${
                flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${badgeBg} text-white text-[11px] font-bold flex items-center justify-center shadow-xs shrink-0`}
                  >
                    {index.badgeLabel || index.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#131722] hover:text-[#2962ff] transition-colors">
                      {index.name}
                    </div>
                    <div className="text-xs text-[#787b86]">
                      {index.symbol} · {index.exchange}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold tracking-tight text-[#131722] tabular-nums">
                    {index.price.toLocaleString(undefined, {
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
                    {index.changePercent.toFixed(2)}% ({isPositive ? '+' : ''}
                    {index.change.toFixed(2)})
                  </div>
                </div>
              </div>

              {/* Sparkline SVG */}
              <div className="mt-3 h-10 w-full overflow-hidden">
                {isPositive ? (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 240 40" preserveAspectRatio="none">
                    <path
                      d="M0 32 L30 28 L60 30 L90 20 L120 22 L150 14 L180 18 L210 8 L240 5"
                      stroke="#089981"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M0 32 L30 28 L60 30 L90 20 L120 22 L150 14 L180 18 L210 8 L240 5 V 40 H 0 Z"
                      fill="url(#greenGradient)"
                      opacity="0.12"
                    />
                    <defs>
                      <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#089981" />
                        <stop offset="100%" stopColor="#089981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 240 40" preserveAspectRatio="none">
                    <path
                      d="M0 8 L40 12 L80 10 L120 22 L160 18 L200 32 L240 34"
                      stroke="#f23645"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M0 8 L40 12 L80 10 L120 22 L160 18 L200 32 L240 34 V 40 H 0 Z"
                      fill="url(#redGradient)"
                      opacity="0.12"
                    />
                    <defs>
                      <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f23645" />
                        <stop offset="100%" stopColor="#f23645" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
