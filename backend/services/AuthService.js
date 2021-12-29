const User = require('../models/User')
const createToken = require('../helpers/create-token')
const bcrypt = require('bcrypt')
const decodeToken = require('../helpers/decode-token')


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
    async serviceLogin(email, password){
        console.log('login service: '+email)
        const user = await User.findOne({ email: email })
        if (user == null) {
            return {message: 'nao  existe usuario cadastrado com este email'}
        }
        //check match senha
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            //throw new Error('SENHA INVALIDA')
            return {message: 'senha inválida'}
        }

        const {token, userId} = await createToken(user)

        return {token,userId}
    }
    async serviceCheckAuth(token){

        let currentUser
    
        if (token) {
            const decoded = await decodeToken(token)
            console.log('decoded: '+decoded.id)
            
            currentUser = await User.findById(decoded.id, {password: 0, phone:0})
            if(currentUser == null){
                return { message: 'usuario nao encontrado' }
            }
            //currentUser.password = undefined
            console.log(currentUser)
            return {currentUser}
        } else {
            currentUser = null
        }
    }
}