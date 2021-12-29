const getToken = (req) => {
    const authHeader = req.headers["authorization"]
    console.log('auth header: '+authHeader)
    const token = authHeader && authHeader.split(" ")[1]
    console.log('TOKEN: '+token)

    return token
}

module.exports = getToken
