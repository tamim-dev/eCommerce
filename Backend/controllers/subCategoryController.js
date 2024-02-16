const SubCategory = require("../model/subCategorySchema");

let subCategoryController = async (req, res) => {
    let { name, categoryId } = req.body;

    let existingName = await SubCategory.find({ name: name });

    if (existingName.length == 0) {
        let subCategory = new SubCategory({
            name: name,
            categoryId: categoryId,
        });
        subCategory.save();
        res.send({ success: "Sub category create successful" });
    } else {
        res.send({ error: "Category Name Allready Exist" });
    }
};

module.exports = subCategoryController;
