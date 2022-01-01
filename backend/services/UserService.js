const User = require('../models/User')
const decodeToken = require('../helpers/decode-token')
const getUserByDecodedToken = require('../helpers/get-user-by-decoded-token')

module.exports = class UserService {
    //constructor(){}

    async serviceGetUserById(id){
        try {
            const user = await User.findById(id, {password: 0})
            return user
        } catch (error) {
            throw ({ status: 422, code: 'USER_NOT_FOUND', message: 'Usuário não encontrado.' })          
        }
    }
    async serviceUpdateUser(token, name, email, phone, password, confirmpassword, image){

        const decoded = await decodeToken(token)
        const user = await getUserByDecodedToken(decoded)
        //Objeto de update do usuário
        const updateData = {
            name: name,
            email: email,
            phone: phone,           
        }
        console.log(name)
        if(email){
            console.log('email:'+email)
            const emailExists = await User.findOne({email: email})
            if(email !== user.email && emailExists){
                throw ({ status: 422, code: 'EMAIL_ALREADY_EXISTS', message: 'Este email ja esta sendo utilizado.' })
            }    
        }
        if(password != confirmpassword){
            throw ({ status: 422, code: 'PASSWORD_NOT_CONFIRMED', message: 'as senhas nao sao iguais.' })
        }else if (password == confirmpassword && password != null) {
            //change password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            //adiciona senha ao update
            updateData.password = passwordHash
        }
        if (image) {
            console.log('image service: '+image)          
            updateData.image = image
        }

        // persist update
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { $set: updateData }, { new: true }).select({password: 0, __v: 0 })
            console.log(updatedUser)
            return updatedUser
        } catch (error) {
            throw ({ status: 422, code: 'UPDATE_USER_FAILED', message: 'falha de atualizacao.' })
        }
    }
}