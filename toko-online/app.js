var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require('ejs-blocks');
var mongoose = require('mongoose');

require('./app_toko_online/models/db');

var apiProductRouter = require("./app_toko_online/routes/api/product");
var indexRouter = require('./app_toko_online/routes/index');
var usersRouter = require('./app_toko_online/routes/users');
var productRouter = require("./app_toko_online/routes/product");
var apiUserRouter = require("./app_toko_online/routes/api/user");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_toko_online','views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstraps', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// ROUTES
app.use("/api/produk", apiProductRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
// kalau kamu juga mau daftarkan api user
app.use("/api/user", apiUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
