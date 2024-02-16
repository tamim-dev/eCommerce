const SubCategory = require("../model/subCategorySchema");

let approveSubCategory = async (req, res) => {
    let { isActive, id } = req.body;

    await SubCategory.findByIdAndUpdate({ _id: id }, { isActive: isActive });

    res.send({ success: "Status Change" });
};

module.exports = approveSubCategory;
