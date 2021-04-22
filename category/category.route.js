const express = require("express");
const router = express.Router();

const categoryController = require("./category.controller");

router.get("/", categoryController.index);
router.post("/", categoryController.store);
router.patch("/:category_id", categoryController.update);
router.delete("/:category_id",categoryController.destroy);

module.exports = router;