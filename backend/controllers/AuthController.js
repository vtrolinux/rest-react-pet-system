const AuthService = require('../services/AuthService')


module.exports = class AuthController {

    static async register(req, res) {
        console.log(req.body)
        const AuthServiceInstance = new AuthService()
        await AuthServiceInstance.serviceRegister(req.body)


        res.json({msg: 'ok'})
    }
}