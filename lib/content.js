/**
 * Every piece of copy on the landing page lives here.
 *
 * `href: null` renders a non-clickable label instead of a dead link, so nothing
 * on the page pretends to go somewhere that does not exist yet. Fill the value
 * in and it becomes a real link with no other change.
 */

export const site = {
  name: 'ByteFX',
  legalName: 'ByteFX Capital Ltd.',
  email: 'support@bytefx.com',
  phone: '+1-758-572-0353',
  phoneHref: '+17585720353',
  loginUrl: '/', // User-supplied Login destination.
  liveAccountUrl: null,
  demoAccountUrl: null,
  /** Real client-area destinations used by the inner pages. */
  registerUrl: 'https://my.bytefx.com/register',
  portalLoginUrl: 'https://my.bytefx.com/login',
  liveChatUrl: 'https://www.livechat.com/chat-with/19551913/',
  telegramUrl: 'https://t.me/bytefxcaptial',
  /** Keep public/app-qr.png in sync with this Google Play destination. */
  mobileAppUrl: 'https://play.google.com/store/apps/details?id=com.bytefx.app&hl=en_IN',
  iosAppUrl: null, // Add the supplied App Store URL here when ready.
  registrationNumber: '2025-00893',
  registeredAddress:
    'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia.',
  physicalAddress: 'Office No. 1, Rodney Quay, Rodney Bay, Gros Islet, Saint Lucia.',
};

/* ---------------------------------------------------------------- navigation */

export const navigation = [
  {
    id: 'trading',
    label: 'Trading',
    width: 'wide',
    groups: [
      {
        heading: 'Accounts & access',
        items: [
          { label: 'Account types', note: 'Standard, Pro and Custom accounts.', href: '/trading/account-types' },
          { label: 'Mobile trading', note: 'Your account and the markets in one app.', href: '/trading/mobile-app' },
          { label: 'Funding & withdrawals', note: 'Review supported account funding methods.', href: '/trading/funding' },
        ],
      },
      {
        heading: 'Start trading',
        items: [
          { label: 'Getting started', note: 'Open, verify and prepare your account.', href: '/trading/getting-started' },
        ],
      },
    ],
    feature: {
      image: '/assets/platforms/bytefx-device-setup.webp',
      alt: 'ByteFX charts on a laptop, withdrawals on a tablet and the trading app on a phone',
      title: 'Open a live account',
      note: 'Get started in minutes.',
      href: site.registerUrl,
    },
  },
  {
    id: 'markets',
    label: 'Markets & tools',
    width: 'wide',
    groups: [
      {
        heading: 'Markets',
        items: [
          { label: 'Forex', note: 'Major, minor and exotic currency pairs.', href: '/markets#forex', icon: 'market-forex' },
          { label: 'Crypto', note: 'Round-the-clock digital asset markets.', href: '/markets#crypto', icon: 'market-crypto' },
          { label: 'Stocks', note: 'Leading companies across global exchanges.', href: '/markets#stocks', icon: 'market-shares' },
          { label: 'Commodities', note: 'Metals, agriculture and other essentials.', href: '/markets#commodities', icon: 'market-commodities' },
          { label: 'Indices', note: 'Track major global market benchmarks.', href: '/markets#indices', icon: 'market-indices' },
          { label: 'Energy', note: 'WTI, Brent and natural gas markets.', href: '/markets#energy', icon: 'market-energy' },
        ],
      },
      {
        heading: 'Trader tools',
        items: [
          { label: 'Currency Converter', note: 'Real-time exchange rates', href: 'https://www.bytefx.com/tools/calculator' },
          { label: 'Trading Calculator', note: 'Calculate margin, pips & swaps', href: 'https://www.bytefx.com/tools/trading-calculator' },
          { label: 'Economic Calendar', note: 'Key market-moving events', href: 'https://www.bytefx.com/tools/calendar' },
          { label: 'Market Quotes', note: 'Real-time price tracking', href: 'https://www.bytefx.com/tools/quotes' },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/market-tokens.png',
      alt: 'Glass currency tokens and precious-metal bars with lime edges and soft reflections',
      title: '150+ instruments',
      note: 'One account, six markets.',
      href: '/markets',
    },
  },
  {
    id: 'learn',
    label: 'Learn',
    width: 'narrow',
    groups: [
      {
        heading: 'Knowledge hub',
        items: [
          { label: 'ByteFX School', note: 'Practical lessons from first trade onward.', href: null },
          { label: 'Market news', note: 'Stay current with the stories moving markets.', href: null },
          { label: 'Economic calendar', note: 'Plan around important global events.', href: 'https://www.bytefx.com/tools/calendar' },
          { label: 'Calculators', note: 'Estimate margin, pip value and outcomes.', href: 'https://www.bytefx.com/tools/trading-calculator' },
          { label: 'Demo competition', note: 'Put your strategy to the test risk-free.', href: null },
          { label: 'Help centre', note: 'Clear answers and direct support.', href: '/contact' },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/referral-cards.png',
      alt: 'Two crystal referral cards joined by a lime glass link',
      title: 'Demo competition',
      note: 'Trade a live market with virtual funds.',
      href: null,
    },
  },
  {
    id: 'about',
    label: 'About ByteFX',
    width: 'narrow',
    groups: [
      {
        heading: 'Company',
        items: [
          { label: 'About ByteFX', href: '/about' },
          { label: 'Why ByteFX', href: '/why-bytefx' },
          { label: 'Trust & security', href: '/trust-security' },
          { label: 'Contact us', href: '/contact' },
          { label: 'Legal & compliance', href: '/legal' },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/partnership.png',
      alt: 'Interlocking crystal glass rings with lime highlights and a mirrored reflection',
      title: 'Built around trust',
      note: 'See how your account is protected.',
      href: '/trust-security',
    },
  },
  { id: 'partners', label: 'Partners', href: '/partners', highlight: true },
];

/* ---------------------------------------------------------- legal documents */

/* The signed documents are published on bytefx.com. Their file names contain
   spaces, so each URL is encoded once here. */
const pdf = (name) => encodeURI(`https://www.bytefx.com/${name}.pdf`);
export const documents = [
  { id: 'terms', label: 'Terms & Conditions', note: 'The agreement that governs your ByteFX account and trading.', href: pdf('ByteFX Capital Ltd - Terms & Conditions latest') },
  { id: 'privacy', label: 'Privacy Policy', note: 'What personal data is collected, why, and how it is protected.', href: pdf('ByteFX Capital Ltd - Privacy Policy') },
  { id: 'risk', label: 'Risk Disclosure', note: 'The risks of trading leveraged products such as Forex and CFDs.', href: pdf('ByteFX Capital Ltd - Risk Disclosure Statement') },
  { id: 'aml', label: 'AML Policy', note: 'How money laundering is prevented and client identity verified.', href: pdf('ByteFX Capital Ltd - (AML) Compliance Policy') },
  { id: 'compliance', label: 'Legal & Compliance Overview', note: 'Registration, jurisdictions and the compliance framework.', href: pdf('ByteFX Capital Ltd - Legal & Compliance Overview') },
];

/* --------------------------------------------------------------------- hero */

export const hero = {
  interval: 8000,
  slides: [
    {
      id: 'mindset',
      label: 'Mindset',
      layout: 'poster',
      eyebrow: 'Mindset: next level',
      title: 'Think clearly.',
      accent: 'Trade with intent.',
      body: 'Analyse, adapt, execute. Build the discipline behind every decision with platforms and tools made for focused traders.',
      art: {
        src: '/assets/hero/hero-mindset.webp',
        ambient: '/assets/hero/hero-mindset-ambient.webp',
        width: 1122,
        height: 1402,
      },
      primary: { label: 'Explore ByteFX', href: '/#broker' },
    },
    {
      id: 'stay-cool',
      label: 'Stay cool',
      layout: 'left',
      scene: 'cat',
      eyebrow: 'Trade calm, stay in control',
      title: 'Stay cool.',
      accent: 'Let your plan keep watch.',
      body: 'Set stop loss and take profit before you step away, switch on price alerts, and let the platform do the watching. Your coffee stays warm.',
      art: {
        src: '/assets/hero/hero-chill-cat.webp',
        width: 1672,
        height: 941,
        focus: { x: 0.42, y: 0.5 },
        mobileFocus: { x: 0.72, y: 0.4 },
      },
      primary: null,
      feed: [
        { icon: 'eq', title: 'Now playing', note: 'Lo-fi for limit orders' },
        { icon: 'shield', title: 'Stop loss and take profit set', note: 'XAUUSD, 0.10 lots' },
        { icon: 'bell', title: 'Price alert on', note: 'EURUSD, at your level' },
      ],
    },
    {
      id: 'global-markets',
      label: 'Global markets',
      layout: 'center',
      scene: 'rain',
      eyebrow: 'Forex, metals and more',
      title: 'Every major market.',
      accent: 'One ByteFX account.',
      body: 'Trade XAUUSD, EURUSD, GBPUSD, USDJPY and 150+ instruments from a single account.',
      art: {
        src: '/assets/hero/hero-market-rain.webp',
        width: 1672,
        height: 941,
        focus: { x: 0.5, y: 0.08 },
        zoom: 1.24,
        mobileFocus: { x: 0.47, y: 0.5 },
      },
      primary: { label: 'Discover markets', href: '/#markets' },
    },
    {
      id: 'precious-metals',
      label: 'Precious metals',
      layout: 'left',
      scene: 'metals',
      tone: 'gold',
      eyebrow: 'Gold and silver',
      title: 'Trade the metals',
      accent: 'that move markets.',
      body: 'Access spot gold and silver alongside the most-watched currency pairs, with tight spreads and fast execution.',
      art: {
        src: '/assets/hero/hero-precious-metals.png',
        width: 1659,
        height: 948,
        focus: { x: 0.5, y: 0.5 },
        mobileFocus: { x: 0.82, y: 0.5 },
      },
      primary: { label: 'Explore metals', href: '/#markets' },
    },
  ],
};

/* --------------------------------------------------------- bento / markets  */

export const bento = {
  markets: {
    eyebrow: 'Trade global',
    /* rendered in components/bento-section.jsx, with the middle word tinted */
    title: 'Trade commodities and more',
    body:
      'Gold, silver, oil and energy — plus Forex, Indices, Shares and Crypto, all from one ByteFX account.',
    image: '/assets/generated/markets-lineup.webp',
    width: 1000,
    height: 1055,
    alt: 'Glass panels for Shares, Forex, Commodities, Crypto and Indices behind an oil barrel, fine gold and silver bars, and Bitcoin and Ether coins',
  },
  /* second card (wide, top right): accounts, with the trader artwork */
  account: {
    eyebrow: 'ByteFX accounts',
    title: 'Trade on your terms',
    body: 'Standard, Pro and Raw accounts with tight spreads and fast execution — managed from your phone.',
    cta: { label: 'Open live account', href: '/trading/account-types' },
    image: '/assets/bento/account-trader.webp',
    width: 680,
    height: 1302,
    alt: 'A trader in a navy suit holding a phone and looking ahead',
  },
  refer: {
    eyebrow: 'ByteFX partners',
    title: 'Refer a trader',
    body: 'Invite traders to ByteFX and unlock greater opportunities together.',
    cta: { label: 'Refer now', href: '/partners#become-ib' },
    image: '/assets/generated/refer-partners-grow.webp',
    width: 1000,
    height: 1004,
    alt: 'Two glass profile cards joined by a lime plus sign, circled by a steel ring engraved Partners Grow',
  },
  partner: {
    eyebrow: 'Partner with ByteFX',
    title: 'Grow together with a trusted broker',
    body:
      'Start trading in minutes. Partner with a global broker built on transparency, technology and long-term success.',
    cta: { label: 'Become a partner', href: '/partners' },
    image: '/assets/partner/bytefx-glass-mark.webp',
    alt: 'The ByteFX logo mark rendered in green and blue glass',
    width: 1129,
    height: 968,
  },
};

/* -------------------------------------------------------------- broker rail */

export const broker = {
  label: 'Built for traders',
  title: 'Trade with a global broker',
  lead: 'Powerful conditions. Advanced technology. A better trading experience.',
  cards: [
    {
      id: 'leverage',
      title: 'Max leverage',
      value: '1:2000',
      note: 'Trade bigger opportunities',
      image: '/assets/broker/sculptures/leverage.webp',
      alt: 'A charcoal balance mechanism lifting a smoked-glass cube, with a lime sphere and mirrored reflection',
    },
    {
      id: 'spreads',
      title: 'Spreads from',
      value: '0.1 pips',
      note: 'Tighter spreads, lower costs',
      image: '/assets/broker/sculptures/spreads.webp',
      alt: 'Two charcoal precision jaws meeting across a narrow lime-lit gap, reflected below',
    },
    {
      id: 'instruments',
      title: 'Tradable instruments',
      value: '150+',
      note: 'Forex, metals, indices, commodities and more',
      image: '/assets/broker/sculptures/instruments.webp',
      alt: 'Five sculptural market objects connected to a charcoal hub, with glass details and soft reflections',
    },
    {
      id: 'execution',
      title: 'Average execution',
      value: '~20ms',
      note: 'Ultra-fast execution',
      image: '/assets/broker/sculptures/execution.webp',
      alt: 'A crystal signal passing through three charcoal frames along a lime filament, with a mirrored reflection',
    },
    {
      id: 'support',
      title: 'Dedicated support',
      value: '24/6',
      note: 'Real people. Real support.',
      image: '/assets/broker/sculptures/support.webp',
      alt: 'Layered charcoal and smoked-glass conversation forms with three lime spheres and a soft reflection',
    },
    {
      id: 'accounts',
      title: 'Your account, your way',
      value: 'More choice',
      note: 'Standard, Pro and Raw account options',
      image: '/assets/broker/sculptures/accounts.webp',
      alt: 'Three differently shaped charcoal and crystal keys in a reflective dock with lime inlays',
    },
    {
      id: 'demo',
      title: 'Practice your strategy',
      value: 'Demo trading',
      note: 'Explore the markets with virtual funds',
      image: '/assets/broker/sculptures/demo.webp',
      alt: 'Trading candlesticks in a smoked-glass practice cube surrounded by a replay loop, reflected below',
    },
    {
      id: 'mobile',
      title: 'Markets on the move',
      value: 'Any device',
      note: 'Desktop, web and mobile access',
      image: '/assets/broker/sculptures/mobile.webp',
      alt: 'Three hinged charcoal and glass device screens with lime charts on a shared reflective base',
    },
  ],
};

/* ------------------------------------------------------------- testimonials */

export const testimonials = {
  label: 'Testimonials',
  title: ['Don’t listen to us,', 'listen to them'],
  lead:
    'Traders judge a broker on fills, costs and how fast money moves. Here is what ours say about all three.',
  /* Placeholder reviews written for this build. They are plausible but not
     real customer feedback, so swap them — names, roles, countries, avatars
     and all — for verified quotes before this page goes live. */
  items: [
    {
      id: 'kamil',
      heading: 'Order fills I can plan around',
      quote:
        'I size positions around the spread, so predictable fills matter more to me than a flashy dashboard. Three months in, the quote I click is the quote I get.',
      name: 'Kamil W.',
      role: 'Swing trader, 4 years',
      country: 'Poland',
      code: 'pl',
      avatar: '/assets/voices/kamil.webp',
      rating: 5,
    },
    {
      id: 'adaeze',
      heading: 'Withdrawals land when they say they will',
      quote:
        'My first withdrawal cleared the same working day, and every one since has followed the same pattern. Knowing the timeline in advance is what keeps me here.',
      name: 'Adaeze O.',
      role: 'Part-time trader',
      country: 'Nigeria',
      code: 'ng',
      avatar: '/assets/voices/adaeze.webp',
      rating: 5,
    },
    {
      id: 'haruto',
      heading: 'The mobile app keeps up with me',
      quote:
        'I open charts on the train and manage the same positions from my desk later. Nothing falls out of sync, and the app has never dropped an order on me.',
      name: 'Haruto S.',
      role: 'Indices, intraday',
      country: 'Japan',
      code: 'jp',
      avatar: '/assets/voices/haruto.webp',
      rating: 5,
    },
    {
      id: 'lena',
      heading: 'Costs are exactly where I expected',
      quote:
        'I checked the swap and commission figures against my own statements before scaling up. They matched to the cent, which is more than I can say for my last broker.',
      name: 'Lena F.',
      role: 'Algorithmic trader',
      country: 'Germany',
      code: 'de',
      avatar: '/assets/voices/lena.webp',
      rating: 5,
      featured: true,
    },
    {
      id: 'mateus',
      heading: 'Support answered on a Sunday',
      quote:
        'I had a margin question outside market hours and got a real answer in under ten minutes — not a template, an actual walkthrough of how my account was calculated.',
      name: 'Mateus A.',
      role: 'Forex, 2 years',
      country: 'Brazil',
      code: 'br',
      avatar: '/assets/voices/mateus.webp',
      rating: 5,
    },
    {
      id: 'putri',
      heading: 'A demo that behaves like the real thing',
      quote:
        'I spent six weeks on the demo before funding anything. When I switched across, the platform felt identical, so there was no relearning curve at all.',
      name: 'Putri N.',
      role: 'New to trading',
      country: 'Indonesia',
      code: 'id',
      avatar: '/assets/voices/putri.webp',
      rating: 4,
    },
    {
      id: 'oskar',
      heading: 'MetaTrader without the usual friction',
      quote:
        'Setup took one evening: install, log in, expert advisors running. The server has stayed up through every news release I have traded since.',
      name: 'Oskar L.',
      role: 'Runs three EAs',
      country: 'Sweden',
      code: 'se',
      avatar: '/assets/voices/oskar.webp',
      rating: 5,
    },
    {
      id: 'linh',
      heading: 'Clear numbers before I commit',
      quote:
        'Leverage, margin and the cost of holding overnight are all written down in one place. I never have to guess what a position will cost me by Friday.',
      name: 'Linh T.',
      role: 'Gold and oil',
      country: 'Vietnam',
      code: 'vn',
      avatar: '/assets/voices/linh.webp',
      rating: 5,
    },
    {
      id: 'diego',
      heading: 'Switching account types was painless',
      quote:
        'Moving from Standard to Raw took one short form and a confirmation. My history carried across and I was trading the tighter spreads the same afternoon.',
      name: 'Diego C.',
      role: 'Scalper',
      country: 'Peru',
      code: 'pe',
      avatar: '/assets/voices/diego.webp',
      rating: 4,
    },
    {
      id: 'nadia',
      heading: 'Charts load, every single time',
      quote:
        'I trade the index open, which is exactly when other platforms used to freeze on me. This one has not made me hit refresh once.',
      name: 'Nadia M.',
      role: 'Indices, 6 years',
      country: 'South Africa',
      code: 'za',
      avatar: '/assets/voices/nadia.webp',
      rating: 5,
    },
  ],
};

/* ------------------------------------------------------------------ closing */

export const cta = {
  eyebrow: 'Get started',
  title: 'Ready to start trading?',
  lead: 'Your next chapter starts with ByteFX.',
  primary: { label: 'Open live account', href: null },
  secondary: { label: 'Try a demo', href: '/trading/demo-account' },
  points: ['Fast setup', 'Powerful platforms', 'Global markets'],
  background: '/assets/generated/closing-market-scene.png',
};

/* ------------------------------------------------------------------- footer */

export const footer = {
  tagline: 'Discover your trading edge.',
  connect: 'Connect with ByteFX',
  marquee: 'Discover your trading edge · Trade with ByteFX · ',
  socials: [
    { id: 'tiktok', label: 'TikTok — coming soon', href: null },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ByteFXcapital' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/bytefxcapital?igsh=NzhlN3VwMmw5bjQ1&utm_source=qr' },
    { id: 'x', label: 'X', href: 'https://x.com/bytefx_?s=11' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/bytefx-capital/' },
  ],
  columns: [
    {
      heading: 'Markets',
      links: [
        { label: 'Forex', href: '/markets#forex' },
        { label: 'Crypto', href: '/markets#crypto' },
        { label: 'Stocks', href: '/markets#stocks' },
        { label: 'Commodities', href: '/markets#commodities' },
        { label: 'Indices', href: '/markets#indices' },
      ],
    },
    {
      heading: 'Explore',
      links: [
        { label: 'Account types', href: '/trading/account-types' },
        { label: 'Mobile trading', href: '/trading/mobile-app' },
        { label: 'Funding & withdrawals', href: '/trading/funding' },
        { label: 'Competition', href: null },
        { label: 'Partnership', href: '/partners' },
        { label: 'Tools', href: '/markets#tools' },
        { label: 'About ByteFX', href: '/about' },
        { label: 'Why ByteFX', href: '/why-bytefx' },
        { label: 'Trust & security', href: '/trust-security' },
        { label: 'Getting started', href: '/trading/getting-started' },
        { label: 'Support', href: '/contact' },
      ],
    },
  ],
  legal: [
    {
      heading: 'Risk warning',
      body:
        'Trading Forex, CFDs, and other leveraged financial instruments involves a high level of risk and may not be suitable for all investors. Fully understand the risks involved and ensure that you can afford to sustain a complete loss of your invested capital.',
    },
    {
      heading: 'Legal disclaimer',
      body:
        'The information on this website is general. ByteFX Capital Ltd. cannot be held liable for its relevance or accuracy. We do not provide investment advice. Review our Terms & Conditions for details.',
    },
    {
      heading: 'Restricted jurisdictions',
      body:
        'Services are not offered to residents of the UAE, India, USA, China, Iran, North Korea, and other sanctioned regions.',
    },
  ],
  policies: [
    { label: 'Terms & Conditions', href: documents[0].href },
    { label: 'Privacy Policy', href: documents[1].href },
    { label: 'Risk Disclosure', href: documents[2].href },
    { label: 'AML Policy', href: documents[3].href },
    { label: 'Legal & Compliance', href: '/legal' },
  ],
  copyright: '© 2021-2026 ByteFX Capital Ltd. Built for the modern trader.',
};
