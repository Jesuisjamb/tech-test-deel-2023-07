const { Op } = require('sequelize')

const findOne = async (params) =>{
    const {model, id, profileType, profileId} = params
    const {Contract} = model
    const queryObj = {
        'contractor': {id, ContractorId: profileId},
        'client'    : {id, ClientId: profileId}
    }

    return await Contract.findOne({
        where: queryObj[profileType],
    })
}

const findAll = async (params) =>{
    const {model, profileType, profileId} = params
    const {Contract} = model
    const queryObj = {
        'contractor': {status: {[Op.not]:'terminated'}, ContractorId: profileId},
        'client'    : {status: {[Op.not]:'terminated'}, ClientId: profileId}
    }

    return await Contract.findAll({
        where: queryObj[profileType],
    })
}

module.exports = {
    findOne, findAll
}