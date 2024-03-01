const mongoose = require("mongoose");

const { Schema } = mongoose;

const variantValueSchema = new Schema({
    name: String,
    stock: Number,
});

const variantSchema = new Schema({
    name: String,
    value: [variantValueSchema],
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    variant: [variantSchema],
});

module.exports = mongoose.model("Product", productSchema);
