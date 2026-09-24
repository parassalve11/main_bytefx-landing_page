import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';
import MarketExplorer from '@/components/inner/market-explorer';
import { FAQ, PageHero, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { StickySubnav } from '@/components/inner/interactions';
import { StartSteps } from '@/components/inner/site-sections';
import { site } from '@/lib/content';
import { markets, marketsFaqs, marketsPage as page } from '@/lib/pages/markets';
import { tools } from '@/lib/pages/tools';

export const metadata = pageMetadata(page);
const sections = [...markets.map(({ id, name }) => [id, name]), ['tools', 'Tools']];

/* The markets overview. Each market block keeps its #anchor (older links
   such as /markets#forex still land) and links on to its own page. This is
   the only markets page with an FAQ. */
export default function MarketsPage() {
  return <main id="main" className="inner-page markets-page">
    <PageSchema page={page} faqs={marketsFaqs} />
    <PageHero page={page} />
    <StickySubnav items={sections} />
    <MarketExplorer markets={markets} />
    <section className="band" id="tools"><div className="shell">
      <SectionHead eyebrow="Trader tools" title="Four tools." accent="Sharper decisions." body="Check a rate, size a position or plan around the week’s events before you place a trade." />
      <div className="tool-grid">{tools.map((tool) => <SmartLink key={tool.id} className="tool-card" href={tool.path}><span className="icon-card__glyph"><Icon name={tool.icon} size={20} /></span><strong>{tool.name}</strong><span>{tool.note}</span><em>Open tool</em></SmartLink>)}</div>
    </div></section>
    <StartSteps />
    <FAQ items={marketsFaqs} title="Markets, explained." />
    <ClosingSection title="Pick a market." accent="Make your move." lead="150+ instruments, six markets, one ByteFX account." primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Compare accounts', href: '/trading/account-types' }} />
  </main>;
}
