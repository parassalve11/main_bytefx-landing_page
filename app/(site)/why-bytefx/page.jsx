import Image from 'next/image';
import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import SmartLink from '@/components/smart-link';
import { PageHero, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { IconGrid, PhotoBand, StartSteps } from '@/components/inner/site-sections';
import { accounts } from '@/lib/accounts';
import { site } from '@/lib/content';
import { mt5Downloads, reasons, whyPage as page, withdrawalSpeeds } from '@/lib/pages/company';

export const metadata = pageMetadata(page);

export default function WhyPage() {
  return <main id="main" className="inner-page why-page">
    <PageSchema page={page} />
    <PageHero page={page} />
    <section className="band" id="reasons"><div className="shell">
      <SectionHead eyebrow="Six reasons" title="Why traders" accent="choose ByteFX." />
      <IconGrid items={reasons} />
    </div></section>
    <PhotoBand src="/assets/hero/hero-precious-metals.webp" alt="A fine gold bar and silver bars wrapped in a flowing ribbon of gold" eyebrow="Gold and silver" title="Trade the metals that move markets." body="Access spot gold and silver alongside the most-watched currency pairs, with tight spreads and fast execution." pos="50% 50%" mobilePos="82% 50%" />
    <section className="mobile-section inner-color-band" id="platform"><div className="shell inner-split">
      <div>
        <p className="eyebrow">MetaTrader 5</p>
        <h2 className="h-lg">One platform.<br />Every device.</h2>
        <p className="lede">Multi-asset trading on MetaTrader 5, with advanced charting, multiple order types and a wide range of analytical tools. Expert Advisors and automated strategies are fully supported.</p>
        <ul className="download-pills" aria-label="Download MetaTrader 5">{mt5Downloads.map(([icon, name, href]) => <li key={name}><a href={href} rel="noopener noreferrer"><Icon name={icon} size={16} />{name}</a></li>)}</ul>
      </div>
      <Image className="band-art" src="/assets/platforms/mt5/emblem.webp" alt="MetaTrader 5 emblem" width={1100} height={1100} sizes="(max-width: 760px) 70vw, 460px" />
    </div></section>
    <section className="band" id="accounts"><div className="shell">
      <SectionHead eyebrow="Three accounts" title="Start small." accent="Scale when you’re ready." />
      <div className="mini-accounts">{accounts.map((account, i) => <Reveal as="article" key={account.id} delay={i * 60} className="mini-account" data-featured={Boolean(account.tag) || undefined}><h3 className="h-sm">{account.name}</h3><p className="mini-account__price">{account.deposit ? <><strong>${account.deposit.toLocaleString('en-US')}</strong> min. deposit</> : <><strong>Tailored</strong> to your volume</>}</p><p className="lede">{account.summary}</p><SmartLink href="/trading/account-types#account-options" className="guide-tutorial">See {account.name} <span aria-hidden="true">↗</span></SmartLink></Reveal>)}</div>
    </div></section>
    <section className="band" id="withdrawals"><div className="shell inner-split">
      <SectionHead eyebrow="Payments" title="Your money," accent="on the move." body="Convenient deposits and withdrawals, supported by automated, audited processes. Withdrawal times by method:" />
      <ul className="speed-list">{withdrawalSpeeds.map(([logo, name, time]) => <li key={name}><span className="payment-mark"><Image src={`/assets/payments/${logo}.svg`} alt="" width={72} height={44} /></span><strong>{name}</strong><span>{time}</span></li>)}</ul>
    </div></section>
    <StartSteps />
    <ClosingSection title="Better conditions." accent="Built for your strategy." lead="Open your ByteFX account in minutes, from $20." primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Compare accounts', href: '/trading/account-types' }} />
  </main>;
}
