const router =  require ('express').Router()
const Controller = require('../controllers/users-controller.js')
console.log('user router');

router.get('/', Controller.getAllUsers)
router.post('/login', Controller.verifyToken, Controller.login)


module.exports = router;
