const User = require('../models/User')
const createToken = require('../helpers/create-token')
const bcrypt = require('bcrypt')

module.exports = class AuthService {

    async serviceRegister(name, email, phone, password){
        //check se usuário já existe
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            console.log("O email informado já está em uso")
            return {message: 'O email informado já está em uso'}
        }
        
        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            phone: phone, 
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            const {token, userId} = await createToken(newUser)
            return {token, userId}
        } catch (error) {
            return 'Erro ao registrar usuario'
        } 
    }
}