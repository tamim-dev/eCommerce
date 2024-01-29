const bcrypt = require("bcrypt");
let User = require("../model/userSchema");
const { passwordValidation } = require("../helpers/validation");

let changepasswordController = async (req, res) => {
    let { token, password } = req.body;

    let existingUser = await User.findOne({ token: token });

    if (existingUser.length == 0) {
        res.send({ error: "Credential invalid" });
    } else {
        if (existingUser.verify == false) {
            res.send({ error: "Please verify Email" });
        } else {
            if (!passwordValidation(password)) {
                return res.send({
                    error: "Enter an password 8 characters includes letter and number",
                });
            }

            bcrypt.hash(password, 10, async function (err, hash) {
                await User.updateOne(
                    { token: token },
                    { $set: { password: hash, token: "" } },
                    { strict: false }
                );
                res.send({ success: "Password changed successful" });
            });
        }
    }
};
module.exports = changepasswordController;
