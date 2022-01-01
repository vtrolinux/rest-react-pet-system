const router = require('express').Router()
const PetController = require('../controllers/PetController')
//midlewares
const checkToken = require('../middlewares/check-token')
//helpers
const {imageUpload} = require('../helpers/upload-image')

//routes
router.post('/create', checkToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', PetController.getAllUserPets)
router.get('/myadoptions', checkToken, PetController.getMyAdoptions)
router.get('/:id', PetController.getPetById)

module.exports = router