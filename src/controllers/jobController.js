const jobService = require('../services/jobService')

const getUnpaid = async (req) =>{
    const model = req.app.get('models')
    const profileId = `${req.profile.id}`
    const profileType = `${req.profile.type}`

    return await jobService.findAllUnpaid({model, profileId, profileType})
}

module.exports = {
    getUnpaid
}