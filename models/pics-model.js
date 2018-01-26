const db = require('../db/connections.js')

class PicsModel {

  static addPhoto(pic){
    return db('pics')
      .insert(pic)
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
