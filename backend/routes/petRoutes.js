const router = require('express').Router()
const PetController = require('../controllers/PetController')
//midlewares
const checkToken = require('../middlewares/check-token')
//validator
const validation = require('../validations/validators')

router.post('/create', checkToken, validation.createValidator, PetController.create)

module.exports = router