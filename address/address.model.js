const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    user          : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pincode       : {type : String ,require : true},
    street_add_1  : {type : String ,require : true},
    street_add_2  : {type : String ,require : true},
    city          : {type : String ,require : true},
    country       : {type : String ,require : true},
    address_id    : { type: Schema.Types.ObjectId, ref: "Address" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", requestSchema);