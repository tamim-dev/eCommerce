let subCategory = require("../model/subCategorySchema");

let singleCategoryController = async (req, res) => {
    let { id } = req.query;
    let data = await subCategory.find({ categoryId: id });
    console.log(data);
};

module.exports = singleCategoryController;
