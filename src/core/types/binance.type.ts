export type Binance24hrTickerType = {
  e: "24hrTicker"; // Event type
  E: number; // Event time (Unix timestamp in milliseconds)
  s: string; // Symbol (e.g., "BTCUSDT")
  p: string; // Price change in the last 24 hours
  P: string; // Price change percentage in the last 24 hours
  w: string; // Weighted average price
  x: string; // Previous day's close price
  c: string; // Last price (used field)
  Q: string; // Last quantity
  b: string; // Best bid price
  B: string; // Best bid quantity
  a: string; // Best ask price
  A: string; // Best ask quantity
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
};
