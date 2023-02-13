var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'transpertation_app'
})


let individuals = [
  {
    "ID": 1,"firstname": "J","lastname": "B"
  }
]

app.get('/', (req, res) => {
  res.send('hello world')
})

// DRIVERS
app.get('/drivers', (req, res) => {
  connection.query('SELECT * FROM drivers', (err, rows, fields) => {
    if (err) throw err
    res.send(JSON.stringify(rows))
  })
})

app.post('/drivers/add', (req, res) => {
  console.log(req.body)
  res.json(req.body)
  // connection.query(`INSERT INTO drivers(firstname, lastname, email, password) VALUES ()`)
})


// INDIVIDUALS
app.get('/individuals', (req, res) => {
  connection.query('SELECT * FROM individuals', (err, rows, fields) => {
    if (err) throw err
    res.send(JSON.stringify(rows))
  })})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
