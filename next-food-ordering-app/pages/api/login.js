// import cookie from 'cookie';

// const handler = (req, res) => {
// 	if (req.method === 'POST') {
// 		const { username, password } = req.body;
// 		if (
// 			username === process.env.ADMIN_USERNAME &&
// 			password === process.env.ADMIN_PASSWORD
// 		) {
// 			res.setHeader(
// 				'Set-Cookie',
// 				cookie.serialize('token', process.env.TOKEN, {
// 					maxAge: 60 * 60,
// 					sameSite: 'lax',
// 					path: '/',
// 				}),
// 			);
// 			res.status(200).json('Succesfull');
// 		} else {
// 			res.status(400).json('Wrong Credentials!');
// 		}
// 	}
// };

// export default handler;

import cookie from 'cookie';

const handler = (req, res) => {
	if (req.method === 'POST') {
		const { username, password } = req.body;
		const admins = JSON.parse(process.env.ADMINS);
		const user = admins.find(
			(admin) => admin.username === username && admin.password === password,
		);

		if (user) {
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', process.env.TOKEN, {
					maxAge: 60 * 60,
					sameSite: 'lax',
					path: '/',
				}),
			);
			res.status(200).json('Successful');
		} else {
			res.status(400).json('Wrong Credentials!');
		}
	}
};

export default handler;
