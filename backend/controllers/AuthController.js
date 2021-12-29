const AuthService = require('../services/AuthService')
const authValidators = require('../validations/authValidators')
module.exports = class AuthController {

    static async register(req, res) {
        
        console.log(req.body)
        const {name, email, phone, password, confirmpassword} = req.body

        //data validation
        try {
            authValidators.registerValidator(name, email, phone, password, confirmpassword)
        } catch (error) {
            return res.status(422).json({ message: error.message })
        }
        //service call
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

        console.log(req.body)
        const {email, password} = req.body

        //data validation
        try {
            authValidators.loginValidator(email, password)
        } catch (error) {
            return res.status(422).json({ message: error.message })
        }
        //service layer call
        try {
            const AuthServiceInstance = new AuthService()
            const {token, userId,message} = await AuthServiceInstance.serviceLogin(email, password)
            if(message){
                return res.status(422).json({ message: message }) 
            }
            return res.json({ message: "voce efetuou o login!", token: token, userId: userId})
        } catch (error) {
            return res.status(422).json({message: 'falha ao realizar o login' })
            //return res.status(422).json(error.message)
        }  
    }
    static async checkAuth(req, res){

        const token = getToken(req)
        
        try {
            const AuthServiceInstance = new AuthService()
            const {currentUser, message} = await AuthServiceInstance.serviceCheckAuth(token)
            if(message){return res.status(422).json({ message: message })}

            return res.status(200).json({message: 'ok', user: currentUser})
        } catch (error) {
            return res.status(422).json({message: 'falha de verificacao' })
        }
    }
}