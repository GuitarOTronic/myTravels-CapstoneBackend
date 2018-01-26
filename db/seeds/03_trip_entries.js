
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trip_entries').del()
    .then(function () {
      // Inserts seed entries
      return knex('trip_entries').insert([
        {id: 1, user_id: 1, trip_id:1, public_id:'ssly1wruu4d0r5bdsj7c', url:'http://res.cloudinary.com/mytravels/image/upload/v1516921403/ssly1wruu4d0r5bdsj7c.jpg', memory:'Sweet waterfall bro. Lots of water,some birds, and plenty of rocks.'},
        {id: 2, user_id: 1, trip_id:1, public_id:'xlxwupyqrwxipmxqrnuk', url:'http://res.cloudinary.com/mytravels/image/upload/v1516917519/xlxwupyqrwxipmxqrnuk.jpg', memory:'Really pretty hot springs. Unfortuately they don\'t taste all that great.'},
        {id: 3, user_id: 1, trip_id:2, public_id:'stofgw04tmq7lifstel8', url:'http://res.cloudinary.com/mytravels/image/upload/v1516916176/stofgw04tmq7lifstel8.jpg', memory:'Cool Cat Murderface really digs being held and fuckin shit up. '},
      ]);
    })
    .then(()=>{
        return knex.raw(`SELECT setval('trip_entries_id_seq', (SELECT MAX(id) FROM trip_entries));`)
    })
};
