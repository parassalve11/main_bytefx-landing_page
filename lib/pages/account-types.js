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
