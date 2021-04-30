const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone_number: { type: String, require: true },
    fcm_token: { type: String, require: true },
    islogout: { type: Boolean, require: true },
    isnew: { type: Boolean, require: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    Image: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", requestSchema);