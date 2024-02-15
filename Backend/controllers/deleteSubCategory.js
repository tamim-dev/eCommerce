const SubCategory = require("../model/subCategorySchema");

let deletesubController = async (req, res) => {
    let { id } = req.body;

    await SubCategory.findByIdAndDelete({ _id: id });

    res.send({ success: "Sub Category delete successful" });
};

module.exports = deletesubController;
