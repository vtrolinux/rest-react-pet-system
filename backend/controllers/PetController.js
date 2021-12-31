const PetService = require('../services/PetService')
const getToken = require('../helpers/get-token')
const petValidator = require('../validations/petsValidators')
module.exports = class PetController {
    constructor(){}

    static async create(req, res){
        //get token
        const token = getToken(req)
        
        const {name, age, weight, color} = req.body 
        const images = req.files //plural
        const available = true
        
        //validators
        try {
            petValidator.createValidator(name, age, weight, color, images)
        } catch (error) {
            return res.status(422).json({ message: error.message })
        }
        //service call
        try {
            const PetServiceInstance = new PetService()
            const {newPet, message} = await PetServiceInstance.serviceCreate(name, age, weight, color, images, available, token)
            if(message){
                return res.status(422).json({ message: message }) 
            }
            return res.status(200).json({ newPet, message: 'Pet cadastrado com sucesso'})
        } catch (error) {
            return res.status(422).json({ message: 'falha ao registrar o pet' })
        }           
    }
    static async getAll(req, res){
        try {
            const PetServiceInstance = new PetService()
            const {petList, message} = await PetServiceInstance.serviceGetAll()
            if(message){
                return res.status(422).json({ message: message }) 
            }
            return res.status(200).json({ petList })
        } catch (error) {
            return res.status(422).json({ message: 'falha buscar por pets' })
        }
    }
}