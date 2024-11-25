import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'de', 'uk', 'ru', 'pl'],
		defaultLocale: 'en',
		localeDetection: false,
	},
}

export default nextConfig
