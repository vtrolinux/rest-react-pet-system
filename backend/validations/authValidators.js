const validator = require('validator')
//can be much improved, glhf

const registerValidator = (name, email, phone, password, confirmpassword) => {

    if (!name) {
        throw new Error('O nome é obrigatório!')
    }
    if (!email) {
        throw new Error('O e-mail é obrigatório!')
    }
    if (validator.isEmail(email)===false) {
        throw new Error('o campo informado nao e um email valido!')
    }
    if (!phone) {
        throw new Error('O telefone é obrigatório!')
    } 
    //console.log( validator.isStrongPassword(password,[{ minLength: 8}]) )  
    if (!password) {
        throw new Error('A senha é obrigatória!')  
    }
    if (!confirmpassword) {
        throw new Error('A confirmação de senha é obrigatória!')   
    }
    if (password != confirmpassword) {
        throw new Error('A senha e a confirmação precisam ser iguais!')
    }
}
const loginValidator = (email, password) => {

    //const {email, password} = req.body

    if (!email) {
        throw new Error('O e-mail é obrigatório!')  
    }
    if (validator.isEmail(email) === false) {
        throw new Error('o campo informado nao e um email valido!')       
    }
    if (!password) {
        throw new Error('A senha é obrigatória!')     
    }
}
/*
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
*/
module.exports = {
    registerValidator,
    loginValidator,
    /*authValidator,
    checkExistId,*/
}