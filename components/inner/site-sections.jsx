import Image from 'next/image';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import SmartLink from '@/components/smart-link';
import { documents, site } from '@/lib/content';
import { Breadcrumbs, SectionHead, ThemeArt } from './page-kit';

/* Compact opener for utility pages (Contact, Legal): no stats row, smaller art. */
export function LeadHero({ page, children, after }) {
  return <section className={`lead-hero lead-hero--${page.id}`}><div className="shell"><Breadcrumbs page={page} /><div className="lead-hero__grid"><Reveal className="lead-hero__copy"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}<br /><span className="tint">{page.accent}</span></h1><p className="lede">{page.description}</p>{children}</Reveal>{page.art && <ThemeArt src={page.art} light={page.lightArt} alt={page.alt} priority sizes="(max-width: 760px) 60vw, 340px" className="lead-hero__art" />}</div>{after && <div className="lead-hero__after">{after}</div>}</div></section>;
}

/* A wide, captioned photograph from the landing page hero. `pos` and
   `mobilePos` keep the subject in frame at 21:9 and at 4:5 on phones. */
export function PhotoBand({ src, alt, eyebrow, title, body, pos = '50% 50%', mobilePos = '50% 50%', caption = 'bottom' }) {
  return <section className="photo-band-wrap"><div className="shell"><Reveal as="figure" className="photo-band" data-caption={caption} style={{ '--pos': pos, '--pos-m': mobilePos }}><Image src={src} alt={alt} fill sizes="(max-width: 1288px) 100vw, 1240px" /><figcaption><p className="eyebrow">{eyebrow}</p><h2 className="h-lg">{title}</h2><p className="lede">{body}</p></figcaption></Reveal></div></section>;
}

/* Icon, title and body cards. `items` is a list of [icon, title, body]. */
export function IconGrid({ items, className = '' }) {
  return <div className={`icon-grid ${className}`.trim()}>{items.map(([icon, title, body], i) => <Reveal as="article" key={title} delay={i * 40} className="icon-card"><span className="icon-card__glyph"><Icon name={icon} size={20} /></span><h3 className="h-sm">{title}</h3><p className="lede">{body}</p></Reveal>)}</div>;
}

const startSteps = [
  ['Sign up', 'Create your trading account in a few clicks with a streamlined registration.'],
  ['Verify', 'Complete fast, secure identity verification — most accounts are verified within 24 hours.'],
  ['Add funds', 'Deposit with your preferred method, from cards to crypto transfers.'],
  ['Start trading', 'Open your first position on MetaTrader 5 with professional-grade tools.'],
];
/* The four-step journey from bytefx.com. It is a real sequence, so it is numbered. */
export function StartSteps({ title = 'Sign up before', accent = 'the next move happens.' }) {
  return <section className="band" id="start"><div className="shell"><SectionHead eyebrow="Four steps to your first trade" title={title} accent={accent} /><ol className="start-steps">{startSteps.map(([name, body], i) => <Reveal as="li" key={name} delay={i * 60}><span className="start-steps__n" aria-hidden="true">{i + 1}</span><h3 className="h-sm">{name}</h3><p className="lede">{body}</p></Reveal>)}</ol><div className="inner-actions"><SmartLink href={site.registerUrl} className="btn btn--solid">Open your account<Icon name="arrow" size={16} /></SmartLink><SmartLink href="/trading/getting-started" className="btn btn--ghost">Read the full guide</SmartLink></div></div></section>;
}

export function DocumentList({ items = documents }) {
  return <ul className="doc-list">{items.map(doc => <li key={doc.id}><a href={doc.href} target="_blank" rel="noopener noreferrer"><span className="doc-list__icon"><Icon name="doc" size={20} /></span><span className="doc-list__text"><strong>{doc.label}</strong><span>{doc.note}</span></span><span className="doc-list__open">PDF <Icon name="download" size={15} /></span></a></li>)}</ul>;
}

export function CompanyFacts() {
  const facts = [['Company', site.legalName], ['Registration no.', site.registrationNumber], ['Registered address', site.registeredAddress], ['Physical address', site.physicalAddress], ['Global support', site.phone], ['Email', site.email]];
  return <dl className="company-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}
