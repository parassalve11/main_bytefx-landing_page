import { site } from '@/lib/content';

export const marketsPage = {
  id: 'markets', label: 'Markets', crumb: null, path: '/markets', eyebrow: 'Six markets. One account.',
  title: 'Every market.', accent: 'One ByteFX account.',
  description: 'Forex, crypto, stocks, commodities, indices and energy — 150+ instruments on MetaTrader 5, with leverage up to 1:2000* and execution around 20 ms.',
  art: '/assets/markets/tokens-dark.webp', lightArt: '/assets/markets/tokens-light.webp',
  alt: 'Glass coins marked with dollar, euro, pound, Bitcoin and diamond symbols beside two glass bars',
  primary: { label: 'Open your account', href: site.registerUrl }, secondary: { label: 'Explore the markets', href: '#forex' },
  note: '* Maximum leverage depends on instrument class and account equity.',
  stats: [['150+', 'Tradable instruments'], ['1:2000*', 'Leverage up to'], ['0.0 pips', 'Raw spreads from'], ['~20 ms', 'Average execution']],
};

/* Market copy follows bytefx.com's market pages. `examples` only lists
   instruments ByteFX names publicly. */
export const markets = [
  {
    id: 'forex', name: 'Forex', icon: 'market-forex',
    title: 'The world’s largest market, one pair at a time.',
    body: 'Forex is the global currency market. Currencies trade in pairs: buying EUR/USD means buying euros while selling US dollars. Trade major, minor and exotic pairs as CFDs, with deep liquidity, tight spreads and institutional execution.',
    examples: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD'],
    facts: [['Pairs', 'Majors, minors, exotics'], ['Hours', '24 hours, Sunday–Friday'], ['Leverage', 'Up to 1:2000*']],
    image: '/assets/markets/forex.webp', alt: 'Glass spheres marked XAUUSD, EURUSD, GBPUSD and USDJPY under falling light',
  },
  {
    id: 'crypto', name: 'Crypto', icon: 'market-crypto',
    title: 'Digital assets, around the clock.',
    body: 'Trade the world’s leading cryptocurrencies with secured market access. As CFDs, you can take a view on price in either direction without holding coins or managing a wallet.',
    examples: ['Bitcoin', 'Ethereum'],
    facts: [['Assets', 'Bitcoin, Ethereum and more'], ['Hours', '24/7'], ['Direction', 'Long or short']],
    image: '/assets/markets/crypto.webp', alt: 'A glass Bitcoin coin in a lime orbit on a reflective stand',
  },
  {
    id: 'stocks', name: 'Stocks', icon: 'market-shares',
    title: 'Global blue chips, from one screen.',
    body: 'Trade CFDs on leading companies listed on global exchanges, with flexible leverage and real-time data. Go long when you expect a share to rise, or short when you expect it to fall.',
    examples: [],
    facts: [['Coverage', 'Global blue chips'], ['Prices', 'Real-time data'], ['Direction', 'Long or short']],
    image: '/assets/markets/stocks.webp', alt: 'Glass bar chart rising under a lime arrow',
  },
  {
    id: 'commodities', name: 'Commodities', icon: 'market-commodities',
    title: 'Metals and softs that react to the real world.',
    body: 'Diversify with precious metals and soft commodities. These markets often move differently from equities, which can help balance a portfolio against inflation and geopolitical shifts.',
    examples: ['Gold', 'Silver', 'Coffee', 'Sugar', 'Cotton'],
    facts: [['Types', 'Metals and softs'], ['Contracts', 'Spot and futures-based'], ['Drivers', 'Supply, demand, USD']],
    image: '/assets/markets/commodities.webp', alt: 'A fine gold bar and two silver bars wrapped in a ribbon of liquid gold',
  },
  {
    id: 'indices', name: 'Indices', icon: 'market-indices',
    title: 'A whole market in a single trade.',
    body: 'An index tracks a basket of leading shares. Trading an index CFD lets you capture the movement of an entire market with one position, instead of picking individual companies.',
    examples: [],
    facts: [['Exposure', 'A market in one position'], ['Prices', 'Real-time data'], ['Direction', 'Long or short']],
    image: '/assets/markets/indices.webp', alt: 'A stack of glossy lime discs rising at an angle',
  },
  {
    id: 'energy', name: 'Energy', icon: 'market-energy',
    title: 'Crude oil and gas, on your terms.',
    body: 'Energy prices move with supply decisions, inventories, weather and the value of the US dollar. Trade WTI, Brent and natural gas CFDs alongside the rest of your markets.',
    examples: ['WTI crude', 'Brent crude', 'Natural gas'],
    facts: [['Markets', 'WTI, Brent, natural gas'], ['Drivers', 'Supply, weather, USD'], ['Direction', 'Long or short']],
    image: '/assets/markets/energy.webp', alt: 'A black oil barrel beside gold bars and a glass shares panel',
  },
];

export const tools = [
  { id: 'converter', name: 'Currency Converter', note: 'Real-time exchange rates', icon: 'market-forex', href: 'https://www.bytefx.com/tools/calculator' },
  { id: 'calculator', name: 'Trading Calculator', note: 'Calculate margin, pips & swaps', icon: 'percent', href: 'https://www.bytefx.com/tools/trading-calculator' },
  { id: 'calendar', name: 'Economic Calendar', note: 'Key market-moving events', icon: 'bell', href: 'https://www.bytefx.com/tools/calendar' },
  { id: 'quotes', name: 'Market Quotes', note: 'Real-time price tracking', icon: 'market-indices', href: 'https://www.bytefx.com/tools/quotes' },
];

export const marketsFaqs = [
  ['What markets can I trade with ByteFX?', 'ByteFX Capital Ltd. offers forex, crypto, stocks, commodities, indices and energy — 150+ instruments from a single secure account on MetaTrader 5.'],
  ['What are the major currency pairs?', 'The majors pair the US dollar with the other most-traded currencies, such as EUR/USD, GBP/USD, USD/JPY, USD/CHF and AUD/USD.'],
  ['When is the forex market open?', 'Forex trades 24 hours a day, from Sunday evening to Friday evening (GMT). Crypto markets trade around the clock, seven days a week.'],
  ['What is a pip?', 'A pip (percentage in point) is the smallest standard price move in an exchange rate. For most currency pairs it is the fourth decimal place.'],
  ['What is leverage?', 'Leverage lets you control a large position with a smaller amount of capital. At 1:100, $1 in your account controls $100. It increases potential losses as well as profits.'],
  ['What commodities can I trade?', 'CFDs on essential commodities, including gold and silver, WTI and Brent crude, natural gas, and softs such as coffee, sugar and cotton.'],
  ['Do commodity CFDs expire?', 'Some commodity CFDs are based on futures contracts and have expiry dates. Others are cash or spot contracts with no set expiry.'],
  ['What moves commodity prices?', 'Mainly global supply and demand, geopolitical events, weather (for softs) and changes in the value of the US dollar.'],
];
