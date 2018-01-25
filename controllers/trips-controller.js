const Model = require('../models/trips-model.js')
console.log('trips controler');
class TripsController{

  static createTrip(req, res, next){
    Model.createTrip(req.body).then(response => {
      console.log(response);
      res.status(201).json({response})
    })
  }

  static getTrips(req, res, next) {
    let id = req.params.id
    console.log('id getTrips ', id);
    Model.getTrips(id).then(response => {
      res.status(200).json({response})
    })
  }

}

module.exports =TripsController
