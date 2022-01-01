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
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async getPetById(req, res){
        
        const id = req.params.id

        try {
            const PetServiceInstance = new PetService()
            const pet = await PetServiceInstance.serviceGetPetById(id)
            return res.status(200).json({ pet })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async removePetById(req, res){
        const token = getToken(req)
        const id = req.params.id
        try {
            const PetServiceInstance = new PetService()
            await PetServiceInstance.serviceRemovePetById(token, id)
            return res.status(200).json({message: 'Pet removido do sistema'})
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async updatePet(req, res){
        const token = getToken(req)
        const id = req.params.id
        const {name, age, weight, color, available} = req.body 
        const images = req.files //plural
        //validator
        try {
            petValidator.updateValidator(name, age, weight, color, available, images)
        } catch (error) {
            return res.status(422).json({ message: error.message })
        }
        //service
        try {
            const PetServiceInstance = new PetService()
            const updatedPet = await PetServiceInstance.serviceUpdatePet(token, id, name, age, weight, color, available, images)
            return res.status(200).json({updatedPet: updatedPet})
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    //agendamento de visita para adocao
    static async schedule(req, res){
        const token = getToken(req)
        const id = req.params.id
        try {
            const PetServiceInstance = new PetService()
            const messageSchedule = await PetServiceInstance.serviceSchedule(token, id)
            return res.status(200).json({ message: messageSchedule })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    //conclui a doacao user >> adopter
    static async concludeAdoption(req, res){
        const id = req.params.id
        const token = getToken(req)
        try {
            const PetServiceInstance = new PetService()
            await PetServiceInstance.serviceConcludeAdoption(token, id)
            return res.status(200).json({message: 'voce concluiu a doacao do seu pet.'})
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
}