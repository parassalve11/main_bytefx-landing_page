import { site } from '@/lib/content';

/* Company pages. Copy follows bytefx.com (About, Help Desk, site footer);
   Why ByteFX and Trust & security gather the same published facts. */

export const aboutPage = {
  id: 'about', label: 'About ByteFX', crumb: 'Company', path: '/about', eyebrow: 'About ByteFX Capital Ltd.',
  title: 'Empowering traders', accent: 'with innovation and trust.',
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
  id: 'why', label: 'Why ByteFX', crumb: 'Company', path: '/why-bytefx', eyebrow: 'Why ByteFX',
  title: 'Conditions that work', accent: 'as hard as you do.',
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

export const trustPage = {
  id: 'trust', label: 'Trust & security', crumb: 'Company', path: '/trust-security', eyebrow: 'Trust & security',
  title: 'Built around trust.', accent: 'Protected at every step.',
  description: 'Segregated client accounts, bank-level SSL encryption and verified identities on every account. Here is how your money and data are protected — and how you can help protect them too.',
  art: '/assets/generated/partnership.png', alt: 'Interlocking crystal glass rings with lime highlights and a mirrored reflection',
  primary: { label: 'How we protect you', href: '#protection' }, secondary: { label: 'Policy documents', href: '#documents' },
  stats: [['SSL', 'Bank-level encryption'], ['Segregated', 'Client accounts'], ['24h', 'Typical verification'], ['24/6', 'Support']],
};
export const protections = [
  ['layers', 'Segregated client accounts', 'Client funds are held separately from the company’s own money, so your balance is kept apart from operating funds.'],
  ['lock', 'Bank-level SSL encryption', 'Your data, enquiries and account activity travel over encrypted connections, backed by strict data-privacy protocols.'],
  ['badge', 'Verified identities', 'Every account completes KYC — a government-issued ID and proof of address — to prevent fraud and money laundering.'],
  ['shield', 'Anti-money-laundering controls', 'ByteFX follows a published AML compliance policy that sets out how money laundering is prevented, starting with verified identities.'],
];
export const officialChannels = [
  ['globe', 'Website', 'bytefx.com', 'https://www.bytefx.com/'],
  ['lock', 'Client area', 'my.bytefx.com', site.portalLoginUrl],
  ['mail', 'Email', site.email, `mailto:${site.email}`],
  ['phone', 'Phone', site.phone, `tel:${site.phoneHref}`],
  ['telegram', 'Telegram community', 't.me/bytefxcaptial', site.telegramUrl],
];
export const safetyHabits = [
  ['Log in only at my.bytefx.com', 'Type the address yourself or use a saved bookmark. Treat links in unexpected messages with suspicion.'],
  ['Keep passwords and codes to yourself', 'Never share your password or one-time security codes with anyone, including someone claiming to be from ByteFX.'],
  ['Pay from accounts in your own name', 'Deposits and withdrawals must use payment methods that match the name on your ByteFX account.'],
  ['Match the crypto network', 'Send only on the network shown in your account. A network mismatch can mean the funds are lost.'],
  ['Report anything unusual', 'If something looks wrong, contact support by live chat or email straight away.'],
];
export const trustFaqs = [
  ['How are my funds protected?', 'Client money is held in segregated accounts, separate from ByteFX’s own funds, and all account activity is protected by bank-level SSL encryption.'],
  ['Why do I need to verify my identity?', 'KYC (Know Your Customer) is a mandatory regulatory requirement. It confirms your identity and address to prevent fraud and money laundering.'],
  ['Which documents do I need?', 'A valid government-issued ID, such as a passport or driving licence, and a recent utility bill or bank statement as proof of address.'],
  ['How long does verification take?', 'Most accounts are verified within 24 hours once all required documents are submitted.'],
  ['How do I recover my password?', 'Use the “Forgot password” link on the login page at my.bytefx.com and follow the instructions sent to your registered email.'],
  ['How do I change my account details?', 'Contact support by email or live chat. The team will guide you through the verification needed to keep your account secure.'],
];

export const contactPage = {
  id: 'contact', label: 'Contact us', crumb: 'Company', path: '/contact', eyebrow: '24/6 global support',
  title: 'Talk to a real person.', accent: 'Any hour, six days a week.',
  description: 'Have a question about our trading platforms, account types or partnership? Our team is here to help — by live chat, email or phone.',
  art: '/assets/broker/sculptures/support.webp', lightArt: '/assets/broker/sculptures/blue/support.webp', alt: 'Layered glass conversation bubbles',
};
export const contactChannels = [
  ['chat', 'Live chat', 'Click to chat, 24/6', site.liveChatUrl, 'Start a chat'],
  ['mail', 'Email support', site.email, `mailto:${site.email}`, 'Send an email'],
  ['phone', 'Global support', site.phone, `tel:${site.phoneHref}`, 'Call us'],
  ['telegram', 'Telegram community', '5,000+ active traders', site.telegramUrl, 'Join the community'],
];

export const legalPage = {
  id: 'legal', label: 'Legal & compliance', crumb: 'Company', path: '/legal', eyebrow: 'Legal & compliance',
  title: 'Clear terms.', accent: 'Nothing hidden.',
  description: 'The documents that govern your ByteFX account, how we handle your data and money, and the risks of trading leveraged products — all in one place.',
  art: '/assets/broker/sculptures/accounts.webp', lightArt: '/assets/broker/sculptures/blue/accounts.webp', alt: 'Three keys resting in a reflective dock',
};
