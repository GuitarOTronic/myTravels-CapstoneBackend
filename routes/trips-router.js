const router =  require ('express').Router()
const Controller = require('../controllers/trips-controller.js')
console.log('hey trip router');
router.get('/:id', Controller.getTrips)
router.post('/', Controller.createTrip)

module.exports = router
