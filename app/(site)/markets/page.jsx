import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import MarketExplorer from '@/components/inner/market-explorer';
import { FAQ, PageHero, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { StickySubnav } from '@/components/inner/interactions';
import { StartSteps } from '@/components/inner/site-sections';
import { site } from '@/lib/content';
import { markets, marketsFaqs, marketsPage as page, tools } from '@/lib/pages/markets';

export const metadata = pageMetadata(page);
const sections = [...markets.map(({ id, name }) => [id, name]), ['tools', 'Tools'], ['faq', 'FAQs']];

export default function MarketsPage() {
  return <main id="main" className="inner-page markets-page">
    <PageSchema page={page} faqs={marketsFaqs} />
    <PageHero page={page} />
    <StickySubnav items={sections} />
    <MarketExplorer markets={markets} />
    <section className="band" id="tools"><div className="shell">
      <SectionHead eyebrow="Trader tools" title="Four tools." accent="Sharper decisions." body="Check a rate, size a position or plan around the week’s events before you place a trade." />
      <div className="tool-grid">{tools.map((tool, i) => <Reveal as="a" key={tool.id} delay={i * 50} className="tool-card" href={tool.href} target="_blank" rel="noopener noreferrer"><span className="icon-card__glyph"><Icon name={tool.icon} size={20} /></span><strong>{tool.name}</strong><span>{tool.note}</span><em>Open tool <span aria-hidden="true">↗</span></em></Reveal>)}</div>
    </div></section>
    <StartSteps />
    <FAQ items={marketsFaqs} title="Markets, explained." />
    <ClosingSection title="Pick a market." accent="Make your move." lead="150+ instruments, six markets, one ByteFX account." primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Compare accounts', href: '/trading/account-types' }} />
  </main>;
}
