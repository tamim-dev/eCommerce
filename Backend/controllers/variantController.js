const Variant = require("../model/variantSchema");

let variantController = (req, res) => {
    let { name, productId, regularprice, salesprice, quantity } = req.body;

    let variants = new Variant({
        name: name,
        image: `uploads/${req.file.filename}`,
        productId: productId,
        regularprice: regularprice,
        salesprice: salesprice,
        quantity: quantity,
    });
    variants.save();
    res.send({ success: "Variant Created" });
};

module.exports = variantController;
