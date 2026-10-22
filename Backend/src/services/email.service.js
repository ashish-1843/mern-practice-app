// const nodemailer = require('nodemailer')
const config = require('../config/config');
const { Resend } = require("resend");

const resend = new Resend(config.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    const { data, error } = await resend.emails.send({
        from: "NotesApp <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
        html
    });

    if (error) {
        console.error("Resend email error:", error);
        throw new Error("Unable to send verification email.");
    }

    console.log("Email accepted by Resend:", data.id);
    return data;
};

module.exports = { sendEmail };


// const transporter = nodemailer.createTransport({

//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: config.GOOGLE_USER,
//         clientId: config.GOOGLE_CLIENT_ID,
//         clientSecret: config.GOOGLE_CLIENT_SECRET,
//         refreshToken: config.GOOGLE_REFRESH_TOKEN
//     }
// })


// // Verify the connection configuration
// transporter.verify((error, success) => {
//     if (error) {
//         console.error('Error connecting to email server:', error);
//     } else {
//         console.log('Email server is ready to send messages');
//     }
// });

// const sendEmail = async (to, subject, text, html) => {
//     try {
//         const info = await transporter.sendMail({
//             from: `"Your Name" <${config.GOOGLE_USER}>`, // sender address
//             to, // list of receivers
//             subject, // Subject line
//             text, // plain text body
//             html, // html body
//         });

//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// module.exports = sendEmail