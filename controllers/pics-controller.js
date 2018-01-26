const Model = require('../models/pics-model.js')

class PicsController{

  static addPhoto(req, res, next){
    let pic = req.body
    Model.addPhoto(pic).then(response => {
      console.log(response);
      res.status(201).json({response})
    })
  }
}

module.exports =PicsController
