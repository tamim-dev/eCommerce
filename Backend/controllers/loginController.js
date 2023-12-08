let User = require("../model/userSchema");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
    let { email, password } = req.body;

    let existingUser = await User.find({ email: email });

    if (existingUser.length == 0) {
        res.send("Credential invalid");
    } else {
        if (existingUser[0].verify == false) {
            res.send("Please verify Email");
        } else {
            bcrypt.compare(
                password,
                existingUser[0].password,
                function (err, result) {
                    if (result) {
                        res.send({
                            id: existingUser[0]._id,
                            name: existingUser[0].name,
                            email: existingUser[0].email,
                            role: existingUser[0].role,
                            verify: existingUser[0].verify,
                        });
                    } else {
                        res.send("Credential invalid");
                    }
                }
            );
        }
    }
};

module.exports = loginController;
