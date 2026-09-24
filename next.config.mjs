/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /* The demo-account page was retired. Old links (including the landing
     page's "Try a demo" button) land on the account comparison instead. */
  async redirects() {
    return [
      { source: '/trading/demo-account', destination: '/trading/account-types', permanent: false },
      /* bytefx.com/tools has no page of its own; send it to the tools overview. */
      { source: '/tools', destination: '/markets#tools', permanent: false },
      /* Trust & security and Legal & compliance were retired. The policy PDFs
         stay linked from the footer; old links land on About. */
      { source: '/trust-security', destination: '/about', permanent: false },
      { source: '/legal', destination: '/about', permanent: false },
    ];
  },
};

export default nextConfig;
