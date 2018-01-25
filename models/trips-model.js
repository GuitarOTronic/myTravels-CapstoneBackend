const db = require('../db/connections.js')
console.log('trips model');
class TripsModel{

  static createTrip(body){
      return db('trips')
        .insert(body)
        .returning('*')
  }

  static getTrips(user_id){
    return db('trips')
    .where({user_id})
    .returning('*')
  }
}


module.exports = TripsModel
