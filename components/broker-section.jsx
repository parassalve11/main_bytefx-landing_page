'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { broker } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';

export default function BrokerSection() {
  const rail = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const interaction = useRef({ focused: false, until: 0 });
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const loopWidth = useCallback(() => {
    const el = rail.current;
    if (!el || !el.children[broker.cards.length]) return 0;
    return el.children[broker.cards.length].offsetLeft - el.children[0].offsetLeft;
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el || reducedMotion) return undefined;
    let frame = 0;
    let previous = 0;
    let position = el.scrollLeft;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(el);
    const animate = (time) => {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      const state = interaction.current;
      if (visible && !document.hidden && !state.focused && !drag.current.active && time > state.until) {
        const width = loopWidth();
        if (width > 0) {
          position = (position + delta * 0.034) % width;
          el.scrollLeft = position;
        }
      } else {
        position = el.scrollLeft;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [reducedMotion, loopWidth]);

  const hold = () => { interaction.current.until = performance.now() + 5000; };
  const step = (direction) => {
    const el = rail.current;
    if (!el) return;
    hold();
    const width = el.querySelector('.stat').getBoundingClientRect().width + 16;
    if (direction < 0 && el.scrollLeft < width && !reducedMotion) el.scrollLeft += loopWidth();
    el.scrollBy({ left: direction * width, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  const onPointerDown = (event) => {
    hold();
    if (event.pointerType === 'touch') return;
    const el = rail.current;
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (drag.current.active) rail.current.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  };
  const endDrag = (event) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    hold();
    if (rail.current?.hasPointerCapture(event.pointerId)) rail.current.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="band broker-section" id="broker" aria-labelledby="broker-title"
      onFocusCapture={(event) => { if (event.target.matches(':focus-visible')) interaction.current.focused = true; }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interaction.current.focused = false; }}>
      <div className="shell">
        <Reveal className="section-head">
          <span className="chip">{broker.label}</span>
          <h2 className="h-lg" id="broker-title">Trade with a <span className="tint">global broker</span></h2>
          <p className="lede">{broker.lead}</p>
        </Reveal>
      </div>
      <Reveal className="rail-wrap" delay={80}>
        <ul ref={rail} className="rail broker-rail" id="broker-cards" tabIndex={0} aria-label="Broker benefits. Use arrow keys to explore."
          data-dragging={dragging ? 'true' : 'false'} onPointerDown={onPointerDown} onPointerMove={onPointerMove}
          onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag} onTouchStart={hold} onTouchEnd={hold} onWheel={hold}
          onKeyDown={(event) => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); step(event.key === 'ArrowLeft' ? -1 : 1); } }}
          onDragStart={(event) => event.preventDefault()}>
          {[...broker.cards, ...broker.cards].map((card, index) => (
            <li key={`${card.id}-${index}`} className={`stat${index >= broker.cards.length ? ' stat--echo' : ''}`} aria-hidden={index >= broker.cards.length ? 'true' : undefined}>
              <h3>{card.title}</h3>
              <figure data-art={card.lightImage ? 'framed' : undefined}>
                <Image src={card.image} className="stat__art--dark" alt={card.alt} width={768} height={768} sizes="(max-width: 760px) 70vw, 292px" draggable={false} />
                <Image src={card.lightImage ?? `/assets/broker/sculptures/blue/${card.id}.webp`} className="stat__art--light" alt={card.alt.replaceAll('lime', 'blue')} width={768} height={768} sizes="(max-width: 760px) 70vw, 292px" draggable={false} />
              </figure>
              <p className="stat__value">{card.value}</p><p className="stat__note">{card.note}</p>
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="shell"><div className="rail-hint">
        <Icon name="drag" size={17} /><span>Drag to explore</span>
        <div className="rail-nav">
          <button type="button" onClick={() => step(-1)} aria-label="Previous broker card" aria-controls="broker-cards"><Icon name="back" size={16} /></button>
          <button type="button" onClick={() => step(1)} aria-label="Next broker card" aria-controls="broker-cards"><Icon name="arrow" size={16} /></button>
        </div>
      </div></div>
    </section>
  );
}
