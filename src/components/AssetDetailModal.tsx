import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Maximize2,
  Share2,
  Clock,
  Layers,
  Activity,
} from 'lucide-react';
import { MarketAsset, Timeframe, ChartType, CandleDataPoint } from '../types/market';
import { generateCandleData } from '../data/marketData';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (asset: MarketAsset) => void;
  onOpenInSupercharts: (asset: MarketAsset) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  onOpenInSupercharts,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [hoveredPoint, setHoveredPoint] = useState<CandleDataPoint | null>(null);
  const [showIndicators, setShowIndicators] = useState(true);

  // Generate deterministic candle data for selected asset + timeframe
  const candles = useMemo(() => {
    if (!asset) return [];
    return generateCandleData(asset.price, timeframe, asset.changePercent >= 0);
  }, [asset, timeframe]);

  if (!asset) return null;

  const isPositive = asset.changePercent >= 0;
  const currentPrice = hoveredPoint ? hoveredPoint.close : asset.price;
  const priceDecimals = asset.decimals ?? 2;

  // Chart dimensions & calculations
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map((c) => c.volume));

  const chartWidth = 720;
  const chartHeight = 280;
  const paddingBottom = 40;
  const plotHeight = chartHeight - paddingBottom;

  // Generate SVG path for line/area
  const points = candles.map((c, i) => {
    const x = (i / (candles.length - 1)) * chartWidth;
    const y = plotHeight - ((c.close - minPrice) / priceRange) * (plotHeight - 20) - 10;
    return { x, y, point: c };
  });

  const linePath = points.reduce(
    (acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ''
  );

  const areaPath = `${linePath} L ${chartWidth} ${plotHeight} L 0 ${plotHeight} Z`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#f0f3fa] flex items-center justify-between gap-4 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f0f3fa] flex items-center justify-center font-bold text-sm text-[#131722] border border-[#e0e3eb]">
              {asset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#131722] tracking-tight">{asset.symbol}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f0f3fa] text-[#787b86]">
                  {asset.exchange}
                </span>
                {asset.sector && (
                  <span className="hidden sm:inline text-xs text-[#787b86]">· {asset.sector}</span>
                )}
              </div>
              <p className="text-xs text-[#787b86]">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(asset)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                isWatchlisted
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-white text-[#131722] border-[#e0e3eb] hover:bg-[#f8f9fd]'
              }`}
            >
              <Star
                className={`w-4 h-4 ${isWatchlisted ? 'text-amber-500 fill-amber-500' : 'text-[#787b86]'}`}
              />
              <span>{isWatchlisted ? 'In Watchlist' : 'Watchlist'}</span>
            </button>

            <button
              onClick={() => {
                onOpenInSupercharts(asset);
                onClose();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#2962ff] bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Supercharts</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] rounded-xl transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Price & Summary Banner */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-2">
            <div>
              <div className="text-3xl font-extrabold text-[#131722] tracking-tight tabular-nums">
                {currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: priceDecimals,
                  maximumFractionDigits: priceDecimals,
                })}
                <span className="text-xs font-normal text-[#787b86] ml-2">USD</span>
              </div>
              <div
                className={`text-sm font-semibold tabular-nums flex items-center gap-1.5 mt-0.5 ${
                  isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>
                  {isPositive ? '+' : ''}
                  {asset.change.toFixed(priceDecimals)} ({isPositive ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%)
                </span>
                <span className="text-xs text-[#787b86] font-normal">Today</span>
              </div>
            </div>

            {/* Timeframe & Chart Style Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex p-1 bg-[#f0f3fa] rounded-xl border border-[#e0e3eb]">
                {(['1D', '5D', '1M', '6M', 'YTD', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      timeframe === tf
                        ? 'bg-white text-[#131722] shadow-xs'
                        : 'text-[#787b86] hover:text-[#131722]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="inline-flex p-1 bg-[#f0f3fa] rounded-xl border border-[#e0e3eb]">
                <button
                  onClick={() => setChartType('area')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    chartType === 'area'
                      ? 'bg-white text-[#2962ff] shadow-xs'
                      : 'text-[#787b86] hover:text-[#131722]'
                  }`}
                  title="Area chart"
                >
                  <Activity className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('candles')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    chartType === 'candles'
                      ? 'bg-white text-[#2962ff] shadow-xs'
                      : 'text-[#787b86] hover:text-[#131722]'
                  }`}
                  title="Candlestick chart"
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="bg-[#f8f9fd] rounded-2xl border border-[#e0e3eb] p-4 relative select-none">
            {hoveredPoint && (
              <div className="absolute top-3 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm border border-[#e0e3eb] text-xs flex items-center gap-3 z-10">
                <span className="font-semibold text-[#131722]">{hoveredPoint.time}</span>
                <span className="text-[#787b86]">
                  O: <b className="text-[#131722]">{hoveredPoint.open.toFixed(priceDecimals)}</b>
                </span>
                <span className="text-[#787b86]">
                  H: <b className="text-[#089981]">{hoveredPoint.high.toFixed(priceDecimals)}</b>
                </span>
                <span className="text-[#787b86]">
                  L: <b className="text-[#f23645]">{hoveredPoint.low.toFixed(priceDecimals)}</b>
                </span>
                <span className="text-[#787b86]">
                  C: <b className="text-[#131722]">{hoveredPoint.close.toFixed(priceDecimals)}</b>
                </span>
              </div>
            )}

            <svg
              className="w-full h-64 overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="detailGradientGreen" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#089981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#089981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="detailGradientRed" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f23645" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f23645" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                const y = plotHeight * ratio;
                const priceAtY = maxPrice - ratio * priceRange;
                return (
                  <g key={ratio}>
                    <line
                      x1="0"
                      y1={y}
                      x2={chartWidth}
                      y2={y}
                      stroke="#e0e3eb"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={chartWidth - 5}
                      y={y - 4}
                      fill="#787b86"
                      fontSize="9"
                      textAnchor="end"
                      className="font-mono tabular-nums"
                    >
                      {priceAtY.toFixed(priceDecimals)}
                    </text>
                  </g>
                );
              })}

              {/* Volume histogram bars at the bottom */}
              {candles.map((c, i) => {
                const barWidth = Math.max(3, (chartWidth / candles.length) * 0.6);
                const x = (i / (candles.length - 1)) * chartWidth - barWidth / 2;
                const barHeight = (c.volume / maxVolume) * 35;
                const y = chartHeight - barHeight;
                const isBarGreen = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={isBarGreen ? '#089981' : '#f23645'}
                    opacity="0.3"
                  />
                );
              })}

              {/* Area Chart Mode */}
              {chartType === 'area' && (
                <>
                  <path
                    d={areaPath}
                    fill={isPositive ? 'url(#detailGradientGreen)' : 'url(#detailGradientRed)'}
                  />
                  <path
                    d={linePath}
                    stroke={isPositive ? '#089981' : '#f23645'}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Candlestick Chart Mode */}
              {chartType === 'candles' &&
                candles.map((c, i) => {
                  const candleWidth = Math.max(4, (chartWidth / candles.length) * 0.65);
                  const x = (i / (candles.length - 1)) * chartWidth;
                  const candleGreen = c.close >= c.open;
                  const top = Math.max(c.open, c.close);
                  const bottom = Math.min(c.open, c.close);
                  const yTop = plotHeight - ((top - minPrice) / priceRange) * (plotHeight - 20) - 10;
                  const yBottom = plotHeight - ((bottom - minPrice) / priceRange) * (plotHeight - 20) - 10;
                  const yHigh = plotHeight - ((c.high - minPrice) / priceRange) * (plotHeight - 20) - 10;
                  const yLow = plotHeight - ((c.low - minPrice) / priceRange) * (plotHeight - 20) - 10;

                  return (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={candleGreen ? '#089981' : '#f23645'}
                        strokeWidth="1.2"
                      />
                      {/* Body */}
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

              {/* Transparent hover detector columns */}
              {candles.map((c, i) => {
                const colWidth = chartWidth / candles.length;
                const x = i * colWidth;
                return (
                  <rect
                    key={`hover-${i}`}
                    x={x}
                    y={0}
                    width={colWidth}
                    height={chartHeight}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredPoint(c)}
                  />
                );
              })}
            </svg>

            {/* Time labels under chart */}
            <div className="flex justify-between text-[10px] text-[#787b86] mt-2 font-mono">
              <span>{candles[0]?.time}</span>
              <span>{candles[Math.floor(candles.length / 2)]?.time}</span>
              <span>{candles[candles.length - 1]?.time}</span>
            </div>
          </div>

          {/* Technical Summary Meter & Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Analysis Gauge */}
            <div className="bg-[#f8f9fd] rounded-2xl p-4 border border-[#e0e3eb]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#131722]">Technical Rating</span>
                <span className="text-[11px] text-[#787b86]">Based on 24 indicators</span>
              </div>

              <div className="text-center py-2">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    asset.technicalRating === 'Strong Buy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : asset.technicalRating === 'Buy'
                      ? 'bg-teal-100 text-teal-800'
                      : asset.technicalRating === 'Sell'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {asset.technicalRating || 'Neutral'}
                </div>
              </div>

              {/* Gauge Segmented Track */}
              <div className="mt-3 grid grid-cols-5 gap-1 text-[10px] text-center font-medium">
                <div className="py-1 rounded bg-rose-200 text-rose-800">Strong Sell</div>
                <div className="py-1 rounded bg-rose-100 text-rose-700">Sell</div>
                <div className="py-1 rounded bg-slate-200 text-slate-700">Neutral</div>
                <div className="py-1 rounded bg-emerald-100 text-emerald-700">Buy</div>
                <div className="py-1 rounded bg-emerald-200 text-emerald-900 font-bold">Strong Buy</div>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-[#787b86]">
                <div className="flex justify-between">
                  <span>RSI (14)</span>
                  <span className="font-mono text-[#131722]">58.4 (Neutral)</span>
                </div>
                <div className="flex justify-between">
                  <span>MACD (12, 26)</span>
                  <span className="font-mono text-[#089981]">1.42 (Bullish)</span>
                </div>
                <div className="flex justify-between">
                  <span>200-day SMA</span>
                  <span className="font-mono text-[#089981]">Above (Trend Up)</span>
                </div>
              </div>
            </div>

            {/* Key Statistics Grid */}
            <div className="md:col-span-2 bg-[#f8f9fd] rounded-2xl p-4 border border-[#e0e3eb]">
              <div className="text-xs font-bold text-[#131722] mb-3">Key Statistics</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4 text-xs">
                <div>
                  <div className="text-[#787b86]">Day Range</div>
                  <div className="font-semibold text-[#131722] font-mono tabular-nums">
                    {(asset.low24h ?? asset.price * 0.99).toFixed(priceDecimals)} -{' '}
                    {(asset.high24h ?? asset.price * 1.01).toFixed(priceDecimals)}
                  </div>
                </div>

                <div>
                  <div className="text-[#787b86]">Market Cap</div>
                  <div className="font-semibold text-[#131722] font-mono tabular-nums">
                    {asset.marketCap || 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="text-[#787b86]">Volume</div>
                  <div className="font-semibold text-[#131722] font-mono tabular-nums">
                    {asset.volume || '14.2M'}
                  </div>
                </div>

                <div>
                  <div className="text-[#787b86]">P/E Ratio</div>
                  <div className="font-semibold text-[#131722] font-mono tabular-nums">
                    {asset.peRatio ? `${asset.peRatio}x` : 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="text-[#787b86]">Dividend Yield</div>
                  <div className="font-semibold text-[#131722] font-mono tabular-nums">
                    {asset.divYield || 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="text-[#787b86]">Category</div>
                  <div className="font-semibold text-[#131722] capitalize">
                    {asset.category.replace('-', ' ')}
                  </div>
                </div>
              </div>

              {/* Description */}
              {asset.description && (
                <div className="mt-4 pt-3 border-t border-[#e0e3eb] text-xs text-[#787b86] leading-relaxed">
                  {asset.description}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 bg-[#f8f9fd] border-t border-[#f0f3fa] flex items-center justify-between text-xs text-[#787b86]">
          <span>Exchange: {asset.exchange} · Real-time simulation feed</span>
          <button
            onClick={() => {
              onOpenInSupercharts(asset);
              onClose();
            }}
            className="font-semibold text-[#2962ff] hover:underline"
          >
            Launch full screen chart →
          </button>
        </div>
      </div>
    </div>
  );
};
