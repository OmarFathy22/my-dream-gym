/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
   domains:['d205bpvrqc9yn1.cloudfront.net' , 'i.ytimg.com',"yt3.ggpht.com"],    
   unoptimized:true
  },
  compiler: {
    // Enables the styled-components SWC transform
    // reactStrictMode: true,
    styledComponents: true
  },
}

module.exports = nextConfig
