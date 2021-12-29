const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/checkauth' /*validation.authValidator*/,AuthController.checkAuth)

module.exports = router