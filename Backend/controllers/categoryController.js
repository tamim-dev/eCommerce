const Category = require("../model/categoryModel");

let categoryController = async (req, res) => {
    let { name, ownerId } = req.body;

    let category = new Category({
        name: name,
        ownerId: ownerId,
    });
    category.save();
    res.send({success : "Category create successful"});
};

module.exports = categoryController;