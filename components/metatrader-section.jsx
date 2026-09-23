import Image from 'next/image';

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
        <figure className="mt5-art">
          <Image
            src="/assets/platforms/mt5/emblem.webp"
            alt="Glossy green, gold and blue MetaTrader 5 emblem with a gold 5"
            width={1600}
            height={1600}
            sizes="(max-width: 760px) 85vw, (max-width: 980px) 480px, (max-width: 1600px) 44vw, 680px"
          />
          <div className="mt5-art__reflection" aria-hidden="true">
            <Image src="/assets/platforms/mt5/emblem.webp" alt="" width={1600} height={1600} sizes="(max-width: 760px) 85vw, (max-width: 980px) 480px, (max-width: 1600px) 44vw, 680px" />
          </div>
        </figure>
      </div>
    </section>
  );
}
