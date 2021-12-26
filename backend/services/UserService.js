const User = require('../models/User')
const validator = require('validator')

module.exports = class UserService {
    //constructor(){}

    async serviceGetUserById(id){
        try {
            const user = await User.findById(id, {password: 0})
            return {user}
        } catch (error) {
            return {message: 'usuario nao encontrado'}
        }
    }  
}