const User = require('../models/User')
const validator = require('validator')
const decodeToken = require('../helpers/decode-token')

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
    async serviceUpdateUser(token, name, email, phone, password, confirmpassword, image){

        const decoded = await decodeToken(token)
        const userId = decoded.id
        console.log('userId: ' +userId)
        if(!userId){
            return {message: 'acesso negado!!!!'}
        }
        const user = await User.findOne({_id: userId})
        //console.log('userId: '+userId+ ' user._id: '+user._id)
        if(!user){
            return {message: 'usuario nao encontrado!!'}
        }   
        if(userId != user._id){
            console.log('userId: '+userId+ ' user._id: '+user._id)
            return {message: 'acesso negado!!!!!'}
        }
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
            if(emailExists && email !== user.email){
                return {message: 'Este email ja esta sendo utilizado'}
            }    
        }
        if(password != confirmpassword){
            return {message: 'as senhas nao sao iguais'}
        }else if (password == confirmpassword && password != null) {
            //change password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            //adiciona senha ao update
            updateData.password = passwordHash
        }
        if (image) {
            const imageName = req.file.filename
            updateData.image = imageName
        }

        // persist update
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true }).select({password: 0, __v: 0 })
            console.log(updatedUser)
            return {updatedUser}
        } catch (error) {
            return {message: 'falha de atualizacao'}
        }
    }
}