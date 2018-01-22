
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name:'Sean', email: 'sean@sean.com', password:'$2a$10$SnjaJRkQdFtTk.2w7o6Rb.62CfawhINw5T2YjudquiQhlghpYRCqa'},
        {id: 2, name: 'Lauren', email: 'lauren@yahoo.com', password:'$2a$10$SnjaJRkQdFtTk.2w7o6Rb.62CfawhINw5T2YjudquiQhlghpYRCqa'},
        {id: 3, name: 'Leslie', email: 'leslie@yahoo.com', password:'password'},
      ]);
    })
    .then(()=>{
        return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    })
};
