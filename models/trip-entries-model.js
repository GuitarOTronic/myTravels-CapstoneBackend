const db = require('../db/connections.js')

class TripEntriesModel{

  static createTripEntry(body) {
    return db('trip_entries')
      .insert(body)
      .returning('*')
  }

  static getTripEntries(id) {
    return db('trip_entries')
      .where({trip_id:id})
      .returning('*')

  }

  static getAllTripEntries() {
    return db('trip_entries')
      .returning('*')
  }



  static updateTripEntry(title, date, memory, trip_entry_id){
    return db('trip_entries')
    .update({title, date, memory})
    .where({id:trip_entry_id})
    .returning('*')
  }

}

module.exports = TripEntriesModel
