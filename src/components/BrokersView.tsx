import React from 'react';
import { Star, ShieldCheck, ExternalLink, Check } from 'lucide-react';

interface BrokersViewProps {
  onBackToOverview: () => void;
}

export const BrokersView: React.FC<BrokersViewProps> = ({ onBackToOverview }) => {
  const brokers = [
    {
      name: 'Interactive Brokers',
      rating: 4.9,
      reviews: '12,480 reviews',
      tagline: 'Lowest margin rates, 150+ global exchanges, direct API access.',
      markets: ['Stocks', 'Options', 'Futures', 'Forex', 'Bonds'],
      features: ['Full TradingView integration', 'Tier-1 Regulated', 'Paper trading mode'],
      recommended: true,
    },
    {
      name: 'TradeStation',
      rating: 4.8,
      reviews: '8,210 reviews',
      tagline: 'Award-winning execution speed and algorithmic trading tools.',
      markets: ['Stocks', 'ETFs', 'Futures', 'Crypto'],
      features: ['Instant account sync', 'Commission-free US equities', 'Advanced order types'],
      recommended: false,
    },
    {
      name: 'Alpaca Securities',
      rating: 4.7,
      reviews: '5,600 reviews',
      tagline: 'Developer-first commission-free trading API for automated strategies.',
      markets: ['US Stocks', 'Crypto', 'Fractional Shares'],
      features: ['Pine Script webhook execution', 'Real-time websocket feed', 'Zero commissions'],
      recommended: false,
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pb-6 border-b border-[#f0f3fa]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#787b86] mb-1">
            <button onClick={onBackToOverview} className="hover:text-[#2962ff]">
              Markets
            </button>
            <span>/</span>
            <span className="text-[#131722] font-semibold">Integrated Brokers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131722] tracking-tight">
            Top Rated TradingView Brokers
          </h1>
          <p className="text-xs sm:text-sm text-[#787b86] mt-1">
            Connect your brokerage account directly to trade straight from TradingView charts.
          </p>
        </div>

        <button
          onClick={onBackToOverview}
          className="px-4 py-2 rounded-xl bg-[#f0f3fa] hover:bg-[#e4e7ee] text-xs font-semibold text-[#131722] transition-colors"
        >
          ← Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {brokers.map((broker) => (
          <div
            key={broker.name}
            className={`bg-white rounded-2xl border p-6 shadow-xs flex flex-col justify-between relative ${
              broker.recommended ? 'border-[#2962ff] ring-1 ring-[#2962ff]/30' : 'border-[#e0e3eb]'
            }`}
          >
            {broker.recommended && (
              <span className="absolute -top-3 right-6 bg-[#2962ff] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                BEST OVERALL
              </span>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#131722]">{broker.name}</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-[#131722]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{broker.rating}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#787b86] mt-0.5">{broker.reviews}</p>

              <p className="text-xs text-[#131722] mt-4 leading-relaxed font-medium">
                {broker.tagline}
              </p>

              <div className="mt-4 pt-3 border-t border-[#f0f3fa] space-y-2">
                <div className="text-[11px] font-bold text-[#787b86] uppercase tracking-wide">
                  Supported Assets
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {broker.markets.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-md bg-[#f0f3fa] text-[#131722] text-[11px] font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                {broker.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#787b86]">
                    <Check className="w-3.5 h-3.5 text-[#089981] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert(`Connect broker account for ${broker.name}`)}
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                broker.recommended
                  ? 'bg-[#2962ff] hover:bg-[#1e53e5] text-white shadow-sm'
                  : 'bg-[#f0f3fa] hover:bg-[#e0e3eb] text-[#131722]'
              }`}
            >
              Connect Broker
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
