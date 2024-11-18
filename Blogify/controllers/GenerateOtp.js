const crypto = require('crypto');

// Function to generate OTP
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString(); // Generates a random 6-digit number
}

module.exports=generateOTP;