import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { filename },
	} = req;

	const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

	if (fs.existsSync(filePath)) {
		const ext = path.extname(filePath);
		let contentType = 'application/octet-stream';
		switch (ext) {
			case '.jpg':
			case '.jpeg':
				contentType = 'image/jpeg';
				break;
			case '.png':
				contentType = 'image/png';
				break;
			case '.gif':
				contentType = 'image/gif';
				break;
		}
		res.setHeader('Content-Type', contentType);

		const readStream = fs.createReadStream(filePath);
		readStream.pipe(res);
	} else {
		res.status(404).json({ message: 'File not found' });
	}
}
