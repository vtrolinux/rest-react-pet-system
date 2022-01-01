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
router.delete('/:id', checkToken, PetController.removePetById)
router.patch('/edit/:id', checkToken, imageUpload.array('images'), PetController.updatePet)
//agendamento de visita para adocao
router.patch('/schedule/:id', checkToken, PetController.schedule)

module.exports = router