const Store = require("../model/storeSchema");
const { TradValidation, nidValidation } = require("../helpers/validation");

let storeController = async (req, res) => {
    let { storename, nidnumber, tradenumber,ownerId } = req.body;

    let existingStore = await Store.find({ storename: storename });
    let existingTred = await Store.find({ tradenumber: tradenumber });

    if (!existingTred.length == 0) {
        res.send({ error: "Already Trad Number exits" });
    } else if (!existingStore.length == 0) {
        res.send({ error: "Already Store exits" });
    } else if (!storename) {
        res.send({ error: "Store name required" });
    } else if (!nidnumber) {
        res.send({ error: "Nid number required" });
    } else if (!tradenumber) {
        res.send({ error: "Trad number required" });
    } else if (!TradValidation(tradenumber)) {
        res.send({ error: "Valid Trad number required" });
    } else if (!nidValidation(nidnumber)) {
        res.send({ error: "Valid Nid number required" });
    } else {
        let store = new Store({
            storename: storename,
            tradenumber: tradenumber,
            nidnumber: nidnumber,
            ownerId: ownerId
        });
        store.save().then(() => {
            res.send({ success: "Store Created" });
        });
    }
};

module.exports = storeController;
