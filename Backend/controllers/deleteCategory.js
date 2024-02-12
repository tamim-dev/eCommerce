const Category = require("../model/categoryModel");

let deleteController = async (req, res) => {
    let { id } = req.body;

    await Category.findByIdAndDelete({ _id: id });

    res.send({ success: " Category delete successful" });
};

module.exports = deleteController;
