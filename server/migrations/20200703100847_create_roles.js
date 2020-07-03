
exports.up = function(knex) {
    return knex.schema.createTable('roles', (table) => {
        table.increments();
        table.string('name');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles');
};
