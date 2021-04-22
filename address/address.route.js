const express = require("express");
const router = express.Router();

const AddressController = require("./address.controller");

router.get("/", AddressController.index);
router.get("/:address_id", AddressController.useraddress);
router.post("/", AddressController.store);
router.patch("/:address_id", AddressController.update);
router.delete("/:address_id",AddressController.destroy);

module.exports = router;