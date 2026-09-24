import { notFound } from 'next/navigation';
import { FAQ, PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { MarketCta, MarketHero, MarketInstruments, MarketPlatforms, MarketSwitch, MarketTopics } from '@/components/markets/market-sections';
import { findMarket, marketPage, markets } from '@/lib/pages/markets';

/* One template for /markets/forex, /crypto, /stocks, /commodities,
   /indices and /energy, laid out like elefin.com's market pages:
   hero, market switcher, instruments + live prices, tabbed topics,
   platforms, FAQ and a closing call to action. Content lives in
   lib/pages/markets.js. */
export const dynamicParams = false;
export function generateStaticParams() {
  return markets.map((market) => ({ market: market.id }));
}
export async function generateMetadata({ params }) {
  const market = findMarket((await params).market);
  return market ? pageMetadata(marketPage(market)) : {};
}

export default async function MarketPage({ params }) {
  const market = findMarket((await params).market);
  if (!market) notFound();
  const page = marketPage(market);
  return (
    <main id="main" className={`inner-page mk-page mk-page--${market.id}`}>
      <PageSchema page={page} faqs={market.faqs} />
      <MarketHero market={market} page={page} />
      <MarketSwitch current={market.id} />
      <MarketInstruments market={market} />
      <MarketTopics market={market} />
      <MarketPlatforms />
      <FAQ items={market.faqs} title={`${market.name} trading, explained.`} />
      <MarketCta market={market} />
    </main>
  );
}
