export async function up(knex) {
    await knex.schema.createTable('categories', (table)=>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at').nullable();
    })
} /* UP  migrate edildiğinde çalışacak kod */


export async function down(knex) {
    await knex.schema.dropTable('categories');
} /* DOWN migrate çekildiğinde çalışacak kod */