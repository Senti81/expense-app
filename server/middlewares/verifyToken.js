const jwt = require('jsonwebtoken');
const e = require('express');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');   
    if (!token) {
        console.error('Missing Token Header');
        return res.sendStatus(401);
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.sendStatus(401);
    }
    next();
}