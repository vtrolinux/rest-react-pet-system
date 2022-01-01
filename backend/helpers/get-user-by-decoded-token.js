const User = require('../models/User')
const getUserByDecodedToken = async (decoded) => {
    const userId = decoded.id
    console.log(userId)
    if(!userId){
        throw ({ status: 422, code: 'USER_NOT_EXISTS', message: 'this token is invalid.' })
    }

    const user = await User.findOne({ _id: userId })
    console.log(user)
    if(user === null){
        throw ({ status: 422, code: 'USER_NOT_FOUND', message: 'this token is invalid..' })
    }   
    if(userId != user._id){
        console.log('userId: '+userId+ ' user._id: '+user._id)
        throw ({ status: 422, code: 'USER_NOT_MATCH', message: 'this token is invalid...' })
    }
    return user
}
module.exports = getUserByDecodedToken
//used only in service layer