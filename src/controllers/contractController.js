const contractService = require('../services/contractService')

const getById = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const profileType = `${req.profile.type}`
    const {id} = req.params
    
    if(!Number.isInteger(parseInt(id))) return 
    return await contractService.findOne({model, profileId, profileType, id})
}

module.exports = {
    getById
}