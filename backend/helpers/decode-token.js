const jwt = require("jsonwebtoken");

const decodeToken = async (token) =>{
    const decoded = jwt.verify(token, 'nossosecret')
    return decoded
}

module.exports = decodeToken