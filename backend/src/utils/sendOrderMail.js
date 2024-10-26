import nodemailer from 'nodemailer'
import ejs from "ejs"
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sendOrderMail = async (email, orderId ,amount, date, paymentType,orderType,items,name) => {
    // transporter - configuration of admin/user to send mail from
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // const transporter = nodemailer.createTransport({
    //     host:  'server57.hostingraja.org', // Your mail server's host
    //     port: 465,                      // Typically 587 for secure transmission with STARTTLS, or 465 for SSL
    //     secure: true,                  // Set `true` for port 465, `false` for other ports
    //     auth: {
    //       user: process.env.NODEMAILER_EMAIL,   // Your email address
    //       pass: process.env.NODEMAILER_PASSWORD // Your email password
    //     }
    //   });

      
    const templatePath = path.join(__dirname, `../views/orderMail.ejs`);

    // console.log(templatePath,"templatePath")

    let data = await ejs.renderFile(templatePath, { email, orderId, amount, date ,paymentType,orderType,items,name});


    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: [email,process.env.NODEMAILER_EMAIL,"avnish@pearlorganisation.com"],
        subject: "Your Pizza Inn Order Confirmation",
        html: data,
      };


      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return reject(error);
          } else {
            return resolve("Order Mail Sent Successfully" + info.response);
          }
        });
      });
}