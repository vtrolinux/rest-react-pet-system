const router = require('express').Router()
const UserController = require('../controllers/UserController')

//midlewares
const checkToken = require('../middlewares/check-token')

router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken,UserController.updateUser)

module.exports = router