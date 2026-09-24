'use client';

import { useEffect, useState } from 'react';

/* Reference rates from /api/rates ("units per 1 USD"), refreshed every
   minute while the tab is visible. Keeps the last good rates if a refresh
   fails, and reports `stale` so the interface can say so. */
export default function useRates(every = 60000) {
  const [state, setState] = useState({ status: 'loading', rates: null, updatedAt: null, source: null });

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/rates', { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (alive) setState({ status: 'ready', rates: data.rates, updatedAt: data.updatedAt, source: data.source });
      } catch {
        if (alive) setState((prev) => ({ ...prev, status: prev.rates ? 'stale' : 'error' }));
      }
    };
    load();
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') load();
    }, every);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [every]);

  return state;
}

export function updatedLabel({ status, updatedAt, source }) {
  if (status === 'loading') return 'Loading reference rates…';
  if (status === 'error') return 'Rates are unavailable right now. Check your connection and refresh the page.';
  const time = updatedAt ? new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const prefix = status === 'stale' ? 'Showing the last rates we received' : 'Reference rates';
  return `${prefix}${time ? `, updated ${time}` : ''}.${source ? ` Source: ${source}.` : ''}`;
}
