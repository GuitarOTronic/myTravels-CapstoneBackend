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
    console.log('checkAvailabilty => ', email);
    Model.getOneUserByEmail(email).then(result=>{
      if(result) next({status: 409, message:`User email ${email} already exists.`})
      else console.log('else ', result);
    })


  }
  static resToken(req, res, next) {
        let payload = {
            id: req.user.id,
            email:req.user.email
        }
        console.log('resToken->', payload);
        let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2 years' })
        console.log('TOKEN: ', token)
        return res.json(token)
    }

  static verifyLogin (req, res, next) {
      let password = req.body.password
      let email = req.body.email.trim().toLowerCase()
      req.body.email=email
      // console.log('verifyLogin -> email: ', email, 'password: ', password);
      Model.getOneUserByEmail(email).then(user => {
          if (!user) {
              return next({status: 404, message: `Email: ${email} not found.`})
          }
          req.user = user
          return bcrypt.compare(password, req.user.password)
      }).catch(err => {
          console.log(err);
          return next({ status: 400, message: `Invalid password` })
      }).then(() => next())
  }

  static verifyToken(req, res, next){
    let [bearer, token] = req.headers.auth ? req.headers.auth.split(' ') : [null, null]
    jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedToken) => {
      if(err){
        console.log('been an err: ', err);
        req.token = null
      }
      else {
        console.log('no error');
        req.token = token
      }
    })
    next()
  }







}




module.exports = UserController;
