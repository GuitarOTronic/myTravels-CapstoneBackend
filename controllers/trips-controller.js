const Model = require('../models/trips-model.js')
console.log('trips controler');
class TripsController{

  static createTrip(req, res, next){
    Model.createTrip(req.body).then(response => {
      req.body.tripId = response[0].id
      req.body.userId = req.body.user_id
      console.log('Creating this trip: =>>>tripId=',response[0].id);
      next()
      // res.status(201).json({response})
    })
  }

  static deleteTrip(req, res, next) {
    const id = req.params.id
    Model.deleteTrip(id).then(response => {
      res.status(200).json({response})
    })
  }

  static getEntryCountry(req, res, next) {
    let tripEntries = res.tripEntries
    let promises=[]
    let order = []
    for ( let i in tripEntries){
      promises.push(Model.getEntryCountry(tripEntries[i].trip_id))
      order.push(i)
    }
    Promise.all(promises).then(response => {
      for ( let i in response){
        tripEntries[order[i]].country=response[i].country

      }
    }).then(()=>{
      res.tripEntries=tripEntries
      next()
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
