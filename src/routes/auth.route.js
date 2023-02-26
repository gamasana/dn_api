const express = require("express");
const router = express.Router();
const {signup, signin, signout, verifyToken} = require('../controllers/auth.controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth.validator");



router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.get("/user/:id/verify/:token", verifyToken)
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post('/signout', signout)

module.exports = router;
