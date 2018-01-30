const Model = require('../models/pics-model.js')

class PicsController{

  static addPhoto(req, res, next) {
    let pic = req.body
    console.log('addphoto BE', pic);
    Model.addPhoto(pic).then(response => {
      console.log(response);
      res.status(201).json({response})
    })
  }

  static getAllPhotos(req, res, next) {
    Model.getAllPhotos().then(response => {
      console.log('getAllPhotos',response);
      let pix= {}
      // pix[response.trip_id] = response.public_id
      console.log(pix);
      let picArr = response.map((pic) => {
        console.log('picky',pic.trip_entry_id);
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
    Model.getTripPhotos(id).then(response => {
      let picArray = response.map(pic => {
        return pic.public_id
      })
      console.log('picArray ', picArray, 'tripEntryId', id);
      req.body.picArray={[id]:picArray}
      console.log(req.body.picArray);
      next()
      // res.status(200).json({picArray})
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

      console.log(ids)
        res.status(200).json({tripEntries, ids})
    })

  }



}

module.exports =PicsController
