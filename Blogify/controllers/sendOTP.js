
const nodemailer = require('nodemailer');
const OTP = require('../models/otp');

// Configure transporter with hardcoded email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "amee1432kky@gmail.com",
    pass: "oqavtyezumlrpocd", // App password
  },
});

 async function sendOtp(email,otp) {
  if (!email || !otp) {
    return res.status(400).send("Rating and feedback are required.");
  }

  // Prepare the email content
  const mailOptions = {
    from: {
      name: "From",
      address: "amee1432kky@gmail.com",
    },
    to: email,  // Hardcoded recipient email to match sender
    subject: `Your Otp Code`,
    text: `Your OTP code is: ${otp}`,
    // html: `<p><strong>Feedback Rating:</strong> ${rating}</p><p><strong>Feedback Message:</strong> ${feedback}</p>`,
  };

  try {
    // Send feedback email
    await transporter.sendMail(mailOptions);
    console.log('Feedback email sent successfully');
  } catch (error) {
    console.error('Error sending feedback email:', error);
  }
};



// Export your router
module.exports = sendOtp;
