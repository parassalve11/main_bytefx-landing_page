import ThemedImage from './themed-image';
import { artwork } from '@/lib/artwork';
import { site } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';

export default function AtlasSection() {
  return <section className="band atlas-intro" id="atlas" aria-labelledby="atlas-intro-title">
    <div className="shell atlas-intro__frame">
      <div className="atlas-intro__ambient" aria-hidden="true" />
      <Reveal className="atlas-intro__copy">
        <p className="eyebrow">Introducing Atlas AI</p>
        <h2 id="atlas-intro-title">Meet Atlas<br /><span className="tint">Explore what’s next</span></h2>
        <p className="atlas-intro__lead">A fresh perspective on how you trade. Meet Atlas AI, and discover your next chapter.</p>
        <div className="atlas-intro__actions">
          <SmartLink href={site.partnerPortalUrl} className="btn btn--solid" target="_blank" rel="noopener noreferrer">Visit Partner Success Portal<Icon name="arrow" size={16} /></SmartLink>
          <SmartLink href="/partners" className="atlas-intro__link">Explore partnership</SmartLink>
        </div>
      </Reveal>
      <Reveal as="figure" className="atlas-intro__portrait" delay={120}>
        <div className="atlas-intro__orbit" aria-hidden="true" />
        <ThemedImage src={artwork.atlas.dark} light={artwork.atlas.light} frameRatio="1122 / 1402" alt="Atlas, a silver humanoid robot holding a tablet" width={1122} height={1402} sizes="(max-width: 760px) 88vw, (max-width: 1180px) 44vw, 590px" />
      </Reveal>
    </div>
  </section>;
}
