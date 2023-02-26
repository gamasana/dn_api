const express = require("express");
const router = express.Router();
const {requireSignin, userMiddleware} = require('../middlewares/middlewares')
const {getUserDetails} = require('../controllers/user.controler')


router.get("/user", requireSignin,userMiddleware, getUserDetails );


module.exports = router;