const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
    storename: {
        type: String,
        required: true,
    },
    nidnumber: {
        type: String,
        required: true,
    },
    tradenumber: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("store", storeSchema);
