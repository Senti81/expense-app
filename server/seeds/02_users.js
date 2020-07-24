
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          name: 'Matz',
          email: 'matz@app.de',
          password: '$2y$10$SaR8xEQF9Fe0.atiFa6ZbOMNxR.aq//p1FcqAd4v.7ZOrWUx53Fha',
          role_id: 1        
        },
        {
          name: 'Yolli',
          email: 'yolli@app.de',
          password: '$2y$10$SaR8xEQF9Fe0.atiFa6ZbOMNxR.aq//p1FcqAd4v.7ZOrWUx53Fha',
          role_id: 2        
        }
      ]);
    });
};
