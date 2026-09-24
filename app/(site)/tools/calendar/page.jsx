import TvWidget from '@/components/tools/tv-widget';
import { MoreTools, ToolHero } from '@/components/tools/tool-kit';
import { PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { findTool, toolPage } from '@/lib/pages/tools';

const tool = findTool('calendar');
export const metadata = pageMetadata(toolPage(tool));

/* TradingView's economic calendar. It can be swapped for ByteFX's own
   calendar later: replace the TvWidget below and keep the page as it is.
   importanceFilter: -1 low, 0 medium, 1 high. */
export default function EconomicCalendarPage() {
  return (
    <main id="main" className="inner-page tool-page">
      <PageSchema page={toolPage(tool)} />
      <ToolHero tool={tool} layout="wide" note="Event data from TradingView. Actual figures can differ from forecasts, and markets can move sharply around high-impact releases.">
        <TvWidget widget="events" height={760} label="Economic calendar" className="tv-frame--panel" config={{ importanceFilter: '0,1', countryFilter: 'us,eu,gb,jp,cn,au,ca,ch,nz,de' }} />
      </ToolHero>
      <MoreTools current={tool.id} />
    </main>
  );
}
