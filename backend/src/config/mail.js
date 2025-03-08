import nodemailer from "nodemailer";
import configs from "./config.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configs.email,
      pass: configs.email_password
    }
});

export default transporter;