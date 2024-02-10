const SubCategory = require("../model/subCategorySchema");

let allSubCategoryController = async (req, res) => {
    let data = await SubCategory.find({}).populate("categoryId");

    res.send(data);
};

module.exports = allSubCategoryController;
