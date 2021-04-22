const express = require("express");
const router = express.Router();
const storage =require('../utils/multer')
const multer = require("multer");

const productController = require("./product.controller");

const upload = multer({
    storage
})
router.get("/", productController.index);
router.post("/", 
    upload.fields([{name :"Image1"},{name :"Image2"},{name :"Image3"}]),
     productController.store);

router.patch("/:product_id",
    upload.fields([{name :"Image1"},{name :"Image2"},{name :"Image3"}]),
    productController.update);
    
router.delete("/:product_id",productController.destroy);

module.exports = router;