'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fundingMethods } from '@/lib/pages/funding';
import { setupSteps, verificationItems } from '@/lib/pages/getting-started';
import { Actions, SectionHead } from './page-kit';

export function FundingExplorer() {
  const [direction, setDirection] = useState('deposit');
  const [category, setCategory] = useState('All');
  const methods = fundingMethods.filter(method => category === 'All' || method.group === category);
  return (
    <section className="band" id="payment-methods">
      <div className="shell">
        <SectionHead eyebrow="Explore your options" title="Your account." accent="Your way to fund it" body="Find a method, then check the terms in your account before making a payment." />
        <div className="funding-controls">
          <div className="account-selector" role="group" aria-label="Payment direction">
            {['deposit', 'withdrawal'].map(value => <button type="button" key={value} aria-pressed={direction === value} onClick={() => setDirection(value)}>{value === 'deposit' ? 'Deposits' : 'Withdrawals'}</button>)}
          </div>
          <div className="funding-filters" role="group" aria-label="Payment category">
            {['All', 'Cards', 'Wallet', 'Crypto', 'Bank', 'Local'].map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}
          </div>
        </div>
        <p className="inner-note funding-status" role="status">{methods.length} {methods.length === 1 ? 'method' : 'methods'} · Processing times as published. Limits marked TBC (to be confirmed) are not published yet.</p>
        <div className="funding-table-wrap">
          <table className="funding-table">
            <caption className="sr-only">{direction === 'deposit' ? 'Deposit' : 'Withdrawal'} methods and proposed payment information</caption>
            <thead><tr><th scope="col">Payment method</th><th scope="col">Minimum</th><th scope="col">Maximum</th><th scope="col">Fee</th><th scope="col">Processing time</th></tr></thead>
            <tbody>{methods.map(method => <tr key={method.id}>
              <th scope="row"><div className="funding-method-name"><span className={`payment-mark payment-mark--${method.id}`}><Image src={method.logo} alt="" width={72} height={44} /></span><div><strong>{method.name}</strong><span>{method.pending ? 'Regional eligibility unconfirmed' : method.group}</span></div></div></th>
              {Object.entries(method.terms[direction]).map(([key, value]) => <td key={key} data-label={{minimum:'Minimum',maximum:'Maximum',fee:'Fee',time:'Processing time'}[key]}>{value}</td>)}
            </tr>)}</tbody>
          </table>
        </div>
        <p className="inner-note">Only methods displayed in your account are available to you. UPI eligibility is awaiting confirmation; its listing here is not an offer of access.</p>
      </div>
    </section>
  );
}

export function CryptoNetworkGuide() {
  const [asset, setAsset] = useState('Bitcoin');
  const [match, setMatch] = useState('');
  return <div className="network-guide">
    <div className="network-guide__fields">
      <label>Asset<select value={asset} onChange={event => { setAsset(event.target.value); setMatch(''); }}><option>Bitcoin</option><option>USDT</option></select></label>
      <label>Sending network<select value={match} onChange={event => setMatch(event.target.value)}><option value="">Check against your account</option><option value="same">Matches the account instructions</option><option value="different">Does not match / I’m unsure</option></select></label>
    </div>
    <div className="network-guide__result" aria-live="polite">
      <p className="eyebrow">{asset} network check</p>
      <p>{match === 'same' ? 'Next, check the destination address and asset against the same account instructions before sending.' : match === 'different' ? 'Pause the transfer. Confirm the correct network with support before sending any funds.' : 'Your sending network must match the receiving network shown in your account.'}</p>
      <p className="inner-note">Supported networks: TBC. This guide checks your understanding; it does not verify an address, network or transaction.</p>
    </div>
  </div>;
}

export function SetupStory() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActive(setupSteps.findIndex(step => step.id === visible[0].target.id));
    }, { rootMargin: '-20% 0px -50% 0px' });
    setupSteps.forEach(step => { const el = document.getElementById(step.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <section className="band setup-story-section" aria-label="Four steps to get started"><div className="shell setup-story">
    <div className="setup-story__visual" aria-hidden="true">
      <div className="setup-story__counter"><span>0{active + 1}</span><span>/ 04</span></div>
      <div className="setup-story__art">{setupSteps.map((step, index) => <Image key={step.id} src={step.art} alt="" width={1100} height={1100} sizes="(max-width: 760px) 1px, 48vw" data-active={active === index} />)}</div>
      <div className="setup-story__progress"><span style={{width:`${(active + 1) * 25}%`}} /></div>
      <p>{setupSteps[active].eyebrow}</p>
    </div>
    <div className="setup-story__steps">{setupSteps.map(step => <article id={step.id} className="setup-step" key={step.id}>
      <p className="eyebrow">{step.eyebrow}</p><h2 className="h-lg">{step.title}</h2><p className="lede">{step.body}</p>
      <Image className="setup-step__mobile-art" src={step.art} alt={step.alt} width={1100} height={1100} sizes="(max-width: 760px) 85vw, 1px" />
      <ul>{step.needs.map(need => <li key={need}>{need}</li>)}</ul><p className="inner-note">{step.tip}</p>
      <Actions primary={step.action} />
      <a className="guide-tutorial" href="https://www.youtube.com/@ByteFXcapital" target="_blank" rel="noopener noreferrer">Video tutorials <span aria-hidden="true">↗</span></a>
    </article>)}</div>
  </div></section>;
}

export function VerificationChecklist() {
  const [checked, setChecked] = useState([]);
  return <section className="band" id="verification"><div className="shell verification-layout">
    <div><SectionHead eyebrow="Before you upload" title="A little preparation." accent="A smoother start" body="Get your documents ready before opening the verification flow in your account." /><p className="inner-note">Preparation only. Follow the document instructions in your account. This checklist stays on this page and does not submit or verify documents.</p><p className="verification-count" role="status"><strong>{checked.length.toString().padStart(2, '0')}</strong> / 04 prepared</p></div>
    <div className="verification-checklist">{verificationItems.map(([id, title, body]) => <label key={id} data-checked={checked.includes(id)}><input type="checkbox" checked={checked.includes(id)} onChange={() => setChecked(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])} /><span><strong>{title}</strong><span>{body}</span></span></label>)}</div>
  </div></section>;
}
