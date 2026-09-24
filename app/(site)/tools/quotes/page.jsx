import TvWidget from '@/components/tools/tv-widget';
import { quoteGroups } from '@/components/tools/tv-config';
import { MoreTools, ToolHero } from '@/components/tools/tool-kit';
import { PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { markets } from '@/lib/pages/markets';
import { findTool, toolPage } from '@/lib/pages/tools';

const tool = findTool('quotes');
export const metadata = pageMetadata(toolPage(tool));

/* One tab per market, using the same symbol lists as the market pages. */
export default function MarketQuotesPage() {
  return (
    <main id="main" className="inner-page tool-page">
      <PageSchema page={toolPage(tool)} />
      <ToolHero tool={tool} layout="wide" note="Reference prices from TradingView. Our dealing prices and the full symbol list are in MetaTrader 5.">
        <TvWidget widget="market-quotes" height={620} label="Market quotes" className="tv-frame--panel" config={{ symbolsGroups: quoteGroups(markets.map(({ name, quotes }) => ({ name, quotes }))), showSymbolLogo: true }} />
      </ToolHero>
      <MoreTools current={tool.id} />
    </main>
  );
}
