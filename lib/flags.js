/* Flags for the market price tables.

   A row only carries a flag where one is meaningful: a currency pair shows both
   of its currencies, an index or a share the market it is listed on, an energy
   benchmark its home market. Metals, softs and crypto belong to no country, so
   those tables show no flags at all rather than a misleading one. */

const currencyFlags = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp',
  CHF: 'ch', AUD: 'au', CAD: 'ca', NZD: 'nz',
};

const symbolFlags = {
  /* indices */
  'US 500': ['us'], 'US Tech 100': ['us'], 'US 30': ['us'],
  'Germany 40': ['de'], 'UK 100': ['gb'], 'Japan 225': ['jp'],
  /* energy */
  'WTI crude': ['us'], 'Brent crude': ['gb'], 'Natural gas': ['us'],
};

const PAIR = /^([A-Z]{3})\/([A-Z]{3})$/;

export function flagsFor(market, label) {
  /* Every share we list trades on a US exchange. */
  if (market === 'stocks') return ['us'];

  const pair = PAIR.exec(label);
  if (pair) {
    const base = currencyFlags[pair[1]];
    const quote = currencyFlags[pair[2]];
    /* Both sides have to be currencies — BTC/USD is not a country pair. */
    if (base && quote) return [base, quote];
  }

  return symbolFlags[label] || [];
}
