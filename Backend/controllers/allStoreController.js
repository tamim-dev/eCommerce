const Store = require("../model/storeSchema");

let allStoreController = async (req, res) => {
    let { id } = req.params;
    let data = await Store.find({ ownerId: id });
    res.send(data);
};

module.exports = allStoreController;
