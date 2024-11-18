const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiration_time: { type: Date, required: true }, // Optional for manual tracking
    created_at: { type: Date, default: Date.now, expires: 300 }, // TTL index for 5 minutes
});

// Ensure TTL index for `created_at` field is applied
otpSchema.index({ created_at: 1 }, { expireAfterSeconds: 300 });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
