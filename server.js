const http = require('http');
var express = require('express');

const port = process.env.PORT || 5000;

express.get('/', (req, res) => {
	res.send('Hello from express!');
});

express.listen(port, (err) => {
	if (err) {
		return console.log('Server initialization falied.');
	}
	console.log(`Server running on ${port}/`);
});