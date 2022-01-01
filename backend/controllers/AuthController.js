const AuthService = require('../services/AuthService')
const authValidators = require('../validations/authValidators')
const getToken = require('../helpers/get-token')
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
            const {token, userId} = await AuthServiceInstance.serviceRegister(name, email, phone, password, confirmpassword)
            return res.json({ message: "voce se cadastrou!", userId: userId ,token: token })
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
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
            const {token, userId} = await AuthServiceInstance.serviceLogin(email, password)
            return res.json({ message: "voce efetuou o login!", token: token, userId: userId})
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }  
    }
    static async checkAuth(req, res){

        const token = getToken(req)
        
        try {
            const AuthServiceInstance = new AuthService()
            const currentUser = await AuthServiceInstance.serviceCheckAuth(token)
            return res.status(200).json({user: currentUser})
        } catch (error) {
            if(!error.status) {
                return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                return res.status(error.status).json( { error: { code: error.code, message: error.message } })
            }
        }
    }
}