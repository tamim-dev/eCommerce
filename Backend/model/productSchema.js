const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    regularprice: {
        type: Number,
    },
    salesprice: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    variantsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variant",
        },
    ],
});

module.exports = mongoose.model("Product", productSchema);
