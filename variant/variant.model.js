const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price : {type : String ,require : true},
    type  : {type : String ,require : true},
    variant: { type: Schema.Types.ObjectId, ref: "Variant" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Variant", requestSchema);