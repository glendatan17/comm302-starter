import React, { useState } from 'react';
import { Search, ArrowUpDown, Filter, ChevronRight, Star } from 'lucide-react';
import { MarketAsset, MarketCategory } from '../types/market';
import { ALL_ASSETS } from '../data/marketData';

interface ScreenerViewProps {
  onSelectAsset: (asset: MarketAsset) => void;
  onBackToOverview: () => void;
  watchlist: string[];
  onToggleWatchlist: (asset: MarketAsset) => void;
}

export const ScreenerView: React.FC<ScreenerViewProps> = ({
  onSelectAsset,
  onBackToOverview,
  watchlist,
  onToggleWatchlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'symbol' | 'price' | 'changePercent'>('changePercent');
  const [sortAsc, setSortAsc] = useState(false);

  const categories = [
    { id: 'all', label: 'All Markets' },
    { id: 'us-stocks', label: 'US Stocks' },
    { id: 'world-stocks', label: 'World Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures & Commodities' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds-gov', label: 'Bonds' },
  ];

  const filteredAssets = ALL_ASSETS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    let diff = 0;
    if (sortField === 'symbol') diff = a.symbol.localeCompare(b.symbol);
    if (sortField === 'price') diff = a.price - b.price;
    if (sortField === 'changePercent') diff = a.changePercent - b.changePercent;
    return sortAsc ? diff : -diff;
  });

  const toggleSort = (field: 'symbol' | 'price' | 'changePercent') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#f0f3fa]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#787b86] mb-1">
            <button onClick={onBackToOverview} className="hover:text-[#2962ff]">
              Markets
            </button>
            <span>/</span>
            <span className="text-[#131722] font-semibold">Screener</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131722] tracking-tight">
            Market Screener
          </h1>
          <p className="text-xs sm:text-sm text-[#787b86] mt-1">
            Scan and filter global equities, cryptocurrencies, indices, and currency pairs.
          </p>
        </div>

        <button
          onClick={onBackToOverview}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-[#f0f3fa] hover:bg-[#e4e7ee] text-xs font-semibold text-[#131722] transition-colors"
        >
          ← Back to Overview
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'bg-[#f0f3fa] text-[#131722] hover:bg-[#e0e3eb]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#787b86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter symbols..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#f8f9fd] border border-[#e0e3eb] rounded-xl text-xs text-[#131722] placeholder:text-[#787b86] outline-none focus:border-[#2962ff]"
          />
        </div>
      </div>

      {/* Screener Data Table */}
      <div className="mt-6 bg-white rounded-2xl border border-[#e0e3eb] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#f0f3fa] bg-[#f8f9fd] text-[#787b86] font-semibold">
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4 cursor-pointer hover:text-[#131722]" onClick={() => toggleSort('symbol')}>
                  <div className="flex items-center gap-1">
                    <span>Ticker &amp; Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Exchange</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]" onClick={() => toggleSort('price')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Last Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]" onClick={() => toggleSort('changePercent')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">Vol / Market Cap</th>
                <th className="py-3 px-4 text-center hidden md:table-cell">Technical Rating</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f3fa]">
              {filteredAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;
                const isSaved = watchlist.includes(asset.symbol);

                return (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-[#f8f9fd] transition-colors cursor-pointer group"
                    onClick={() => onSelectAsset(asset)}
                  >
                    <td
                      className="py-3 px-4 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(asset);
                      }}
                    >
                      <button className="text-[#787b86] hover:text-amber-500">
                        <Star className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722] group-hover:text-[#2962ff]">
                          {asset.symbol}
                        </span>
                        <span className="text-[#787b86] truncate max-w-[140px] sm:max-w-[200px]">
                          {asset.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#787b86] font-mono text-[11px]">
                      {asset.exchange}
                    </td>

                    <td className="py-3 px-4 text-right font-semibold text-[#131722] font-mono tabular-nums">
                      {asset.price.toLocaleString(undefined, {
                        minimumFractionDigits: asset.decimals ?? 2,
                        maximumFractionDigits: asset.decimals ?? 2,
                      })}
                    </td>

                    <td
                      className={`py-3 px-4 text-right font-semibold font-mono tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {asset.changePercent.toFixed(2)}%
                    </td>

                    <td className="py-3 px-4 text-right text-[#787b86] font-mono tabular-nums hidden sm:table-cell">
                      {asset.marketCap || asset.volume || '—'}
                    </td>

                    <td className="py-3 px-4 text-center hidden md:table-cell">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          asset.technicalRating === 'Strong Buy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : asset.technicalRating === 'Buy'
                            ? 'bg-teal-100 text-teal-800'
                            : asset.technicalRating === 'Sell'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {asset.technicalRating || 'Neutral'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <ChevronRight className="w-4 h-4 text-[#787b86] inline-block group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-transform" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
