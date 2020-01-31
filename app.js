var createError = require('http-errors');
var express = require('express');
const router = express.Router();
var http = require('http');
var session =require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var purchaseRouter = require('./routes/purchase');
var downloadRouter = require('./routes/download');
var session ;
var authenticated = false;
var app = express();
<<<<<<< HEAD
var socket = require('socket.io');
var io = socket(server);

var server = http.createServer(app);
=======
>>>>>>> 546be8d375fb4cc7a92a2b013990a0a7f8383004

// view engine setup
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear' , () => {
	return new Date().getFullYear();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use(router);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/purchase' , purchaseRouter);
require('dotenv').config()
app.use('/download_script' , downloadRouter);
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
  res.render('error.hbs' , {title : "error occured"});
});

<<<<<<< HEAD
io.on('connection' , (socket) => {
	console.log('USer connected');
	socket.emit('newMsg' , {
		name : 'User',
		msg : 'Hello'
	});

	socket.on('createMsg' ,(newMsg) => {
		console.log('Msg received' , newMsg);
	});


	socket.on('disconnect' , () => {
		console.log('User disconnected');
	})

});




module.exports = app;
=======


module.exports = app;
>>>>>>> 546be8d375fb4cc7a92a2b013990a0a7f8383004
