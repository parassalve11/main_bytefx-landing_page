import { findMarket } from '@/lib/pages/markets';

/* Indicative prices for a market page's table: /api/quotes?market=forex

   Symbols come from `rows` in lib/pages/markets.js, never from the request.
   Data: Yahoo Finance's public chart endpoint, one request per symbol,
   cached for 15 seconds on the server and at the edge. If every symbol
   fails the route answers 503 and the page falls back to a TradingView
   board. To use ByteFX's own price feed, replace `fetchQuote` and keep the
   row shape. */

export const dynamic = 'force-dynamic';

const TTL = 15;
const HOSTS = ['https://query1.finance.yahoo.com', 'https://query2.finance.yahoo.com'];
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36', Accept: 'application/json' };

const finite = (value) => (Number.isFinite(value) ? value : null);

async function fetchQuote(symbol) {
  let lastError;
  for (const host of HOSTS) {
    try {
      const res = await fetch(`${host}/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`, { headers: HEADERS, next: { revalidate: TTL } });
      if (!res.ok) throw new Error(`${res.status}`);
      const body = await res.json();
      const result = body?.chart?.result?.[0];
      const meta = result?.meta;
      const price = finite(meta?.regularMarketPrice);
      if (price === null) throw new Error('no price');
      const previous = finite(meta.chartPreviousClose) ?? finite(meta.previousClose);
      const bars = result.indicators?.quote?.[0] || {};
      const highs = (bars.high || []).filter(Number.isFinite);
      const lows = (bars.low || []).filter(Number.isFinite);
      const high = finite(meta.regularMarketDayHigh) ?? (highs.length ? Math.max(...highs) : null);
      const low = finite(meta.regularMarketDayLow) ?? (lows.length ? Math.min(...lows) : null);
      return {
        price,
        change: previous === null ? null : price - previous,
        changePct: previous ? ((price - previous) / previous) * 100 : null,
        high: high === null ? null : Math.max(high, price),
        low: low === null ? null : Math.min(low, price),
        time: finite(meta.regularMarketTime),
      };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

export async function GET(request) {
  const market = findMarket(new URL(request.url).searchParams.get('market'));
  if (!market) return Response.json({ error: 'Unknown market.' }, { status: 404 });

  const settled = await Promise.allSettled(market.rows.map(([, , yahoo]) => fetchQuote(yahoo)));
  const rows = settled.map((item) => (item.status === 'fulfilled' ? item.value : null));
  if (rows.every((row) => row === null)) {
    return Response.json({ error: 'Prices are unavailable right now.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  const latest = Math.max(...rows.map((row) => row?.time || 0));
  return Response.json(
    { market: market.id, source: 'Yahoo Finance', updatedAt: latest ? new Date(latest * 1000).toISOString() : new Date().toISOString(), rows },
    { headers: { 'Cache-Control': `public, s-maxage=${TTL}, stale-while-revalidate=60` } },
  );
}
