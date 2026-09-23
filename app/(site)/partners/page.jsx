import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import SmartLink from '@/components/smart-link';
import EnquiryForm from '@/components/inner/enquiry-form';
import PartnerEstimator from '@/components/inner/partner-estimator';
import { PageHero, PageSchema, SectionHead, ThemeArt, pageMetadata } from '@/components/inner/page-kit';
import { documents, site } from '@/lib/content';
import { clientOffer, partnerBenefits, partnerSteps, partnersPage as page } from '@/lib/pages/partners';

export const metadata = pageMetadata(page);
const fields = [
  { name: 'name', label: 'Full name', group: 'Your details', required: true, autoComplete: 'name', placeholder: 'Your full name', minLength: 2 },
  { name: 'email', label: 'Email address', group: 'Your details', type: 'email', required: true, autoComplete: 'email', placeholder: 'you@company.com' },
  { name: 'phone', label: 'Phone number', group: 'Your details', type: 'tel', required: true, autoComplete: 'tel', placeholder: '+44 7700 900000', help: 'Include your country code.' },
  { name: 'country', label: 'Country / region', group: 'Your details', required: true, autoComplete: 'country-name', placeholder: 'Where you are based' },
  { name: 'partnerType', label: 'Partnership type', group: 'Your business', type: 'select', required: true, options: ['Introducing broker', 'Trading educator', 'Community owner', 'Content creator', 'Other'] },
  { name: 'company', label: 'Company / community', group: 'Your business', autoComplete: 'organization', placeholder: 'Business or community name' },
  { name: 'website', label: 'Website / social profile', group: 'Your business', type: 'url', wide: true, placeholder: 'https://', autoComplete: 'url' },
  { name: 'message', label: 'Tell us about your plans', group: 'Your business', type: 'textarea', required: true, minLength: 20, wide: true, placeholder: 'Tell us about your audience, the markets you serve and how you would like to work together.', help: 'A few sentences help us connect you with the right person.' },
];

export default function PartnersPage() {
  return <main id="main" className="inner-page partners-page">
    <PageSchema page={page} />
    <PageHero page={page} />
    <nav className="partner-nav shell" aria-label="On this page"><a href="#benefits">Partner benefits</a><a href="#how-it-works">How it works</a><a href="#earnings">Earnings estimator</a><a href="#become-ib">Become a partner <span aria-hidden="true">&#8599;</span></a></nav>
    <section className="band" id="benefits"><div className="shell">
      <SectionHead eyebrow="Why partner with ByteFX" title="Everything you need" accent="to grow your business." />
      <div className="benefit-board">
        <Reveal as="article" className="tile benefit-lead">
          <div><p className="eyebrow">High revenue share</p><p className="benefit-lead__figure">Up to <strong>40%</strong></p><p className="lede">commission on your referred clients’ trading fees.</p></div>
          <ThemeArt src="/assets/partner/bytefx-glass-mark.webp" alt="" sizes="(max-width: 760px) 50vw, 260px" className="benefit-lead__art" />
        </Reveal>
        <div className="benefit-list">{partnerBenefits.map((benefit, i) => <Reveal as="article" key={benefit.title} delay={i * 60} className="benefit-item"><span className="icon-card__glyph"><Icon name={benefit.icon} size={20} /></span><div><h3 className="h-sm">{benefit.title}</h3><p className="lede">{benefit.body}</p></div></Reveal>)}</div>
      </div>
    </div></section>
    <section className="band" id="how-it-works"><div className="shell">
      <SectionHead eyebrow="How it works" title="From first referral" accent="to first payout." />
      <ol className="start-steps">{partnerSteps.map(([name, body], i) => <Reveal as="li" key={name} delay={i * 60}><span className="start-steps__n" aria-hidden="true">{i + 1}</span><h3 className="h-sm">{name}</h3><p className="lede">{body}</p></Reveal>)}</ol>
    </div></section>
    <section className="mobile-section inner-color-band partner-earnings" id="earnings"><div className="shell inner-split">
      <div><p className="eyebrow">Estimate your share</p><h2 className="h-lg">See what up to 40%<br />could mean for you.</h2><p className="lede">Move the slider to the monthly trading fees your referred clients might generate.</p></div>
      <PartnerEstimator />
    </div></section>
    <section className="band" id="clients"><div className="shell">
      <SectionHead eyebrow="What your clients get" title="A broker you can" accent="recommend with confidence." />
      <dl className="offer-grid">{clientOffer.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
      <p className="inner-note">* Maximum leverage depends on instrument class and account equity. <SmartLink href="/trading/account-types">Compare the accounts your clients can open.</SmartLink></p>
    </div></section>
    <section className="band" id="become-ib"><div className="shell inner-split ib-apply">
      <div>
        <SectionHead eyebrow="Get in touch" title="Let’s build" accent="something together." body="Introduce yourself and your business. Our partnerships team will help you explore the right fit." />
        <ol className="partner-next"><li><span>01</span><div><strong>Tell us about your business</strong><p>Share your audience, experience and plans.</p></div></li><li><span>02</span><div><strong>Connect with the team</strong><p>Discuss your goals and the available partnership options.</p></div></li><li><span>03</span><div><strong>Agree on the details</strong><p>Review your commission structure and onboarding steps.</p></div></li></ol><p className="partner-direct-label">Prefer to speak with us directly?</p><ul className="ib-direct"><li><Icon name="mail" size={16} /><a href={`mailto:${site.email}`}>{site.email}</a></li><li><Icon name="phone" size={16} /><a href={`tel:${site.phoneHref}`}>{site.phone}</a></li></ul>
      </div>
      <EnquiryForm subject="ByteFX IB partnership enquiry" fields={fields} title="Partner enquiry" description="A little about you. A clear next step." submitLabel="Prepare partnership enquiry" consent={<>I agree to the <a href={documents[1].href} target="_blank" rel="noopener noreferrer">privacy policy</a> and to being contacted about my partnership enquiry.</>} note="This prepares a draft in your email app. Review and send it to complete your enquiry." />
    </div></section>
    
    <ClosingSection title="Grow with us." accent="Start referring." lead="Up to 40% revenue share, fast payouts and a relationship manager on your side." primary={{ label: 'Become a partner', href: '#become-ib' }} secondary={{ label: 'Contact us', href: '/contact' }} />
  </main>;
}
