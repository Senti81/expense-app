const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', require('./routes/users'));
app.use('/expenses', require('./routes/expenses'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
