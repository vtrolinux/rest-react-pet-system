const PetService = require('../services/PetService')
module.exports = class PetController {
    constructor(){}

    static async create(req, res){
        const {name, age, weight, color} = req.body
        const available = true

        const authHeader = req.headers["authorization"]
        console.log('auth header: '+authHeader)
        const token = authHeader && authHeader.split(" ")[1]
        console.log('TOKEN: '+token)

        //images

        try {
            const PetServiceInstance = new PetService()
            const {newPet, message} = await PetServiceInstance.serviceCreate(name, age, weight, color, available, token)
            if(message){
                
            }
            return res.status(200).json({newPet, message: 'Pet cadastrado com sucesso'})
        } catch (error) {
            return res.status(422).json({message: 'falha ao registrar o pet'})
        }           
    }
}