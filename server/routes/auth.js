const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../db/connection');
const verify = require('../middlewares/verifyToken');

const errorMessage = {
    success: false,
    message: `Email oder Passwort ist falsch`
};

router.get('/', verify, async (req, res) => {
    res.status(200).send(req.user);
});

router.post('/', async (req, res) => {
    const user = await knex('users')
        .join('roles', 'role_id', '=', 'roles.id')
        .select('users.id as userId', 'roles.name as role', 'users.name as name', 'email', 'password')
        .where('email', req.body.email).first();
    if (!user)
        return res.send(errorMessage);

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid)
        return res.send(errorMessage);

    const token = jwt.sign(
        {
            id: user.userId,
            name: user.name,
            email: user.email,
            role: user.role
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