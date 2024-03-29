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
            res.send({ error: "Name required" });
        } else if (!email) {
            res.send({ error: "Email required" });
        } else if (!password) {
            res.send({ error: "Password required" });
        } else {
            if (email) {
                if (!emailValidation(email)) {
                    return res.send({ error: "Valid Email Required" });
                }
            }
            if (password) {
                if (!passwordValidation(password)) {
                    return res.send({
                        error: "Enter an password 8 characters includes letter and number",
                    });
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
                res.send({
                    success: "Registration successful",
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    role: user.role,
                    verify: user.verify,
                });
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.SERVICE_EMAIL,
                        pass: process.env.SERVICE_PASSWORD,
                    },
                });

                const info = await transporter.sendMail({
                    from: process.env.BASE_EMAIL,
                    to: email,
                    subject: "verify your email",
                    html: `<div><h1>Hello Tamim</h1><p>HIIII</p><a href=https://tamim-orebi.netlify.app/ style=padding:10px;background-color:#8a2be2;color:beige;cursor:pointer target=_blank>verify email</a><table style=background-image:url(https://i.ibb.co/PczN9fX/bg.jpg);width:200px;height:200px;color:azure><tr><td>${otp}<td>2<td>3<tr><td>4<td>5<td>6</table></div>`,
                });
            });
        }
    } else {
        res.send({ error: "Already email exits" });
    }
};

module.exports = registrationController;
