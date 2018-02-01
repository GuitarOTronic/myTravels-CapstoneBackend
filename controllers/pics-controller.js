const Model = require('../models/pics-model.js')

class PicsController{

  static addPhoto(req, res, next) {
    let pic = req.body
    Model.addPhoto(pic).then(response => {
      res.status(201).json({response})
    })
  }

  static getAllPhotos(req, res, next) {
    Model.getAllPhotos().then(response => {
      let pix= {}
      // pix[response.trip_id] = response.public_id
      console.log(pix);
      let picArr = response.map((pic) => {
        pix[pic.trip_entry_id]=pic.public_id
        return pic.public_id
      })
      let homePix = {pix, picArr}
      // console.log(picArr);
      res.status(200).json(picArr)
    })
  }

  static getTripPhotos(req, res, next) {
    const id = req.params.id
    console.log('>>>>>', id);
    Model.getTripPhotos(id).then(response => {
      let picArray = response.map(pic => {
        return pic.public_id
      })
      req.body.picArray={[id]:picArray}
      next()
      // res.status(200).json({picArray})
    })
  }

  static getPicsForTripEntryCarousel(req, res, next) {
    let id = req.params.id
    Model.getTripEntryPhotos(id).then(response => {
      res.status(200).json({response})
    })
  }

  static getFellowEntryPhotos(req, res, next) {
    let tripEntries=res.tripEntries
    let promises=[]
    let order=[]
    for ( let i in tripEntries) {
      promises.push( Model.getFellowEntryPhotos(tripEntries[i].trip_entry_id) )
      order.push(i)
      tripEntries[i].public_id=[]
    }
    Promise.all(promises).then(result => {
      for (let i in result) {
        if(result[i].length > 0){
          result[i].forEach(picId => {
            tripEntries[order[i]].public_id.push(picId.public_id)
          })
        }else tripEntries[order[i]].public_id=result[i]
      }
    }).then(() => {
      res.status(200).json({tripEntries})
    })
  }

  static getTripEntryPhotos(req, res, next) {
    let tripEntries = req.body.tripEntries
    let photosObj = {}
    const promises = tripEntries.map(entry => {
      return Model.getTripEntryPhotos(entry.id)
    })

    Promise.all(promises).then(result => {
      const photos = result.reduce((a, b) => a.concat(b))
      const ids = photos.reduce((acc, photo) => {
        const id = photo.trip_entry_id
        acc[id] ? acc[id].push(photo.public_id) : acc[id] = [photo.public_id]
        return acc
      }, {})
        res.status(200).json({tripEntries, ids})
    })

  }

  static getAllTripPhotos(req, res, next) {
    let tripId = req.params.id
    Model.getAllTripPhotos(tripId).then(response => {
      let ids= response.map(id => {
        return id.public_id
      })
      res.status(200).json({ids})
    })

  } 

}

module.exports =PicsController
