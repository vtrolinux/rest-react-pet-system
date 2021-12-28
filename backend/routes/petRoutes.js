const router = require('express').Router()
const PetController = require('../controllers/PetController')
//midlewares
const checkToken = require('../middlewares/check-token')

router.post('/create', checkToken, PetController.create)

module.exports = router