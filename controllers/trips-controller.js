const Model = require('../models/trips-model.js')
const PicsModel = require('../models/pics-model.js')
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
        tripEntries[order[i]].region=response[i].region

      }
    }).then(()=>{
      res.tripEntries=tripEntries
      next()
    })
  }

  static getTripPics(req, res, next) {
    let trips = []
    let promises =[]

    req.trips.forEach((trip)=>{
        trip.public_id=[]
        trips.push(trip)
    })

    trips.forEach((trip) => {
      promises.push(PicsModel.getAllTripPhotos(trip.id))
    })

    Promise.all(promises).then(public_ids => {
      let counter=0

      public_ids.forEach((idArr) =>{

        if(idArr.length && idArr[0].public_id  ){
          // console.log(trips[counter]);
          // console.log('dongers', idArr[0].public_id);
          trips[counter].public_id.push(idArr[0].public_id)
        }
        counter++
      })

    }).then(()=>{
      console.log('the dongest', trips);
      res.status(200).json({trips})
    }).catch(err => {
      console.log(err);
    })
  }

  static getTripsByUserId(req, res, next) {
    let id = req.params.id
    Model.getTripsByUserId(id).then(response => {
      req.trips=response
      next()
    })
  }

}

module.exports =TripsController
