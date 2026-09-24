import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import SmartLink from '@/components/smart-link';
import { Actions, PageHero, PageSchema, SectionHead, ThemeArt, pageMetadata } from '@/components/inner/page-kit';
import { CompanyFacts, IconGrid, PhotoBand } from '@/components/inner/site-sections';
import { site } from '@/lib/content';
import { aboutPage as page, values } from '@/lib/pages/company';
import { markets } from '@/lib/pages/markets';

export const metadata = pageMetadata(page);

export default function AboutPage() {
  return <main id="main" className="inner-page about-page">
    <PageSchema page={page} />
    <PageHero page={page} />
    <section className="band" id="values"><div className="shell">
      <SectionHead eyebrow="Our values" title="What sets our journey" accent="apart." body="We’re driven by clarity, innovation and a people-first approach: a trading environment where security, support and progress go hand in hand, so every trader can grow with confidence." />
      <IconGrid items={values} className="icon-grid--4" />
    </div></section>
    <section className="band" id="who-we-are"><div className="shell inner-split who-we-are">
      <div>
        <SectionHead eyebrow="Who we are" title="A broker built for" accent="the modern trader." />
        <p className="lede">ByteFX Capital Ltd. is a multi-asset broker registered in Saint Lucia. Since 2021 we have built the business around what traders actually ask for: fast, reliable execution on MetaTrader 5, account conditions written down in plain numbers, withdrawals that move quickly, and people who answer when you need them.</p>
        <p className="lede">Today our clients trade forex, crypto, stocks, commodities, indices and energy from a single account — on desktop, web and mobile.</p>
      </div>
      <CompanyFacts />
    </div></section>
    <PhotoBand fullWidth src="/assets/hero/hero-market-rain.webp" alt="Glass spheres marked XAUUSD, EURUSD, GBPUSD and USDJPY under falling streams of light" eyebrow="Forex, metals and more" title="Every major market. One ByteFX account." body="Trade XAUUSD, EURUSD, GBPUSD, USDJPY and 150+ instruments from a single account." caption="top" pos="50% 0%" mobilePos="47% 60%" />
    <section className="band" id="markets"><div className="shell">
      <SectionHead eyebrow="Markets" title="One platform. Global markets." accent="Endless opportunities." body="Explore curated market hubs with live data and on-demand education to sharpen every trade." />
      <div className="market-links">{markets.map((market, i) => <Reveal key={market.id} delay={i * 40}><SmartLink href={`/markets/${market.id}`} className="market-link"><span className="market-icon"><Icon name={market.icon} size={20} /></span><strong>{market.name}</strong><span>{market.title}</span></SmartLink></Reveal>)}</div>
    </div></section>
    <section className="mobile-section inner-color-band" id="community"><div className="shell inner-split telegram-community">
      <div><p className="eyebrow">ByteFX on Telegram</p><h2 className="h-lg">Never trade alone.</h2><p className="lede">Join 5,000+ active traders in our official Telegram community. Get real-time market updates, trade ideas and technical analysis directly from our team — and connect with traders at every level.</p><ul className="community-topics"><li>Market updates</li><li>Trade ideas</li><li>Technical analysis</li></ul><Actions primary={{ label: 'Join the Telegram community', href: site.telegramUrl }} /></div>
      <div className="telegram-community__visual"><ThemeArt src="/assets/generated/telegram-community.webp" alt="Telegram paper airplane surrounded by glass conversation bubbles" sizes="(max-width: 760px) 80vw, 520px" className="band-art" /><div className="telegram-community__badge"><Icon name="telegram" size={22} /><span><strong>ByteFX community</strong><small>Connect. Share. Stay informed.</small></span><span aria-hidden="true">↗</span></div></div>
    </div></section>
    
    <ClosingSection title="Trade with a broker" accent="that answers." lead="Open your ByteFX account in minutes, from $20." primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Why ByteFX', href: '/why-bytefx' }} />
  </main>;
}
