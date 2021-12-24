const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const validation = require('../validations/validators')

router.post('/register', validation.registerValidator, AuthController.register)
router.post('/login', validation.loginValidator, AuthController.login)

module.exports = router