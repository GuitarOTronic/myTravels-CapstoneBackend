const Model = require('../models/trips-model.js')
console.log('trips controler');
class TripsController{

  static createTrip(req, res, next){
    Model.createTrip(req.body).then(response => {
      res.status(201).json({response})
    })
  }

  static deleteTrip(req, res, next) {
    const id = req.params.id
    Model.deleteTrip(id).then(response => {
      res.status(200).json({response})
    })
  }

  static getTripsByUserId(req, res, next) {
    let id = req.params.id
    Model.getTripsByUserId(id).then(response => {
      res.status(200).json({response})
    })
  }

}

module.exports =TripsController
