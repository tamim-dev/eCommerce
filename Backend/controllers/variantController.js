const Variant = require("../model/variantSchema");

let variantController = (req, res) => {
    let { name, productId } = req.body;

    let variants = new Variant({
        name: name,
        image: `uploads/${req.file.filename}`,
        productId: productId,
    });
    variants.save();
    res.send({ success: "Variant Created" });
};

module.exports = variantController;
