// const path = require('path');
module.exports = {
	images: {
		domains: [
			'res.cloudinary.com',
			'localhost:8000',
			'127.0.0.1:8000',
			'localhost',
			'localhost:8000',
			'localhost',
		],
	},
	// sassOptions: {
	// 	includePaths: [path.join(__dirname, 'styles')],
	// },
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
