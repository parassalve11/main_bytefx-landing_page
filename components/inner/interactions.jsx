'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { accounts } from '@/lib/accounts';
import SmartLink from '@/components/smart-link';
import { SectionHead } from './page-kit';

export function StickySubnav({ items }) {
  const [active, setActive] = useState(items[0][0]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = Math.max(160, window.innerHeight * 0.28);
      let current = items[0][0];
      for (const [id] of items) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items]);
  return <nav className="inner-subnav" aria-label="On this page"><div className="shell">{items.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</div></nav>;
}
export function AccountFinder() {
  const [experience, setExperience] = useState('new');
  const [deposit, setDeposit] = useState('starter');
  const [volume, setVolume] = useState('occasional');
  const [standard, pro, custom] = accounts;
  const recommendation = experience === 'experienced' && volume === 'high' ? custom : experience === 'experienced' && deposit === 'growth' ? pro : standard;
  const fields = [
    ['Experience', experience, setExperience, [['new', 'I’m getting started'], ['experienced', 'I already trade']]],
    ['Starting deposit', deposit, setDeposit, [['starter', '$20 – $1,999'], ['growth', '$2,000 or more']]],
    ['How often you trade', volume, setVolume, [['occasional', 'A few trades a week'], ['active', 'Every trading day'], ['high', 'High volume or Expert Advisors']]],
  ];
  return <section className="mobile-section inner-color-band" id="find-account"><div className="shell account-finder"><div><p className="eyebrow">Find your account</p><h2 className="h-lg">Your approach.<br />Your starting point.</h2><p className="lede">Three questions to narrow down your account options.</p><div className="finder-fields">{fields.map(([label, value, setter, options]) => <label key={label}>{label}<select value={value} onChange={e => setter(e.target.value)}>{options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>)}</div><p className="inner-note">A guide to the account types, not a suitability assessment or investment advice.</p></div><div className="finder-result" aria-live="polite"><div className="theme-art finder-art" data-paired="true"><Image className="theme-art__dark" src={recommendation.art} alt="" width={768} height={768} sizes="(max-width: 760px) 70vw, 320px" /><Image className="theme-art__light" src={recommendation.lightArt} alt="" width={768} height={768} sizes="(max-width: 760px) 70vw, 320px" /></div><p className="eyebrow">Your account to explore</p><h3>{recommendation.name}</h3><p>{recommendation.summary}</p><div className="finder-actions"><SmartLink className="btn btn--solid" href={recommendation.cta.href}>{recommendation.cta.label}</SmartLink><a className="finder-details" href="#account-options">See the details</a></div></div></div></section>;
}
export function AppTour() {
  const screens = [
    ['Home', '/assets/mobile/bytefx-account.png', 'Your account, at a glance.', 'Check your account and reach your funding controls from one place.'],
    ['Trade', '/assets/mobile/bytefx-chart.png', 'Your next move, in focus.', 'Follow the chart and review order settings before you trade.'],
    ['Competition', null, 'Put your practice to work.', 'Competition screen preview and availability: TBC.'],
    ['Insights', null, 'Keep your perspective.', 'Insights screen preview and available features: TBC.'],
    ['Account', null, 'Keep the essentials close.', 'Account screen preview and available settings: TBC.'],
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const refs = useRef([]);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || reduced.matches) return;
    const timer = setInterval(() => { if (!document.hidden && !reduced.matches) setActive(i => (i + 1) % screens.length); }, 8000);
    return () => clearInterval(timer);
  }, [paused, screens.length]);
  function keyDown(e, i) {
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % screens.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i + screens.length - 1) % screens.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = screens.length - 1;
    else return;
    e.preventDefault(); setActive(next); refs.current[next]?.focus();
  }
  return <section className="band" id="app-tour" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}><div className="shell"><SectionHead eyebrow="Inside the app" title="Less searching." accent="More doing." body="A closer look at the app, using actual ByteFX screens." /><div className="app-tour"><div role="tablist" aria-label="App screens" className="app-tour__tabs">{screens.map(([name], i) => <button ref={el => { refs.current[i] = el; }} type="button" id={`app-tab-${i}`} aria-controls={`app-panel-${i}`} role="tab" aria-selected={active === i} tabIndex={active === i ? 0 : -1} key={name} onClick={() => setActive(i)} onKeyDown={e => keyDown(e, i)}><span>0{i + 1}</span>{name}</button>)}</div>{screens.map(([name, src, title, body], i) => <div role="tabpanel" tabIndex={0} id={`app-panel-${i}`} aria-labelledby={`app-tab-${i}`} key={name} hidden={active !== i} className="app-tour__panel"><div className="tour-phone">{src ? <Image src={src} alt={`ByteFX ${name} screen`} width={1220} height={2712} sizes="260px" /> : <div className="screen-pending"><Image src="/assets/mobile/app-icon.webp" alt="ByteFX" width={72} height={72} /><p>{name}</p><span>Screen preview<br />coming soon</span></div>}</div><div className="app-tour__caption"><p className="eyebrow">{name}</p><h3 className="h-md">{title}</h3><p className="lede">{body}</p></div></div>)}</div></div></section>;
}
export function StoreGallery() {
  const rail = useRef(null);
  return <section className="band"><div className="shell"><div className="gallery-heading"><SectionHead eyebrow="Made for your everyday" title="Take a closer" accent="look." /><div className="inner-actions"><button type="button" className="btn btn--ghost btn--sm" aria-label="Previous app image" onClick={() => rail.current.scrollBy({left:-320, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>←</button><button type="button" className="btn btn--ghost btn--sm" aria-label="Next app image" onClick={() => rail.current.scrollBy({left:320, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>→</button></div></div><div className="store-gallery" ref={rail} tabIndex={0} role="region" aria-label="ByteFX store screenshots">{[1, 2, 3].map(i => <Image key={i} src={`/assets/mobile/store-${i}.webp`} alt={`ByteFX app store preview ${i}`} width={720} height={960} sizes="(max-width: 760px) 75vw, 360px" />)}</div></div></section>;
}
