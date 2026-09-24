import Image from 'next/image';
import ClosingSection from '@/components/closing-section';
import Reveal from '@/components/reveal';
import { Actions, PageHero, PageSchema, SectionHead, pageMetadata } from '@/components/inner/page-kit';
import { StickySubnav } from '@/components/inner/interactions';
import { SetupStory, VerificationChecklist } from '@/components/inner/trading-guides';
import { site } from '@/lib/content';
import { gettingStartedPage as page } from '@/lib/pages/getting-started';

export const metadata = pageMetadata(page);
const sections = [['register','01 Register'],['verify','02 Verify'],['fund','03 Fund'],['trade','04 Trade']];
export default function GettingStartedPage() {
  return <main id="main" className="inner-page getting-started-page">
    <PageSchema page={page} />
    <PageHero page={page} />
    <StickySubnav items={sections} />
    <SetupStory />
    <VerificationChecklist />
    <section className="mobile-section inner-color-band"><div className="shell inner-split"><div><p className="eyebrow">There’s room to practise</p><h2 className="h-lg">Not ready<br />for real money?</h2><p className="lede">Start with virtual funds. Demo accounts are opened from the client area, so you can learn the platform and test a routine before choosing a live account.</p><Actions primary={{label:'Open a free demo',href:site.registerUrl}} secondary={{label:'Talk to support',href:'/contact'}} /></div><Image src="/assets/generated/demo.webp" alt="Crystal practice shield with a lime play symbol" width={1100} height={1100} sizes="(max-width: 760px) 85vw, 46vw" /></div></section>
    <div><ClosingSection title="Start with a plan." accent="Make it yours." lead="Choose your account, prepare the essentials and take the next step at your own pace." primary={{label:'Compare accounts',href:'/trading/account-types'}} secondary={{label:'Funding & withdrawals',href:'/trading/funding'}} /></div>
  </main>;
}
