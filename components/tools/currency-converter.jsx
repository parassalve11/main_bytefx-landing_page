'use client';

import { useId, useState } from 'react';
import Icon from '@/components/icon';
import { convert, currencies } from '@/lib/instruments';
import { formatAmount, formatRate, parseNumber } from './format';
import useRates, { updatedLabel } from './use-rates';

const groups = [['fiat', 'Currencies'], ['crypto', 'Crypto'], ['metal', 'Metals']];
const quickPairs = [['EUR', 'USD'], ['GBP', 'USD'], ['USD', 'JPY'], ['BTC', 'USD'], ['XAU', 'USD']];
const nameOf = Object.fromEntries(currencies.map((item) => [item.code, item.name]));

function CurrencySelect({ id, label, value, onChange }) {
  return (
    <div className="tool-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {groups.map(([kind, heading]) => (
          <optgroup key={kind} label={heading}>
            {currencies.filter((item) => item.kind === kind).map((item) => <option key={item.code} value={item.code}>{item.name} ({item.code})</option>)}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default function CurrencyConverter() {
  const id = useId();
  const rateState = useRates();
  const [amountText, setAmountText] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const amount = parseNumber(amountText);
  const invalid = amountText.trim() !== '' && (amount === null || amount < 0);
  const result = amount === null || invalid ? null : convert(amount, from, to, rateState.rates);
  const rate = convert(1, from, to, rateState.rates);
  const inverse = convert(1, to, from, rateState.rates);

  return (
    <div className="tool-card-panel converter">
      <div className="tool-field tool-field--amount">
        <label htmlFor={`${id}-amount`}>Amount</label>
        <input
          id={`${id}-amount`}
          inputMode="decimal"
          autoComplete="off"
          value={amountText}
          onChange={(event) => setAmountText(event.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-amount-error` : undefined}
        />
        {invalid && <p className="tool-error" id={`${id}-amount-error`}>Enter an amount of 0 or more, using numbers only.</p>}
      </div>

      <div className="converter__pair">
        <CurrencySelect id={`${id}-from`} label="From" value={from} onChange={setFrom} />
        <button type="button" className="converter__swap" onClick={() => { setFrom(to); setTo(from); }} aria-label={`Switch to ${to} to ${from}`}>
          <Icon name="refresh" size={18} />
        </button>
        <CurrencySelect id={`${id}-to`} label="To" value={to} onChange={setTo} />
      </div>

      <div className="converter__result" aria-live="polite" aria-atomic="true">
        <p className="converter__from">{formatAmount(amount ?? 0, from)} {nameOf[from]} =</p>
        <p className="converter__value"><strong>{formatAmount(result, to)}</strong> <span>{to}</span></p>
        <p className="converter__rates">1 {from} = {formatRate(rate)} {to}<span aria-hidden="true" /> 1 {to} = {formatRate(inverse)} {from}</p>
      </div>

      <div className="tool-quick" role="group" aria-label="Popular conversions">
        {quickPairs.map(([a, b]) => (
          <button type="button" key={a + b} aria-pressed={from === a && to === b} onClick={() => { setFrom(a); setTo(b); }}>{a} to {b}</button>
        ))}
      </div>

      <p className="tool-status" data-status={rateState.status}>{updatedLabel(rateState)} Reference rates are for information only and are not ByteFX dealing prices.</p>
    </div>
  );
}
