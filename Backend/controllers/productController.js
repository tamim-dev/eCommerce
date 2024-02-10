const Products = require("../model/productSchema");

let productController = (req, res) => {
    let {
        name,
        description,
        image,
        rating,
        status,
        regularprice,
        price,
        brand,
    } = req.body;

    let product = new Products({
        name: name,
        image: image,
        description: description,
        price: price,
        regularprice: regularprice,
        rating: rating,
        status: status,
        brand: brand,
    });
    product.save();
    res.send({ success: "New Product Created" });
};

module.exports = productController;
