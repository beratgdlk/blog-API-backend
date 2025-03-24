export async function up(knex) {
    await knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE');
        table.text('content');
        table.string('contenter_name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex) {
    await knex.schema.dropTable('comments');
}
