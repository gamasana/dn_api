const express = require('express')
const router = express.Router()
const {addDeposit, getAllDeposit, updateDepositStatus} = require('../controllers/deposit.controller')

router.post("/user/deposit", addDeposit)
router.get("/user/deposit", getAllDeposit)  
router.put("/admin/deposit", updateDepositStatus)


module.exports = router