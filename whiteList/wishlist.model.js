const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    user         : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product      : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price        : {type : String ,require : true},
    description  : {type : String ,require : true},
    category     : { type: String ,require : true },
    isdisable    : {type : Boolean ,require : true},
    ispopular    : { type: Boolean ,require : true },
    product_id   : { type: Schema.Types.ObjectId, ref: "Wishlist" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", requestSchema);