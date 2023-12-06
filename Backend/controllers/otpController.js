let User = require("../model/userSchema");

let otpController = async (req, res) => {
    let { email, otp } = req.body;

    let userdata = await User.find({ email: email });

    if (userdata[0].otp == otp) {
        await User.findOneAndUpdate(
            { email: email },
            { otp: "", verify: true }
        );
    } else {
        res.send("otp is not match");
    }
};

module.exports = otpController;
