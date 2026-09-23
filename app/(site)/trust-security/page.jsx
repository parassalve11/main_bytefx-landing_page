import ClosingSection from '@/components/closing-section';
import Icon from '@/components/icon';
import Reveal from '@/components/reveal';
import { PageHero, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { DocumentList, IconGrid, PhotoBand } from '@/components/inner/site-sections';
import { documents, site } from '@/lib/content';
import { officialChannels, protections, safetyHabits, trustPage as page } from '@/lib/pages/company';

export const metadata = pageMetadata(page);
const policyDocs = ['privacy', 'aml', 'risk', 'terms'].map(id => documents.find(doc => doc.id === id));

export default function TrustPage() {
  return <main id="main" className="inner-page trust-page">
    <PageSchema page={page} />
    <PageHero page={page} />
    <section className="band" id="protection"><div className="shell">
      <SectionHead eyebrow="How your account is protected" title="Four layers" accent="of protection." />
      <IconGrid items={protections} className="icon-grid--2" />
    </div></section>
    <section className="mobile-section inner-color-band" id="official"><div className="shell inner-split">
      <div><p className="eyebrow">Your security matters</p><h2 className="h-lg">Use only official<br />ByteFX channels.</h2><p className="lede">Scammers copy broker websites and social profiles. Log in, deposit and ask for help only through the channels listed here.</p></div>
      <ul className="channel-list">{officialChannels.map(([icon, label, value, href]) => <li key={label}><a href={href} rel="noopener noreferrer"><Icon name={icon} size={18} /><span><small>{label}</small>{value}</span><span aria-hidden="true">↗</span></a></li>)}</ul>
    </div></section>
    <PhotoBand src="/assets/hero/hero-chill-cat.webp" alt="A cat in headphones and sunglasses relaxing with a coffee in front of trading screens" eyebrow="Trade calm, stay in control" title="Stay cool. Let your plan keep watch." body="Set stop loss and take profit before you step away, switch on price alerts, and let the platform do the watching." pos="42% 50%" mobilePos="72% 40%" />
    <section className="band" id="your-part"><div className="shell inner-split habits">
      <SectionHead eyebrow="Your part" title="Five habits that keep" accent="your account safe." body="Security works best when we both play a part." />
      <ul className="habit-list">{safetyHabits.map(([title, body], i) => <Reveal as="li" key={title} delay={i * 40}><Icon name="check" size={16} /><div><h3 className="h-sm">{title}</h3><p className="lede">{body}</p></div></Reveal>)}</ul>
    </div></section>
    <section className="band" id="documents"><div className="shell">
      <SectionHead eyebrow="Policy documents" title="Read the policies" accent="behind the protection." />
      <DocumentList items={policyDocs} />
    </div></section>
    
    <ClosingSection title="Trade with" accent="confidence." lead="Questions about security? Our team answers 24/6." primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Contact support', href: '/contact' }} />
  </main>;
}
