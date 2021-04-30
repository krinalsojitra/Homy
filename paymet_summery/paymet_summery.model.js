const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
    {
        paymetSummery_wishlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', required: true },
        paymetSummery_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
        gst: String,
        sub_toatal: String,
        total: String,
        paymetSummery_id: { type: Schema.Types.ObjectId, ref: "PaymetSummery" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PaymetSummery", requestSchema);