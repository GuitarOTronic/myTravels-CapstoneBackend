const Model = require('../models/trip-entries-model.js')

class TripEntriesController{
  static getTripEntries(req, res, next) {
    const id = req.params.id
    Model.getTripEntries(id).then(response => {
      res.status(200).json({response})
    })
  }
}

module.exports = TripEntriesController
