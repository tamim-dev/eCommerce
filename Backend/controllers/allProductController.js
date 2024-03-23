const Products = require("../model/productSchema");

let allProductController = async (req, res) => {
    let data = await Products.find({});

    res.send(data);
};

module.exports = allProductController;
