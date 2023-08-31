/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.vercel.com',
                port: '',
                pathname: '/image/upload/**',
            },
            {
                protocol:'https',
                hostname:"lh3.googleusercontent.com",
                port:'',
            }
        ],
    },
}

module.exports = nextConfig
