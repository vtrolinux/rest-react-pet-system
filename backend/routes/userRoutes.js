const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', UserController.updateUser)

module.exports = router