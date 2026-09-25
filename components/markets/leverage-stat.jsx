'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET = 2000;
const RUN = 1500;
/* Rounded while it climbs so the digits read as a dial, not as noise. */
const step = (value) => (value >= TARGET ? TARGET : Math.max(1, Math.round(value / 25) * 25));
const ease = (t) => 1 - (1 - t) ** 3;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The leverage is the whole point of this card, so it counts up to 1:2000 the
   first time the card is reached, fills a scale as it goes, and runs again on
   hover or a tap. The real figure is always in the accessibility tree. */
export default function LeverageStat({ note }) {
  const root = useRef(null);
  const frame = useRef(0);
  const started = useRef(false);
  /* Rendered at its real value, so the figure is right before (and without)
     JavaScript; the count only rewinds once the animation can run. */
  const [shown, setShown] = useState(TARGET);

  const run = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (reduced()) {
      setShown(TARGET);
      return;
    }
    const from = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - from) / RUN);
      setShown(step(ease(progress) * TARGET));
      frame.current = progress < 1 ? requestAnimationFrame(tick) : 0;
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return undefined;
    setShown(1);

    const start = () => {
      if (started.current) return;
      started.current = true;
      run();
    };

    if (!('IntersectionObserver' in window)) {
      start();
      return () => cancelAnimationFrame(frame.current);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [run]);

  const fill = `${((shown / TARGET) * 100).toFixed(2)}%`;

  return (
    <div
      ref={root}
      className="mk-cta__stat leverage"
      style={{ '--fill': fill }}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') run(); }}
      onPointerDown={(event) => { if (event.pointerType !== 'mouse') run(); }}
    >
      <strong className="leverage__value">
        <span className="leverage__count" aria-hidden="true">1:{shown}</span>
        <span className="sr-only">Leverage up to 1:2000</span>
      </strong>
      <span className="leverage__scale" aria-hidden="true"><i /></span>
      <span className="leverage__note">{note}</span>
    </div>
  );
}
