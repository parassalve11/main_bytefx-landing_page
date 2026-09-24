import { site } from '@/lib/content';

// Account conditions as published on bytefx.com. The third account is offered
// as a Custom plan: raw pricing, priced with the client around their volume.
export const leverageNote = 'Maximum leverage depends on instrument class and account equity. Trading on leverage carries a high level of risk.';

const sculpture = (name) => ({ art: `/assets/broker/sculptures/${name}.webp`, lightArt: `/assets/broker/sculptures/blue/${name}.webp` });

export const accounts = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'The entry point for new traders exploring global markets with zero commission and high flexibility.',
    summary: 'Zero commission, a $20 start and swap-free support.',
    deposit: 20,
    specs: [['Min. deposit', '$20'], ['Spread from', '1.9 pips'], ['Spread type', 'Variable'], ['Commission', 'Zero'], ['Max leverage', '1:2000*'], ['Min. volume per trade', '0.01 lot'], ['Swap-free support', true], ['Platform', 'MetaTrader 5']],
    cta: { label: 'Open your account', href: site.registerUrl },
    ...sculpture('accounts'),
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For experienced traders who need tighter spreads and stronger execution on higher volume.',
    summary: 'Spreads from 1.0 pips and zero commission, from $2,000.',
    deposit: 2000,
    specs: [['Min. deposit', '$2,000'], ['Spread from', '1.0 pips'], ['Spread type', 'Variable'], ['Commission', 'Zero'], ['Max leverage', '1:2000*'], ['Min. volume per trade', '0.01 lot'], ['Swap-free support', false], ['Platform', 'MetaTrader 5']],
    cta: { label: 'Open your account', href: site.registerUrl },
    ...sculpture('spreads'),
  },
  {
    id: 'custom',
    name: 'Custom',
    kicker: 'Custom account',
    title: 'Pricing built around your volume.',
    description: 'Raw spreads and direct market access for professionals trading with institutional precision. Tell us how you trade and we’ll shape the right plan with you.',
    summary: 'Raw spreads from 0.0 pips with an $8 round-turn commission.',
    points: ['Raw spreads from 0.0 pips', '$8 round turn commission', 'Swap-free support available', 'MetaTrader 5, from 0.01 lot'],
    cta: { label: 'Contact for a plan', href: '/contact' },
    ...sculpture('execution'),
  },
];
