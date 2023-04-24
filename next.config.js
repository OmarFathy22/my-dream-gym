/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
   domains:['d205bpvrqc9yn1.cloudfront.net']
    
  },
}

module.exports = nextConfig
