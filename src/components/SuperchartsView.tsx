import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BarChart2,
  TrendingUp,
  Activity,
  Layers,
  Camera,
  Share2,
  Sliders,
  Settings,
  Plus,
  Maximize2,
  Minimize2,
  Search,
  Minus,
  Edit3,
} from 'lucide-react';
import { MarketAsset, Timeframe } from '../types/market';
import { ALL_ASSETS, generateCandleData } from '../data/marketData';

interface SuperchartsViewProps {
  selectedAsset: MarketAsset;
  onSelectAsset: (asset: MarketAsset) => void;
  onBackToOverview: () => void;
  onOpenSearch: () => void;
}

export const SuperchartsView: React.FC<SuperchartsViewProps> = ({
  selectedAsset,
  onSelectAsset,
  onBackToOverview,
  onOpenSearch,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartStyle, setChartStyle] = useState<'candles' | 'line' | 'area'>('candles');
  const [activeTool, setActiveTool] = useState<string>('cursor');
  const [showRSI, setShowRSI] = useState(true);
  const [showMA, setShowMA] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  const candles = useMemo(() => {
    return generateCandleData(
      selectedAsset.price,
      timeframe,
      selectedAsset.changePercent >= 0
    );
  }, [selectedAsset, timeframe]);

  const isPositive = selectedAsset.changePercent >= 0;
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;

  const chartWidth = 900;
  const chartHeight = 440;
  const plotHeight = 350;

  return (
    <div className="min-h-screen bg-[#131722] text-[#d1d4dc] flex flex-col font-sans select-none">
      {/* Supercharts Top Bar */}
      <div className="h-12 border-b border-[#2a2e39] bg-[#1e222d] px-3 flex items-center justify-between gap-3 text-xs">
        {/* Left actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToOverview}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#2a2e39] hover:bg-[#363a45] text-white transition-colors"
            title="Return to Markets Overview"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold">Markets</span>
          </button>

          {/* Symbol Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2a2e39] hover:bg-[#363a45] text-white font-bold transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-[#787b86]" />
            <span>{selectedAsset.symbol}</span>
            <span className="text-[#787b86] font-normal">{selectedAsset.exchange}</span>
          </button>

          {/* Price & Change Pill */}
          <div className="hidden sm:flex items-center gap-2 font-mono tabular-nums px-2">
            <span className="font-bold text-white text-sm">
              {selectedAsset.price.toLocaleString(undefined, {
                minimumFractionDigits: selectedAsset.decimals ?? 2,
                maximumFractionDigits: selectedAsset.decimals ?? 2,
              })}
            </span>
            <span
              className={`font-semibold ${
                isPositive ? 'text-[#089981]' : 'text-[#f23645]'
              }`}
            >
              {isPositive ? '+' : ''}
              {selectedAsset.changePercent.toFixed(2)}%
            </span>
          </div>

          <div className="h-5 w-[1px] bg-[#2a2e39] mx-1 hidden md:block"></div>

          {/* Timeframe Bar */}
          <div className="hidden md:flex items-center gap-0.5">
            {(['1D', '5D', '1M', '6M', 'YTD', '1Y'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-[#2962ff] text-white font-bold'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="h-5 w-[1px] bg-[#2a2e39] mx-1 hidden lg:block"></div>

          {/* Chart Style Toggles */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setChartStyle('candles')}
              className={`p-1.5 rounded transition-colors ${
                chartStyle === 'candles' ? 'bg-[#2962ff] text-white' : 'text-[#787b86] hover:text-white'
              }`}
              title="Candlestick"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartStyle('area')}
              className={`p-1.5 rounded transition-colors ${
                chartStyle === 'area' ? 'bg-[#2962ff] text-white' : 'text-[#787b86] hover:text-white'
              }`}
              title="Area"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Indicator toggles */}
          <div className="hidden xl:flex items-center gap-1 ml-2">
            <button
              onClick={() => setShowMA(!showMA)}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                showMA ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-[#787b86]'
              }`}
            >
              MA (20)
            </button>
            <button
              onClick={() => setShowRSI(!showRSI)}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                showRSI ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-[#787b86]'
              }`}
            >
              RSI (14)
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Saved chart template for ${selectedAsset.symbol}`)}
            className="px-3 py-1.5 bg-[#2962ff] hover:bg-[#1e53e5] text-white font-semibold rounded transition-colors"
          >
            Save Layout
          </button>
        </div>
      </div>

      {/* Main Workspace: Left tools + Canvas + Right Watchlist */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawing Tools Sidebar */}
        <div className="w-12 border-r border-[#2a2e39] bg-[#1e222d] flex flex-col items-center py-3 gap-3 shrink-0">
          {[
            { id: 'cursor', label: 'Crosshair', icon: Sliders },
            { id: 'trendline', label: 'Trend Line', icon: TrendingUp },
            { id: 'text', label: 'Annotate', icon: Edit3 },
            { id: 'indicators', label: 'Indicators', icon: Layers },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-2 rounded-lg transition-colors ${
                  activeTool === tool.id
                    ? 'bg-[#2962ff] text-white'
                    : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                }`}
                title={tool.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Main Chart Area */}
        <div className="flex-1 flex flex-col bg-[#131722] p-4 relative overflow-hidden">
          {/* Top Info Overlay */}
          <div className="flex items-center justify-between text-xs text-[#787b86] mb-2 font-mono">
            <div>
              <span className="text-white font-bold mr-2">{selectedAsset.symbol}</span>
              <span>{timeframe}</span>
              <span className="mx-2">·</span>
              <span>O: {candles[candles.length - 1]?.open}</span>
              <span className="mx-2">H: {candles[candles.length - 1]?.high}</span>
              <span className="mx-2">L: {candles[candles.length - 1]?.low}</span>
              <span className="mx-2">C: {candles[candles.length - 1]?.close}</span>
            </div>
            <div className="flex items-center gap-3">
              {showMA && <span className="text-amber-400">MA 20: {(selectedAsset.price * 0.992).toFixed(2)}</span>}
              {showRSI && <span className="text-purple-400">RSI 14: 61.2</span>}
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="flex-1 relative flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Background Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                const y = plotHeight * ratio;
                const price = maxPrice - ratio * priceRange;
                return (
                  <g key={ratio}>
                    <line
                      x1="0"
                      y1={y}
                      x2={chartWidth}
                      y2={y}
                      stroke="#2a2e39"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <text
                      x={chartWidth - 10}
                      y={y - 4}
                      fill="#787b86"
                      fontSize="10"
                      textAnchor="end"
                      className="font-mono tabular-nums"
                    >
                      {price.toFixed(selectedAsset.decimals ?? 2)}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars */}
              {candles.map((c, i) => {
                const barWidth = Math.max(3, (chartWidth / candles.length) * 0.65);
                const x = (i / (candles.length - 1)) * chartWidth - barWidth / 2;
                const isGreen = c.close >= c.open;
                const h = (c.volume / 100000) * 40;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x}
                    y={plotHeight - h}
                    width={barWidth}
                    height={h}
                    fill={isGreen ? '#089981' : '#f23645'}
                    opacity="0.25"
                  />
                );
              })}

              {/* Candlesticks */}
              {chartStyle === 'candles' &&
                candles.map((c, i) => {
                  const candleWidth = Math.max(4, (chartWidth / candles.length) * 0.65);
                  const x = (i / (candles.length - 1)) * chartWidth;
                  const candleGreen = c.close >= c.open;
                  const top = Math.max(c.open, c.close);
                  const bottom = Math.min(c.open, c.close);
                  const yTop = plotHeight - ((top - minPrice) / priceRange) * (plotHeight - 30) - 15;
                  const yBottom = plotHeight - ((bottom - minPrice) / priceRange) * (plotHeight - 30) - 15;
                  const yHigh = plotHeight - ((c.high - minPrice) / priceRange) * (plotHeight - 30) - 15;
                  const yLow = plotHeight - ((c.low - minPrice) / priceRange) * (plotHeight - 30) - 15;

                  return (
                    <g key={`candle-${i}`}>
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={candleGreen ? '#089981' : '#f23645'}
                        strokeWidth="1.2"
                      />
                      <rect
                        x={x - candleWidth / 2}
                        y={yTop}
                        width={candleWidth}
                        height={Math.max(2, yBottom - yTop)}
                        fill={candleGreen ? '#089981' : '#f23645'}
                        rx="1"
                      />
                    </g>
                  );
                })}

              {/* Area / Line Chart */}
              {(chartStyle === 'area' || chartStyle === 'line') && (
                <path
                  d={candles.reduce(
                    (acc, c, i) => {
                      const x = (i / (candles.length - 1)) * chartWidth;
                      const y = plotHeight - ((c.close - minPrice) / priceRange) * (plotHeight - 30) - 15;
                      return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                    },
                    ''
                  )}
                  stroke="#2962ff"
                  strokeWidth="2"
                  fill="none"
                />
              )}

              {/* Moving Average Line Overlay */}
              {showMA && (
                <path
                  d={candles.reduce((acc, c, i) => {
                    const x = (i / (candles.length - 1)) * chartWidth;
                    const smoothedPrice = c.close * (1 + Math.sin(i * 0.2) * 0.004);
                    const y = plotHeight - ((smoothedPrice - minPrice) / priceRange) * (plotHeight - 30) - 15;
                    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 2"
                />
              )}

              {/* RSI Sub-plot at bottom */}
              {showRSI && (
                <g transform={`translate(0, ${plotHeight + 10})`}>
                  <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#2a2e39" />
                  <line x1="0" y1="40" x2={chartWidth} y2="40" stroke="#2a2e39" strokeDasharray="2 2" />
                  <text x="5" y="15" fill="#a855f7" fontSize="9" className="font-mono">
                    RSI (14): 61.2
                  </text>
                  <path
                    d={candles.reduce((acc, c, i) => {
                      const x = (i / (candles.length - 1)) * chartWidth;
                      const rsiVal = 50 + Math.sin(i * 0.3) * 20;
                      const y = 50 - (rsiVal / 100) * 45;
                      return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                    }, '')}
                    stroke="#a855f7"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right Quick Asset Switcher Sidebar */}
        <div className="w-64 border-l border-[#2a2e39] bg-[#1e222d] hidden lg:flex flex-col">
          <div className="p-3 border-b border-[#2a2e39] font-bold text-xs text-white flex items-center justify-between">
            <span>Watchlist &amp; Movers</span>
            <span className="text-[#787b86] text-[10px]">REAL-TIME</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]">
            {ALL_ASSETS.slice(0, 10).map((asset) => {
              const active = asset.symbol === selectedAsset.symbol;
              const pos = asset.changePercent >= 0;
              return (
                <button
                  key={asset.symbol}
                  onClick={() => onSelectAsset(asset)}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                    active ? 'bg-[#2962ff]/20 text-white' : 'hover:bg-[#2a2e39] text-[#d1d4dc]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{asset.symbol}</div>
                    <div className="text-[10px] text-[#787b86] truncate max-w-[100px]">{asset.name}</div>
                  </div>
                  <div className="text-right font-mono tabular-nums text-xs">
                    <div>
                      {asset.price.toLocaleString(undefined, {
                        minimumFractionDigits: asset.decimals ?? 2,
                        maximumFractionDigits: asset.decimals ?? 2,
                      })}
                    </div>
                    <div className={`text-[10px] ${pos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {pos ? '+' : ''}
                      {asset.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
