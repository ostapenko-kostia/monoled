import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	sassOptions: {
		silenceDeprecations: ['legacy-js-api']
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '91.239.235.230',
				port: '3002',
				pathname: '/uploads/**',
			},
			{
				protocol: 'https',
				hostname: 'storage.monolight.com.ua',
				pathname: '/**',
			}
		]
	}
}

export default nextConfig
