/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL:process.env.API_URL,
        SITE_URL:process.env.SITE_URL,
        SOCKET_URL:process.env.SOCKET_URL
    },
}

module.exports = nextConfig
