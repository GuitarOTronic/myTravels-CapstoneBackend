const db = require('../db/connections.js')

class PicsModel {

  static addPhoto(pic){
    return db('pics')
      .insert(pic)
      .returning('*')
  }

}

module.exports = PicsModel
