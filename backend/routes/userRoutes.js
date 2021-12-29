const router = require('express').Router()
const UserController = require('../controllers/UserController')
//midlewares
const checkToken = require('../middlewares/check-token')
//helpers
const {imageUpload} = require('../helpers/upload-image')

router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken, imageUpload.single('image'),UserController.updateUser)

module.exports = router