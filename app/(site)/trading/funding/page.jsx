import Image from 'next/image';
import ClosingSection from '@/components/closing-section';
import Reveal from '@/components/reveal';
import { Actions, FAQ, PageHero, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { FundingExplorer, CryptoNetworkGuide } from '@/components/inner/trading-guides';
import { fundingPage as page, fundingFaqs, fundingMethods, depositSteps, withdrawalSteps } from '@/lib/pages/funding';
import { site } from '@/lib/content';

export const metadata = pageMetadata(page);
export default function FundingPage() {
  return <main id="main" className="inner-page funding-page">
    <PageSchema page={page} faqs={fundingFaqs} />
    <PageHero page={page} />
    <div className="shell funding-logo-rail" aria-label="Payment methods, subject to availability">{fundingMethods.filter(method => !method.pending).map(method => <Image src={method.logo} key={method.id} alt={method.name} width={88} height={44} />)}</div>
    <FundingExplorer />
    <section className="band" id="deposits"><div className="shell inner-split deposit-layout">
      <Reveal className="deposit-phone-scene"><div className="tour-phone"><Image src="/assets/mobile/bytefx-account.png" alt="ByteFX account screen showing the Deposit control" width={1220} height={2712} sizes="260px" /></div><p className="inner-note">Start from the Deposit control in your account.</p></Reveal>
      <div><SectionHead eyebrow="Money in, step by step" title="A clear path" accent="to your balance." /><ol className="guide-step-list">{depositSteps.map(([title, body], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><div><h3 className="h-sm">{title}</h3><p className="lede">{body}</p></div></li>)}</ol><a className="guide-tutorial" href="https://www.youtube.com/@ByteFXcapital" target="_blank" rel="noopener noreferrer">Browse ByteFX deposit tutorials <span aria-hidden="true">↗</span></a></div>
    </div></section>
    <section className="mobile-section inner-color-band withdrawal-band" id="withdrawals"><div className="shell">
      <div className="inner-split"><div><p className="eyebrow">Money out, without the guesswork</p><h2 className="h-lg">Know where your<br />withdrawal stands.</h2><p className="lede">From the first request to the receiving account, understand the steps your withdrawal goes through.</p><a className="guide-tutorial" href="https://www.youtube.com/@ByteFXcapital" target="_blank" rel="noopener noreferrer">Browse ByteFX withdrawal tutorials <span aria-hidden="true">↗</span></a></div><Image src="/assets/generated/payment-vault.webp" alt="Glass vault with lime details and payment cards" width={1100} height={1100} sizes="(max-width: 760px) 85vw, 46vw" /></div>
      <ol className="withdrawal-timeline">{withdrawalSteps.map(([title, body], index) => <li key={title}><span className="withdrawal-timeline__number">0{index + 1}</span><h3 className="h-sm">{title}</h3><p>{body}</p><span className="withdrawal-timeline__time">Timing: TBC</span></li>)}</ol>
    </div></section>
    <section className="band"><div className="shell"><SectionHead eyebrow="Before you confirm" title="Three checks." accent="Worth the moment." /><div className="included-grid funding-safety">{[['01', 'Keep the names consistent.', 'Use a payment method in your own name, matching your ByteFX account.'], ['02', 'Check the network.', 'For crypto, follow the address and network shown in your account. Sending and receiving networks must match.'], ['03', 'Prepare your verification.', 'Complete the verification steps required by your account before requesting a withdrawal.']].map(([number, title, body]) => <Reveal key={number}><span className="eyebrow">{number}</span><h3 className="h-md">{title}</h3><p className="lede">{body}</p></Reveal>)}</div></div></section>
    <section className="band" id="crypto-payments"><div className="shell"><SectionHead eyebrow="Crypto & local payments" title="The right details." accent="Every time." /><div className="crypto-local-layout"><div><div className="crypto-guide-heading"><Image src="/assets/payments/bitcoin.svg" alt="Bitcoin" width={36} height={36} /><Image src="/assets/payments/tether.svg" alt="USDT" width={36} height={36} /><h3 className="h-md">Same asset. Same network.</h3></div><p className="lede">Check your sending details against the current instructions in your account.</p><CryptoNetworkGuide /></div><div className="local-payments-note"><div className="local-payment-marks">{['bank', 'upi', 'applepay'].map(id => <span key={id} className={`payment-mark payment-mark--${id}`}><Image src={`/assets/payments/${id}.svg`} alt={{ bank: 'Bank wire', upi: 'UPI', applepay: 'Apple Pay' }[id]} width={72} height={44} /></span>)}</div><h3 className="h-md">Availability follows your region.</h3><p className="lede">Local methods depend on account eligibility and jurisdiction. UPI availability is still to be confirmed; follow only the options shown in your account.</p><Actions secondary={{label:'Ask about payment availability',href:`mailto:${site.email}?subject=ByteFX%20payment%20availability`}} /></div></div></div></section>
    <div><FAQ items={fundingFaqs} /><ClosingSection title="Your account." accent="Ready for what’s next." lead="Understand the payment journey before you begin." primary={{label:'Explore payment methods',href:'#payment-methods'}} secondary={{label:'Getting started',href:'/trading/getting-started'}} /></div>
  </main>;
}
