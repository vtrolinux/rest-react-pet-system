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
        console.log(req.body)
        const {email, password} = req.body
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
        console.log(req.headers)
        const authHeader = req.headers["authorization"]
        console.log('auth header: '+authHeader)
        const token = authHeader && authHeader.split(" ")[1]
        console.log('token: '+token)
        
        try {
            const AuthServiceInstance = new AuthService()
            //console.log(req.headers.authorization)
            const currentUser = await AuthServiceInstance.serviceCheck(token)

            return res.status(200).json({message: 'ok', user: currentUser})
        } catch (error) {
            return res.status(422).json({message: 'falha de verificacao' })
        }

    }

}