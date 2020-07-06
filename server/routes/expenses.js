const router = require('express').Router();
const knex = require('../db/connection');

router.get('/', async (req, res) => {
    const allExpenses = await knex('expenses');
    res.json(allExpenses);
});

router.get('/:id', async (req, res, next) => {
    const expenseById = await getById(req.params.id).first();
    expenseById ? res.json(expenseById) : next();
});

router.get('/users/:id', async (req, res, next) => {
    const expensesByUser = await knex('expenses').where('user_id', req.params.id);
    expensesByUser.length > 0 ? res.json(expensesByUser) : next();
});

router.post('/', async (req, res) => {
    const newId = await knex('expenses').insert(req.body);
    res.json(await getById(newId).first());
});

router.put('/:id', async (req, res, next) => {
    const updatedExpense = await getById(req.params.id).update(req.body);
    updatedExpense === 1 ? res.json(await getById(req.params.id).first()) : next();
});

router.delete('/:id', async (req, res, next) => {
    const deletedExpense = await getById(req.params.id).del();
    deletedExpense === 1 ? res.json(deletedExpense) : next();
});

function getById(id) {
    return knex('expenses').where('id', id);
}

module.exports = router;