'use client';

import { useState } from 'react';

const SHARE = 0.4;
const money = (value) => `$${Math.round(value).toLocaleString('en-US')}`;

export default function PartnerEstimator() {
  const [fees, setFees] = useState(5000);
  return (
    <div className="estimator">
      <label className="field-label" htmlFor="partner-fees">Monthly trading fees from your clients <output htmlFor="partner-fees">{money(fees)}</output></label>
      <input id="partner-fees" type="range" min={500} max={50000} step={500} value={fees} onChange={(event) => setFees(Number(event.target.value))} style={{ '--fill': `${((fees - 500) / 49500) * 100}%` }} />
      <div className="estimator__scale" aria-hidden="true"><span>$500</span><span>$50,000</span></div>
      <p className="estimator__result" aria-live="polite"><span>Up to</span><strong>{money(fees * SHARE)}</strong><span>a month at a 40% revenue share</span></p>
      <p className="inner-note">An illustration of the maximum 40% share, not a quote. Your rate and which fees count are set out in your partner agreement.</p>
    </div>
  );
}
