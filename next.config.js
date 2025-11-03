/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL:process.env.API_URL,
        SITE_URL:process.env.SITE_URL,
        SOCKET_URL:process.env.SOCKET_URL,
        CLIENT_API_URL:process.env.CLIENT_API_URL
    },
    experimental:{
        serverActions:{
            allowedOrigins: ['localhost:8080', process.env.SITE_URL]
        },
    },
    reactStrictMode: false
}

module.exports = nextConfig
