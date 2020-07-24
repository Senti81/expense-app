const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const moment = require('moment')

logger.token('date', (req, res) => moment().format('YYYY-MM-DD HH:mm:ss'))
logger.format('log', '[:date] \x1b[33m:method :url \x1b[32m:status \x1b[0m:response-time ms')
app.use(logger('log'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/auth', require('./routes/auth'));

app.use(express.static(__dirname + '/public'));
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use(notFound);
app.use(errorHandler);

module.exports = app;
