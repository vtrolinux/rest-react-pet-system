const validator = require('validator')
//can be much improved, glhf

const registerValidator = (req, res, next) => {

    const {name, email, phone, password, confirmpassword} = req.body

    if (!name) {
        return res.status(422).json({ message: 'O nome é obrigatório!' })
    }
    if (!email) {
        return res.status(422).json({ message: 'O e-mail é obrigatório!' })
    }
    if (validator.isEmail(email)===false) {
        return res.status(422).json({ message: 'o campo informado nao e um email valido!' })
    }
    if (!phone) {
        return res.status(422).json({ message: 'O telefone é obrigatório!' })
    } 
    //console.log( validator.isStrongPassword(password,[{ minLength: 8}]) )  
    if (!password) {
        return res.status(422).json({ message: 'A senha é obrigatória!' })  
    }
    if (!confirmpassword) {
        return res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })   
    }
    if (password != confirmpassword) {
        return res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais!' })
    }
    next()
}
const loginValidator = (req, res, next) => {

    const {email, password} = req.body

    if (!email) {
        return res.status(422).json({ message: 'O e-mail é obrigatório!' })  
    }
    if (validator.isEmail(email)===false) {
        return res.status(422).json({ message: 'o campo informado nao e um email valido!' })       
    }
    if (!password) {
        return res.status(422).json({ message: 'A senha é obrigatória!' })     
    }
    next()
}
const authValidator = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(422).json({ message: 'O token e obrigatorio' })
    }
    next()
}
const checkExistId = (req, res, next) => {
    if(!req.params.id){
        return res.status(422).json({message: 'id nao informado'})
    }
    next()
}
const createValidator = (req, res, next) => {
    const {name, age, weight, color} = req.body
    const images = req.file

    // validations
    if (!name) {
        return res.status(422).json({ message: 'O nome é obrigatório!' })     
    }
    if (!age) {
        return res.status(422).json({ message: 'A idade é obrigatória!' })   
    }
    if (!weight) {
        return res.status(422).json({ message: 'O peso é obrigatório!' })
    }
    if (!color) {
        return res.status(422).json({ message: 'A cor é obrigatória!' })       
    } 
    /*
    if (!images) {
        return res.status(422).json({ message: 'A imagem é obrigatória!' })      
    }
    */
    next()
}

module.exports = {
    registerValidator,
    loginValidator,
    authValidator,
    checkExistId,
    createValidator
}
