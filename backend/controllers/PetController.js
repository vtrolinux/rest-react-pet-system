module.exports = class PetController {
    constructor(){}

    static async create(req, res){
        return res.json({ message: 'cadastrou seu pet!'})
    }
}