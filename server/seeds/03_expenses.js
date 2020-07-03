
exports.seed = function(knex) {
  return knex('expenses').del()
    .then(function () {
      return knex('expenses').insert([
        {
          amount: 123.50,
          user_id: 1
        },
        {
          amount: 9.99,
          user_id: 1
        },
        {
          amount: 0.50,
          user_id: 2
        },
        {
          amount: 999.99,
          user_id: 2
        },
        {
          amount: 1234.67,
          user_id: 2
        },
      ]);
    });
};
