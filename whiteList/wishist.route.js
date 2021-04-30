const express = require("express");
const router = express.Router();
const WishlistController = require("./wishlist.controller");

router.get("/:user_id", WishlistController.wishlist);
router.get("/paymentsummary/:user_id", WishlistController.payment_summary);
router.get("/", WishlistController.index);
router.post("/", WishlistController.store);
router.patch("/:user_id", WishlistController.update);
router.delete("/:user_id", WishlistController.destroy);

module.exports = router;