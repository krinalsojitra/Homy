const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    gujrati_name: { type: String, require: true },
    english_name: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: true },
    iswishlist: { type: Boolean, require: true },
    isdisable: { type: Boolean, require: true },
    ispopular: { type: Boolean, require: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    Image1: String,
    Image2: String,
    Image3: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    variant: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", requestSchema);