import Image from 'next/image';
import { site } from '@/lib/content';
import Reveal from './reveal';
import SmartLink from './smart-link';

export default function AtlasSection() {
  return <section className="band atlas-intro" id="atlas" aria-labelledby="atlas-intro-title">
    <div className="shell atlas-intro__frame">
      <div className="atlas-intro__ambient" aria-hidden="true" />
      <Reveal className="atlas-intro__copy">
        <p className="eyebrow">Introducing Atlas AI</p>
        <h2 id="atlas-intro-title">Meet Atlas.<br /><span className="tint">Explore what’s next.</span></h2>
        <p className="atlas-intro__lead">A fresh perspective on the ByteFX experience. Meet Atlas AI, and discover your next chapter with ByteFX.</p>
        <p className="atlas-intro__lead">Ready to grow with us? Step into the ByteFX Partner Portal, or explore our partnership programme to get started.</p>
        <div className="atlas-intro__actions">
          <SmartLink href={site.partnerPortalUrl} className="btn btn--solid" target="_blank" rel="noopener noreferrer">Visit partner portal</SmartLink>
          <SmartLink href="/partners" className="atlas-intro__link">Explore partnerships</SmartLink>
        </div>
      </Reveal>
      <Reveal as="figure" className="atlas-intro__portrait" delay={120}>
        <div className="atlas-intro__orbit" aria-hidden="true" />
        <Image src="/assets/generated/atlas-thinking-robot.png" alt="Atlas, a silver humanoid robot in a thoughtful seated pose, resting its chin on its hand" width={1122} height={1402} sizes="(max-width: 760px) 88vw, (max-width: 1180px) 44vw, 590px" />
        <figcaption><span>ATLAS</span><span>Intelligence, introduced.</span></figcaption>
      </Reveal>
    </div>
  </section>;
}
