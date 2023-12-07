const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            port: 465,
            secure: true,
            auth: {
                user: "gutettapjidanjuma2017@yahoo.com",
                pass: "suidkjlhsrvgxdkc",
            },
        });

        await transporter.sendMail({
            from: "gutettapjidanjuma2017@yahoo.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent successfully");
    } catch (error) {
        console.error(error, "email not sent");
    }
};

module.exports = sendEmail;
