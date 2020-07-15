
exports.seed = function(knex) {
  return knex('expenses').del()
    .then(function () {
      return knex('expenses').insert([
        {
          amount: 10.00,
          user_id: 1,
          created_at: '2020-07-01 08:00:00'
        },
        {
          amount: 20.00,
          user_id: 2,
          created_at: '2020-07-01 10:00:00'
        },
      ]);
    });
};
