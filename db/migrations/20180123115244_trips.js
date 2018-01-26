
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', (table)=>{
    table.increments();
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('title', 80).notNullable().defaultTo('')
    table.boolean('currentTraveler').defaultTo(false)
    table.string('country', 100).defaultTo('')
    table.string('region', 100).defaultTo('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trips')
};
