import { paymentMethods } from '@/lib/payments';

export const fundingPage = {
  id: 'funding', label: 'Funding & withdrawals', path: '/trading/funding',
  eyebrow: 'Your money. A clearer journey.', title: 'Fund fast.', accent: 'Withdraw with confidence.',
  description: 'Explore your funding options, understand each step and know what to check before money moves.',
  art: '/assets/generated/wallet-payment-methods.webp', lightArt: '/assets/generated/blue/wallet-payment-methods.webp',
  alt: 'A wallet with Visa, Mastercard, Apple Pay, UPI, bank, Bitcoin and USDT coins rising out of it',
  primary: { label: 'Explore payment methods', href: '#payment-methods' },
  secondary: { label: 'How withdrawals work', href: '#withdrawals' },
  stats: [['Instant', 'Crypto & USDT withdrawals'], ['Up to 24h', 'Card & Apple Pay withdrawals'], ['1–3 days', 'Bank wire withdrawals'], ['7', 'Payment methods']],
};
const category = { visa: 'Cards', mastercard: 'Cards', applepay: 'Wallet', bitcoin: 'Crypto', tether: 'Crypto', bank: 'Bank', upi: 'Local' };
// Processing times and fee rules as published on bytefx.com. Per-method limits
// are not published yet, so they stay TBC.
const withdrawalTime = { visa: 'Up to 24h', mastercard: 'Up to 24h', applepay: 'Up to 24h', bitcoin: 'Instant', tether: 'Instant', bank: '1–3 days', upi: 'TBC' };
const depositTime = { visa: 'Instant', mastercard: 'Instant', applepay: 'Instant', bitcoin: 'Instant', tether: 'Instant', bank: 'TBC', upi: 'TBC' };
export const fundingMethods = paymentMethods.map(method => ({
  ...method,
  group: category[method.id],
  logo: `/assets/payments/${method.id === 'mastercard' ? 'mastercard-color' : method.id}.svg`,
  pending: method.id === 'upi',
  terms: {
    deposit: { minimum: 'TBC', maximum: 'TBC', fee: method.id === 'upi' ? 'TBC' : 'Generally free', time: depositTime[method.id] },
    withdrawal: { minimum: 'TBC', maximum: 'TBC', fee: method.id === 'upi' ? 'TBC' : 'Shown in account', time: withdrawalTime[method.id] },
  },
}));
export const fundingFaqs = [
  ['Are there deposit or withdrawal fees?', 'Deposits are generally free, though some payment providers charge their own fees. Withdrawal fees depend on the method and are shown in your account before you confirm.'],
  ['How long does a withdrawal take?', 'Crypto and USDT withdrawals are instant. Visa, Mastercard and Apple Pay take up to 24 hours, and bank wire 1–3 days. Account checks can add time, and your bank or provider may take longer to settle.'],
  ['What are the minimum and maximum amounts?', 'Per-method payment limits are TBC. These are separate from the proposed account opening deposits shown on the Account Types page.'],
  ['Can I use someone else’s card or bank account?', 'Use a payment method in your own name, matching your ByteFX account. Contact support if the names do not match before making a payment.'],
  ['Which network should I use for crypto?', 'Use only the asset, address and network shown together in your account’s current funding instructions. The supported network list is TBC; never choose a network from this guide.'],
  ['What if my deposit does not appear?', 'Check the status with your payment provider and keep the transaction reference. Contact support with the method, amount, date and reference. Never share passwords or one-time codes.'],
  ['Can I withdraw through any listed method?', 'Withdrawal availability and return-to-source rules are TBC. A method being listed here does not confirm that it supports withdrawals for your account or region.'],
  ['Will my payment be converted to another currency?', 'Supported payment currencies, conversion rates and any conversion fees are TBC. Review the currency and final amount in your account before proceeding.'],
];
export const depositSteps = [
  ['Log in', 'Open your ByteFX account and go to the funding area.'],
  ['Choose your method', 'Select an available method and read the instructions for your account.'],
  ['Confirm the amount', 'Check the currency, payment reference and any displayed charges.'],
  ['Check your balance', 'Follow the payment status and keep your transaction reference.'],
];
export const withdrawalSteps = [
  ['Request', 'Choose an available withdrawal method and confirm your details.'],
  ['Review', 'Your request and any required account checks are reviewed.'],
  ['Processed', 'The payment is released to the selected provider.'],
  ['Received', 'Check that the funds have reached your receiving account.'],
];
