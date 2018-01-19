const Model = require('../models/users-model.js')
console.log('in controller');

class UserController {

  static getAllUsers(req, res, next){
    Model.getAllUsers().then(response => {
      res.json({users:response})
    })
  }

}
  



module.exports = UserController;
