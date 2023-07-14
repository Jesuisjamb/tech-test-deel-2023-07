const {getProfile} = require('../middleware/getProfile')
const adminController = require('../controllers/adminController')
const express = require('express');
const response = express.response;
const router = express.Router();

/**
 * GET** `/admin/best-profession?start=<date>&end=<date>`
 */
router.get('/best-profession', getProfile, async (req, res = response) =>{
    const bestProfession = await adminController.getBestProfession(req)
    if(!bestProfession) return res.status(404).json({'msg':'Error'}).end()
    res.json({bestProfession})
})

/**
 * GET** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>`
 */
router.get('/best-clients', getProfile, async (req, res = response) =>{
    const bestClients = await adminController.getBestClients(req)
    if(!bestClients) return res.status(404).json({'msg':'Error'}).end()
    res.json({bestClients})
})

module.exports = router;