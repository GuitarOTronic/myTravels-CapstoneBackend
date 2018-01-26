const db = require('../db/connections.js')

class TripEntriesModel{

  static getTripEntries(id){
    return db('trip_entries')
      .where({trip_id:id})
      .returning('*')

  }

}

module.exports = TripEntriesModel
