const Model = require('../models/users-model.js')
const jwt = require('jsonwebtoken')
console.log('in controller');

class UserController {

  static getAllUsers(req, res, next){
    Model.getAllUsers().then(response => {
      res.json({users:response})
    })
  }

  static verifyToken(req, res, next){
    let [bearer, token] = req.headers.auth ? req.headers.auth.split(' ') : [null, null]
    // console.log('bearer', bearer, 'token', token, 'header ', req.headers.auth);
    // let signedToken = jwt.sign({
    //   token: token
    // }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    console.log('vt token', signedToken);
    jwt.verify(signedToken, process.env.TOKEN_SECRET, (err, verifiedToken) => {
      if(err){
        console.log('been an err ', err);
        req.token = null
      }
      else {
        console.log('no error');
        req.token = token
      }

    })
    res.status(200)
    next()
  }

  static login(req, res, next){
    console.log('header', req.headers.auth);
    console.log('body: ',req.body);
    res.status(201)
  }

}




module.exports = UserController;
