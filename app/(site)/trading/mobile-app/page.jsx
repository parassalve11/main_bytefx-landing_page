import IPhonePreview from '@/components/inner/iphone-preview';
import Image from 'next/image';
import ThemedImage from '@/components/themed-image';
import { artwork } from '@/lib/artwork';
import ClosingSection from '@/components/closing-section';
import MobileSection from '@/components/mobile-section';
import { Breadcrumbs, SectionHead, Actions, PageSchema, ThemeArt, pageMetadata } from '@/components/inner/page-kit';
import { AppTour, StoreGallery } from '@/components/inner/interactions';
import { site } from '@/lib/content';
import { paymentMethods } from '@/lib/payments';
import { mobilePage as page } from '@/lib/pages/mobile-app';

export const metadata = pageMetadata(page);
export default function MobileApp() {
  return <main id="main" className="inner-page">
    <PageSchema page={page} />
    <div className="inner-lead"><div className="shell"><Breadcrumbs page={page} /><h1 className="sr-only">Mobile trading app</h1></div></div>
    {/* The landing page's "Markets In Your Hand" section opens this page. */}
    <MobileSection />
    <AppTour />
    <section className="band"><div className="shell"><SectionHead eyebrow="A little more freedom" title="Your trading day," accent="simplified." /><div className="mobile-feature-grid">
      <article className="tile mobile-feature-main"><div><p className="eyebrow">Chart & trade</p><h3 className="h-md">Stay close to<br />your next move.</h3><p className="lede">Follow the price, read the chart and review your trade in one place.</p></div><IPhonePreview src="/assets/mobile/bytefx-chart.png" alt="Actual ByteFX chart and trade controls" /></article>
      <article className="tile"><p className="eyebrow">Account funding</p><h3 className="h-md">Keep your account moving.</h3><p className="lede">Reach funding controls from your phone. Crypto and USDT withdrawals are instant; available methods vary by region.</p><ul className="inner-payment-logos" aria-label="Payment methods">{paymentMethods.map(method => <li key={method.id} title={method.name}><Image src={`/assets/payments/${method.id === 'mastercard' ? 'mastercard-color' : method.id}.svg`} alt={method.name} width={64} height={38} /></li>)}</ul></article>
      <article className="tile"><p className="eyebrow">Trade management</p><h3 className="h-md">Give your plan some boundaries.</h3><p className="lede">Review stop loss and take profit levels. Keep your risk settings part of every decision.</p></article>
      <article className="tile mobile-feature-support"><div><p className="eyebrow">24/6 support</p><h3 className="h-md">A person when you need one.</h3><p className="lede">Find help with your account and the app, by live chat or email.</p><a href={`mailto:${site.email}`}>{site.email} ↗</a></div><ThemeArt src="/assets/broker/sculptures/support.webp" light="/assets/broker/sculptures/blue/support.webp" sizes="230px" className="support-art" /></article>
    </div></div></section>
    <StoreGallery />
    <section className="band"><div className="shell inner-split"><ThemedImage src={artwork.platforms.dark} light={artwork.platforms.light} frameRatio="3 / 2" alt="ByteFX trading screens on a laptop, tablet and phone" width={1100} height={1100} sizes="(max-width: 760px) 90vw, 50vw" /><div><SectionHead eyebrow="Beyond your phone" title="One trading routine." accent="Every screen." body="Move between the app and MetaTrader 5 as your day changes. Confirm your platform login and server details in your account before connecting." /><Actions primary={{ label: 'Explore platforms', href: '/#platform-guide' }} secondary={{ label: 'Video tutorials', href: 'https://www.youtube.com/@ByteFXcapital' }} /></div></div></section>
    <div className="mobile-final-section"><ClosingSection title="Markets move." accent="Move with them." lead="Download the app for Android. iOS is coming soon." primary={{ label: 'Get it on Google Play', href: site.mobileAppUrl }} secondary={{ label: 'Compare accounts', href: '/trading/account-types' }} /></div>
  </main>;
}
