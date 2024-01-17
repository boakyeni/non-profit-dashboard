/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    }
}

module.exports = nextConfig
