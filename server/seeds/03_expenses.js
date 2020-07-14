
exports.seed = function(knex) {
  return knex('expenses').del()
    .then(function () {
      return knex('expenses').insert([
        {
          amount: 10.00,
          user_id: 1
        },
        {
          amount: 20.00,
          user_id: 2
        },
      ]);
    });
};
