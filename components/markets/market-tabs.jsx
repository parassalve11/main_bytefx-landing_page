'use client';

import { useId, useRef, useState } from 'react';
import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';

/* Tabbed card sets. Arrow keys, Home and End move between tabs. */
export default function MarketTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const buttons = useRef([]);
  const id = useId();

  const move = (event) => {
    const keys = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="mk-tabs">
      <div className="mk-tabs__list" role="tablist" aria-label="Topics" onKeyDown={move}>
        {tabs.map(([label], i) => (
          <button key={label} ref={(el) => { buttons.current[i] = el; }} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)}>
            {label}
          </button>
        ))}
      </div>
      {tabs.map(([label, cards], i) => (
        <div key={label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} tabIndex={0} className="mk-tabs__panel" data-count={cards.length}>
          {cards.map(([icon, title, body, href]) => (
            <article key={title} className="mk-card">
              <span className="icon-card__glyph"><Icon name={icon} size={20} /></span>
              <h3 className="h-sm">{title}</h3>
              <p className="lede">{body}</p>
              {href && <SmartLink className="mk-card__link" href={href}>{href.startsWith('/tools') ? 'Open the tool' : 'Learn more'}<Icon name="arrow" size={14} /></SmartLink>}
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
