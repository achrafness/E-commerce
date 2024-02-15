const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig")
const sendEmail = async ({to,subject,html}) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig);
  
  return  transporter.sendMail({
    from: `"Achraf Nessighaoui"<${process.env.USER}>`, // sender address
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;
