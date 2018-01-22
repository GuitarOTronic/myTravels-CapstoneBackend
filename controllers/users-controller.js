const Model = require('../models/users-model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-as-promised')
console.log('in controller');

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

  static resToken(req, res, next) {
        let payload = {
            id: req.body.id,
            email:req.body.email,
            name:req.body.name
        }
        let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2 years' })
        return res.json(token)
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
    jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedToken) => {
      if(err){
        // console.log('been an err: ', err);
        req.token = null
      }
      else {
        req.token = token
      }
    })
    next()
  }







}




module.exports = UserController;
