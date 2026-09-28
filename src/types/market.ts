export type MarketCategory =
  | 'us-stocks'
  | 'world-stocks'
  | 'crypto'
  | 'futures'
  | 'forex'
  | 'bonds-gov'
  | 'bonds-corp'
  | 'etfs'
  | 'economy';

export type MarketRegion =
  | 'everywhere'
  | 'us'
  | 'europe'
  | 'asia'
  | 'americas'
  | 'emerging';

export type TechnicalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface MarketAsset {
  symbol: string;
  name: string;
  category: MarketCategory;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  sparkline?: number[];
  badgeLabel?: string;
  badgeColor?: 'red' | 'blue' | 'cyan' | 'green';
  currency?: string;
  decimals?: number;
  high24h?: number;
  low24h?: number;
  peRatio?: number;
  divYield?: string;
  technicalRating?: TechnicalRating;
  description?: string;
  sector?: string;
}

export interface CandleDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';
export type ChartType = 'area' | 'candles' | 'line';
export type ActiveTab = 'markets' | 'supercharts' | 'screener' | 'community' | 'brokers';
