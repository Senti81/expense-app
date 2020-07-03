const router = require('express').Router();

const knex = require('../db/connection');

router.get('/users', async (req, res) => {
    const allUsers = await knex('users');
    res.json(allUsers);
});

module.exports = router;