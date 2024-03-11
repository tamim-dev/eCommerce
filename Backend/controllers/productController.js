const Products = require("../model/productSchema");

let productController = (req, res) => {
    let { name, description, variant, avatar } = req.body;

    console.log(req.file.originalname);

    // let product = new Products({
    //     name: name,
    //     description: description,
    //     variant: variant,
    // });
    // product.save();
    // res.send({ success: "New Product Created" });
};

module.exports = productController;
