const withPWA = require('@ducanh2912/next-pwa').default({
	reloadOnOnline: true,
});
const nextTranslate = require('next-translate-plugin');

const config = {
	swcMinify: true,
	reactStrictMode: false,
	compress: true,
	env: {
		API_URL: process.env.API_URL,
		API_URL_MEDIA: process.env.API_URL_MEDIA,
		MONGO_URL: process.env.MONGO_URL,
		ADMINS: process.env.ADMINS,
		TOKEN: process.env.TOKEN,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com',
			},
			{
				hostname: 'localhost',
				port: '765',
			},
			{
				hostname: '31.170.165.239',
				port: '765',
			},
			{
				hostname: '31.170.165.239',
				port: '3333',
			},
			{
				hostname: 'localhost',
				port: '3333',
			},
			{
				hostname: 'lahmahandfahmah.com',
			},
		],
		minimumCacheTTL: 60,
	},
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{
						key: 'Access-Control-Allow-Origin',
						value: 'lahmahandfahmah.com/*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
	i18n: {
		locales: ['en', 'ar'],
		defaultLocale: 'en',
	},
};

module.exports = nextTranslate(withPWA(config));
