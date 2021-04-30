const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    wishlistid_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wishlistid_product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    wishlist_id: { type: Schema.Types.ObjectId, ref: "Wishlist" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", requestSchema);