const prefix = 
  process.env.NODE_ENV === 'production' ? 'http://jojonari.dev/new-rich/' : ''

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  }
export default nextConfig;
