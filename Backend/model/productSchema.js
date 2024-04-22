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
        type: String,
    },
    salesprice: {
        type: String,
    },
    quantity: {
        type: String,
    },
    
});

module.exports = mongoose.model("Product", productSchema);
