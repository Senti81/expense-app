const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rolesRoute = require('./routes/roles');
const usersRoute = require('./routes/users');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/roles', rolesRoute);
app.use('/users', usersRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
