'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/icon';
import { site } from '@/lib/content';
import EnquiryForm from './enquiry-form';

const channels = [
  { id: 'chat', icon: 'chat', label: 'Live chat', value: 'Click to chat, 24/6', href: site.liveChatUrl, action: 'Start a chat', external: true },
  { id: 'email', icon: 'mail', label: 'Email support', value: site.email, href: `mailto:${site.email}`, action: 'Send an email', copy: site.email },
  { id: 'phone', icon: 'phone', label: 'Global support', value: site.phone, href: `tel:${site.phoneHref}`, action: 'Call us', copy: site.phone },
  { id: 'telegram', icon: 'telegram', label: 'Telegram community', value: '5,000+ active traders', href: site.telegramUrl, action: 'Join', external: true },
];

/* Each topic points to the quickest channel for it and one thing to have ready. */
const topics = [
  { id: 'My account', best: 'chat', tip: 'Include the email address you registered with. Never share your password or security codes.' },
  { id: 'Deposits & withdrawals', best: 'chat', tip: 'Have the payment method, amount, date and transaction reference ready.' },
  { id: 'MetaTrader 5', best: 'chat', tip: 'Tell us your MT5 login number and the device you trade on.' },
  { id: 'Partnership (IB)', best: 'email', tip: 'Tell us where your audience is and how you would like to work together.' },
  { id: 'Something else', best: 'email', tip: 'Share as much detail as you can and the team will reply by email.' },
];

export default function ContactDesk() {
  const [topic, setTopic] = useState('');
  const [copied, setCopied] = useState('');
  const timer = useRef(0);
  const current = topics.find((item) => item.id === topic);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy(channel) {
    try {
      await navigator.clipboard.writeText(channel.copy);
      setCopied(channel.id);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(''), 2000);
    } catch {
      window.location.assign(channel.href);
    }
  }

  const fields = [
    { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
    { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email' },
    { name: 'topic', label: 'Topic', type: 'select', required: true, wide: true, options: topics.map((item) => item.id), value: topic, onChange: setTopic },
    { name: 'message', label: 'Message', type: 'textarea', required: true, wide: true, placeholder: 'How can we help? Never include your password or security codes.' },
  ];

  return (
    <section className="band cdesk" id="message" aria-labelledby="cdesk-title">
      <div className="shell cdesk__grid">
        <div className="cdesk__route">
          <h2 className="h-md" id="cdesk-title">What’s it about?</h2>
          <div className="cdesk__topics" role="radiogroup" aria-label="Topic">
            {topics.map((item) => (
              <label key={item.id} data-selected={topic === item.id}>
                <input type="radio" name="cdesk-topic" value={item.id} checked={topic === item.id} onChange={() => setTopic(item.id)} />
                <span>{item.id}</span>
              </label>
            ))}
          </div>
          <p className="cdesk__tip" aria-live="polite" key={topic || 'none'}>
            {current ? current.tip : 'Pick a topic and we will point you to the quickest way to reach the team.'}
          </p>

          <ul className="cdesk__channels" aria-label="Ways to reach support">
            {channels.map((channel) => {
              const best = current?.best === channel.id;
              return (
                <li key={channel.id} data-best={best || undefined}>
                  <span className="cdesk__glyph"><Icon name={channel.icon} size={18} /></span>
                  <span className="cdesk__what">
                    <strong>{channel.label}{best && <em>Quickest for this</em>}</strong>
                    <span>{channel.value}</span>
                  </span>
                  <span className="cdesk__do">
                    {channel.copy && (
                      <button type="button" className="cdesk__copy" onClick={() => copy(channel)} aria-label={`Copy ${channel.value}`}>
                        {copied === channel.id ? <><Icon name="check" size={13} />Copied</> : 'Copy'}
                      </button>
                    )}
                    <a href={channel.href} {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {channel.action}<Icon name="arrow" size={13} />
                    </a>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard.' : ''}</p>
        </div>

        <div className="cdesk__write">
          <h2 className="h-md">Send us a message</h2>
          <p className="lede">We reply by email. For anything urgent, live chat is the quickest way to reach us.</p>
          <EnquiryForm subject={topic ? `Website enquiry: ${topic}` : 'Website enquiry'} fields={fields} submitLabel="Send message" note="Sending opens your email app with your message addressed to support." />
        </div>
      </div>
    </section>
  );
}
