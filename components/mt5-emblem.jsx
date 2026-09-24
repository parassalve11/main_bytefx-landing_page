'use client';

import Image from 'next/image';
import { useRef } from 'react';

const SRC = '/assets/platforms/mt5/emblem.webp';
const SIZES = '(max-width: 760px) 85vw, (max-width: 980px) 480px, (max-width: 1600px) 44vw, 680px';

/* The emblem tilts toward the pointer and catches the light on its glass,
   then settles back when the pointer leaves. A tap does the same once. */
export default function Mt5Emblem() {
  const root = useRef(null);
  const frame = useRef(0);
  const point = useRef({ x: 0.5, y: 0.5 });

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* One sweep of light each time the pointer arrives, or on a tap. */
  const shine = () => {
    const el = root.current;
    if (!el || reduced()) return;
    el.dataset.shine = 'false';
    void el.offsetWidth;
    el.dataset.shine = 'true';
  };

  return (
    <figure
      ref={root}
      className="mt5-art"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') shine(); }}
      onPointerMove={(event) => { if (event.pointerType === 'mouse') track(event); }}
      onPointerLeave={release}
      onPointerDown={(event) => { if (event.pointerType !== 'mouse') shine(); }}
    >
      <div className="mt5-art__tilt">
        <Image src={SRC} alt="Glossy green, gold and blue MetaTrader 5 emblem with a gold 5" width={1600} height={1600} sizes={SIZES} />
        <span className="mt5-art__glare" aria-hidden="true" />
        <span className="mt5-art__sheen" aria-hidden="true" />
      </div>
      <div className="mt5-art__reflection" aria-hidden="true">
        <Image src={SRC} alt="" width={1600} height={1600} sizes={SIZES} />
      </div>
    </figure>
  );
}
