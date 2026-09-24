'use client';

import { useEffect, useRef, useState } from 'react';
import SmartLink from '@/components/smart-link';
import TvWidget from '@/components/tools/tv-widget';
import { quoteGroups } from '@/components/tools/tv-config';

const EVERY = 15000;
const fixed = (value, digits) => value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const signed = (value, digits) => `${value > 0 ? '+' : value < 0 ? '−' : ''}${fixed(Math.abs(value), digits)}`;

/* Live table for a market page. Rows come from /api/quotes and refresh every
   15 seconds while the tab is visible. A price that moves flashes once in
   the direction of the move. If the feed is down on first load, a
   TradingView board with the same symbols takes its place. */
export default function PriceTable({ market, name, rows, quotes, tradeHref }) {
  const [state, setState] = useState({ status: 'loading', data: null, updatedAt: null });
  const [ticks, setTicks] = useState({});
  const last = useRef(null);

  useEffect(() => {
    let alive = true;
    let clear = 0;
    const load = async () => {
      try {
        const res = await fetch(`/api/quotes?market=${market}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const body = await res.json();
        if (!alive) return;
        const moved = {};
        body.rows.forEach((row, i) => {
          const before = last.current?.[i]?.price;
          if (row && Number.isFinite(before) && row.price !== before) moved[i] = row.price > before ? 'up' : 'down';
        });
        last.current = body.rows;
        setState({ status: 'ready', data: body.rows, updatedAt: body.updatedAt });
        if (Object.keys(moved).length) {
          setTicks(moved);
          window.clearTimeout(clear);
          clear = window.setTimeout(() => alive && setTicks({}), 900);
        }
      } catch {
        if (alive) setState((prev) => ({ ...prev, status: prev.data ? 'stale' : 'error' }));
      }
    };
    load();
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') load(); }, EVERY);
    return () => { alive = false; window.clearInterval(timer); window.clearTimeout(clear); };
  }, [market]);

  if (state.status === 'error') {
    return (
      <div className="mk-table-card mk-table-card--fallback">
        <TvWidget widget="market-quotes" height={Math.min(560, 96 + rows.length * 52)} label={`${name} prices`} config={{ symbolsGroups: quoteGroups([{ name, quotes }]), showSymbolLogo: true }} />
      </div>
    );
  }

  const time = state.updatedAt ? new Date(state.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  return (
    <div className="mk-table-card">
      <div className="mk-table-scroll">
        <table className="mk-table" aria-busy={state.status === 'loading'}>
          <caption className="sr-only">Indicative {name.toLowerCase()} prices</caption>
          <thead>
            <tr><th scope="col">Symbol</th><th scope="col">Price</th><th scope="col">Change</th><th scope="col" className="mk-col-range">Day range</th><th scope="col" className="mk-trade"><span className="sr-only">Trade</span></th></tr>
          </thead>
          <tbody>
            {rows.map(([label, detail, , , digits], i) => {
              const row = state.data?.[i];
              const dir = !row?.change ? 'flat' : row.change > 0 ? 'up' : 'down';
              const span = row && row.high !== null && row.low !== null ? row.high - row.low : null;
              const pos = span ? Math.min(1, Math.max(0, (row.price - row.low) / span)) : 0.5;
              return (
                <tr key={label}>
                  <th scope="row"><strong>{label}</strong><span>{detail}</span></th>
                  <td className="mk-price" data-tick={ticks[i]}>{row ? fixed(row.price, digits) : state.status === 'loading' ? <span className="mk-skeleton" aria-label="Loading" /> : <span aria-label="Unavailable">—</span>}</td>
                  <td className="mk-change" data-dir={dir}>
                    {row && row.change !== null ? <><span aria-hidden="true">{dir === 'up' ? '▲' : dir === 'down' ? '▼' : '•'}</span> {signed(row.changePct, 2)}%<small>{signed(row.change, digits)}</small></> : row || state.status !== 'loading' ? '—' : <span className="mk-skeleton mk-skeleton--sm" />}
                  </td>
                  <td className="mk-col-range">
                    {row && span !== null ? (
                      <div className="mk-range" aria-label={`Day range ${fixed(row.low, digits)} to ${fixed(row.high, digits)}`}>
                        <span>{fixed(row.low, digits)}</span><i style={{ '--pos': `${(pos * 100).toFixed(1)}%` }} /><span>{fixed(row.high, digits)}</span>
                      </div>
                    ) : '—'}
                  </td>
                  <td className="mk-trade"><SmartLink className="btn btn--ghost btn--sm" href={tradeHref} aria-label={`Trade ${label}`}>Trade</SmartLink></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mk-table-status" data-status={state.status}>
        {state.status === 'stale' ? 'Showing the last prices we received. ' : ''}
        {time ? `Last update ${time}. ` : ''}Indicative prices from Yahoo Finance, refreshed every 15 seconds. Not our dealing prices; commodity and energy rows use futures prices.
      </p>
    </div>
  );
}
