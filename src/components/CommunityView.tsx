import React from 'react';
import { MessageSquare, ThumbsUp, Share2, TrendingUp, Sparkles } from 'lucide-react';

interface CommunityViewProps {
  onBackToOverview: () => void;
  onOpenAssetDetail: (symbol: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onBackToOverview, onOpenAssetDetail }) => {
  const ideas = [
    {
      id: 1,
      author: 'MacroStrategist_Pro',
      time: '2 hours ago',
      title: 'S&P 500: Weekly Cup & Handle Pattern Confirmation',
      symbol: 'SPX',
      sentiment: 'Bullish',
      likes: 342,
      comments: 58,
      content:
        'The SPX is holding steady above the 5,950 support confluence. Strong liquidity into mega-cap tech continues to support broad market strength.',
    },
    {
      id: 2,
      author: 'CryptoWhale_Alpha',
      time: '4 hours ago',
      title: 'Bitcoin: Post-Halving Momentum Targets 100k Benchmark',
      symbol: 'BTCUSD',
      sentiment: 'Bullish',
      likes: 819,
      comments: 142,
      content:
        'Institutional ETF inflow velocity remains resilient. On-chain UTXO accumulation points to minimal selling pressure below $92,000.',
    },
    {
      id: 3,
      author: 'ForexMaster_Quant',
      time: '5 hours ago',
      title: 'EUR/USD: DXY Strength Tests Key Support at 1.0500',
      symbol: 'EURUSD',
      sentiment: 'Bearish',
      likes: 215,
      comments: 31,
      content:
        'ECB interest rate expectations vs Fed pause timeline could keep downward pressure on the Euro heading into the end of month rebalancing.',
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
            <span className="text-[#131722] font-semibold">Community Ideas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131722] tracking-tight">
            Trading Community &amp; Trade Ideas
          </h1>
          <p className="text-xs sm:text-sm text-[#787b86] mt-1">
            Real-time analyses, educational setups, and market perspectives from top traders.
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
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs hover:border-[#2962ff] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#787b86] pb-3 border-b border-[#f0f3fa]">
                <span className="font-semibold text-[#131722]">{idea.author}</span>
                <span>{idea.time}</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#f0f3fa] text-[#131722]">
                  {idea.symbol}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    idea.sentiment === 'Bullish'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {idea.sentiment}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#131722] mt-2.5 leading-snug">{idea.title}</h3>
              <p className="text-xs text-[#787b86] mt-2 line-clamp-3 leading-relaxed">
                {idea.content}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f3fa] flex items-center justify-between text-xs text-[#787b86]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 hover:text-[#131722] cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{idea.likes}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-[#131722] cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{idea.comments}</span>
                </span>
              </div>
              <button
                onClick={() => onOpenAssetDetail(idea.symbol)}
                className="text-[#2962ff] font-semibold hover:underline"
              >
                Inspect Chart →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
