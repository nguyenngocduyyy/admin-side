const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const { MongoClient } = require("mongodb");
const handlebarhelpers = require('handlebars-helpers')();
const exphbs = require('express-handlebars');

const homeRouter = require('./routes/home');
const editClothRouter = require('./routes/editCloth');
const userRouter = require('./routes/users');
require('./dal/db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/',
    helpers: handlebarhelpers,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/editCloth', editClothRouter);
app.use('/users', userRouter);
// app.use('/users', usersRouter);
// app.use('/books', booksRouter);
// app.use('/detail', detailRouter);

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

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

module.exports = app;