import { rateCodes } from '@/lib/instruments';

/* Reference rates for the currency converter and trading calculator.

   Primary source: Coinbase's public exchange-rate endpoint (no key), which
   covers fiat, crypto and gold/silver in one response, as "units per 1 USD".
   Fallback: open.er-api.com (fiat only, updated daily).

   Upstream calls are cached for 60 seconds on the server and the response is
   cached at the edge for the same time, so visitor traffic never reaches the
   upstream services directly. To use ByteFX's own price feed instead, replace
   `fetchPrimary` and keep the same response shape. */

export const dynamic = 'force-dynamic';

const TTL = 60;

async function fetchPrimary() {
  const res = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD', { next: { revalidate: TTL } });
  if (!res.ok) throw new Error(`primary ${res.status}`);
  const body = await res.json();
  const raw = body?.data?.rates;
  if (!raw) throw new Error('primary: no rates');
  const date = Date.parse(res.headers.get('date') || '');
  return { rates: raw, updatedAt: Number.isFinite(date) ? new Date(date).toISOString() : new Date().toISOString(), source: 'Coinbase' };
}

async function fetchFallback() {
  const res = await fetch('https://open.er-api.com/v6/latest/USD', { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`fallback ${res.status}`);
  const body = await res.json();
  if (body?.result !== 'success' || !body.rates) throw new Error('fallback: no rates');
  return { rates: body.rates, updatedAt: new Date(body.time_last_update_unix * 1000).toISOString(), source: 'ExchangeRate-API' };
}

function pick(raw) {
  const rates = { USD: 1 };
  for (const code of rateCodes) {
    const value = Number(raw[code]);
    if (Number.isFinite(value) && value > 0) rates[code] = value;
  }
  return rates;
}

export async function GET() {
  for (const load of [fetchPrimary, fetchFallback]) {
    try {
      const { rates, updatedAt, source } = await load();
      return Response.json(
        { base: 'USD', rates: pick(rates), updatedAt, source },
        { headers: { 'Cache-Control': `public, s-maxage=${TTL}, stale-while-revalidate=300` } },
      );
    } catch {
      /* try the next source */
    }
  }
  return Response.json({ error: 'Exchange rates are unavailable right now.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}
