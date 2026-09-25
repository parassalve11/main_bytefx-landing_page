import { site } from '@/lib/content';

/* Company pages. Copy follows bytefx.com (About, Help Desk, site footer);
   Why ByteFX gathers the same published facts. */

export const aboutPage = {
  id: 'about', label: 'About ByteFX', crumb: 'Company', path: '/about', eyebrow: 'About ByteFX Capital Ltd.',
  title: 'Empowering traders', accent: 'with innovation and trust',
  description: 'ByteFX Capital Ltd. brings together advanced trading technology and a human-centric approach. We serve thousands of active traders worldwide, providing the tools needed for professional growth in global financial markets.',
  art: '/assets/partner/bytefx-glass-mark.webp', alt: 'The ByteFX logo mark rendered in green and blue glass',
  primary: { label: 'Open your account', href: site.registerUrl }, secondary: { label: 'Contact us', href: '/contact' },
  stats: [['1:2000*', 'Leverage up to'], ['0.1 pips', 'Tight spreads from*'], ['150+', 'Tradable instruments'], ['~20 ms', 'Average execution']],
};
export const values = [
  ['spark', 'Innovation', 'We embrace purposeful innovation — crafting tools and features that elevate the trading experience rather than overwhelm it.'],
  ['users', 'Client-first', 'Our platform is shaped around real trader needs. From support to security, every enhancement begins with our community in mind.'],
  ['shield', 'Integrity', 'We operate with honesty, transparency and accountability, so trust stays at the core of every interaction.'],
  ['chat', 'Community', 'ByteFX is more than a platform — it’s a collaborative space where traders share, learn and celebrate progress together.'],
];
export const aboutFaqs = [
  ['What markets can I trade with ByteFX Capital Ltd.?', 'Forex, commodities, indices, metals, stocks and cryptocurrencies — all from a single secure account.'],
  ['What is the minimum deposit to start trading?', 'You can start with a minimum deposit of just $20 on a Standard account.'],
  ['Is my trading account and personal data secure?', 'Yes. ByteFX uses bank-level SSL encryption and keeps client money in segregated accounts, so your funds and personal information are protected.'],
  ['Which trading platform does ByteFX support?', 'MetaTrader 5 (MT5), the industry standard for high-performance trading, on desktop, web and mobile.'],
];

export const whyPage = {
  id: 'why', label: 'Why choose us', crumb: 'Company', path: '/why-bytefx', eyebrow: 'Why choose us',
  title: 'Conditions that work', accent: 'as hard as you do',
  description: 'Spreads from 0.0 pips, leverage up to 1:2000*, execution around 20 ms and support that answers 24/6 — all on MetaTrader 5, from a $20 start.',
  art: '/assets/generated/trading-conditions.webp',
  alt: 'Crystal trading candlesticks and a platinum speed dial',
  primary: { label: 'Open your account', href: site.registerUrl }, secondary: { label: 'Compare accounts', href: '/trading/account-types' },
  note: '* Maximum leverage depends on instrument class and account equity.',
  stats: [['0.0 pips', 'Raw spreads from'], ['1:2000*', 'Leverage up to'], ['150+', 'Tradable instruments'], ['24/6', 'Dedicated support']],
};
export const reasons = [
  ['bolt', 'Execution around 20 ms', 'Fast fills help keep slippage low. In very volatile moments, some slippage can still occur.'],
  ['wallet', 'A $20 start', 'Open a Standard account from $20 with zero commission. Pro and Standard both trade commission-free.'],
  ['percent', 'Spreads from 0.0 pips', 'Raw pricing on Custom plans with an $8 round-turn commission; variable spreads from 1.9 and 1.0 pips on Standard and Pro.'],
  ['layers', '150+ instruments', 'Forex, crypto, stocks, commodities, indices and energy from one account.'],
  ['download', 'Withdrawals that move', 'Crypto and USDT withdrawals are instant. Cards and Apple Pay take up to 24 hours; bank wire 1–3 days.'],
  ['lock', 'Protected by design', 'Bank-level SSL encryption and segregated client accounts keep your funds and data safe.'],
];
export const mt5Downloads = [
  ['windows', 'Windows', 'https://download.terminal.free/cdn/web/bytefx.capital.ltd/mt5/bytefxcapital5setup.exe'],
  ['apple', 'macOS', 'https://download.terminal.free/cdn/web/metaquotes.ltd/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos'],
  ['apple', 'iOS', 'https://download.terminal.free/cdn/mobile/mt5/ios?server=BytefxCapital-Trade'],
  ['android', 'Android', 'https://download.terminal.free/cdn/web/metaquotes.software.corp/mt5/metatrader5.apk?utm_source=www.metatrader5.com&utm_campaign=install.metaquotes'],
  ['globe', 'Web', site.registerUrl],
];
export const withdrawalSpeeds = [
  ['bitcoin', 'Crypto', 'Instant'], ['tether', 'USDT', 'Instant'], ['visa', 'Visa', 'Up to 24h'],
  ['mastercard-color', 'Mastercard', 'Up to 24h'], ['applepay', 'Apple Pay', 'Up to 24h'], ['bank', 'Bank wire', '1–3 days'],
];

export const contactPage = {
  id: 'contact', label: 'Contact us', crumb: 'Company', path: '/contact', eyebrow: '24/6 global support',
  title: 'Talk to a real person', accent: 'Any hour, six days a week',
  description: 'Have a question about our trading platforms, account types or partnership? Our team is here to help — by live chat, email or phone.',
  art: '/assets/broker/sculptures/support.webp', lightArt: '/assets/broker/sculptures/blue/support.webp', alt: 'Layered glass conversation bubbles',
};
