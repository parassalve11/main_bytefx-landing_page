/* [symbol, display name] pairs → TradingView market-quotes groups.
   Kept out of tv-widget.jsx (a client module) so server pages can call it. */
export const quoteGroups = (groups) => groups.map(({ name, quotes }) => ({
  name,
  originalName: name,
  symbols: quotes.map(([symbol, displayName]) => ({ name: symbol, displayName })),
}));
