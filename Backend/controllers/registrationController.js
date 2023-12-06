const {
    emailValidation,
    passwordValidation,
} = require("../helpers/validation");
let User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

let registrationController = async (req, res) => {
    let { name, email, password } = req.body;

    let existingUser = await User.find({ email: email });

    if (existingUser.length == 0) {
        if (!name) {
            res.send("Name required");
        } else if (!email) {
            res.send("Email required");
        } else if (!password) {
            res.send("Password required");
        } else {
            if (email) {
                if (!emailValidation(email)) {
                    return res.send("Valid Email Required");
                }
            }
            if (password) {
                if (!passwordValidation(password)) {
                    return res.send(
                        "Enter an password 8 characters includes letter and number"
                    );
                }
            }

            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: true,
            });

            bcrypt.hash(password, 10, async function (err, hash) {
                let user = new User({
                    name: name,
                    email: email,
                    password: hash,
                    otp: otp,
                });

                user.save();

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: "tanvirmahmudtamim59@gmail.com",
                        pass: "rmsh bqes cmzy gfuh",
                    },
                });

                const info = await transporter.sendMail({
                    from: process.env.BASE_EMAIL,
                    to: email,
                    subject: "verify your email",
                    // text: "Hello world?",
                    html: `<div><h1>Hello Tamim</h1><p>HIIII</p><a href=https://tamim-orebi.netlify.app/ style=padding:10px;background-color:#8a2be2;color:beige;cursor:pointer target=_blank>verify email</a><table style=background-image:url(https://i.ibb.co/PczN9fX/bg.jpg);width:200px;height:200px;color:azure><tr><td>${otp}<td>2<td>3<tr><td>4<td>5<td>6</table></div>`,
                });
                res.send(user);
            });
        }
    } else {
        res.send("Already email exits");
    }
};

module.exports = registrationController;
