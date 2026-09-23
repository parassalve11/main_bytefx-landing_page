/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /* The demo-account page was retired. Old links (including the landing
     page's "Try a demo" button) land on the account comparison instead. */
  async redirects() {
    return [{ source: '/trading/demo-account', destination: '/trading/account-types', permanent: false }];
  },
};

export default nextConfig;
