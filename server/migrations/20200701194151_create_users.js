
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('name');
        table.string('email');
        table.string('password');
        table.integer('role_id').unsigned();
        table.timestamps(true, true);
  
        table.unique('email');
        table.index('role_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
