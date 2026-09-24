import { artwork } from '@/lib/artwork';
﻿import { site } from '@/lib/content';

export const gettingStartedPage = {
  id: 'getting-started', label: 'Getting started', path: '/trading/getting-started',
  eyebrow: 'A clear place to begin', title: 'From sign-up', accent: 'to your first trade.',
  description: 'One step at a time. Get your account ready, choose your platform and build a routine before you enter the market.',
  art: artwork.platforms.dark, lightArt: artwork.platforms.light, artFrameRatio: '3 / 2', alt: 'ByteFX trading and account screens across a laptop, tablet and phone',
  primary: { label: 'See the four steps', href: '#register' }, secondary: { label: 'Compare accounts', href: '/trading/account-types' },
  stats: [['01', 'Register'], ['02', 'Verify'], ['03', 'Fund'], ['04', 'Trade']],
};
export const setupSteps = [
  {
    id: 'register', title: 'Make it your account.', eyebrow: '01 / Register',
    body: 'Choose the account that fits the way you plan to trade. Use your own details and an email address you can access.',
    needs: ['Your personal contact details', 'An account type to explore'],
    tip: 'Registration takes a few clicks in the ByteFX client area. Support can help if anything gets stuck.',
    art: '/assets/generated/account-choice.webp', alt: 'Three glass account cards',
    action: { label: 'Open your account', href: site.registerUrl },
  },
  {
    id: 'verify', title: 'Get the essentials ready.', eyebrow: '02 / Verify',
    body: 'Follow the verification requirements shown in your account. Preparing clear, current documents helps you avoid unnecessary back-and-forth.',
    needs: ['A valid government-issued ID, such as a passport or driving licence', 'A recent utility bill or bank statement as proof of address'],
    tip: 'Use the secure upload flow in your account. Do not send identity documents through this website or its chat.',
    art: '/assets/broker/sculptures/accounts.webp', alt: 'Three sculptural keys representing account access',
    action: { label: 'Prepare your checklist', href: '#verification' },
  },
  {
    id: 'fund', title: 'Give your account a starting point.', eyebrow: '03 / Fund',
    body: 'Review the funding options available to your account, then check the amount, currency and payment details before confirming.',
    needs: ['A payment method in your own name', 'The current instructions in your account'],
    tip: 'Standard accounts start from $20. Deposits are generally free, though your payment provider may charge its own fee.',
    art: '/assets/generated/wallet-payment-methods.webp', alt: 'A wallet with payment-method coins rising out of it',
    action: { label: 'Explore funding', href: '/trading/funding' },
  },
  {
    id: 'trade', title: 'Make your first move a considered one.', eyebrow: '04 / Trade',
    body: 'Connect your platform, find your instrument and review its conditions. Check order size, direction and risk settings before placing an order.',
    needs: ['Your platform login and server details', 'An order size and risk plan you understand'],
    tip: 'Start with small positions while the platform is new to you. Leveraged trading can result in the loss of your entire investment.',
    art: '/assets/generated/execution.webp', alt: 'Lime and glass execution sculpture',
    action: { label: 'Explore mobile trading', href: '/trading/mobile-app' },
  },
];
export const verificationItems = [
  ['identity', 'Proof of identity', 'A valid government-issued ID, such as a passport or driving licence.'],
  ['address', 'Proof of address', 'A recent utility bill or bank statement showing your name and address.'],
  ['details', 'Matching details', 'Check that your name and personal details are consistent with your account.'],
  ['readable', 'Clear, complete images', 'Keep all document edges visible. Avoid glare, cropping and unreadable text.'],
];
export const gettingStartedFaqs = [
  ['How long does verification take?', 'Most accounts are verified within 24 hours once all required documents are submitted. Clear, complete images help avoid delays.'],
  ['Which documents are accepted?', 'A valid government-issued ID (passport or driving licence) and a recent utility bill or bank statement as proof of address. Follow the instructions in your account; this checklist is for preparation only.'],
  ['How much do I need to deposit?', 'Standard starts from $20 and Pro from $2,000. Custom plans are agreed with you around your trading volume.'],
  ['What is the smallest first trade?', 'The minimum trade size is 0.01 lots on every account. Check the instrument’s contract size and margin requirements in MetaTrader 5 before trading.'],
  ['Can I practise before trading with real money?', 'Yes. Free demo accounts with virtual funds can be opened from the ByteFX client area, so you can test the platform before going live.'],
  ['Where can I get help?', 'Contact support@bytefx.com or call +1-758-572-0353. Never share your account password or one-time security codes.'],
];
