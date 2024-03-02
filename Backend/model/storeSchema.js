const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
    storename: String,
    nidnumber: String,
    tradenumber: String,
});

module.exports = mongoose.model("store", storeSchema);
