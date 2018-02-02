const db = require('../db/connections.js')

class TripsModel{

  static createTrip(trip){
    return db('trips')
      .insert(trip)
      .returning('*')
  }

  static deleteTrip(trip_id){
    return db('trips')
      .where({id:trip_id})
      .del()
      .returning('*')
  }

  static getEntryCountry(id){
    return db('trips')
    .where({id})
    .select('country', 'region')
    .first()
  }

  static getTripsByCountry(country) {
    return db('trips')
      .where({country})
      .returning('*')
  }

  static getTripsByUserId(user_id){
    return db('trips')
    .where({user_id})
    .returning('*')
  }

}


module.exports = TripsModel
