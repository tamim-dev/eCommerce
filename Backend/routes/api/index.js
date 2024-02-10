const express = require("express");
const router = express.Router();
const authroutes = require("./authroutes");
const productroutes = require("./productroutes");

router.use("/auth", authroutes);
router.use("/product", productroutes);

module.exports = router;
