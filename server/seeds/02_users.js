
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          name: 'Admin',
          email: 'admin@live.de',
          password: '$2y$10$EWjm33KD2bTfpsM1qxQc9eqmveyyu1Jbk9LLz7RB8s5vzT9vNVWay',
          role_id: 1        
        },
        {
          name: 'User',
          email: 'user@live.de',
          password: '$2y$10$VlkhAXYYmKYvNJrYaUU.qOo98/PXpP/92U7V5VTZlrQnRSpK3TyFm',
          role_id: 2        
        }
      ]);
    });
};
