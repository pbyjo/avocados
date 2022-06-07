/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

async function rewrites() {
  return [
    {
              // Nueva ruta
      source: '/avocado/:path*',
              // De que ruta vendrá
      destination: '/product/:path*',
    },
  ]
}

module.exports = {
  nextConfig,
  rewrites: rewrites(),
}
