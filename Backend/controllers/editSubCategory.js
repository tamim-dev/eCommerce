const SubCategory = require("../model/subCategorySchema");

let editSubCategoryController = async (req, res) => {
    let { name, id } = req.body;
    let existingName = await SubCategory.find({ name: name });

    if (existingName.length == 0) {
        await SubCategory.findByIdAndUpdate({ _id: id }, { name: name });
        res.send({
            success: " Sub Category edit Successful",
        });
    } else {
        res.send({ error: "Sub Category Name Allready Exist" });
    }
};

module.exports = editSubCategoryController;
