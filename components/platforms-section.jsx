import Image from 'next/image';
import ThemedImage from '@/components/themed-image';
import { artwork } from '@/lib/artwork';
import { mt5Downloads } from '@/lib/pages/company';
import Icon from './icon';
import Reveal from './reveal';
import PlatformLights from './platform-lights';

export default function PlatformsSection() {
  return (
    <section className="platform-guide band" id="platform-guide" aria-labelledby="platform-guide-title">
      <PlatformLights />
      <div className="shell">
        <Reveal className="platform-guide__heading">
          <p className="eyebrow">Your trading setup</p>
          <h2 className="h-lg" id="platform-guide-title">Find your platform.<br /><span className="tint">Make it your own.</span></h2>
          <p className="lede">A bigger picture at your desk. A closer connection on the move. Explore the tools that fit the way you trade.</p>
        </Reveal>
        <Reveal className="platform-stage">
          <ThemedImage src={artwork.platforms.dark} light={artwork.platforms.light} frameRatio="3 / 2" alt="Trading charts on a laptop, withdrawals on a tablet, and the mobile trading app on a phone" width={1536} height={1024} sizes="(max-width: 760px) 100vw, (max-width: 1148px) 96vw, 1100px" />
        </Reveal>
        <Reveal className="platform-mt5">
          <div className="platform-mt5__mark">
            <span className="platform-mt5__icon"><Image src="/assets/platforms/mt5-icon.png" alt="" width={96} height={96} /></span>
            <h3 className="platform-mt5__name">MetaTrader 5</h3>
          </div>
          <p className="platform-mt5__body">Multi-asset charting, flexible order types and Expert Advisors. Analyse, test and trade from one platform, at your desk or on the move.</p>
          <ul className="platform-mt5__get" aria-label="Get MetaTrader 5">
            {mt5Downloads.map(([icon, label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer"><Icon name={icon} size={15} /><span>{label}</span></a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
