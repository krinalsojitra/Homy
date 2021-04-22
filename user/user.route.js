const express = require("express");
const router = express.Router();
const storage =require('../utils/multer')
const multer = require("multer");

const UserController = require("./user.controller");

const upload = multer({
    storage
})
router.get("/", UserController.index);
router.post("/", upload.single("Image"), UserController.store);
router.patch("/:user_id",upload.single("Image"),UserController.update);
router.delete("/:user_id",UserController.destroy);

module.exports = router;