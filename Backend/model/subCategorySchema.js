const mongoose = require("mongoose");

const { Schema } = mongoose;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
