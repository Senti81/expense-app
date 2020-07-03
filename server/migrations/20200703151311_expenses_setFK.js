
exports.up = function(knex) {
    return knex.schema.alterTable('expenses', (table) => {
        table.foreign('user_id').references('users.id');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('expenses', (table) => {
        table.dropForeign('user_id');
    });
};
