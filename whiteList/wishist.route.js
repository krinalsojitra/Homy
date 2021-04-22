const express = require("express");
const router = express.Router();
const WishlistController = require("./wishlist.controller");

router.get("/", WishlistController.index);
router.get("/:user_id", WishlistController.wishlist);
router.post("/", WishlistController.store);

module.exports = router;