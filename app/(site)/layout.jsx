import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
export default function SiteLayout({ children }) {
  return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}<SiteFooter /></>;
}
