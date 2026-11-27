/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  devIndicators: false,
  turbopack: { root: import.meta.dirname },
  experimental: { globalNotFound: true },
}

export default nextConfig
