'use client';

import { useId, useState } from 'react';
import { accountCurrencies, convert, findInstrument, instrumentGroups, instruments, leverageOptions, livePrice, specsConfirmed } from '@/lib/instruments';
import { formatMoney, parseNumber } from './format';
import useRates, { updatedLabel } from './use-rates';

const count = (value) => value.toLocaleString('en-US', { maximumFractionDigits: 8 });

function Field({ id, label, children, hint, error }) {
  return (
    <div className="tool-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <p className="tool-error" id={`${id}-msg`}>{error}</p> : hint && <p className="tool-hint" id={`${id}-msg`}>{hint}</p>}
    </div>
  );
}

export default function TradingCalculator({ initialSymbol = 'EURUSD' }) {
  const id = useId();
  const rateState = useRates();
  const { rates } = rateState;
  const [account, setAccount] = useState('USD');
  const [symbol, setSymbol] = useState(findInstrument(initialSymbol)?.symbol || 'EURUSD');
  const [leverage, setLeverage] = useState(100);
  const [lotsText, setLotsText] = useState('1');
  const [priceText, setPriceText] = useState('');
  const [priceEdited, setPriceEdited] = useState(false);
  const [daysText, setDaysText] = useState('1');
  const [swapLongText, setSwapLongText] = useState('');
  const [swapShortText, setSwapShortText] = useState('');

  const instrument = findInstrument(symbol);
  const live = livePrice(instrument, rates);
  const usingLive = !priceEdited && live !== null;
  const priceValue = usingLive ? live.toFixed(instrument.digits) : priceText;

  const lots = parseNumber(lotsText);
  const price = parseNumber(priceValue);
  const days = parseNumber(daysText);
  const swapLong = parseNumber(swapLongText);
  const swapShort = parseNumber(swapShortText);
  const lotsError = lots === null || lots <= 0 ? 'Enter a volume above 0, for example 0.01 or 1.' : null;
  const priceError = priceValue.trim() !== '' && (price === null || price <= 0) ? 'Enter a price above 0.' : null;
  const daysError = days === null || days < 0 || !Number.isInteger(days) ? 'Enter a whole number of days, 0 or more.' : null;

  const ready = !lotsError && price !== null && price > 0;
  const units = ready ? lots * instrument.contract : null;
  const toAccount = (value) => (value === null ? null : convert(value, instrument.quote, account, rates));
  const margin = ready ? toAccount((units * price) / leverage) : null;
  const pipValue = ready ? toAccount(units * instrument.pip) : null;
  const notional = ready ? toAccount(units * price) : null;
  const point = 10 ** -instrument.digits;
  const swapTotal = (rate) => (ready && !daysError && rate !== null ? toAccount(rate * point * units * days) : null);
  const conversionMissing = ready && instrument.quote !== account && !rates;

  const selectSymbol = (next) => {
    setSymbol(next);
    setPriceEdited(false);
    setPriceText('');
  };

  const unitName = instrument.base && instrument.group !== 'Metals' ? instrument.base : instrument.group === 'Metals' ? 'oz' : 'units';
  const priceHint = usingLive
    ? 'Live reference price. Type your entry price to use your own.'
    : instrument.base
      ? 'Using the price you entered.'
      : 'Enter the current price from MetaTrader 5.';

  return (
    <div className="tool-card-panel calculator">
      <div className="calculator__grid">
        <Field id={`${id}-account`} label="Account currency">
          <select id={`${id}-account`} value={account} onChange={(event) => setAccount(event.target.value)}>
            {accountCurrencies.map((code) => <option key={code} value={code}>{code}</option>)}
          </select>
        </Field>
        <Field id={`${id}-symbol`} label="Symbol">
          <select id={`${id}-symbol`} value={symbol} onChange={(event) => selectSymbol(event.target.value)}>
            {instrumentGroups.map((group) => (
              <optgroup key={group} label={group}>
                {instruments.filter((item) => item.group === group).map((item) => <option key={item.symbol} value={item.symbol}>{item.group === 'Forex' ? item.label : `${item.label} (${item.symbol})`}</option>)}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field id={`${id}-leverage`} label="Leverage">
          <select id={`${id}-leverage`} value={leverage} onChange={(event) => setLeverage(Number(event.target.value))}>
            {leverageOptions.map((value) => <option key={value} value={value}>1:{value}</option>)}
          </select>
        </Field>
        <Field id={`${id}-lots`} label="Volume (lots)" error={lotsError}>
          <input id={`${id}-lots`} inputMode="decimal" autoComplete="off" value={lotsText} onChange={(event) => setLotsText(event.target.value)} aria-invalid={Boolean(lotsError) || undefined} aria-describedby={`${id}-lots-msg`} />
        </Field>
        <div className="calculator__price">
          <Field id={`${id}-price`} label={<>Price <span className="tool-badge" data-live={usingLive}>{usingLive ? 'Live' : 'Manual'}</span></>} hint={priceHint} error={priceError}>
            <div className="tool-inline">
              <input id={`${id}-price`} inputMode="decimal" autoComplete="off" placeholder={instrument.base ? 'Loading price…' : 'Enter price'} value={priceValue} onChange={(event) => { setPriceEdited(true); setPriceText(event.target.value); }} aria-invalid={Boolean(priceError) || undefined} aria-describedby={`${id}-price-msg`} />
              {priceEdited && live !== null && <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setPriceEdited(false); setPriceText(''); }}>Use live price</button>}
            </div>
          </Field>
        </div>
        <Field id={`${id}-days`} label="Holding period (days)" error={daysError}>
          <input id={`${id}-days`} inputMode="numeric" autoComplete="off" value={daysText} onChange={(event) => setDaysText(event.target.value)} aria-invalid={Boolean(daysError) || undefined} aria-describedby={`${id}-days-msg`} />
        </Field>
        <div className="calculator__swaps">
          <Field id={`${id}-swap-long`} label="Swap long (points)">
            <input id={`${id}-swap-long`} inputMode="decimal" autoComplete="off" placeholder="e.g. -6.5" value={swapLongText} onChange={(event) => setSwapLongText(event.target.value)} aria-describedby={`${id}-swap-note`} />
          </Field>
          <Field id={`${id}-swap-short`} label="Swap short (points)">
            <input id={`${id}-swap-short`} inputMode="decimal" autoComplete="off" placeholder="e.g. 1.2" value={swapShortText} onChange={(event) => setSwapShortText(event.target.value)} aria-describedby={`${id}-swap-note`} />
          </Field>
        </div>
      </div>
      <p className="tool-hint" id={`${id}-swap-note`}>Swap rates are in the symbol specification in MetaTrader 5, in points per lot per night. Most symbols charge a triple swap once a week to cover the weekend.</p>

      <div className="calculator__results" aria-live="polite">
        <div className="calculator__lead">
          <span>Required margin</span>
          <strong>{formatMoney(margin, account)}</strong>
        </div>
        <dl>
          <div><dt>Pip value</dt><dd>{formatMoney(pipValue, account)}</dd></div>
          <div><dt>Position value</dt><dd>{formatMoney(notional, account)}</dd></div>
          <div><dt>Swap long{days ? `, ${days} ${days === 1 ? 'night' : 'nights'}` : ''}</dt><dd>{swapLong === null ? 'Add a swap rate' : formatMoney(swapTotal(swapLong), account)}</dd></div>
          <div><dt>Swap short{days ? `, ${days} ${days === 1 ? 'night' : 'nights'}` : ''}</dt><dd>{swapShort === null ? 'Add a swap rate' : formatMoney(swapTotal(swapShort), account)}</dd></div>
        </dl>
        {!ready && !lotsError && <p className="tool-hint">Enter a price to see your results.</p>}
        {conversionMissing && <p className="tool-error">Rates to convert {instrument.quote} into {account} are unavailable right now. Choose {instrument.quote} as the account currency, or try again shortly.</p>}
      </div>

      <p className="tool-status" data-status={rateState.status}>
        1 lot = {count(instrument.contract)} {unitName}. 1 pip = a {count(instrument.pip)} price move. {updatedLabel(rateState)}
        {!specsConfirmed && ' Contract sizes are standard MetaTrader 5 values until our own specifications are published; check the symbol specification in MetaTrader 5 before you trade.'}
      </p>
    </div>
  );
}
