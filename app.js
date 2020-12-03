const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const { MongoClient } = require("mongodb");

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/cloths');
const detailRouter = require('./routes/detail');

require('./dal/db');

// Connect to MongoDB
// Connection URI
// const uri =
//     "mongodb+srv://admin:o1JDnUaeBdA2t17W@cluster0.cejye.mongodb.net/test?authSource=admin&replicaSet=atlas-en1g24-shard-0&readPreference=primary&appname=Bookstore%20Web&ssl=true";
// // Create a new MongoClient
// const client = new MongoClient(uri, { useUnifiedTopology: true });
//
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     const db = await client.db("bookstore");
//     const booksCollection = db.collection('books');
//     const books = await booksCollection.find({}).toArray();
//     console.dir(books);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
//
// run().catch(console.dir);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/detail', detailRouter);

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