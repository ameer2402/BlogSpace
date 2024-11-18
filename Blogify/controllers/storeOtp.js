const OTP = require('../models/otp'); // Import the OTP model

// Store OTP in MongoDB and return the OTP
async function storeOTP(email, otp) {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5); // Just for reference, TTL will handle deletion.

    // Try finding an existing OTP for the email
    let existingOtp = await OTP.findOne({ user_email: email });

    if (existingOtp) {
        console.log('Existing OTP found and is still valid');
        return existingOtp.otp;
    }

    // Create and store a new OTP
    const newOtp = new OTP({
        user_email: email,
        otp: otp,
        expiration_time: expirationTime, // Optional, just for tracking.
    });

    await newOtp.save();
    console.log('New OTP stored successfully');
    return otp; // Return the new OTP
}

module.exports = storeOTP;
