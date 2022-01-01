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
            const newPet = await PetServiceInstance.serviceCreate(name, age, weight, color, images, available, token)
            return res.status(200).json({ newPet, message: 'Pet cadastrado com sucesso'})
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async getAll(req, res){
        try {
            const PetServiceInstance = new PetService()
            const petList = await PetServiceInstance.serviceGetAll()
            return res.status(200).json({ petList })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async getAllUserPets(req, res){

        const token = getToken(req)
        
        try {
            const PetServiceInstance = new PetService()
            const pets = await PetServiceInstance.serviceGetAllUserPets(token)
            return res.status(200).json({ pets })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async getMyAdoptions(req, res){
        const token = getToken(req)
        try {
            const PetServiceInstance = new PetService()
            const pets = await PetServiceInstance.serviceGetMyAdoptions(token)

            return res.status(200).json({ pets })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } });
            }
        }
    }
}