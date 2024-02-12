const Category = require("../model/categoryModel");

let editCategoryController = async (req, res) => {
    let { name, id } = req.body;
    let existingName = await Category.find({ name: name });

    if (existingName.length == 0) {
        await Category.findByIdAndUpdate({ _id: id }, { name: name });
        res.send({
            success: "Category edit Successful",
        });
    } else {
        res.send({ error: "Category Name Allready Exist" });
    }
};

module.exports = editCategoryController;
