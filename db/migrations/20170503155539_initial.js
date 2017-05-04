
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', (table) => {
      table.increments('id').primary();
      table.string('title');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('links', (table) => {
      table.increments('id').primary();
      table.string('longUrl');
      table.integer('visits');
      table.integer('folder_id').unsigned();
      table.foreign('folder_id')
        .references('folders.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('links'),
    knex.schema.dropTable('folders')
  ])
};
