'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const SRC = '/assets/platforms/mt5/emblem.webp';
const SIZES = '(max-width: 760px) 85vw, (max-width: 980px) 480px, (max-width: 1600px) 44vw, 680px';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The emblem arrives with the section: it rises into place, catches one sweep
   of light, then keeps a slow idle float. Pointer tracking tilts it toward the
   cursor and moves the highlight across the glass; a tap does the sweep once. */
export default function Mt5Emblem() {
  const root = useRef(null);
  const frame = useRef(0);
  const point = useRef({ x: 0.5, y: 0.5 });
  const [shown, setShown] = useState(false);

  /* One sweep of light each time the pointer arrives, on a tap, and once the
     emblem has settled into view. */
  const shine = useCallback(() => {
    const el = root.current;
    if (!el || reduced()) return;
    el.dataset.shine = 'false';
    void el.offsetWidth;
    el.dataset.shine = 'true';
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;

    const arrive = () => {
      setShown(true);
      /* let the rise finish before the light runs across it */
      window.setTimeout(shine, 620);
    };

    if (!('IntersectionObserver' in window)) {
      arrive();
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        arrive();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shine]);

  const paint = () => {
    frame.current = 0;
    const el = root.current;
    if (!el) return;
    const { x, y } = point.current;
    el.style.setProperty('--mt5-rx', `${((0.5 - y) * 16).toFixed(2)}deg`);
    el.style.setProperty('--mt5-ry', `${((x - 0.5) * 20).toFixed(2)}deg`);
    el.style.setProperty('--mt5-gx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--mt5-gy', `${(y * 100).toFixed(1)}%`);
  };

  const track = (event) => {
    const el = root.current;
    if (!el || reduced()) return;
    const rect = el.getBoundingClientRect();
    point.current = {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    };
    el.dataset.engaged = 'true';
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  };

  const release = () => {
    const el = root.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    delete el.dataset.engaged;
    el.style.setProperty('--mt5-rx', '0deg');
    el.style.setProperty('--mt5-ry', '0deg');
  };

  return (
    <figure
      ref={root}
      className="mt5-art"
      data-in={shown ? 'true' : 'false'}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') shine(); }}
      onPointerMove={(event) => { if (event.pointerType === 'mouse') track(event); }}
      onPointerLeave={release}
      onPointerDown={(event) => { if (event.pointerType !== 'mouse') shine(); }}
    >
      <span className="mt5-art__aura" aria-hidden="true" />
      <div className="mt5-art__float">
        <div className="mt5-art__tilt">
          <Image src={SRC} alt="Glossy green, gold and blue MetaTrader 5 emblem with a gold 5" width={1600} height={1600} sizes={SIZES} />
          <span className="mt5-art__glare" aria-hidden="true" />
          <span className="mt5-art__sheen" aria-hidden="true" />
        </div>
      </div>
      <div className="mt5-art__reflection" aria-hidden="true">
        <Image src={SRC} alt="" width={1600} height={1600} sizes={SIZES} />
      </div>
    </figure>
  );
}
