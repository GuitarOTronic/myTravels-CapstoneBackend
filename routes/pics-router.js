const router = require('express').Router()
const Controller = require('../controllers/pics-controller.js')

router.post('/', Controller.addPhoto)

module.exports = router
