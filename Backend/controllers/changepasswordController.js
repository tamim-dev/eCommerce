let User = require("../model/userSchema");

let changepasswordController = async (req, res) => {
    let { email } = req.body;

    let existingUser = await User.find({ email: email });

    if (existingUser.length == 0) {
        res.send("Credential invalid");
    } else {
        if (existingUser[0].verify == false) {
            res.send("Please verify Email");
        } else {
            res.send({ success: " please check your email" });
        }
    }
};
module.exports = changepasswordController;
