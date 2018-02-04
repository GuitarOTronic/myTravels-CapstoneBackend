const router =  require ('express').Router()
const Controller = require('../controllers/trips-controller.js')
const TripEntriesController = require('../controllers/trip-entries-controller.js')


router.get('/:id', Controller.getTripsByUserId, Controller.getTripPics)
router.post('/', Controller.createTrip, TripEntriesController.seedTrip)
router.delete('/:id', Controller.deleteTrip)


module.exports = router
