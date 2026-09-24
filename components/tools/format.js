import { currencies } from '@/lib/instruments';

const kinds = Object.fromEntries(currencies.map((item) => [item.code, item.kind]));

/* Plain number formatting that works for every code, including USDT (Intl
   currency formatting only accepts three-letter codes). */
export function formatAmount(value, code) {
  if (value === null || !Number.isFinite(value)) return '—';
  const size = Math.abs(value);
  const kind = kinds[code] || 'fiat';
  let max = 2;
  if (kind !== 'fiat') max = size >= 1000 ? 2 : size >= 1 ? 4 : 8;
  else if (size > 0 && size < 1) max = 6;
  return value.toLocaleString('en-US', { minimumFractionDigits: kind === 'fiat' && size >= 1 ? 2 : 0, maximumFractionDigits: max });
}

export function formatRate(value) {
  if (value === null || !Number.isFinite(value)) return '—';
  const size = Math.abs(value);
  const max = size >= 1000 ? 2 : size >= 1 ? 4 : size >= 0.01 ? 6 : 8;
  return value.toLocaleString('en-US', { maximumFractionDigits: max });
}

export function formatMoney(value, code) {
  if (value === null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: code, currencyDisplay: 'code' }).format(value);
}

export function parseNumber(text) {
  const value = Number(String(text).replace(/,/g, '').trim());
  return String(text).trim() === '' || !Number.isFinite(value) ? null : value;
}
