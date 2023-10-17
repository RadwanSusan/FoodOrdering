const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
});

module.exports = withPWA({
	images: {
		domains: [
			'res.cloudinary.com',
			'localhost:765',
			'localhost:765',
			'localhost',
			'31.170.165.239:765',
			'31.170.165.239',
		],
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
					{ key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT',
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
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
});
