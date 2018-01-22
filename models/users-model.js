const db = require('../db/connections.js')
console.log('model here');
const bcrypt = require('bcrypt-as-promised')
const jwt = require('jsonwebtoken')


class UsersModel {

  static getAllUsers(){
    return db('users')
  }

  static getOneUserByEmail(email){
    return db('users')
      .where({email})
      .first()

  }

}


module.exports = UsersModel
