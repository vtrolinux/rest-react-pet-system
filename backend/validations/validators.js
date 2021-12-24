const validator = require('validator')

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

module.exports = {
    registerValidator,
    loginValidator
}
