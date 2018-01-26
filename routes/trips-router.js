const router =  require ('express').Router()
const Controller = require('../controllers/trips-controller.js')
console.log('hey trip router');

router.get('/:id', Controller.getTripsByUserId)
router.post('/', Controller.createTrip)
router.delete('/:id', Controller.deleteTrip)


module.exports = router
