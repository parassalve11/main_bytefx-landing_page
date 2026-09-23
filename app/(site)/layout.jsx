import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import AtlasChat from '@/components/atlas-chat';
export default function SiteLayout({ children }) {
  return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}<SiteFooter /><AtlasChat /></>;
}
