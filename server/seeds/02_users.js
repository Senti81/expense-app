
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          name: 'TestUser01',
          email: 'tesuser01@live.de',
          password: 'test1234',
          role_id: 2        
        },
        {
          name: 'TestUser02',
          email: 'tesuser02@live.de',
          password: 'test1234',
          role_id: 2        
        },
        {
          name: 'TestAdmin01',
          email: 'tesadmin01@live.de',
          password: 'test1234',
          role_id: 1        
        },
      ]);
    });
};
