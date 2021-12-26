const UserService = require('../services/UserService')

module.exports = class UserController {
    static async getUserById(req, res){
        const id = req.params.id
        try {
            const UserServiceInstance = new UserService()
            const {user, message} = await UserServiceInstance.serviceGetUserById(id)
            if(message){
                return res.status(422).json({message: message})
            }
            return res.status(200).json({ user: user })
        } catch (error) {
            return res.status(422).json({message: 'Erro ao buscar pelo usuario informado'})
        }
    }
    static async updateUser(req, res){
        const id = req.params.id
        return res.status(200).json({message: 'update ok'})
    }
}