import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	devIndicators: false
}

module.exports = {
	async rewrites() {
		return [
			{
				source: process.env.NEXT_PUBLIC_SOURCE,
				destination: process.env.NEXT_PUBLIC_SERVER_URL
			}
		]
	}
}

export default nextConfig
