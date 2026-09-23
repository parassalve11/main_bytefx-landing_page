import Image from 'next/image';
import { bento } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';
import MarketShowcase from './market-showcase';

export default function BentoSection() {
  const { markets, account, refer, partner } = bento;

  return (
    <section className="band" id="markets" aria-label="What you can trade">
      <div className="shell">
        <div className="bento">
          {/* markets */}
          <Reveal as="article" className="tile t-markets">
            <div className="t-markets__head">
              <p className="eyebrow">{markets.eyebrow}</p>
              <h2 className="h-md">
                Trade <span className="tint">commodities</span> and more
              </h2>
              <p className="lede">{markets.body}</p>
            </div>

            <MarketShowcase markets={markets} />
          </Reveal>

          {/* platforms */}
          {/* account — copy on the left, the trader on the right */}
          <Reveal as="article" className="tile t-platforms t-account" delay={80} id="accounts">
            <div className="t-account__copy">
              <p className="eyebrow">{account.eyebrow}</p>
              <h2 className="h-md">
                Trade on <span className="tint">your terms</span>
              </h2>
              <p className="lede">{account.body}</p>
              <SmartLink href={account.cta.href} className="btn btn--solid btn--sm">
                {account.cta.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
            </div>

            <figure className="t-account__art">
              <Image
                src={account.image}
                alt={account.alt}
                width={account.width}
                height={account.height}
                sizes="(max-width: 1180px) 320px, 380px"
              />
            </figure>
          </Reveal>

          {/* refer */}
          <Reveal as="article" className="tile t-refer" delay={140} id="partners">
            <figure>
              <Image
                className="tile__art theme-art--dark"
                src={refer.image}
                alt={refer.alt}
                width={refer.width}
                height={refer.height}
                sizes="(max-width: 760px) 46vw, 220px"
              />
              <Image className="tile__art theme-art--light" src="/assets/generated/blue/refer-partners-grow-supplied.png" alt="Blue glass referral cards joined by a plus sign inside a silver Partners Grow ring" width={1312} height={1199} sizes="(max-width: 760px) 46vw, 220px" />
            </figure>

            <div className="t-refer__copy">
              <p className="eyebrow">{refer.eyebrow}</p>
              <h3 className="h-sm">{refer.title}</h3>
              <p className="lede">{refer.body}</p>
              <SmartLink href={refer.cta.href} className="btn btn--ghost btn--sm">
                {refer.cta.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
            </div>
          </Reveal>

          {/* partner */}
          <Reveal as="article" className="tile t-partner" delay={200}>
            <div className="t-partner__copy">
              <p className="eyebrow">{partner.eyebrow}</p>
              <h2 className="h-md">
                Grow together with a <span className="tint">trusted broker</span>
              </h2>
              <p className="lede">{partner.body}</p>
              <SmartLink href={partner.cta.href} className="btn btn--solid btn--sm">
                {partner.cta.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
            </div>

            <figure className="t-partner__mark">
              <span className="t-partner__halo" aria-hidden="true" />
              <Image
                className="tile__art theme-art--dark"
                src={partner.image}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                sizes="(max-width: 760px) 58vw, (max-width: 1180px) 34vw, 240px"
              />
              <Image className="tile__art theme-art--light" src="/assets/generated/bytefx-glass-mark-light.png" alt="ByteFX interlocking symbol in blue and green glass" width={1354} height={1161} sizes="(max-width: 760px) 58vw, (max-width: 1180px) 34vw, 240px" />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
