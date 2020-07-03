
exports.up = function(knex) {
    return knex.schema.createTable('expenses', (table) => {
        table.increments();
        table.decimal('amount')
            .notNullable();
        table.integer('user_id').unsigned();
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  
        table.index('user_id');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('expenses');
};
