import Image from 'next/image';
import SmartLink from '@/components/smart-link';
import Reveal from '@/components/reveal';
import Icon from '@/components/icon';

export function Actions({ primary, secondary }) {
  return <div className="inner-actions">{[primary, secondary].filter(Boolean).map((action, i) => <SmartLink key={action.label} href={action.href} className={`btn ${i === 0 ? 'btn--solid' : 'btn--ghost'}`}>{action.label}{i === 0 && <Icon name="arrow" size={16} />}</SmartLink>)}</div>;
}
export function ThemeArt({ src, light, alt = '', priority = false, className = '', sizes = '(max-width: 760px) 90vw, 50vw' }) {
  return <div className={`theme-art ${className}`} data-paired={Boolean(light)}><Image className="theme-art__dark" src={src} alt={alt} width={1100} height={1100} sizes={sizes} priority={priority} />{light && <Image className="theme-art__light" src={light} alt={alt} width={1100} height={1100} sizes={sizes} />}</div>;
}
/* `page.crumb` names the menu the page lives under (Trading, Markets, Company).
   Set it to null for pages that sit directly under Home. */
export function Breadcrumbs({ page }) {
  const crumb = page.crumb === undefined ? 'Trading' : page.crumb;
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><SmartLink href="/">Home</SmartLink>{crumb && <><span aria-hidden="true">/</span><span>{crumb}</span></>}<span aria-hidden="true">/</span><span aria-current="page">{page.label}</span></nav>;
}
export function PageHero({ page, children }) {
  return <section className={`inner-hero inner-hero--${page.id}`}><div className="shell"><Breadcrumbs page={page} /><div className="inner-hero__grid"><Reveal className="inner-hero__copy"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}<br /><span className="tint">{page.accent}</span></h1><p className="lede">{page.description}</p>{children || <Actions primary={page.primary} secondary={page.secondary} />}{page.note && <p className="inner-note">{page.note}</p>}</Reveal>{page.photo ? <figure className="inner-hero__photo"><Image src={page.art} alt={page.alt} width={page.photo.width} height={page.photo.height} sizes="(max-width: 760px) 86vw, 440px" priority /></figure> : <ThemeArt src={page.art} light={page.lightArt} alt={page.alt} priority className="inner-hero__art" />}</div>{page.stats && <div className="inner-proof">{page.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}</div></section>;
}
export function SectionHead({ eyebrow, title, accent, body, className = '' }) {
  return <div className={`section-head inner-section-head ${className}`.trim()}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="h-lg">{title} {accent && <span className="tint">{accent}</span>}</h2>{body && <p className="lede">{body}</p>}</div>;
}
export function FAQ({ items, title = 'A little clarity. Before you start.' }) {
  return <section className="band inner-faq" id="faq"><div className="shell inner-faq__grid"><SectionHead eyebrow="Your questions, answered" title={title} /><div>{items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p className="lede">{answer}</p></details>)}</div></div></section>;
}
export function PageSchema({ page, faqs = [] }) {
  const data = [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bytefx.com' }, { '@type': 'ListItem', position: 2, name: page.label, item: `https://bytefx.com${page.path}` }] }];
  if (faqs.length) data.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
export function pageMetadata(page) {
  return { title: `${page.label} | ByteFX`, description: page.description, alternates: { canonical: page.path }, openGraph: { title: `${page.label} | ByteFX`, description: page.description, url: page.path, images: [{ url: page.art, width: 1100, height: 1100, alt: page.alt }] } };
}
