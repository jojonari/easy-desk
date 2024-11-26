const prefix = 
  process.env.NODE_ENV === 'production' ? 'https://just-new.com' : 'http://localhost:3000'

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  }
export default nextConfig;
