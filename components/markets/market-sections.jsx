import Image from 'next/image';
import ThemedImage from '@/components/themed-image';
import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';
import { Breadcrumbs, SectionHead } from '@/components/inner/page-kit';
import { site } from '@/lib/content';
import { markets } from '@/lib/pages/markets';
import MarketTabs from './market-tabs';
import PriceTable from './price-table';

/* Shared market sections, with individual artwork and an animated chart. */

/* A repeatable rising line for the hero, different for each market. */
function heroLine(seed, count = 72) {
  let state = [...seed].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  let value = 0.3;
  const points = Array.from({ length: count }, (_, i) => {
    value = Math.min(0.9, Math.max(0.1, value + (random() - 0.44) * 0.075));
    return [(i / (count - 1)) * 1200, 520 - value * 440];
  });
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return { line, area: `${line} L1200 520 L0 520 Z`, end: points[points.length - 1] };
}

export function MarketHero({ market, page }) {
  const { line, area, end } = heroLine(market.id);
  return (
    <section className="mk-hero" aria-labelledby="mk-hero-title">
      <div className="mk-hero__bg" aria-hidden="true">
        <div className="mk-hero__chart">
          <svg viewBox="0 0 1200 520" preserveAspectRatio="none" focusable="false">
            <defs>
              <linearGradient id="mk-hero-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity="0.26" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient>
            </defs>
            <path className="mk-hero__area" d={area} fill="url(#mk-hero-fill)" />
            <line className="mk-hero__level" x1="0" x2="1200" y1={end[1]} y2={end[1]} />
            <path className="mk-hero__line" d={line} pathLength="1" />
          </svg>
          <span className="mk-hero__dot" style={{ left: '100%', top: `${((end[1] / 520) * 100).toFixed(2)}%` }} />
        </div>
      </div>
      <div className="shell">
        <Breadcrumbs page={page} />
        <div className="mk-hero__layout">
          <div className="mk-hero__copy">
            <p className="eyebrow">{market.name} trading</p>
            <h1 id="mk-hero-title">{market.hero.title}<br /><span className="tint">{market.hero.accent}</span></h1>
            <p className="lede">{market.hero.lede}</p>
            <div className="inner-actions">
              <SmartLink className="btn btn--solid" href={site.registerUrl}>Open an account<Icon name="arrow" size={16} /></SmartLink>
            </div>
          </div>
          <div className="mk-hero__art">
            <ThemedImage
              src={market.hero.art}
              light={market.hero.lightArt}
              frameRatio="1 / 1"
              alt={market.hero.alt}
              width={960}
              height={960}
              sizes="(max-width: 760px) 88vw, (max-width: 980px) 420px, 44vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* "The core": every market, one tap away. */
export function MarketSwitch({ current }) {
  return (
    <section className="band mk-switch" aria-labelledby="mk-switch-title">
      <div className="shell">
        <p className="eyebrow">Our markets</p>
        <h2 className="mk-switch__title" id="mk-switch-title">At ByteFX, 150+ instruments across forex, crypto, stocks, commodities, indices and energy, all on MetaTrader 5.</h2>
        <nav className="mk-switch__nav" aria-label="Markets">
          {markets.map((market) => (
            <SmartLink key={market.id} href={`/markets/${market.id}`} aria-current={market.id === current ? 'page' : undefined}>
              <Icon name={market.icon} size={17} />{market.name}
            </SmartLink>
          ))}
        </nav>
      </div>
    </section>
  );
}

/* Heading, four stats and the live price table. */
export function MarketInstruments({ market }) {
  const { instruments } = market;
  return (
    <section className="band mk-instruments" id="prices" aria-labelledby="mk-instruments-title">
      <div className="shell">
        <div className="mk-instruments__head">
          <div>
            <p className="eyebrow">Trading instruments</p>
            <h2 className="h-lg" id="mk-instruments-title">{instruments.title} <span className="tint">{instruments.accent}</span></h2>
            <p className="lede">{instruments.body}</p>
          </div>
          <dl className="mk-stats">
            {instruments.stats.map(([value, unit, label]) => (
              <div key={label}><dt>{label}</dt><dd>{value}{unit && <small>{unit}</small>}</dd></div>
            ))}
          </dl>
        </div>
        <PriceTable market={market.id} name={market.name} rows={market.rows} quotes={market.quotes} tradeHref={site.registerUrl} />
        <div className="inner-actions mk-instruments__actions">
          <SmartLink className="btn btn--solid" href={site.registerUrl}>Open an account to see every symbol<Icon name="arrow" size={16} /></SmartLink>
          {market.calc && <SmartLink className="btn btn--ghost" href={`/tools/trading-calculator?symbol=${market.calc}`}>Calculate a trade</SmartLink>}
        </div>
      </div>
    </section>
  );
}

export function MarketTopics({ market }) {
  const [title, accent] = market.tabsTitle;
  return (
    <section className="band mk-topics" aria-labelledby="mk-topics-title">
      <div className="shell">
        <div className="mk-topics__head">
          <p className="eyebrow">{market.name}</p>
          <h2 className="h-lg" id="mk-topics-title">{title} <span className="tint">{accent}</span></h2>
        </div>
        <MarketTabs tabs={market.tabs} />
      </div>
    </section>
  );
}

const platforms = [
  { id: 'mt5', tag: 'Recommended', name: 'MetaTrader 5', body: 'Multi-asset analysis, trading tools and algorithmic strategies.', logo: '/assets/platforms/mt5-icon.png', devices: ['windows', 'apple', 'android', 'globe'], href: 'https://www.metatrader5.com/en', link: 'Explore MetaTrader 5' },
  { id: 'tradingview', tag: 'Charts', name: 'TradingView', body: 'Interactive charts, custom indicators and trading ideas.', logo: '/assets/platforms/tradingview.png', devices: ['windows', 'apple', 'android', 'globe'], href: 'https://www.tradingview.com/features/', link: 'Explore TradingView' },
  { id: 'app', tag: 'Mobile', name: 'ByteFX app', body: 'Your account, funding and the markets in one app.', devices: ['android', 'apple'], href: '/trading/mobile-app', link: 'Get the app' },
];

export function MarketPlatforms() {
  return (
    <section className="band mk-platforms" aria-labelledby="mk-platforms-title">
      <div className="shell">
        <SectionHead eyebrow="Trading platforms" title="Trade on" accent="any device." className="mk-platforms__head" />
        <ul className="mk-platforms__grid">
          {platforms.map((item) => (
            <li key={item.id} className="mk-platform" data-featured={item.id === 'mt5' || undefined}>
              <span className="mk-platform__tag">{item.tag}</span>
              <h3 className={`h-md mk-platform__brand mk-platform__brand--${item.id}`}>{item.id === 'app' ? <><Image src="/assets/logo/bytefx.png" alt="ByteFX" width={384} height={82} /><span>app</span></> : <><span className="mk-platform__logo"><Image src={item.logo} alt="" width={64} height={64} /></span><span>{item.name}</span></>}</h3>
              <p className="lede">{item.body}</p>
              <ul className="mk-platform__devices" aria-label="Supported devices">{item.devices.map((device) => <li key={device} title={{ windows: 'Windows', apple: 'Apple', android: 'Android', globe: 'Web' }[device]}><Icon name={device} size={18} /><span className="sr-only">{{ windows: 'Windows', apple: 'Apple', android: 'Android', globe: 'Web' }[device]}</span></li>)}</ul>
              <SmartLink className="mk-platform__link" href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{item.link}<Icon name="arrow" size={14} /></SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* The page's colour band: green in dark mode, blue in light. */
export function MarketCta({ market }) {
  return (
    <section className="mobile-section inner-color-band mk-cta" aria-labelledby="mk-cta-title">
      <div className="shell mk-cta__grid">
        <div>
          <p className="eyebrow">Open your account</p>
          <h2 className="h-lg" id="mk-cta-title">Ready to trade {market.name.toLowerCase()}?</h2>
          <p className="lede">Register, verify and fund your account, then trade on MetaTrader 5.</p>
          <div className="inner-actions">
            <SmartLink className="btn btn--solid" href={site.registerUrl}>Open an account<Icon name="arrow" size={16} /></SmartLink>
            <SmartLink className="btn btn--ghost" href="/contact">Talk to us</SmartLink>
          </div>
        </div>
        <div className="mk-cta__stat">
          <strong>1:2000<sup>*</sup></strong>
          <span>Leverage up to</span>
        </div>
        <p className="inner-note mk-cta__note">* Maximum leverage depends on market volatility.</p>
      </div>
    </section>
  );
}
