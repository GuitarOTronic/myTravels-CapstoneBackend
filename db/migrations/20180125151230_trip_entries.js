
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trip_entries', (table)=>{
    table.increments();

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.integer('trip_id').notNullable()
    table.foreign('trip_id').references('trips.id').onDelete('CASCADE')

    table.string('title').notNullable()


    table.text('memory')

    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trip_entries')
};
