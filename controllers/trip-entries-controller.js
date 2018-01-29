const Model = require('../models/trip-entries-model.js')
const PicsModel = require('../models/pics-model.js')

class TripEntriesController{

  static createTripEntry(req, res, next) {
    let body = req.body
    console.log(body);
    Model.createTripEntry(body).then(response => {
      let tripEntryId=response[0].id
      res.status(200).json({tripEntryId})
      // console.log('createTripEntry response=> ', tripId);
    })
  }

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
