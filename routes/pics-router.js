const router = require('express').Router()
const Controller = require('../controllers/pics-controller.js')

router.post('/', Controller.addPhoto)
router.get('/:id', Controller.getPicsForTripEntryCarousel)
router.get('/trip/:id', Controller.getAllTripPhotos)
router.get('/', Controller.getAllPhotos)
module.exports = router
