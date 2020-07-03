
exports.up = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.foreign('role_id').references('roles.id');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.dropForeign('role_id');
    });
};
