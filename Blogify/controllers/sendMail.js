const nodemailer=require("nodemailer");
async function sendMail(req,res,next){
    // Configure transporter with hardcoded email credentials
    const DEFAULT_PASSWORD="defaultPassword123";
    const email=req.session.email;
    console.log(DEFAULT_PASSWORD);
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

  // Prepare the email content
const mailOptions = {
    from: {
      name: "From",
      address: "amee1432kky@gmail.com",
    },
    to: email,  // Hardcoded recipient email to match sender
    subject: "Your Password for Blogify",
    text: `Your Default password is ${DEFAULT_PASSWORD}`,
    html: `Your Default password is ${DEFAULT_PASSWORD}`,
  };

  try {
    // Send feedback email
    await transporter.sendMail(mailOptions);
    req.session.password=null;
    console.log('Default password is sent');
   
  } catch (error) {
    console.error('Error sending Default password :', error);
    res.status(500).send("Failed to send Default password.");
  }
}

module.exports=sendMail;