module.exports = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{
						key: 'Access-Control-Allow-Origin',
						value: '31.170.165.239',
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
};
