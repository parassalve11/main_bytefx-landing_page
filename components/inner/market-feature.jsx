import Image from 'next/image';
import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';

/* A shared editorial market feature: copy above a linked, full-width scene. */
export default function MarketFeature({ eyebrow, title, accent, body, src, alt, href, linkLabel, position = '50% 50%' }) {
  return (
    <section className="market-feature">
      <div className="shell market-feature__copy">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}<br /><span className="tint">{accent}</span></h2>
          <p className="lede">{body}</p>
        </div>
        <SmartLink href={href} className="btn btn--solid">{linkLabel}<Icon name="arrow" size={16} /></SmartLink>
      </div>
      <SmartLink href={href} className="market-feature__scene" aria-label={linkLabel} style={{ '--scene-position': position }}>
        <Image src={src} alt={alt} fill sizes="100vw" />
      </SmartLink>
    </section>
  );
}
