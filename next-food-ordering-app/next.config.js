const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
});
const nextTranslate = require('next-translate-plugin');

const config = {
	reactStrictMode: true,
	env: {
		API_URL: process.env.API_URL,
		API_URL_MEDIA: process.env.API_URL_MEDIA,
		MONGO_URL: process.env.MONGO_URL,
		// ADMIN_USERNAME: process.env.ADMIN_USERNAME,
		// ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
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
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '765',
			},
			{
				protocol: 'http',
				hostname: '31.170.165.239',
				port: '765',
			},
			{
				protocol: 'http',
				hostname: '31.170.165.239',
				port: '765',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3333',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3333',
			},
			{
				protocol: 'http',
				hostname: 'lahmahandfahmah.com',
				port: '80',
			},
			{
				protocol: 'http',
				hostname: 'lahmahandfahmah.com',
				port: '80',
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
						value: '31.170.165.239:765/*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
					},
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
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
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: 'http://31.170.165.239:80/api/:path*',
	// 		},
	// 		{
	// 			source: '/:path*',
	// 			destination: 'http://31.170.165.239:80/:path*',
	// 		},
	// 		{
	// 			source: '/admin/:path*',
	// 			destination: 'http://31.170.165.239:80/admin/:path*',
	// 		},
	// 		{
	// 			source: '/images/:path*',
	// 			destination: 'http://31.170.165.239:80/images/:path*',
	// 		},
	// 		{
	// 			source: '/uploads/:path*',
	// 			destination: 'http://31.170.165.239:80/uploads/:path*',
	// 		},
	// 		{
	// 			source: '/api',
	// 			destination: 'http://31.170.165.239:80/api',
	// 		},
	// 	];
	// },
};

module.exports = nextTranslate(withPWA(config));
