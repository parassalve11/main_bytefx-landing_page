import Reveal from '@/components/reveal';
import SmartLink from '@/components/smart-link';
import EnquiryForm from '@/components/inner/enquiry-form';
import PartnerHeroArt from '@/components/inner/partner-hero-art';
import { Breadcrumbs, PageSchema, SectionHead, ThemeArt, pageMetadata } from '@/components/inner/page-kit';
import { documents, site } from '@/lib/content';
import { partnerBenefits, partnerSteps, partnersPage as page } from '@/lib/pages/partners';

export const metadata = pageMetadata(page);
const fields = [
  { name: 'name', label: 'Full Name', required: true, autoComplete: 'name', placeholder: 'Your full name', minLength: 2 },
  { name: 'phone', label: 'Contact Number', type: 'tel', required: true, autoComplete: 'tel', placeholder: '+44 7700 900000' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email', wide: true, placeholder: 'you@example.com' },
  { name: 'message', label: 'How Can We Assist You?', type: 'textarea', required: true, wide: true, placeholder: 'Tell us how we can help.' },
];

export default function PartnersPage() {
  return <main id="main" className="inner-page partners-page">
    <PageSchema page={page} />
    <section className="inner-hero partner-hero" aria-labelledby="partner-title"><div className="shell">
      <Breadcrumbs page={page} />
      <div className="partner-hero__grid">
        <Reveal className="partner-hero__copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 id="partner-title">Grow your income<br /><span className="tint">by referring clients.</span></h1>
          <p className="lede">{page.description}</p>
          <div className="partner-hero__actions"><SmartLink href={site.registerUrl} className="btn btn--solid">Know More</SmartLink><a href="#become-ib" className="partner-text-link">Want to become an IB? <span aria-hidden="true">↗</span></a></div>
        </Reveal>
        <PartnerHeroArt src={page.art} light={page.lightArt} alt={page.alt} />
      </div>
    </div></section>
    <section className="band" id="benefits"><div className="shell">
      <SectionHead eyebrow="Partnership" title="Everything you need" accent="to grow your business." />
      <div className="benefit-board">
        <Reveal as="article" className="tile benefit-lead">
          <div><h3 className="eyebrow">High Revenue Share</h3><p className="benefit-lead__figure">Earn up to <strong>40%</strong></p><p className="lede">commission on referred clients’ trading fees.</p></div>
          <ThemeArt src="/assets/partner/bytefx-glass-mark.webp" alt="ByteFX blue and green glass symbol" sizes="(max-width: 760px) 42vw, 240px" className="benefit-lead__art" />
          <SmartLink href={site.registerUrl} className="partner-text-link benefit-lead__link">Know More <span aria-hidden="true">↗</span></SmartLink>
        </Reveal>
        <div className="benefit-list">{partnerBenefits.map((benefit, i) => <Reveal as="article" key={benefit.title} delay={i * 60} className="benefit-item"><span className="partner-benefit-number" aria-hidden="true">0{i + 2}</span><div><h3 className="h-sm">{benefit.title}</h3><p className="lede">{benefit.body}</p></div></Reveal>)}</div>
      </div>
    </div></section>
    <section className="band partner-start" id="how-it-works" aria-label="Start trading in four steps"><div className="shell">
      <ol className="start-steps">{partnerSteps.map(([name, body], i) => <Reveal as="li" key={name} delay={i * 60}><span className="start-steps__n" aria-hidden="true">0{i + 1}</span><h2 className="h-sm">{name}</h2><p className="lede">{body}</p></Reveal>)}</ol>
    </div></section>
    <section className="band partner-signup" aria-labelledby="partner-signup-title"><Reveal className="shell partner-signup__frame">
      <h2 className="h-lg" id="partner-signup-title">Sign Up for Your Account<br /><span className="tint">Before the Next Move Happens</span></h2>
      <SmartLink href={site.registerUrl} className="btn btn--solid">Sign Up</SmartLink>
    </Reveal></section>
    <section className="band" id="become-ib"><div className="shell inner-split ib-apply">
      <Reveal><SectionHead eyebrow="Get in touch" title="Want to become" accent="an IB?" body="Tell us about your business and how you would like to partner with us." /></Reveal>
      <EnquiryForm subject="IB partnership enquiry" fields={fields} title="Your enquiry" submitLabel="Transmit Inquiry" showSubmitIcon={false} consentNotice={<>By submitting, you agree to our <a href={documents[1].href} target="_blank" rel="noopener noreferrer">privacy policy</a> and <a href={documents[0].href} target="_blank" rel="noopener noreferrer">institutional grade security terms</a>.</>} note="Opens a draft in your email app. Review and send it to complete your enquiry." />
    </div></section>
  </main>;
}
