import { Actions, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { CompanyFacts, DocumentList, LeadHero } from '@/components/inner/site-sections';
import { footer } from '@/lib/content';
import { legalPage as page } from '@/lib/pages/company';

export const metadata = pageMetadata(page);

export default function LegalPage() {
  return <main id="main" className="inner-page legal-page">
    <PageSchema page={page} />
    <LeadHero page={page}><Actions primary={{ label: 'Read the documents', href: '#documents' }} secondary={{ label: 'Company details', href: '#company' }} /></LeadHero>
    <section className="band" id="documents"><div className="shell">
      <SectionHead eyebrow="Documents" title="Everything that governs" accent="your account." body="Each document opens as a PDF published on bytefx.com." />
      <DocumentList />
    </div></section>
    <section className="band" id="company"><div className="shell inner-split">
      <SectionHead eyebrow="Company details" title="ByteFX Capital Ltd." accent="Registered in Saint Lucia." body="The legal entity behind the ByteFX website, client area and trading accounts." />
      <CompanyFacts />
    </div></section>
    <section className="band" id="disclosures"><div className="shell">
      <SectionHead eyebrow="Disclosures" title="Read this" accent="before you trade." />
      <div className="disclosure-grid">{footer.legal.map(block => <article key={block.heading}><h3 className="h-sm">{block.heading}</h3><p className="lede">{block.body}</p></article>)}</div>
    </div></section>
    <section className="mobile-section inner-color-band legal-help"><div className="shell legal-help__inner"><div><h2 className="h-lg">Questions about our terms?</h2><p className="lede">Our support team can point you to the right document or clause.</p></div><Actions primary={{ label: 'Contact support', href: '/contact' }} /></div></section>
  </main>;
}
