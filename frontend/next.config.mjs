/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'mw.ts'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'd2fv0d1v6fbc6y.cloudfront.net',  pathname: '/movie-management/**' },
    ]
  },
  async redirects() {
    return [{ source: '/', destination: '/my-movies', permanent: true }]
  },
}

export default nextConfig
