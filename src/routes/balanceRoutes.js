const {getProfile} = require('../middleware/getProfile')
const balanceController = require('../controllers/balanceController')
const express = require('express');
const response = express.response;
const router = express.Router();

/**
 * POST*** `/balances/deposit/:userId`
 */
router.post('/deposit/:userId', getProfile, async (req, res = response) =>{
    const actualBalance = await balanceController.addDeposit(req)
    if(!actualBalance) return res.status(404).json({'msg':'Error'}).end()
    res.json({actualBalance})
})

module.exports = router;