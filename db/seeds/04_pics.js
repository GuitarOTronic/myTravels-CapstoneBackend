
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pics').del()
    .then(function () {
      // Inserts seed entries
      return knex('pics').insert([
        {id: 1, user_id: 1, trip_id:1, public_id:'ssly1wruu4d0r5bdsj7c', url:'http://res.cloudinary.com/mytravels/image/upload/v1516921403/ssly1wruu4d0r5bdsj7c.jpg', trip_entry_id:1},
        {id: 2, user_id: 1, trip_id:1, public_id:'xlxwupyqrwxipmxqrnuk', url:'http://res.cloudinary.com/mytravels/image/upload/v1516917519/xlxwupyqrwxipmxqrnuk.jpg', trip_entry_id:2 },
        {id: 3, user_id: 1, trip_id:2, public_id:'stofgw04tmq7lifstel8', url:'http://res.cloudinary.com/mytravels/image/upload/v1516916176/stofgw04tmq7lifstel8.jpg', trip_entry_id:3 },
      ]);
    })
    .then(()=>{
        return knex.raw(`SELECT setval('pics_id_seq', (SELECT MAX(id) FROM pics));`)
    })
};
