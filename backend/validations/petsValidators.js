const validator = require('validator')
const createValidator = (name, age, weight, color, images) => {

    // validations
    if (!name) {
        throw new Error('O nome é obrigatório!')
    }
    if (!age) {
        throw new Error('A idade é obrigatória!' )  
    }
    if (!weight) {
        throw new Error('O peso é obrigatório!' )
    }
    if (!color) {
        throw new Error('A cor é obrigatória!' )      
    } 
    if (images.length === 0) {
        throw new Error('A imagem é obrigatória!' )     
    }
}
module.exports = {
    createValidator,
}
