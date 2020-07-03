
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          name: 'Admin',
          email: 'admin@live.de',
          password: 'test1234',
          role_id: 1        
        },
        {
          name: 'User',
          email: 'user@live.de',
          password: 'test1234',
          role_id: 2        
        }
      ]);
    });
};
