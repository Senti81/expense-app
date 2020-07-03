const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rolesRoute = require('./routes/roles');
const usersRoute = require('./routes/users');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/roles', rolesRoute);
app.use('/users', usersRoute);

// catch 404 and foward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

module.exports = app;
