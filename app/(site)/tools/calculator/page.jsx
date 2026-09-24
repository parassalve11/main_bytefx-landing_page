import CurrencyConverter from '@/components/tools/currency-converter';
import { MoreTools, ToolHero } from '@/components/tools/tool-kit';
import { PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { findTool, toolPage } from '@/lib/pages/tools';

const tool = findTool('converter');
export const metadata = pageMetadata(toolPage(tool));

export default function CurrencyConverterPage() {
  return (
    <main id="main" className="inner-page tool-page">
      <PageSchema page={toolPage(tool)} />
      <ToolHero tool={tool}><CurrencyConverter /></ToolHero>
      <MoreTools current={tool.id} />
    </main>
  );
}
