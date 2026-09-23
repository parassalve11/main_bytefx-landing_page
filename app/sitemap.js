const paths = [
  '/',
  '/trading/account-types', '/trading/mobile-app', '/trading/funding', '/trading/getting-started',
  '/markets', '/partners',
  '/about', '/why-bytefx', '/trust-security', '/contact', '/legal',
];
export default function sitemap() {
  return paths.map(path => ({ url: `https://bytefx.com${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.8 }));
}
