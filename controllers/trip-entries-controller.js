const Model = require('../models/trip-entries-model.js')
const PicsModel = require('../models/pics-model.js')
const TripsModel = require('../models/trips-model.js')
class TripEntriesController{

  static createTripEntry(req, res, next) {
    let body = req.body
    console.log('createTripEntry', body);
    Model.createTripEntry(body).then(response => {
      let tripEntryId=response[0].id
      res.status(200).json({tripEntryId})
      // console.log('createTripEntry response=> ', tripId);
    })
  }

  static getAllTripEntries(req, res, next) {
    Model.getAllTripEntries().then(response => {
      let tripEntries={}
      res.tripEntries=tripEntries
      for (let i in response){

        tripEntries[response[i].id]={
          trip_entry_id:response[i].id,
          trip_id:response[i].trip_id,
          user_id:response[i].user_id,
          title:response[i].title,
          date:response[i].date,
          memory:response[i].memory
        }
      }
      next()
      // res.status(200).json({response})
    })
  }

  static getTripEntries(req, res, next) {
    const tripId = req.params.id
    Model.getTripEntries(tripId).then(response => {
      let memory = response.memory
      // let picArray = req.body.picArray
      req.body.tripEntries=response
      next()
    })
  }

  static getTripsByCountry(req, res, next) {
    let country = req.params.country
    TripsModel.getTripsByCountry(country).then(trips => {
      req.body.trips=trips
      next()
      // write route to get trip entries by their trip id
      res.status(200)
    })
  }

  static getTripEntriesByTripId(req, res, next) {
      let trips = req.body.trips
      console.log('trips', trips);
      let promises =[]
      trips.map((trip)=> promises.push(Model.getTripEntries(trip.id)))

      console.log('adfadf',trip.id);
      res.status(200)
  }

  static seedTrip(req, res, next){
    let user_id=req.body.user_id
    let trip_id=req.body.tripId
    let body = {user_id, trip_id}
    Model.createTripEntry(body).then(response => {
      res.status(200).json(response)
    })
  }

  static updateTripEntry(req, res, next){
    let  { title, date, memory, trip_entry_id } = req.body
    Model.updateTripEntry(title, date, memory, trip_entry_id).then(response => {
      res.status(200).json({response})
    })
  }
}

module.exports = TripEntriesController
