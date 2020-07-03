
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('name')
            .notNullable();
        table.string('email')
            .unique()
            .notNullable();
        table.string('password')
            .notNullable();
        table.integer('role_id')
            .unsigned()
            .index();
        table.timestamp('created_at')
            .defaultTo(knex.fn.now());
        table.timestamp('updated_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
