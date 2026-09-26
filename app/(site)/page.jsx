import AtlasSection from '@/components/atlas-section';
import PaymentsSection from '@/components/payments-section';
import PlatformsSection from '@/components/platforms-section';
import BentoSection from '@/components/bento-section';
import BrokerSection from '@/components/broker-section';
import ClosingSection from '@/components/closing-section';
// import HeroSlot from '@/components/hero-slot'; // Previous hero, kept for reuse.
import LandingHero from '@/components/landing-hero';
import MobileSection from '@/components/mobile-section';
import MetaTraderSection from '@/components/metatrader-section';
import RatingsStrip from '@/components/ratings-strip';
import VoicesSection from '@/components/voices-section';

export default function Home() {
  return (
    <main id="main">
        {/* <HeroSlot /> */}
        <LandingHero />
        <BrokerSection />
        <MetaTraderSection />
        <BentoSection />
        <PlatformsSection />
        <MobileSection />
        <PaymentsSection />
        <AtlasSection />
        <RatingsStrip />
        <VoicesSection />
        <ClosingSection />
      </main>
  );
}
