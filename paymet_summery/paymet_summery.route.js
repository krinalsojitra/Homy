const express = require("express");
const router = express.Router();
const PaymrtSummeryController = require("./paymet_summery.controller");

router.get("/:user_id", PaymrtSummeryController.payment_summary);


module.exports = router;