const router =  require ('express').Router()
const Controller = require('../controllers/users-controller.js')
console.log('user router');

router.get('/', Controller.getAllUsers)


module.exports = router;
