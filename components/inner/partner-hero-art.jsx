'use client';

import Image from 'next/image';
import { useRef } from 'react';

export default function PartnerHeroArt({ src, light, alt }) {
  const frame = useRef(null);
  const reset = () => {
    frame.current?.style.setProperty('--art-x', '0deg');
    frame.current?.style.setProperty('--art-y', '0deg');
  };
  const move = (event) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    frame.current.style.setProperty('--art-x', ((0.5 - (event.clientY - rect.top) / rect.height) * 10).toFixed(2) + 'deg');
    frame.current.style.setProperty('--art-y', (((event.clientX - rect.left) / rect.width - 0.5) * 14).toFixed(2) + 'deg');
  };
  return <a href="#benefits" className="partner-hero-art" aria-label="Explore ByteFX partnership benefits" onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
    <span className="partner-hero-art__halo" aria-hidden="true" />
    <span className="partner-hero-art__orbit" aria-hidden="true" />
    <span className="partner-hero-art__object" ref={frame}>
      <Image className="theme-art--dark" src={src} alt={alt} width={1312} height={1199} sizes="(max-width: 760px) 88vw, 46vw" priority />
      <Image className="theme-art--light" src={light} alt={alt} width={1312} height={1199} sizes="(max-width: 760px) 88vw, 46vw" priority />
    </span>
    <span className="partner-hero-art__caption">Your network. Shared growth.<span aria-hidden="true">↗</span></span>
  </a>;
}
