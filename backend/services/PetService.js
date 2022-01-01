const User = require('../models/User')
const Pet = require('../models/Pet')
const decodeToken = require('../helpers/decode-token')
const getUserByDecodedToken = require('../helpers/get-user-by-decoded-token')


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
        //throw new Error('edoasasmd')
        throw ({ status: 422, code: 'USER_ALREADY_EXISTS', message: 'This e-mail address is already taken.' })
    }
}