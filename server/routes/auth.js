const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../db/connection');
const verify = require('../middlewares/verifyToken');

const errorMessage = {
    success: false,
    message: `Email or password is wrong`
};

router.get('/', verify, async (req, res) => {
    res.status(200).send(req.user);
});

router.post('/', async (req, res) => {
    const user = await knex('users').where('email', req.body.email).first();
    if (!user)
        return res.send(errorMessage);

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid)
        return res.send(errorMessage);

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    );
    res.send({
        success: true,
        token
    });
});

module.exports = router;