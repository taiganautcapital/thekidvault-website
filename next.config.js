/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirects for any lingering hash-based deep links
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
