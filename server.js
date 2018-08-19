const http = require('http');
var app = require('express')();
var parser = require('body-parser');
const sqlite3 = require('sqlite3');

const port = process.env.PORT || 5000;
 
// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE data(sample TEXT);');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('SenseNC heroku webpage!');
});

var concat = "";

app.get('/data', (req, res) => {
	let sql = `SELECT * from data;`;
	concat = "";
	db.each(sql, [], (err, row) => {
		if (err) {
			throw err;
		}
		concat += row.string + "|";
	});
	res.send('SUCCESS');
});

app.post('/', (req, res) => {
	console.log("POST REQUEST RECEIVED");
	console.log(req.body.sample);
	db.run(`INSERT INTO data(sample) VALUES(?);`, [req.body.sample], (err) => {
		if (err) {
      		return console.log(err.message);
    	}
	});
	res.send(concat);
});

app.listen(port, (err) => {
	if (err) {
		return console.log('Server initialization falied.');
	}
	console.log(`Server running on ${port}/`);
});