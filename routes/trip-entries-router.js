const router = require('express').Router()
const Controller = require('../controllers/trip-entries-controller.js')

router.get('/:id', Controller.getTripEntries)

module.exports = router
