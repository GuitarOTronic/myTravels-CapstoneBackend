const router = require('express').Router()
const Controller = require('../controllers/trip-entries-controller.js')
const PicsController = require('../controllers/pics-controller.js')
const TripsController = require('../controllers/trips-controller.js')
const UserController = require('../controllers/users-controller.js')

router.get('/:id', Controller.getTripEntries, PicsController.getTripEntryPhotos, )
router.post('/getNewTripEntryId/:id', Controller.createTripEntry)
router.patch('/', Controller.updateTripEntry)
router.get('/',
  Controller.getAllTripEntries,
  TripsController.getEntryCountry,
  UserController.getEntryUserName,
  PicsController.getFellowEntryPhotos
  )
router.get('/filter/:country',
  Controller.getTripsByCountry,
  Controller.getTripEntriesByTripId
)

router.delete('/:tripEntryId', Controller.deleteTripEntry)


module.exports = router
