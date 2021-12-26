const jwt = require("jsonwebtoken");

const decodeToken = (token) =>{
    const decoded = jwt.verify(token, 'nossosecret')
    return decoded
}

module.exports = decodeToken