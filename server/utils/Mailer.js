const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.REACT_APP_SENDER_EMAIL,
    pass: process.env.REACT_APP_SENDER_PASS,
  },
});

const sendSubscriptionEmail = (email) => {
  const mailOptions = {
    from: process.env.REACT_APP_SENDER_EMAIL,
    to: email,
    subject: "Subscription Confirmation",
    text: "Thank you for subscribing to our blog!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendSubscriptionEmail;
