const router = require('express').Router()
const Controller = require('../controllers/trip-entries-controller.js')
const PicsController = require('../controllers/pics-controller.js')

router.get('/:id', Controller.getTripEntries, PicsController.getTripEntryPhotos, )
router.post('/:id', Controller.createTripEntry, PicsController.addPhoto)
module.exports = router
