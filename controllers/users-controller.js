const Model = require('../models/users-model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-as-promised')

class UserController {

  static getAllUsers(req, res, next){
    Model.getAllUsers().then(response => {
      res.json({users:response})
    })
  }

  static checkAvailabilty(req, res, next) {
    let email = req.body.email.trim().toLowerCase()
    Model.getOneUserByEmail(email).then(result=>{
      if(result) next({status: 409, message:`User email ${email} already exists.`})
      else  next();
    })
  }

  static createUserHash(req, res, next){
    req.body.email = req.body.email.trim().toLowerCase()
    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
      req.body.hash = hash
      next()
    })
  }

  static createUser(req, res, next){
    Model.createUser(req.body.name, req.body.email, req.body.hash).then(response =>{
      req.body.id = response.id
      next()
    }).catch(error => {
        console.log('Controller.createUser error =>',error);
    })
  }

  static deleteUser(req, res, next) {
    const id = req.params.id
    Model.deleteUser(id).then(response => {
      console.log('deleted? => ', response);
      res.status(200).json({response})
    })
  }

  static getEntryUserName(req, res, next){
    let tripEntries=res.tripEntries
    let promises=[]
    let order=[]
    for (let i in tripEntries) {
      promises.push( Model.getUserByUserId(tripEntries[i].user_id) )
      order.push(i)
    }
    Promise.all(promises).then(response => {
      for ( let i in response ) {
        tripEntries[order[i]].name=response[i].name
      }
    }).then(()=> {
      res.tripEntries=tripEntries
      next()
      // res.status(200).json({tripEntries})

    })

  }

  static logout(req, res, next){
    const id = req.body.id
    Model.logout(id).then(response => {
      console.log('Logout response ', response);
      res.status(200).json({response})
    })
  }

  static resToken(req, res, next) {
        let payload = {
            id: req.body.id,
            email:req.body.email,
            name:req.body.name
        }
        console.log(payload);
        let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2 years' })
        return res.json({payload, token})
    }

  static verifyLogin (req, res, next) {
      let password = req.body.password
      let email = req.body.email.trim().toLowerCase()
      req.body.email=email
      Model.getOneUserByEmail(email).then(user => {
          if (!user) {
            return next({status: 404, message: `Email: ${email} not found.`})
          }
          req.body = user
          return bcrypt.compare(password, req.body.password)
      }).catch(err => {
          console.log(err);
          return next({ status: 400, message: `Invalid password` })
      }).then(() => next())
  }


  static verifyToken(req, res, next){
    let [bearer, token] = req.headers.auth ? req.headers.auth.split(' ') : [null, null]
    if(token.length > 10){
      var decodedOld = jwt.verify(token, process.env.TOKEN_SECRET);
    }
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedToken) => {
      if(err){
        console.log('jwt error: ', err);
        req.token = null
      }
      else if(decodedOld){
        req.body = decodedOld
      }
      else {
        req.token = token
        req.body.decoded = decoded
      }
    })
    next()
  }







}




module.exports = UserController;
