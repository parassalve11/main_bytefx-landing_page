import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';
import { Actions, Breadcrumbs } from '@/components/inner/page-kit';
import { site } from '@/lib/content';
import { toolPage, tools } from '@/lib/pages/tools';

/* Section 1 of every tool page: the heading and the tool itself.
   `layout="split"` puts the tool beside the copy (converter, calculator);
   `layout="wide"` gives a full-width widget below it (calendar, quotes). */
export function ToolHero({ tool, layout = 'split', note, children }) {
  return (
    <section className={`tool-hero tool-hero--${layout}`} aria-labelledby="tool-title">
      <div className="shell">
        <Breadcrumbs page={toolPage(tool)} />
        <div className="tool-hero__grid">
          <div className="tool-hero__copy">
            <p className="eyebrow">{tool.eyebrow}</p>
            <h1 id="tool-title">{tool.title}<br /><span className="tint">{tool.accent}</span></h1>
            <p className="lede">{tool.description}</p>
            {tool.points && <ul className="tool-points">{tool.points.map((point) => <li key={point}><Icon name="check" size={15} />{point}</li>)}</ul>}
          </div>
          <div className="tool-hero__tool">{children}</div>
        </div>
        {note && <p className="inner-note">{note}</p>}
      </div>
    </section>
  );
}

/* Section 2: the other three tools and a way into an account. */
export function MoreTools({ current }) {
  return (
    <section className="band more-tools" aria-labelledby="more-tools-title">
      <div className="shell">
        <div className="more-tools__head">
          <h2 className="h-lg" id="more-tools-title">More tools. <span className="tint">Free for every trader</span></h2>
          <Actions primary={{ label: 'Open your account', href: site.registerUrl }} secondary={{ label: 'Explore markets', href: '/markets' }} />
        </div>
        <div className="tool-grid tool-grid--3">
          {tools.filter((tool) => tool.id !== current).map((tool) => (
            <SmartLink key={tool.id} href={tool.path} className="tool-card">
              <span className="icon-card__glyph"><Icon name={tool.icon} size={20} /></span>
              <strong>{tool.name}</strong>
              <span>{tool.note}</span>
              <em>Open tool</em>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
