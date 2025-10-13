var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require('ejs-blocks');// menggunkkan ejs block
var mongoose = require('mongoose');

require('./app_toko_online/models/db'); // koneksi ke database
var apiProductRouter = require("./app_toko_online/routes/api/product"); //import router 
var indexRouter = require('./app_toko_online/routes/index');
var usersRouter = require('./app_toko_online/routes/users');
var productRouter = require("./app_toko_online/routes/product");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_toko_online','views'));// perbaikan 1
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstraps',express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))
app.use("/api/produk", apiProductRouter);//daftarkan router api
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/product",productRouter);

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