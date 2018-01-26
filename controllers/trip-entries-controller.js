const Model = require('../models/trip-entries-model.js')
const PicsModel = require('../models/pics-model.js')

class TripEntriesController{

  static getTripEntries(req, res, next) {
    const tripId = req.params.id
    Model.getTripEntries(tripId).then(response => {
      let memory = response.memory
      // let picArray = req.body.picArray
      req.body.tripEntries=response
      next()
      // res.status(200).json({memory, picArray, response})
    })
  }
}

module.exports = TripEntriesController
