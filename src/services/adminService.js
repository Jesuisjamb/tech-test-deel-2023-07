const {Op, literal, col} = require('sequelize')

const getBestProfession = async (params) =>{
    const {model, profileId, start, end} = params
    const {Contract, Job, Profile} = model
    const startISO = new Date(start)
    const endISO = new Date(end)

    return await Profile.findAll({
        where: {type: {[Op.eq]: 'contractor'}},
        raw: true,
        attributes: [
            'id',
            'profession',
            literal('SUM(price) AS "totalEarned"'),
        ],
        group: ['Profile.profession'],
        order:[
            [col('totalEarned'), 'DESC'],
        ],
        include: [{ 
            model: Contract, 
            as: 'Contractor',
            attributes: [],
            include: [{ 
                model: Job, 
                as: Contract,
                where: {
                    paymentDate: { [Op.between]: [startISO, endISO]}, paid: {[Op.eq]: true}
                },
                raw: true,
                attributes:[],
                required: true,
            }],
            required: true,
        }],
    })
    .then((queryData) => {
        if(!queryData[0]) throw('Empty document')
        return queryData[0]
    })
    .catch(e => {
        console.error(e)
        return
    })
}

const getBestClients = async (params) =>{
    const {model, profileId, start, end, limit} = params
    const {Contract, Job, Profile} = model
    const startISO = new Date(start).toISOString()
    const endISO = new Date(end).toISOString()

    return await Profile.findAll({
        where: {type: {[Op.eq]: 'client'}},
        raw: true,
        attributes: [
            'id',
            literal('firstName || " " || lastName AS "fullName"'),
            literal('SUM(price) AS "totalPaid"'),
        ],
        group: ['Profile.id'],
        order:[
            [col('totalPaid'), 'DESC'],
        ],
        include: [{
            model: Contract, 
            as: 'Client',
            attributes: [],
            include: [{ 
                model: Job, 
                as: Contract,
                where: {
                    paymentDate: { [Op.between]: [startISO, endISO]}, paid: {[Op.eq]: true}
                },
                raw: true,
                attributes:[],
                required: true,
            }],
            required: true,
        }],
    })
    .then((queryData) => {
        if(!queryData) throw('Empty document')
        return queryData.slice(0, limit)
    })
    .catch(e => {
        console.error(e)
        return
    })
}

module.exports = {
    getBestProfession,
    getBestClients
}