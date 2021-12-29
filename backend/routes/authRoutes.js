const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

//routes
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/checkauth' ,AuthController.checkAuth)

module.exports = router