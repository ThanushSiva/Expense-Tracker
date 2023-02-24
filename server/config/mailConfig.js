const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILID,
        pass: process.env.MAILPWD
    }
})

module.exports = transporter