const prefix = 
  process.env.NODE_ENV === 'production' ? 'https://github.io/jojonari/new-rich' : ''

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  }
export default nextConfig;
