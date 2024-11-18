const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure transporter with hardcoded email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.password, // App password
  },
});

// Route for sending feedback emails
router.post('/submit-feedback', async (req, res) => {
  const { rating, feedback } = req.body;
  console.log(rating);
  console.log(feedback);

  if (!rating || !feedback) {
    return res.status(400).send("Rating and feedback are required.");
  }

  // Prepare the email content
  const mailOptions = {
    from: {
      name: "From",
      address: process.env.email,
    },
    to: process.env.email,  // Hardcoded recipient email to match sender
    subject: `New Feedback Received`,
    text: `Feedback Rating: ${rating}\n\nFeedback Message: ${feedback}`,
    html: `<p><strong>Feedback Rating:</strong> ${rating}</p><p><strong>Feedback Message:</strong> ${feedback}</p>`,
  };

  try {
    // Send feedback email
    await transporter.sendMail(mailOptions);
    console.log('Feedback email sent successfully');
    res.status(200).redirect("/mail/submit-feedback");
  } catch (error) {
    console.error('Error sending feedback email:', error);
    res.status(500).send("Failed to send feedback.");
  }
});

router.get("/submit-feedback",(req,res)=>{
   res.render("thanks");
})

// Export your router
module.exports = router;
