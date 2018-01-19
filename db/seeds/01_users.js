
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name:'Sean', email: 'Sean@sean.com', password:'password'},
        {id: 2, name: 'Lauren', email: 'Lauren@yahoo.com', password:'password'},
        {id: 3, name: 'Leslie', email: 'Leslie@yahoo.com', password:'password'},
      ]);
    })
    .then(()=>{
        return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    })
};
