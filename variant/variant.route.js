const express = require("express");
const router = express.Router();

const VariantController = require("./variant.controller");

router.get("/", VariantController.index);
router.get("/:variant_id", VariantController.productvariant);
router.post("/", VariantController.store);
router.patch("/:variant_id", VariantController.update);
router.delete("/:variant_id",VariantController.destroy);

module.exports = router;