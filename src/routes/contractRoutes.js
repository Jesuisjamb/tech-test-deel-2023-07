const {getProfile} = require('../middleware/getProfile')
const contractController = require('../controllers/contractController')
const express = require('express');
const response = express.response;
const router = express.Router();

/**
 * _GET_** `/contracts/:id`
 */
router.get('/:id', getProfile, async (req, res = response) =>{
    const contract = await contractController.getById(req)
    if(!contract) return res.status(404).json({'msg':'Error'}).end()
    res.json({contract})
});

/**
 * _GET_** `/contracts/`
 */
router.get('/', getProfile, async (req, res = response) =>{
    const contract = await contractController.getAll(req)
    if(!contract) return res.status(404).json({'msg':'Error'}).end()
    res.json({contract})
});

module.exports = router;