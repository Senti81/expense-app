const router = require('express').Router();
const knex = require('../db/connection');
const verify = require('../middlewares/verifyToken');

router.get('/', verify, async (req, res) => {
    const allExpenses = await knex('expenses')
        .join('users', 'user_id', '=', 'users.id')
        .select('expenses.id as id', 'users.name as name', 'amount', 'expenses.created_at')
        .orderBy('expenses.created_at', 'asc')
    res.json(allExpenses);
});

router.get('/:id', verify, async (req, res, next) => {
    const expenseById = await getById(req.params.id).first();
    expenseById ? res.json(expenseById) : next();
});

router.get('/users/:id', verify, async (req, res, next) => {
    const expensesByUser = await knex('expenses').where('user_id', req.params.id);
    expensesByUser.length > 0 ? res.json(expensesByUser) : next();
});

router.post('/', verify, async (req, res) => {
    const newId = await knex('expenses').insert({
        amount: req.body.amount,
        user_id: req.user.id
    });
    res.json(await getById(newId).first());
});

router.put('/:id', verify, async (req, res, next) => {
    const updatedExpense = await getById(req.params.id).update(req.body);
    updatedExpense === 1 ? res.json(await getById(req.params.id).first()) : next();
});

router.delete('/:id', verify, async (req, res, next) => {
    const deletedExpense = await getById(req.params.id).del();
    deletedExpense === 1 ? res.json(deletedExpense) : next();
});

function getById(id) {
    return knex('expenses').where('id', id);
}

module.exports = router;