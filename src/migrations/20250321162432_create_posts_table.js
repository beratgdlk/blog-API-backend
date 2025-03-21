export async function up(knex) {
    await knex.schema.createTable('posts',(table)=>{
        table.increments('id').primary();
        table.integer('category_id').references('id').inTable('categories').onDelete("CASCADE");
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.timeStamp('created_at').defaultTo(knex.fn.now());
        table.timeStamp('published_at').nullable();
        table.timeStamp('deleted_at').nullable();
    })
} /* UP  migrate edildiğinde çalışacak kod */

export async function down(knex) {
    await knex.schema.dropTable('posts');
}