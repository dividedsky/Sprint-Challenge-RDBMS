exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', (tbl) => {
    tbl.increments();
    tbl.string('name', 255).unique().notNullable();
    tbl.text('description');
    tbl.boolean('completed').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
