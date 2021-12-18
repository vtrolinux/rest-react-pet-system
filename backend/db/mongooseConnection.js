const mongoose = require('mongoose')

async function main(){
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
    console.log('mongoose conectado!')
}
main().catch((err) => {console.log('erro ao conectar no banco: '+ err)})

module.exports = mongoose