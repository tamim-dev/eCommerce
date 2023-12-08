const express = require("express");
const router = express.Router();
const registrationController = require("../../controllers/registrationController");
const otpController = require("../../controllers/otpController");
const loginController = require("../../controllers/loginController");
const forgotpasswordController = require("../../controllers/forgotpassword");


router.post("/registration", registrationController);
router.post("/otpverify", otpController)
router.post("/login",loginController)
router.post("/forgotpassword", forgotpasswordController )

module.exports = router;
