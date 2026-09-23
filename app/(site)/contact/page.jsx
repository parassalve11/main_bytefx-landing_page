import Icon from '@/components/icon';
import EnquiryForm from '@/components/inner/enquiry-form';
import { PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { CompanyFacts, LeadHero } from '@/components/inner/site-sections';
import { contactChannels, contactPage as page } from '@/lib/pages/company';

export const metadata = pageMetadata(page);
const fields = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'topic', label: 'Topic', type: 'select', required: true, wide: true, options: ['My account', 'Deposits & withdrawals', 'MetaTrader 5', 'Partnership (IB)', 'Something else'] },
  { name: 'message', label: 'Message', type: 'textarea', required: true, wide: true, placeholder: 'How can we help? Never include your password or security codes.' },
];

export default function ContactPage() {
  return <main id="main" className="inner-page contact-page">
    <PageSchema page={page} />
    <LeadHero page={page} after={
      <ul className="contact-channels">{contactChannels.map(([icon, label, value, href, action]) => <li key={label}><a href={href} rel="noopener noreferrer"><span className="icon-card__glyph"><Icon name={icon} size={20} /></span><strong>{label}</strong><span>{value}</span><em>{action} <span aria-hidden="true">↗</span></em></a></li>)}</ul>
    } />
    <section className="band contact-body" id="message"><div className="shell inner-split contact-split">
      <div><h2 className="h-md">Send us a message</h2><p className="lede contact-body__lede">We reply by email. For anything urgent, live chat is the fastest way to reach us.</p><EnquiryForm subject="ByteFX website enquiry" fields={fields} submitLabel="Send message" note="Sending opens your email app with your message addressed to support." /></div>
      <aside className="contact-aside"><h2 className="h-md">Where to find us</h2><CompanyFacts /><p className="inner-note"><Icon name="lock" size={13} /> Your enquiries and data are protected by bank-grade SSL encryption and strict data-privacy protocols.</p></aside>
    </div></section>
  </main>;
}
