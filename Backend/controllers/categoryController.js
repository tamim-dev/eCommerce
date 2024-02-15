const Category = require("../model/categoryModel");

let categoryController = async (req, res) => {
    let { name, ownerId } = req.body;

    let existingName = await Category.find({ name: name });

    if (existingName.length == 0) {
        let category = new Category({
            name: name,
            ownerId: ownerId,
        });
        category.save();
        res.send({ success: "Category create successful" });
    } else {
        res.send({ error: "Category Name Allready Exist" });
    }
};

module.exports = categoryController;
