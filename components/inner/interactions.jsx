'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { accounts } from '@/lib/accounts';
import SmartLink from '@/components/smart-link';
import { SectionHead } from './page-kit';
import IPhonePreview from './iphone-preview';

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
  return <section className="mobile-section inner-color-band account-finder-section" id="find-account"><div className="shell">
    <div className="finder-heading"><p className="eyebrow">Find your account</p><h2 className="h-lg">Your approach.<br />Your starting point.</h2><p className="lede">A few details about how you trade. A clearer place to begin.</p></div>
    <div className="account-finder"><div className="finder-fields">
      {fields.map(([label, value, setter, options], index) => <fieldset key={label}><legend><span>0{index + 1}</span>{label}</legend><div className="finder-options">{options.map(([key, text]) => <label key={key} data-selected={value === key}><input type="radio" name={`finder-${index}`} value={key} checked={value === key} onChange={() => setter(key)} /><span>{text}</span></label>)}</div></fieldset>)}
      <p className="inner-note">A guide to the account types, not a suitability assessment or investment advice.</p>
    </div><div className="finder-result"><Image className="finder-new-art" src="/assets/generated/account-paths.webp" alt="Three crystal account cards on ascending silver steps" width={1100} height={1100} sizes="(max-width: 760px) 80vw, 400px" />
      <div className="finder-result__copy" aria-live="polite" aria-atomic="true"><p className="eyebrow">Your account to explore</p><h3>{recommendation.name}</h3><p>{recommendation.summary}</p><dl className="finder-specs"><div><dt>Starting deposit</dt><dd>{recommendation.deposit ? `$${recommendation.deposit.toLocaleString('en-US')}` : 'Tailored'}</dd></div><div><dt>Spread from</dt><dd>{recommendation.id === 'standard' ? '1.9' : recommendation.id === 'pro' ? '1.0' : '0.0'} pips</dd></div></dl></div>
      <div className="finder-actions"><SmartLink className="btn btn--solid" href={recommendation.cta.href}>{recommendation.cta.label}</SmartLink><a className="finder-details" href="#account-options">Compare all account details ↗</a></div>
    </div></div>
  </div></section>;
}
const tourScreens = [
  ['Home', '/assets/mobile/bytefx-account.png', 'Your account, at a glance.', 'Your balance, your accounts and your funding controls. All together, ready when you are.'],
  ['Trade', '/assets/mobile/bytefx-chart.png', 'Your next move, in focus.', 'Follow the chart, review your order and keep your trading plan close.'],
  ['Tournaments', '/assets/mobile/tournaments-screen.png', 'Your skill sets the pace.', 'Explore ByteFX trading tournaments, see the prize pool and find your next challenge.'],
];
export function AppTour() {
  const [active, setActive] = useState(0);
  const steps = useRef([]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.58;
      let current = 0;
      steps.current.forEach((step, index) => { if (step && step.getBoundingClientRect().top <= marker) current = index; });
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  return <section className="band app-scroll-tour" id="app-tour"><div className="shell">
    <SectionHead eyebrow="Inside the app" title="Less searching." accent="More doing." body="Scroll to explore your trading day, from the first glance to the next challenge." />
    <div className="app-scroll-layout">
      <div className="app-scroll-stage">
        <div className="app-scroll-orbit" aria-hidden="true" />
        <IPhonePreview>{tourScreens.map(([name, src], index) => <div className="iphone-screen-slide" data-active={active === index} aria-hidden={active !== index} key={name}><Image src={src} alt={'ByteFX ' + name + ' screen'} fill sizes="(max-width: 760px) 190px, 285px" /></div>)}</IPhonePreview>
        <nav className="app-scroll-dots" aria-label="App tour screens">{tourScreens.map(([name], index) => <a key={name} href={'#tour-step-' + index} aria-label={'Explore ' + name} aria-current={active === index ? 'step' : undefined}><span /></a>)}</nav>
        <p className="app-scroll-hint">Scroll to discover <span aria-hidden="true">↓</span></p>
      </div>
      <div className="app-scroll-stories">{tourScreens.map(([name, , title, body], index) => <article ref={element => { steps.current[index] = element; }} id={'tour-step-' + index} className="app-scroll-step" data-active={active === index} key={name}><span className="app-scroll-number">0{index + 1} / 03</span><p className="eyebrow">{name}</p><h3 className="h-lg">{title}</h3><p className="lede">{body}</p><span className="app-scroll-rule" aria-hidden="true" /></article>)}</div>
    </div>
  </div></section>;
}
export function StoreGallery() {
  const rail = useRef(null);
  return <section className="band"><div className="shell"><div className="gallery-heading"><SectionHead eyebrow="Made for your everyday" title="Take a closer" accent="look." /><div className="inner-actions"><button type="button" className="btn btn--ghost btn--sm" aria-label="Previous app image" onClick={() => rail.current.scrollBy({left:-320, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>←</button><button type="button" className="btn btn--ghost btn--sm" aria-label="Next app image" onClick={() => rail.current.scrollBy({left:320, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>→</button></div></div><div className="store-gallery" ref={rail} tabIndex={0} role="region" aria-label="ByteFX store screenshots">{[1, 2, 3].map(i => <Image key={i} src={`/assets/mobile/store-${i}.webp`} alt={`ByteFX app store preview ${i}`} width={720} height={960} sizes="(max-width: 760px) 75vw, 360px" />)}</div></div></section>;
}
