
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('name');
        table.string('email');
        table.string('password');
        table.integer('role_id').unsigned();
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  
        table.unique('email');
        table.index('role_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
