const Products = require("../model/productSchema");

let productController = (req, res) => {
    let { name, description, variant } = req.body;

    let product = new Products({
        name: name,
        description: description,
        variant: variant,
        image: `uploads/${req.file.filename}`,
    });
    product.save();
    res.send({ success: "New Product Created" });
};

module.exports = productController;
