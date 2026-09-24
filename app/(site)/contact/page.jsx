import Icon from '@/components/icon';
import ContactDesk from '@/components/inner/contact-desk';
import { PageSchema, pageMetadata } from '@/components/inner/page-kit';
import { CompanyFacts, LeadHero } from '@/components/inner/site-sections';
import { contactPage as page } from '@/lib/pages/company';

export const metadata = pageMetadata(page);

/* Contact on the page's own surface: choose a topic, see the quickest
   channel for it, then write. Company details close the page. */
export default function ContactPage() {
  return <main id="main" className="inner-page contact-page">
    <PageSchema page={page} />
    <LeadHero page={page} />
    <ContactDesk />
    <section className="band cdesk-facts" aria-labelledby="cdesk-facts-title"><div className="shell cdesk-facts__grid">
      <div>
        <h2 className="h-md" id="cdesk-facts-title">Where to find us</h2>
        <p className="inner-note cdesk-facts__note"><Icon name="lock" size={13} /> Your enquiries and data are protected by bank-grade SSL encryption and strict data-privacy protocols.</p>
      </div>
      <CompanyFacts />
    </div></section>
  </main>;
}
