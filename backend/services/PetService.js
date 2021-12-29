const User = require('../models/User')
const Pet = require('../models/Pet')
const decodeToken = require('../helpers/decode-token')

module.exports = class PetService {

    async serviceCreate(name, age, weight, color, available, token){
        //get pet ownner
        const decoded = await decodeToken(token)
        const userId = decoded.id
        console.log('userId: ' +userId)
        if(!userId){
            return {message: 'acesso negado!'}
        }
        const user = await User.findOne({_id: userId})
        //console.log('userId: '+userId+ ' user._id: '+user._id)
        if(!user){
            return {message: 'usuario nao encontrado!'}
        }   
        if(userId != user._id){
            console.log('userId: '+userId+ ' user._id: '+user._id)
            return {message: 'acesso negado!'}
        }

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
            return {newPet}
        } catch (error) {
            return {message: 'Falha ao registrar o pet'}
        }
    }
}