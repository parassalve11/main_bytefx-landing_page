/* Shared data for the on-site tools.

   CONTRACT SPECIFICATIONS ARE A DRAFT. Contract sizes, pip sizes and digits
   below follow common MetaTrader 5 conventions, not ByteFX's published
   specifications (none have been supplied yet). Replace them with the values
   from ByteFX's MT5 symbol specifications before launch. The calculator shows
   a visible "draft" note while `specsConfirmed` is false.

   `base` means the calculator can price the symbol from /api/rates:
   price = rates[quote] / rates[base]. Symbols without a `base` (energy,
   indices) need the visitor to type the price. */

export const specsConfirmed = false;

export const instruments = [
  { symbol: 'EURUSD', label: 'EUR/USD', group: 'Forex', base: 'EUR', quote: 'USD', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'GBPUSD', label: 'GBP/USD', group: 'Forex', base: 'GBP', quote: 'USD', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'USDJPY', label: 'USD/JPY', group: 'Forex', base: 'USD', quote: 'JPY', contract: 100000, pip: 0.01, digits: 3 },
  { symbol: 'USDCHF', label: 'USD/CHF', group: 'Forex', base: 'USD', quote: 'CHF', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'AUDUSD', label: 'AUD/USD', group: 'Forex', base: 'AUD', quote: 'USD', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'USDCAD', label: 'USD/CAD', group: 'Forex', base: 'USD', quote: 'CAD', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'NZDUSD', label: 'NZD/USD', group: 'Forex', base: 'NZD', quote: 'USD', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'EURGBP', label: 'EUR/GBP', group: 'Forex', base: 'EUR', quote: 'GBP', contract: 100000, pip: 0.0001, digits: 5 },
  { symbol: 'EURJPY', label: 'EUR/JPY', group: 'Forex', base: 'EUR', quote: 'JPY', contract: 100000, pip: 0.01, digits: 3 },
  { symbol: 'GBPJPY', label: 'GBP/JPY', group: 'Forex', base: 'GBP', quote: 'JPY', contract: 100000, pip: 0.01, digits: 3 },
  { symbol: 'XAUUSD', label: 'Gold', group: 'Metals', base: 'XAU', quote: 'USD', contract: 100, pip: 0.1, digits: 2 },
  { symbol: 'XAGUSD', label: 'Silver', group: 'Metals', base: 'XAG', quote: 'USD', contract: 5000, pip: 0.01, digits: 3 },
  { symbol: 'BTCUSD', label: 'Bitcoin', group: 'Crypto', base: 'BTC', quote: 'USD', contract: 1, pip: 1, digits: 2 },
  { symbol: 'ETHUSD', label: 'Ethereum', group: 'Crypto', base: 'ETH', quote: 'USD', contract: 1, pip: 0.1, digits: 2 },
  { symbol: 'USOIL', label: 'WTI crude', group: 'Energy', quote: 'USD', contract: 1000, pip: 0.01, digits: 2 },
  { symbol: 'UKOIL', label: 'Brent crude', group: 'Energy', quote: 'USD', contract: 1000, pip: 0.01, digits: 2 },
  { symbol: 'XNGUSD', label: 'Natural gas', group: 'Energy', quote: 'USD', contract: 10000, pip: 0.001, digits: 3 },
  { symbol: 'US30', label: 'US 30', group: 'Indices', quote: 'USD', contract: 1, pip: 1, digits: 1 },
  { symbol: 'US500', label: 'US 500', group: 'Indices', quote: 'USD', contract: 1, pip: 1, digits: 1 },
  { symbol: 'NAS100', label: 'US Tech 100', group: 'Indices', quote: 'USD', contract: 1, pip: 1, digits: 1 },
  { symbol: 'GER40', label: 'Germany 40', group: 'Indices', quote: 'EUR', contract: 1, pip: 1, digits: 1 },
  { symbol: 'UK100', label: 'UK 100', group: 'Indices', quote: 'GBP', contract: 1, pip: 1, digits: 1 },
  { symbol: 'JP225', label: 'Japan 225', group: 'Indices', quote: 'JPY', contract: 1, pip: 1, digits: 0 },
];

export const instrumentGroups = [...new Set(instruments.map((item) => item.group))];
export const findInstrument = (symbol) => instruments.find((item) => item.symbol === String(symbol || '').toUpperCase());

export const accountCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];
export const leverageOptions = [1, 10, 50, 100, 200, 500, 1000, 2000];

/* Currency converter list. `kind` decides the number format. */
export const currencies = [
  ['USD', 'US dollar'], ['EUR', 'Euro'], ['GBP', 'British pound'], ['JPY', 'Japanese yen'],
  ['AUD', 'Australian dollar'], ['CAD', 'Canadian dollar'], ['CHF', 'Swiss franc'], ['NZD', 'New Zealand dollar'],
  ['CNY', 'Chinese yuan'], ['HKD', 'Hong Kong dollar'], ['SGD', 'Singapore dollar'], ['INR', 'Indian rupee'],
  ['AED', 'UAE dirham'], ['SAR', 'Saudi riyal'], ['ZAR', 'South African rand'], ['NGN', 'Nigerian naira'],
  ['KES', 'Kenyan shilling'], ['THB', 'Thai baht'], ['MYR', 'Malaysian ringgit'], ['IDR', 'Indonesian rupiah'],
  ['PHP', 'Philippine peso'], ['VND', 'Vietnamese dong'], ['KRW', 'South Korean won'], ['PKR', 'Pakistani rupee'],
  ['BRL', 'Brazilian real'], ['MXN', 'Mexican peso'], ['PEN', 'Peruvian sol'], ['TRY', 'Turkish lira'],
  ['PLN', 'Polish zloty'], ['SEK', 'Swedish krona'], ['NOK', 'Norwegian krone'], ['DKK', 'Danish krone'],
].map(([code, name]) => ({ code, name, kind: 'fiat' })).concat([
  { code: 'BTC', name: 'Bitcoin', kind: 'crypto' },
  { code: 'ETH', name: 'Ethereum', kind: 'crypto' },
  { code: 'USDT', name: 'Tether', kind: 'crypto' },
  { code: 'XAU', name: 'Gold (troy ounce)', kind: 'metal' },
  { code: 'XAG', name: 'Silver (troy ounce)', kind: 'metal' },
]);

/* Every code /api/rates has to return. */
export const rateCodes = [...new Set([
  ...currencies.map((item) => item.code),
  ...accountCurrencies,
  ...instruments.flatMap((item) => [item.base, item.quote].filter(Boolean)),
])];

/* Rates are "units per 1 USD". Returns null when either side is missing. */
export function convert(amount, from, to, rates) {
  if (!rates || !Number.isFinite(amount)) return null;
  if (from === to) return amount;
  const a = rates[from];
  const b = rates[to];
  return a > 0 && b > 0 ? (amount / a) * b : null;
}

export function livePrice(instrument, rates) {
  if (!instrument?.base || !rates) return null;
  return convert(1, instrument.base, instrument.quote, rates);
}
