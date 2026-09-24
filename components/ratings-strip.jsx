import Image from 'next/image';
import { ratings } from '@/lib/ratings';

export default function RatingsStrip() {
  const google = ratings.google;
  const GoogleWrapper = google.url && !google.isPlaceholder ? 'a' : 'div';

  return (
    <aside className="ratings-strip" aria-label="ByteFX broker profile and ratings">
      <div className="shell ratings-strip__inner">
        <a className="ratings-strip__item ratings-strip__item--wikifx" href={ratings.wikifx.url} target="_blank" rel="noopener noreferrer" title="View ByteFX on WikiFX">
          <span className="ratings-strip__logo ratings-strip__logo--wikifx">
            <Image className="theme-art--dark" src="/assets/ratings/wikifx.svg" alt="WikiFX" width={121} height={30} />
            <Image className="theme-art--light" src="/assets/ratings/wikifx-light.svg" alt="WikiFX" width={121} height={30} />
          </span>
          <span className="ratings-strip__profile">View broker profile</span>
        </a>
        <span className="ratings-strip__divider" aria-hidden="true" />
        <GoogleWrapper className="ratings-strip__item" {...(google.url && !google.isPlaceholder ? { href: google.url, target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <span className="ratings-strip__logo"><Image src="/assets/ratings/google.svg" alt="Google" width={74} height={24} /></span>
          <span className="ratings-strip__details"><span className="ratings-strip__label">Google rating</span><span className="ratings-strip__score"><b>{google.score}</b><span>/{google.outOf}</span><span className="ratings-strip__star" aria-hidden="true">&#9733;</span></span></span>
        </GoogleWrapper>
      </div>
    </aside>
  );
}
