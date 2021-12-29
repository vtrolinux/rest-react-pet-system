const router = require('express').Router()
const PetController = require('../controllers/PetController')
//midlewares
const checkToken = require('../middlewares/check-token')
//validator
const validacreate = require('../validations/petsValidators')
//helpers
const {imageUpload} = require('../helpers/upload-image')

//router.post('/create', checkToken,imageUpload.array('images'), PetController.create)
router.post('/create', checkToken, imageUpload.array('images'), PetController.create)

module.exports = router