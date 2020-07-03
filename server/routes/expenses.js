const router = require('express').Router();
const knex = require('../db/connection');

router.get('/', async (req, res) => {
    const allRoles = await knex('expenses');
    res.json(allRoles);
});

router.get('/:id', async (req, res, next) => {
    const roleById = await getById(req.params.id).first();
    roleById ? res.json(roleById) : next();
});

router.get('/users/:id', async (req, res, next) => {
    const expensesByUser = await knex('expenses').where('user_id', req.params.id);
    expensesByUser ? res.json(expensesByUser) : next();
});

router.post('/', async (req, res) => {
    const newId = await knex('expenses').insert(req.body);
    res.json(await getById(newId).first());
});

router.put('/:id', async (req, res, next) => {
    const updatedRole = await getById(req.params.id).update(req.body);
    updatedRole === 1 ? res.json(await getById(req.params.id).first()) : next();
});

router.delete('/:id', async (req, res, next) => {
    const deletedRole = await getById(req.params.id).del();
    deletedRole === 1 ? res.json(deletedRole) : next();
});

function getById(id) {
    return knex('expenses').where('id', id);
}

module.exports = router;