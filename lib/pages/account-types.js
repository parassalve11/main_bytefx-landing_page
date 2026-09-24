import { artwork } from '@/lib/artwork';
import { site } from '@/lib/content';

export const accountPage = {
  id: 'accounts', label: 'Account types', path: '/trading/account-types', eyebrow: 'Your strategy. Your account.',
  title: 'Pick the account that', accent: 'fits your strategy.',
  description: 'Start with Standard from $20. Trade tighter spreads with Pro. Or build a Custom plan with raw pricing around your volume.',
  art: artwork.accounts.dark, lightArt: artwork.accounts.light, artFrameRatio: '1 / 1',
  alt: 'A folder holding three account cards labelled Standard, Pro and Custom',
  primary: { label: 'Open your account', href: site.registerUrl }, secondary: { label: 'See the three accounts', href: '#account-options' },
  stats: [['3', 'Account types'], ['$20', 'Minimum deposit'], ['0.0 pips', 'Raw spreads from'], ['1:2000*', 'Maximum leverage']],
};
export const accountFaqs = [
  ['Which account is best for beginners?', 'Standard is built for new traders: a $20 minimum deposit, zero commission, spreads from 1.9 pips and swap-free support.'],
  ['What is the minimum deposit?', 'Standard starts at $20 and Pro at $2,000. Custom plans are agreed with you around your trading volume.'],
  ['How is the Custom commission charged?', 'Custom accounts trade raw spreads from 0.0 pips with an $8 round-turn commission, covering the opening and closing of a position.'],
  ['Is a swap-free account available?', 'Swap-free support is available on Standard and Custom accounts. It is not included on Pro.'],
  ['Does maximum leverage apply to every instrument?', 'No. Leverage of up to 1:2000 depends on the instrument class and your account equity. Leverage increases potential losses as well as profits.'],
  ['Can I open more than one trading account?', 'Yes. You can open several trading accounts under one profile, which lets you run different strategies side by side.'],
  ['Which platform do the accounts use?', 'Every account trades on MetaTrader 5, on Windows, macOS, iOS, Android and the web. Expert Advisors and automated strategies are supported.'],
  ['Can I change my account type later?', 'Contact support by email or live chat. The team will guide you through the change and any verification it needs.'],
];
