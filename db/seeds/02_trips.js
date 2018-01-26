
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        {id: 1, user_id: 1, title:'Trafalger Tours', currentTraveler:false, country:'Canada', region:'Toronto'},
        {id: 2, user_id: 1, title:'EvansBachelor party', currentTraveler:false, country:'United State of America', region:'Pennsylvania'},
        {id: 3, user_id: 2, title:'Whale hunting', currentTraveler:true, country:'Japan', region:'Tokyo'},
      ]);
    })
    .then(()=>{
        return knex.raw(`SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));`)
    })
};
