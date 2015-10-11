var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address_book.db');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('public/index.html');
});

app.post('/postData', function (req, res) {
  db.run("insert into Persons (FirstName, LastName, Address, City, State, Zip) values (?,?,?,?,?,?)", req.body.fname , req.body.lname, req.body.address,  req.body.city, req.body.state, req.body.zip);
  res.render('dataOk', {data: req.body});
  console.log(req.body);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
