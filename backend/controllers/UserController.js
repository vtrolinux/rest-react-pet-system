const UserService = require('../services/UserService')
const getToken = require('../helpers/get-token')
module.exports = class UserController {
    static async getUserById(req, res){
        const id = req.params.id
        try {
            const UserServiceInstance = new UserService()
            const user = await UserServiceInstance.serviceGetUserById(id)
            return res.status(200).json({ user: user })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
    static async updateUser(req, res){
        
        const token = getToken(req)
        const {name, email, phone, password, confirmpassword} = req.body
        let image = ''

        if (req.file) {
            image = req.file.filename
            console.log(image)
        }

        try {
            const UserServiceInstance = new UserService()
            const updatedUser = await UserServiceInstance.serviceUpdateUser(token,name, email, phone, password, confirmpassword, image)
            return res.status(200).json({ updatedUser: updatedUser })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
}