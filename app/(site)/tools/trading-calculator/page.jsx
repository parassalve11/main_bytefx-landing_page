import TradingCalculator from '@/components/tools/trading-calculator';
import { MoreTools, ToolHero } from '@/components/tools/tool-kit';
import { PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { findInstrument } from '@/lib/instruments';
import { findTool, toolPage } from '@/lib/pages/tools';

const tool = findTool('calculator');
export const metadata = pageMetadata(toolPage(tool));

/* Market pages link here with ?symbol=EURUSD, XAUUSD… */
export default async function TradingCalculatorPage({ searchParams }) {
  const { symbol } = await searchParams;
  const initial = findInstrument(Array.isArray(symbol) ? symbol[0] : symbol)?.symbol || 'EURUSD';
  return (
    <main id="main" className="inner-page tool-page">
      <PageSchema page={toolPage(tool)} />
      <ToolHero tool={tool}><TradingCalculator key={initial} initialSymbol={initial} /></ToolHero>
      <MoreTools current={tool.id} />
    </main>
  );
}
