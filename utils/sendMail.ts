import mailer from "nodemailer"
import { EmailOptions, SendEmailOptions } from "../interfaces/emailOption";

const sendEmail = async (options: EmailOptions) => {
    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_HOST_USER,
            pass: process.env.EMAIL_HOST_PASSWORD
        }
    });

    const emailOptions: SendEmailOptions = {
        from: `${process.env.APP_NAME} ${process.env.EMAIL_HOST_USER}`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<div style="background-color:#f4f4f4">${options.message}</div>`
    };

    await transporter.sendMail(emailOptions);
}

export default sendEmail;
