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
        
        const authHeader = req.headers["authorization"]
        console.log('auth header: '+authHeader)
        const token = authHeader && authHeader.split(" ")[1]
        console.log('TOKEN: '+token)
        const {name, email, phone, password, confirmpassword} = req.body
        let image = ''

        if (req.file) {
            image = req.file.filename
            console.log(image)
        }

        try {
            const UserServiceInstance = new UserService()
            const {updatedUser, message} = await UserServiceInstance.serviceUpdateUser(token,name, email, phone, password, confirmpassword, image)
            if(message){
                return res.status(422).json({message: message}) 
            }
            return res.status(200).json({ updatedUser: updatedUser })
        } catch (error) {
            return res.status(422).json({message: 'Erro ao atualizar usuario'}) 
        }
    }
}