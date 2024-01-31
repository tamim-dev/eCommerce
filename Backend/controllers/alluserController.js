let User = require("../model/userSchema");

let alluserController = async (req, res) => {
    let Users = await User.find({});
    res.send(Users);
};
module.exports = alluserController;
