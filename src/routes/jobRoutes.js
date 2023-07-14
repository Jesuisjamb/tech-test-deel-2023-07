const {getProfile} = require('../middleware/getProfile')
const jobController = require('../controllers/jobController')
const express = require('express');
const response = express.response;
const router = express.Router();

/**
 * GET** `/jobs/unpaid`
 */
router.get('/unpaid', getProfile, async (req, res = response) =>{
    const unpaidJobs = await jobController.getUnpaid(req)
    if(!unpaidJobs) return res.status(404).json({'msg':'Error'}).end()
    res.json({unpaidJobs})
});

/**
 * POST** `/jobs/:job_id/pay`
 */
router.post('/:job_id/pay', getProfile, async (req, res = response) =>{
    const payment = await jobController.addPayment(req)
    if(!payment) return res.status(404).json({'msg':'Error'}).end()
    res.json({payment})
});

module.exports = router;