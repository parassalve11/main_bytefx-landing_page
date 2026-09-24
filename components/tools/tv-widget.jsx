'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

/* A TradingView embed (https://www.tradingview.com/widget-docs/) that follows
   the site theme. The theme lives on <html data-theme>; when it changes the
   widget is rebuilt with the matching colorTheme. The background is
   transparent, so the widget takes the surface it sits on.

   TradingView's free widgets require their attribution link, kept below. */
const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
const readTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

export default function TvWidget({ widget, config, height = 480, label, className = '' }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark');
  const host = useRef(null);
  const settings = JSON.stringify(config);

  useEffect(() => {
    const box = host.current;
    const slot = document.createElement('div');
    slot.className = 'tradingview-widget-container__widget';
    const script = document.createElement('script');
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widget}.js`;
    script.async = true;
    script.type = 'text/javascript';
    script.text = JSON.stringify({ ...JSON.parse(settings), colorTheme: theme, isTransparent: true, locale: 'en', width: '100%', height: '100%' });
    box.replaceChildren(slot, script);
    return () => box.replaceChildren();
  }, [widget, settings, theme]);

  return (
    <div className={`tv-frame ${className}`.trim()}>
      <div className="tv-frame__body" style={{ height }}>
        <p className="tv-frame__loading" aria-hidden="true">Loading live data…</p>
        <div className="tradingview-widget-container" ref={host} role="region" aria-label={label} />
      </div>
      <p className="tv-frame__credit">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">Market data by TradingView</a>
      </p>
    </div>
  );
}

