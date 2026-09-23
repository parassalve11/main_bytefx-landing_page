'use client';

import { useEffect, useRef } from 'react';

/* Fixed values prevent hydration drift. Denser beams retain the original soft, staggered background. */
const trails = Array.from({ length: 32 }, (_, index) => ({
  '--trail-x': `${(index / 31) * 100}%`,
  '--trail-top': `${Math.round(12 + Math.sin(index * 1.7) * 8)}%`,
  '--trail-height': `${64 + (index * 7) % 25}%`,
  '--trail-opacity': 0.16 + (index % 5) * 0.11,
  '--trail-delay': `${index * 35}ms`,
}));

export default function PlatformLights() {
  const lights = useRef(null);
  useEffect(() => {
    const element = lights.current;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.illuminated = String(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(element.closest('section'));
    return () => observer.disconnect();
  }, []);
  return <div ref={lights} className="platform-lights" aria-hidden="true">
    {['left', 'center', 'right'].map(group => <div className={`platform-lights__group platform-lights__group--${group}`} key={group}>
      {trails.map((style, index) => <span className="platform-lights__trail" style={style} key={index} />)}
    </div>)}
  </div>;
}
