const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/users', require('./routes/users'));
app.use('/expenses', require('./routes/expenses'));
app.use('/auth', require('./routes/auth'));

app.use(express.static(__dirname + '/public'));
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use(notFound);
app.use(errorHandler);

module.exports = app;
