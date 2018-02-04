const router =  require ('express').Router()
const Controller = require('../controllers/users-controller.js')


router.get('/', Controller.getAllUsers)
router.post('/pastuser', Controller.verifyToken, Controller.resToken )
router.post('/login',
      Controller.verifyToken,
      Controller.verifyLogin,
      Controller.resToken
    )
router.post('/logout', Controller.logout)
router.post('/signup',
      Controller.verifyToken,
      Controller.checkAvailabilty,
      Controller.createUserHash,
      Controller.createUser,
      Controller.resToken)

router.delete('/:id', Controller.deleteUser)

module.exports = router;
