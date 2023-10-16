const express = require('express');
const path = require('path');
const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/uploads')));

app.listen(3000, () => {
	console.log('Server running on port 3000');
});