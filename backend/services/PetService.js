const User = require('../models/User')
const Pet = require('../models/Pet')
const decodeToken = require('../helpers/decode-token')
const getUserByDecodedToken = require('../helpers/get-user-by-decoded-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetService {

    async serviceCreate(name, age, weight, color, images, available, token){
        
        const decoded = await decodeToken(token)
        const user = await getUserByDecodedToken(decoded)

        const dataPetCreate = new Pet({
            name,
            age, 
            weight, 
            color, 
            available,
            images: [],
            user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })
        images.map((image) => {
            dataPetCreate.images.push(image.filename)
        })
        //persist
        try {   
            const newPet = await dataPetCreate.save()
            return newPet
        } catch (error) {
            throw ({ status: 422, code: 'PET_NOT_SAVE', message: 'Falha ao registrar o pet..' })
        }
    }
    
    async serviceGetAll(){
        try {
            const petList = await Pet.find().sort('-createdAt')//do mais novo para o mais velho
            return petList
        } catch (error) {
            throw ({ status: 422, code: 'PETS_NOT_FOUND', message: 'Falha ao buscar por pets..' })
        }
    }
    async serviceGetAllUserPets(token){

        const decoded = await decodeToken(token)
        const user = await getUserByDecodedToken(decoded)
        
        try {        
            const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')//do mais novo para o mais velho
            console.log(pets)
            return pets
        } catch (error) {
            throw ({ status: 422, code: 'PETS_NOT_FOUND', message: 'Falha ao buscar por pets!' })
        }
    }
    
    async serviceGetMyAdoptions(token){

        const decoded = await decodeToken(token)
        const user = await getUserByDecodedToken(decoded)
        
        try {        
            const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')//do mais novo para o mais velho
            console.log(pets)
            return pets
        } catch (error) {
            throw ({ status: 422, code: 'PETS_NOT_FOUND', message: 'Falha ao buscar por pets!' })
        }    
    }
    async serviceGetPetById(id){

        if(!ObjectId.isValid(id)){
            throw ({ status: 422, code: 'INVALID_ID', message: 'O id informado não é valido' })
        }

        try {
            const pet = await Pet.findOne({_id: id})
            if(pet===null){
                throw ({ status: 404, code: 'PET_NOT_FOUND', message: 'Nao existe pet registrado com este ID' })
            }
            return pet
        } catch (error) {
            throw ({ status: 404, code: 'PET_NOT_FOUND', message: 'Pet nao encontrado, confira o ID!' })
        }
    }
    async serviceRemovePetById(token, id){
        const decoded = await decodeToken(token)
        const user = await getUserByDecodedToken(decoded)

        if(!ObjectId.isValid(id)){
            throw ({ status: 422, code: 'INVALID_ID', message: 'O id informado não é valido' })
        }
        const pet = await Pet.findOne({_id: id})
        if(pet===null){
            throw ({ status: 404, code: 'PET_NOT_FOUND', message: 'Nao existe pet registrado com este ID' })
        }
        //verifica se o pet a ser deletado pertence ao usuario logado
        if(pet.user._id.toString() !== user._id.toString()){
            throw ({ status: 422, code: 'DENIED_OPERATION', message: 'Operaçao negada' })
        }
        try {
            await Pet.findByIdAndRemove(id)
        } catch (error) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'falha ao remover o pet' })
        }
    }
    async serviceUpdatePet(token, id, name, age, weight, color, available, images){
        const decoded = await decodeToken(token)
        const user = await getUserByDecodedToken(decoded)

        if(!ObjectId.isValid(id)){
            throw ({ status: 422, code: 'INVALID_ID', message: 'O id informado não é valido' })
        }

        const pet = await Pet.findOne({_id: id})
        if(pet===null){
            throw ({ status: 404, code: 'PET_NOT_FOUND', message: 'Nao existe pet registrado com este ID' })
        }
        //verifica se o pet a ser deletado pertence ao usuario logado
        if(pet.user._id.toString() !== user._id.toString()){
            throw ({ status: 422, code: 'DENIED_OPERATION', message: 'Operaçao negada' })
        }
        const updateData = {
            name: name,
            age: age,
            weight: weight,
            color: color,
            available: available
        }
        if(images){

            updateData.images = []

            images.map((image) => {
                updateData.images.push(image.filename)
            })
        }
        try {
            const updatedPet = await Pet.findOneAndUpdate({ 'user._id': user._id }, { $set: updateData }, { new: true })
            return updatedPet
        } catch (error) {
            throw ({ status: 422, code: 'PET_USER_FAILED', message: 'falha de atualizacao.' })
        }

        


    }
}