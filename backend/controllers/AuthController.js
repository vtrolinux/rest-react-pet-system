const AuthService = require('../services/AuthService')


module.exports = class AuthController {

    static async register(req, res) {
        console.log(req.body)
        const {name, email, phone, password, confirmpassword} = req.body

        try {
            const AuthServiceInstance = new AuthService()
            const {token, userId, message} = await AuthServiceInstance.serviceRegister(name, email, phone, password, confirmpassword)
            if(message){
                return res.status(422).json({ message: message })     
            }
            return res.json({ message: "voce se cadastrou!", userId: userId ,token: token })
        } catch (error) {
            return res.status(422).json({message: 'falha ao registrar usuario no sistema' })
        }   
    }
    static async login(req, res){
        const {email, password} = req.body

    }
}