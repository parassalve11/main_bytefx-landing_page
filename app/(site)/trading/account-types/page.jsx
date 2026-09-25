import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import AccountPlans from '@/components/inner/account-plans';
import { PageHero, PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { AccountFinder, StickySubnav } from '@/components/inner/interactions';
import { site } from '@/lib/content';
import { accountPage as page } from '@/lib/pages/account-types';

export const metadata = pageMetadata(page);
const sections = [['account-options', 'The accounts'], ['find-account', 'Find your fit'], ['included', 'Essentials']];
const included = [
  ['shield', 'Swap-free support', 'Available on Standard and Custom accounts.'],
  ['chart', 'MetaTrader 5 everywhere', 'Windows, macOS, iOS, Android and the web, with Expert Advisors supported.'],
  ['layers', 'Start from 0.01 lots', 'The same minimum trade size on Standard, Pro and Custom.'],
  ['bolt', 'Around 20 ms execution', 'Fast market fills. In very volatile markets, some slippage can still occur.'],
  ['wallet', 'Instant crypto withdrawals', 'Crypto and USDT arrive instantly. Cards and Apple Pay take up to 24 hours, bank wire 1–3 days.'],
  ['chat', 'Support 24/6', 'Live chat and email, 24 hours a day, six days a week.'],
];

export default function AccountTypes() {
  return <main id="main" className="inner-page account-types-page">
    <PageSchema page={page} />
    <PageHero page={page} />
    <StickySubnav items={sections} />
    <section className="band" id="account-options"><div className="shell">
      <div className="section-head inner-section-head section-head--center">
        <p className="eyebrow">Three ways to make your move</p>
        <h2 className="h-lg">Same broker<br /><span className="tint">Your kind of trading</span></h2>
        <p className="lede">Choose from three account types designed to suit beginners through to professionals — transparent pricing, robust execution and tailored features.</p>
      </div>
      <AccountPlans />
    </div></section>
    <AccountFinder />
    <section className="band" id="included"><div className="shell">
      <div className="section-head inner-section-head"><h2 className="h-lg">Essentials</h2></div>
      <div className="included-grid">{included.map(([icon, title, body], i) => <Reveal key={title} delay={i * 35}><span className="included-icon"><Icon name={icon} size={18} /></span><h3 className="h-sm">{title}</h3><p className="lede">{body}</p></Reveal>)}</div>
    </div></section>
    <ClosingSection title="Your next move" accent="Your account" lead="Open an account in minutes and start with as little as $20." primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Contact for a custom plan', href: '/contact' }} />
  </main>;
}
