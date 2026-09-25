/* The four trader tools. Paths match the live bytefx.com tool URLs, so
   existing links and search results keep working. `art` is only used for
   link previews (Open Graph). */
export const tools = [
  {
    id: 'converter', path: '/tools/calculator', name: 'Currency Converter', note: 'Real-time exchange rates', icon: 'market-forex',
    eyebrow: 'Currency converter', title: 'Convert any currency', accent: 'In one step',
    description: 'Convert between major and local currencies, Bitcoin, Ethereum, USDT, gold and silver, with reference rates checked every minute.',
    points: ['30+ currencies, crypto and metals', 'Switch direction in one tap', 'Free to use, no sign-up'],
    art: '/assets/markets/tokens-dark.webp', alt: 'Glass coins marked with dollar, euro, pound and Bitcoin symbols',
  },
  {
    id: 'calculator', path: '/tools/trading-calculator', name: 'Trading Calculator', note: 'Calculate margin, pips & swaps', icon: 'percent',
    eyebrow: 'Trading calculator', title: 'Know the numbers', accent: 'Before you trade',
    description: 'Work out required margin, pip value and overnight swap for forex, metals, crypto, energy and indices, in your account currency.',
    points: ['Margin at any leverage', 'Pip value in your account currency', 'Swap over your holding period'],
    art: '/assets/generated/trading-conditions.webp', alt: 'Blue glass candlesticks inside a silver ring',
  },
  {
    id: 'calendar', path: '/tools/calendar', name: 'Economic Calendar', note: 'Key market-moving events', icon: 'bell',
    eyebrow: 'Economic calendar', title: 'The week’s market movers', accent: 'At a glance',
    description: 'Central bank decisions, inflation, jobs figures and other releases, with the expected impact of each. Filter by importance to focus on what moves your markets.',
    art: '/assets/generated/navigation/calendar.png', alt: 'Blue glass calendar with a silver clock and an economic chart',
  },
  {
    id: 'quotes', path: '/tools/quotes', name: 'Market Quotes', note: 'Real-time price tracking', icon: 'market-indices',
    eyebrow: 'Market quotes', title: 'Six markets', accent: 'One live board',
    description: 'Follow forex, crypto, stocks, commodities, indices and energy prices in one place, with the day’s change for every instrument.',
    art: '/assets/generated/navigation/markets.png', alt: 'Glass globe with gold bars and blue market chart columns',
  },
];

export const findTool = (id) => tools.find((tool) => tool.id === id);

export function toolPage(tool) {
  return { id: `tool-${tool.id}`, label: tool.name, crumb: 'Tools', crumbHref: '/markets#tools', path: tool.path, eyebrow: tool.eyebrow, title: tool.title, accent: tool.accent, description: tool.description, art: tool.art, alt: tool.alt };
}
