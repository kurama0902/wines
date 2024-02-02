const nodemailer = require("nodemailer");

const sendFeedBack = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIN_EMAIL,
          pass: process.env.MAIN_PASS,
        },
      });
    
      let mailOptions = {
        from: process.env.MAIN_EMAIL,
        to: req.body.email,
        subject: "Your order",
        html: `${req.body.info}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.statusCode = 405;
          return res.send(error);
        }
        console.log(mailOptions.html);
      });
}

module.exports = sendFeedBack;