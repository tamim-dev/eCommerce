let User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

            
            // const transporter = nodemailer.createTransport({
            //     service: "gmail",
            //     auth: {
            //         user: process.env.SERVICE_EMAIL,
            //         pass: process.env.SERVICE_PASSWORD,
            //     },
            // });

            // const info = await transporter.sendMail({
            //     from: process.env.BASE_EMAIL,
            //     to: existingUser[0].email,
            //     subject: "verify your email",
            //     html: `<div><h1>Hello Tamim</h1><p>HIIII</p><a href=https://tamim-orebi.netlify.app/ style=padding:10px;background-color:#8a2be2;color:beige;cursor:pointer target=_blank>verify email</a><table style=background-image:url(https://i.ibb.co/PczN9fX/bg.jpg);width:200px;height:200px;color:azure><tr><td><a href="http://localhost:5173/changepassword/${existingUser[0].email}">Forgotpassword</a><td>2<td>3<tr><td>4<td>5<td>6</table></div>`,
            // });
        }
    }
};
module.exports = changepasswordController;
