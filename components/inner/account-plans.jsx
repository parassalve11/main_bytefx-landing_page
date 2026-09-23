import Icon from '@/components/icon';
import SmartLink from '@/components/smart-link';
import { accounts, leverageNote } from '@/lib/accounts';

function SpecValue({ value }) {
  if (value === true) return <span className="plan__yes"><Icon name="check" size={14} />Available</span>;
  if (value === false) return <span className="plan__no"><Icon name="minus" size={12} />Not included</span>;
  return value;
}

function PricedPlan({ account }) {
  return (
    <article className={`plan plan--${account.id}`} aria-labelledby={`plan-${account.id}`}>
      <h3 className="plan__name" id={`plan-${account.id}`}>{account.name}</h3>
      <p className="plan__desc">{account.description}</p>
      <p className="plan__price"><span className="plan__currency">$</span><strong>{account.deposit.toLocaleString('en-US')}</strong><small>Min. deposit</small></p>
      <dl className="plan__specs">
        {account.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd><SpecValue value={value} /></dd></div>)}
      </dl>
      <SmartLink className="btn btn--solid plan__cta" href={account.cta.href}>{account.cta.label}<Icon name="arrow" size={15} /></SmartLink>
    </article>
  );
}

export default function AccountPlans() {
  const [standard, pro, custom] = accounts;
  return (
    <>
      <div className="plans">
        <div className="plan-slot"><PricedPlan account={standard} /></div>
        <div className="plan-slot plan-frame plan-frame--featured">
          <span className="plan__tag">{pro.tag}</span>
          <PricedPlan account={pro} />
        </div>
        <div className="plan-slot plan-frame">
          <article className="plan plan--custom" aria-labelledby="plan-custom">
            <p className="plan__kicker">{custom.kicker}</p>
            <h3 className="plan__title" id="plan-custom">{custom.title}</h3>
            <p className="plan__desc">{custom.description}</p>
            <ul className="plan__points">{custom.points.map((point) => <li key={point}><span aria-hidden="true"><Icon name="check" size={11} /></span>{point}</li>)}</ul>
            <SmartLink className="btn btn--solid plan__cta" href={custom.cta.href}>{custom.cta.label}<Icon name="arrow" size={15} /></SmartLink>
          </article>
        </div>
      </div>
      <p className="plans-note">* {leverageNote} <SmartLink href="/contact">Contact us for a custom plan.</SmartLink></p>
    </>
  );
}
