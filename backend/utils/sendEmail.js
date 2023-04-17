const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'newprojectclickology@gmail.com',
                pass: 'nlbdarfvknghhjdt',
            },
        });

        await transporter.sendMail({
            from: 'newprojectclickology@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent sucessfully.");
    } catch (error) {
        console.log(error, "Email not sent.  Contact the Organisation Admin.");
    }
};

module.exports = sendEmail;