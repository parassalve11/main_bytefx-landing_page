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
   instruments ByteFX names publicly. `title`, `body`, `examples`, `facts`,
   `image` and `alt` feed the /markets overview.

   Each market also has its own page at /markets/<id>, laid out like
   elefin.com's market pages and built without image assets:
   - `hero`         heading and intro
   - `instruments`  heading, intro and four stats above the price table
   - `rows`         price table: [name, detail, Yahoo Finance symbol,
                    TradingView symbol (fallback board), decimals]. Stocks,
                    indices and most crypto rows are NOT a confirmed ByteFX
                    symbol list — replace them with the MT5 list when supplied.
   - `tabs`         the tabbed cards: [label, [[icon, title, body, link?], …]]
   - `faqs`         four questions
   - `calc`         symbol the trading calculator opens with */
const margin = (symbol) => ['percent', 'Margin, worked out', 'Required margin = lots × contract size × price ÷ leverage. The trading calculator does the sum in your account currency.', symbol ? `/tools/trading-calculator?symbol=${symbol}` : '/tools/trading-calculator'];
const longShort = (what) => ['arrow', 'Long or short', `Go long when you expect ${what} to rise, or short when you expect a fall, from the same account.`];

export const markets = [
  {
    id: 'forex', name: 'Forex', icon: 'market-forex', note: 'Major, minor and exotic currency pairs.',
    title: 'The world’s largest market, one pair at a time.',
    body: 'Forex is the global currency market. Currencies trade in pairs: buying EUR/USD means buying euros while selling US dollars. Trade major, minor and exotic pairs as CFDs, with deep liquidity, tight spreads and institutional execution.',
    examples: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD'],
    facts: [['Pairs', 'Majors, minors, exotics'], ['Hours', '24 hours, Sunday–Friday'], ['Leverage', 'Up to 1:2000*']],
    image: '/assets/markets/forex.webp', alt: 'Glass spheres marked XAUUSD, EURUSD, GBPUSD and USDJPY under falling light',
    hero: { title: 'Trade the global', accent: 'currency markets.', lede: 'Access 24/5 forex trading on MetaTrader 5, with deep liquidity, spreads from 0.0 pips and leverage up to 1:2000*.' },
    instruments: {
      title: 'Majors, minors', accent: 'and exotics.', body: 'From the most-traded majors to exotics for diversification, every pair sits in one MetaTrader 5 account.',
      stats: [['0.0', 'pips', 'Spreads from'], ['1:2000', '*', 'Max leverage'], ['24/5', '', 'Market access'], ['~20', 'ms', 'Average execution']],
    },
    rows: [
      ['EUR/USD', 'Euro / US dollar', 'EURUSD=X', 'FX:EURUSD', 5], ['GBP/USD', 'British pound / US dollar', 'GBPUSD=X', 'FX:GBPUSD', 5],
      ['USD/JPY', 'US dollar / Japanese yen', 'JPY=X', 'FX:USDJPY', 3], ['USD/CHF', 'US dollar / Swiss franc', 'CHF=X', 'FX:USDCHF', 5],
      ['AUD/USD', 'Australian dollar / US dollar', 'AUDUSD=X', 'FX:AUDUSD', 5], ['USD/CAD', 'US dollar / Canadian dollar', 'CAD=X', 'FX:USDCAD', 5],
      ['NZD/USD', 'New Zealand dollar / US dollar', 'NZDUSD=X', 'FX:NZDUSD', 5], ['EUR/GBP', 'Euro / British pound', 'EURGBP=X', 'FX:EURGBP', 5],
      ['EUR/JPY', 'Euro / Japanese yen', 'EURJPY=X', 'FX:EURJPY', 3], ['GBP/JPY', 'British pound / Japanese yen', 'GBPJPY=X', 'FX:GBPJPY', 3],
    ],
    tabsTitle: ['Trade forex', 'with confidence.'],
    tabs: [
      ['Why forex with ByteFX', [
        ['chart', 'Deep liquidity', 'Trade major, minor and exotic pairs with institutional liquidity behind every price.'],
        ['percent', 'Spreads from 0.0 pips', 'Spreads start from 0.0 pips, depending on your account type.', '/trading/account-types'],
        ['bolt', 'Execution around 20 ms', 'Average execution of around 20 ms on MetaTrader 5.'],
        ['layers', 'Leverage up to 1:2000*', 'Control a larger position with less capital. Leverage magnifies losses as well as gains.'],
      ]],
      ['How forex works', [
        ['market-forex', 'Currencies trade in pairs', 'Buying EUR/USD means buying euros and selling US dollars. The price shows how many dollars one euro costs.'],
        ['chart', 'Pips and lots', 'A pip is the smallest standard move, usually the fourth decimal place. One standard lot is 100,000 units of the base currency.'],
        margin('EURUSD'),
        longShort('the base currency'),
      ]],
      ['What moves currencies', [
        ['bell', 'Interest rates', 'Central bank decisions change what a currency pays to hold, and often move it sharply.'],
        ['chart', 'Economic data', 'Inflation, jobs and growth figures shift expectations. Plan around them with the economic calendar.', '/tools/calendar'],
        ['globe', 'Trading sessions', 'Liquidity builds as Asia, London and New York open, and peaks while London and New York overlap.'],
        ['shield', 'Risk sentiment', 'In uncertain times, traders often turn to currencies seen as safe havens, such as the yen and Swiss franc.'],
      ]],
    ],
    faqs: [
      ['What is leverage in forex trading?', 'Leverage lets you control a large position with a small amount of capital. At 1:100, $1 in your account controls $100. It increases potential losses as well as profits.'],
      ['What are the major currency pairs?', 'The majors pair the US dollar with the other most-traded currencies, such as EUR/USD, GBP/USD, USD/JPY, USD/CHF and AUD/USD.'],
      ['When is the forex market open?', 'Forex trades 24 hours a day, from Sunday evening to Friday evening (GMT).'],
      ['What is a pip?', 'A pip (percentage in point) is the smallest standard price move in an exchange rate. For most currency pairs it is the fourth decimal place.'],
    ],
    calc: 'EURUSD',
  },
  {
    id: 'crypto', name: 'Crypto', icon: 'market-crypto', note: 'Round-the-clock digital asset markets.',
    title: 'Digital assets, around the clock.',
    body: 'Trade the world’s leading cryptocurrencies with secured market access. As CFDs, you can take a view on price in either direction without holding coins or managing a wallet.',
    examples: ['Bitcoin', 'Ethereum'],
    facts: [['Assets', 'Bitcoin, Ethereum and more'], ['Hours', '24/7'], ['Direction', 'Long or short']],
    image: '/assets/markets/crypto.webp', alt: 'A glass Bitcoin coin in a lime orbit on a reflective stand',
    hero: { title: 'Trade crypto', accent: 'around the clock.', lede: 'Take a view on Bitcoin, Ethereum and other leading cryptocurrencies as CFDs, seven days a week, with no wallet to manage.' },
    instruments: {
      title: 'Bitcoin, Ethereum', accent: 'and more.', body: 'Trade the leading digital assets next to your other markets, long or short, from one MetaTrader 5 account.',
      stats: [['24/7', '', 'Market access'], ['Long', '& short', 'Trade both ways'], ['No', 'wallet', 'Price exposure only'], ['~20', 'ms', 'Average execution']],
    },
    rows: [
      ['BTC/USD', 'Bitcoin', 'BTC-USD', 'BITSTAMP:BTCUSD', 2], ['ETH/USD', 'Ethereum', 'ETH-USD', 'BITSTAMP:ETHUSD', 2],
      ['SOL/USD', 'Solana', 'SOL-USD', 'COINBASE:SOLUSD', 2], ['XRP/USD', 'XRP', 'XRP-USD', 'BITSTAMP:XRPUSD', 4],
      ['LTC/USD', 'Litecoin', 'LTC-USD', 'BITSTAMP:LTCUSD', 2],
    ],
    tabsTitle: ['Trade crypto', 'on your terms.'],
    tabs: [
      ['Why crypto with ByteFX', [
        ['wallet', 'No wallet to manage', 'Trade the price as a CFD. There are no coins, keys or exchange accounts to secure.'],
        longShort('a coin'),
        ['layers', 'One account, six markets', 'Trade crypto next to forex, stocks, commodities, indices and energy on MetaTrader 5.'],
      ]],
      ['How crypto CFDs work', [
        ['market-crypto', 'Price exposure', 'A crypto CFD follows the coin’s price. Your result is the difference between your opening and closing price.'],
        margin('BTCUSD'),
        ['refresh', 'Overnight positions', 'Positions held overnight may be charged or credited a swap. Each symbol’s specification in MetaTrader 5 shows the rate.'],
      ]],
      ['What moves crypto', [
        ['globe', 'Adoption and flows', 'Institutional demand, fund flows and new uses shape demand over time.'],
        ['doc', 'Regulation', 'New rules and approvals in major economies can move prices quickly, in either direction.'],
        ['bolt', 'Weekend moves', 'Crypto trades 24/7, so prices can move while other markets are closed. Use stop-loss orders to manage risk.'],
      ]],
    ],
    faqs: [
      ['What is crypto CFD trading?', 'Trading a crypto CFD means speculating on a coin’s price without owning it. You can go long or short, and there is no wallet or private key to manage.'],
      ['When can I trade crypto?', 'Crypto markets trade 24 hours a day, seven days a week, including weekends.'],
      ['Which cryptocurrencies can I trade?', 'ByteFX offers Bitcoin, Ethereum and other leading cryptocurrencies. The full list is in MetaTrader 5.'],
      ['Are there overnight charges on crypto?', 'Positions held overnight may be charged or credited a swap. You can see the rate in each symbol’s specification in MetaTrader 5.'],
    ],
    calc: 'BTCUSD',
  },
  {
    id: 'stocks', name: 'Stocks', icon: 'market-shares', note: 'Leading companies across global exchanges.',
    title: 'Global blue chips, from one screen.',
    body: 'Trade CFDs on leading companies listed on global exchanges, with flexible leverage and real-time data. Go long when you expect a share to rise, or short when you expect it to fall.',
    examples: [],
    facts: [['Coverage', 'Global blue chips'], ['Prices', 'Real-time data'], ['Direction', 'Long or short']],
    image: '/assets/markets/stocks.webp', alt: 'Glass bar chart rising under a lime arrow',
    hero: { title: 'Trade the world’s', accent: 'leading companies.', lede: 'CFDs on global blue chips with real-time data. Go long or short on the companies you follow, from one account.' },
    instruments: {
      title: 'Global', accent: 'blue chips.', body: 'Trade share price moves in well-known companies listed on the world’s major exchanges.',
      stats: [['150+', '', 'Instruments, all markets'], ['Long', '& short', 'Trade both ways'], ['Live', '', 'Real-time prices'], ['~20', 'ms', 'Average execution']],
    },
    rows: [
      ['Apple', 'AAPL', 'AAPL', 'NASDAQ:AAPL', 2], ['Microsoft', 'MSFT', 'MSFT', 'NASDAQ:MSFT', 2], ['NVIDIA', 'NVDA', 'NVDA', 'NASDAQ:NVDA', 2],
      ['Amazon', 'AMZN', 'AMZN', 'NASDAQ:AMZN', 2], ['Tesla', 'TSLA', 'TSLA', 'NASDAQ:TSLA', 2], ['Meta', 'META', 'META', 'NASDAQ:META', 2],
      ['Alphabet', 'GOOGL', 'GOOGL', 'NASDAQ:GOOGL', 2], ['Netflix', 'NFLX', 'NFLX', 'NASDAQ:NFLX', 2],
    ],
    tabsTitle: ['Trade shares', 'without buying them.'],
    tabs: [
      ['Why stocks with ByteFX', [
        ['market-shares', 'Global blue chips', 'Trade CFDs on leading companies listed on major global exchanges.'],
        longShort('a share price'),
        ['chart', 'Real-time data', 'Follow prices and charts in real time on MetaTrader 5.'],
      ]],
      ['How stock CFDs work', [
        ['doc', 'The price, not the share', 'A stock CFD tracks a company’s share price. You don’t own the shares or get shareholder voting rights.'],
        ['globe', 'Exchange hours', 'Each stock CFD trades during its home exchange’s session. Check session times in MetaTrader 5.'],
        margin(null),
      ]],
      ['What moves shares', [
        ['bell', 'Earnings', 'Quarterly results and guidance are often the biggest moments in a company’s year.'],
        ['chart', 'The economy', 'Interest rates, inflation and growth change what investors will pay for future profits.'],
        ['megaphone', 'Company news', 'Product launches, deals and leadership changes can reprice a company in minutes.'],
      ]],
    ],
    faqs: [
      ['What is a stock CFD?', 'A stock CFD is a contract that follows a company’s share price. You profit or lose on the difference between your opening and closing price.'],
      ['Do I own the shares?', 'No. A CFD gives you exposure to the share price only, so you don’t own the shares or receive shareholder voting rights.'],
      ['When can I trade stocks?', 'Stock CFDs trade during the hours of the exchange where each company is listed. Session times are shown in MetaTrader 5.'],
      ['Can I trade falling share prices?', 'Yes. You can go short when you expect a share price to fall, as well as long when you expect it to rise.'],
    ],
    calc: null,
  },
  {
    id: 'commodities', name: 'Commodities', icon: 'market-commodities', note: 'Metals, agriculture and other essentials.',
    title: 'Metals and softs that react to the real world.',
    body: 'Diversify with precious metals and soft commodities. These markets often move differently from equities, which can help balance a portfolio against inflation and geopolitical shifts.',
    examples: ['Gold', 'Silver', 'Coffee', 'Sugar', 'Cotton'],
    facts: [['Types', 'Metals and softs'], ['Contracts', 'Spot and futures-based'], ['Drivers', 'Supply, demand, USD']],
    image: '/assets/markets/commodities.webp', alt: 'A fine gold bar and two silver bars wrapped in a ribbon of liquid gold',
    hero: { title: 'Trade gold, silver', accent: 'and soft commodities.', lede: 'Diversify with precious metals and softs such as coffee, sugar and cotton, markets that often move differently from shares.' },
    instruments: {
      title: 'Gold, silver', accent: 'and softs.', body: 'Trade precious metals and agricultural markets as CFDs, long or short, next to the rest of your portfolio.',
      stats: [['Gold', '& silver', 'Precious metals'], ['3', 'softs', 'Coffee, sugar, cotton'], ['Long', '& short', 'Trade both ways'], ['~20', 'ms', 'Average execution']],
    },
    rows: [
      ['Gold', 'XAU/USD', 'GC=F', 'OANDA:XAUUSD', 2], ['Silver', 'XAG/USD', 'SI=F', 'OANDA:XAGUSD', 3],
      ['Coffee', 'Arabica', 'KC=F', 'ICEUS:KC1!', 2], ['Sugar', 'Raw sugar', 'SB=F', 'ICEUS:SB1!', 2], ['Cotton', 'Cotton', 'CT=F', 'ICEUS:CT1!', 2],
    ],
    tabsTitle: ['Trade commodities', 'in one place.'],
    tabs: [
      ['Why commodities with ByteFX', [
        ['market-commodities', 'Gold and silver', 'Trade the two most-watched precious metals as CFDs, long or short.'],
        ['layers', 'Softs', 'Coffee, sugar and cotton add markets driven by harvests and the weather.'],
        ['chart', 'Diversification', 'Commodities often move differently from shares, which can help balance a portfolio.'],
      ]],
      ['How commodity CFDs work', [
        ['doc', 'Spot and futures-based', 'Some commodity CFDs follow futures contracts and have expiry dates; others are spot, with no set expiry. Each symbol’s specification shows which.'],
        margin('XAUUSD'),
        longShort('a commodity'),
      ]],
      ['What moves commodities', [
        ['shield', 'Safe-haven demand', 'Gold often draws buyers in uncertain times, when investors look for a store of value.'],
        ['chart', 'The US dollar', 'Most commodities are priced in dollars, so a weaker dollar can lift prices and a stronger one can weigh on them.'],
        ['globe', 'Weather and harvests', 'Growing conditions in key regions drive the supply of coffee, sugar and cotton.'],
      ]],
    ],
    faqs: [
      ['What commodities can I trade?', 'CFDs on gold and silver, and softs such as coffee, sugar and cotton. Oil and natural gas are on the Energy page.'],
      ['Do commodity CFDs expire?', 'Some commodity CFDs are based on futures contracts and have expiry dates. Others are spot contracts with no set expiry.'],
      ['What moves commodity prices?', 'Mainly global supply and demand, geopolitical events, the weather (for softs) and changes in the value of the US dollar.'],
      ['How is margin calculated on gold?', 'Required margin is lots × contract size × price ÷ leverage. The trading calculator works it out in your account currency.'],
    ],
    calc: 'XAUUSD',
  },
  {
    id: 'indices', name: 'Indices', icon: 'market-indices', note: 'Track major global market benchmarks.',
    title: 'A whole market in a single trade.',
    body: 'An index tracks a basket of leading shares. Trading an index CFD lets you capture the movement of an entire market with one position, instead of picking individual companies.',
    examples: [],
    facts: [['Exposure', 'A market in one position'], ['Prices', 'Real-time data'], ['Direction', 'Long or short']],
    image: '/assets/markets/indices.webp', alt: 'A stack of glossy lime discs rising at an angle',
    hero: { title: 'Trade whole markets', accent: 'in one position.', lede: 'CFDs on the world’s leading stock indices. Take a view on an entire market instead of picking companies one by one.' },
    instruments: {
      title: 'The world’s', accent: 'leading indices.', body: 'From Wall Street to Frankfurt, London and Tokyo, trade benchmark indices long or short.',
      stats: [['1', 'trade', 'A whole market'], ['Long', '& short', 'Trade both ways'], ['Live', '', 'Real-time prices'], ['~20', 'ms', 'Average execution']],
    },
    rows: [
      ['US 500', 'S&P 500', '^GSPC', 'FOREXCOM:SPXUSD', 2], ['US Tech 100', 'Nasdaq 100', '^NDX', 'FOREXCOM:NSXUSD', 2],
      ['US 30', 'Dow Jones 30', '^DJI', 'FOREXCOM:DJI', 2], ['Germany 40', 'DAX 40', '^GDAXI', 'INDEX:DEU40', 2],
      ['UK 100', 'FTSE 100', '^FTSE', 'FOREXCOM:UKXGBP', 2], ['Japan 225', 'Nikkei 225', '^N225', 'INDEX:NKY', 2],
    ],
    tabsTitle: ['Trade indices', 'with one decision.'],
    tabs: [
      ['Why indices with ByteFX', [
        ['market-indices', 'A market in one trade', 'Take a view on an entire stock market instead of choosing individual companies.'],
        longShort('an index'),
        ['chart', 'Real-time data', 'Follow index prices and charts in real time on MetaTrader 5.'],
      ]],
      ['How index CFDs work', [
        ['layers', 'A basket of shares', 'An index tracks a group of leading companies, such as the largest on one exchange.'],
        ['doc', 'Points, not shares', 'Index prices move in points. Your result depends on the points moved and your position size.'],
        margin('US500'),
      ]],
      ['What moves indices', [
        ['bell', 'Central banks', 'Interest-rate decisions change borrowing costs and what investors will pay for shares.'],
        ['megaphone', 'Earnings season', 'Results from an index’s largest members can move the whole market.'],
        ['globe', 'Global sentiment', 'Growth, trade and geopolitical news often move indices around the world together.'],
      ]],
    ],
    faqs: [
      ['What is an index CFD?', 'An index CFD follows the price of a stock index, such as the US 500. It lets you trade the whole market’s movement in one position.'],
      ['Which indices can I trade?', 'ByteFX offers CFDs on leading global indices. The full list and each symbol’s details are in MetaTrader 5.'],
      ['How do index prices move?', 'Index prices move in points. Your profit or loss depends on how many points the index moves and the size of your position.'],
      ['When can I trade indices?', 'Index CFD hours follow the underlying market. Check each symbol’s session times in MetaTrader 5.'],
    ],
    calc: 'US500',
  },
  {
    id: 'energy', name: 'Energy', icon: 'market-energy', note: 'WTI, Brent and natural gas markets.',
    title: 'Crude oil and gas, on your terms.',
    body: 'Energy prices move with supply decisions, inventories, weather and the value of the US dollar. Trade WTI, Brent and natural gas CFDs alongside the rest of your markets.',
    examples: ['WTI crude', 'Brent crude', 'Natural gas'],
    facts: [['Markets', 'WTI, Brent, natural gas'], ['Drivers', 'Supply, weather, USD'], ['Direction', 'Long or short']],
    image: '/assets/markets/energy.webp', alt: 'A black oil barrel beside gold bars and a glass shares panel',
    hero: { title: 'Trade crude oil', accent: 'and natural gas.', lede: 'CFDs on WTI, Brent and natural gas, with prices that react to supply decisions, inventories and the weather.' },
    instruments: {
      title: 'WTI, Brent', accent: 'and natural gas.', body: 'Trade the two global crude benchmarks and natural gas, long or short, next to your other markets.',
      stats: [['3', 'markets', 'WTI, Brent, natural gas'], ['Long', '& short', 'Trade both ways'], ['Live', '', 'Real-time prices'], ['~20', 'ms', 'Average execution']],
    },
    rows: [['WTI crude', 'US oil', 'CL=F', 'TVC:USOIL', 2], ['Brent crude', 'UK oil', 'BZ=F', 'TVC:UKOIL', 2], ['Natural gas', 'Henry Hub', 'NG=F', 'NYMEX:NG1!', 3]],
    tabsTitle: ['Trade energy', 'on your terms.'],
    tabs: [
      ['Why energy with ByteFX', [
        ['market-energy', 'WTI and Brent', 'Trade both global crude benchmarks as CFDs.'],
        ['bolt', 'Natural gas', 'Add a strongly seasonal market that follows demand for heating and power.'],
        longShort('oil or gas'),
      ]],
      ['How energy CFDs work', [
        ['doc', 'Check the contract', 'Energy CFDs may follow futures or spot prices. Each symbol’s specification in MetaTrader 5 shows which, and any expiry date.'],
        ['globe', 'Two crude benchmarks', 'WTI reflects US supply; Brent, from the North Sea, prices much of the world’s oil.'],
        margin('USOIL'),
      ]],
      ['What moves energy', [
        ['globe', 'Production decisions', 'OPEC+ and US output set the supply side of the market.'],
        ['chart', 'Weekly inventories', 'US crude and gas storage reports often move prices on release.'],
        ['sun', 'Weather and season', 'Cold winters and hot summers lift demand for gas and power.'],
      ]],
    ],
    faqs: [
      ['What energy markets can I trade?', 'CFDs on WTI crude, Brent crude and natural gas.'],
      ['What is the difference between WTI and Brent?', 'They are the two global crude benchmarks. WTI reflects US supply, while Brent, from the North Sea, prices much of the world’s oil.'],
      ['What moves oil prices?', 'Production decisions, inventory reports, geopolitical events and the value of the US dollar.'],
      ['Do energy CFDs expire?', 'Some energy CFDs follow futures contracts and have expiry dates. Each symbol’s specification in MetaTrader 5 shows the details.'],
    ],
    calc: 'USOIL',
  },
];

/* TradingView [symbol, name] pairs, used by /tools/quotes and as the
   market pages' fallback price board. */
for (const market of markets) market.quotes = market.rows.map(([name, , , tv]) => [tv, name]);

export const findMarket = (id) => markets.find((market) => market.id === id);

/* The object Breadcrumbs, PageSchema and pageMetadata expect. The image is
   only used for link previews; the page itself shows no artwork. */
export function marketPage(market) {
  return {
    id: `market-${market.id}`, label: market.name, crumb: 'Markets', crumbHref: '/markets', path: `/markets/${market.id}`,
    title: market.hero.title, accent: market.hero.accent, description: market.hero.lede, art: market.image, alt: market.alt,
  };
}

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
