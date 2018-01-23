const db = require('../db/connections.js')
console.log('model here');
const bcrypt = require('bcrypt-as-promised')
const jwt = require('jsonwebtoken')


class UsersModel {

  static createUser(name, email, password){
    return db('users')
      .insert({name, email, password})
      .returning('*')
      .then(([response]) => response)
  }


  static deleteUser(id){
    return db('users')
      .where({id})
      .del()
      .returning('id')
  }

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
