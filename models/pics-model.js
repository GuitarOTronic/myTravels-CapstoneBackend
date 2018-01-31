const db = require('../db/connections.js')

class PicsModel {

  static addPhoto(pic){
    return db('pics')
      .insert(pic)
      .returning('*')
  }

  static getAllPhotos(){
    return db('pics')
      .select('public_id', 'trip_entry_id')
      .returning('*')
  }

  static getFellowEntryPhotos(trip_entry_id) {
    return db('pics')
      .where({trip_entry_id})
      .select('public_id')
      .returning('*')
  }

  static getTripPhotos(id){
    return db('pics')
      .where({trip_entry_id:id})
      .returning('*')

  }

  static getTripEntryPhotos(id){
    return db('pics')
      .where({trip_entry_id:id})
      .returning('*')
  }

}

module.exports = PicsModel
