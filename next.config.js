/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   domains:['d205bpvrqc9yn1.cloudfront.net' , 'i.ytimg.com',"yt3.ggpht.com"]
    
  },
  compiler: {
    // Enables the styled-components SWC transform
    // reactStrictMode: true,
    styledComponents: true
  },
}

module.exports = nextConfig
