import Image from 'next/image';
import Mt5Emblem from './mt5-emblem';

export default function MetaTraderSection() {
  return (
    <section className="mt5-section" id="metatrader-5" aria-labelledby="mt5-title">
      <div className="mt5-background" aria-hidden="true">
        <Image className="mt5-background--dark" src="/assets/platforms/mt5/background-dark.webp" alt="" fill sizes="100vw" />
        <Image className="mt5-background--light" src="/assets/platforms/mt5/background-light.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="mt5-showcase">
        <div className="mt5-copy">
          <p className="eyebrow">Advanced trading platform</p>
          <h2 id="mt5-title">MetaTrader <span>5</span></h2>
          <p className="mt5-headline">Precision in every move.<br />Power behind every strategy.</p>
          <p className="mt5-lede">
            Take a disciplined approach to global markets with advanced charting,
            flexible order controls and Expert Advisors. Analyse, test and execute
            your strategy in one powerful trading environment.
          </p>
        </div>
        <Mt5Emblem />
      </div>
    </section>
  );
}
