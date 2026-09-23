'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';
import { site } from '@/lib/content';

/* One sticky stage on the left follows the market being read on the right.
   Each market is its own anchored block (#forex, #crypto…), so menu links and
   the sub-navigation land on it directly. Below 981px the stage is dropped
   and each block shows its own picture. */
export default function MarketExplorer({ markets }) {
  const [active, setActive] = useState(0);
  const list = useRef(null);

  useEffect(() => {
    const blocks = [...list.current.querySelectorAll('[data-market]')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(Number(visible[0].target.dataset.market));
    }, { rootMargin: '-40% 0px -55% 0px' });
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  const current = markets[active];
  return (
    <section className="band market-explorer" aria-label="Markets">
      <div className="shell market-explorer__grid">
        <div className="market-stage" aria-hidden="true">
          <div className="market-stage__frame">
            {markets.map((market, index) => <Image key={market.id} src={market.image} alt="" fill sizes="(max-width: 980px) 1px, 52vw" data-active={index === active} />)}
            <p className="market-stage__label"><Icon name={current.icon} size={18} />{current.name}</p>
          </div>
          <ol className="market-stage__dots">{markets.map((market, index) => <li key={market.id} data-active={index === active} />)}</ol>
        </div>
        <div className="market-list" ref={list}>
          {markets.map((market, index) => (
            <article id={market.id} key={market.id} className="market-block" data-market={index} aria-labelledby={`${market.id}-title`}>
              <div className="market-block__media"><Image src={market.image} alt={market.alt} width={1600} height={1000} sizes="(max-width: 980px) 92vw, 1px" /></div>
              <p className="market-block__name"><span className="market-icon"><Icon name={market.icon} size={20} /></span>{market.name}</p>
              <h2 className="h-md" id={`${market.id}-title`}>{market.title}</h2>
              <p className="lede">{market.body}</p>
              {market.examples.length > 0 && <ul className="market-chips" aria-label={`${market.name} instruments`}>{market.examples.map((item) => <li key={item}>{item}</li>)}</ul>}
              <dl className="market-facts">{market.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              <div className="inner-actions">
                <SmartLink className="btn btn--solid btn--sm" href={site.registerUrl}>Trade {market.name.toLowerCase()}<Icon name="arrow" size={15} /></SmartLink>
                <a className="btn btn--ghost btn--sm" href="https://www.bytefx.com/tools/quotes">Live quotes</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
