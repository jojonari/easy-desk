const prefix = 
  process.env.NODE_ENV === 'production' ? 'http://just-new.com' : ''

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  }
export default nextConfig;
