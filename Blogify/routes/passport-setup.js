const User = require('../models/user');  // Your user model
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const bcrypt = require("bcrypt");


// Define the default password
const DEFAULT_PASSWORD = process.env.default_password;  // Set a secure default password

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: process.env.client_id, // Replace with your client ID
    clientSecret: process.env.client_secret, // Replace with your client secret
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Check if the user already exists in the database
    User.findOne({ email: profile.emails[0].value }).then((existingUser) => {
        if (existingUser) {
            // If the user exists, simply return the user
            done(null, existingUser);
        } else {
            
                

                // Create a new user with the hashed default password
                new User({
                    name: profile.displayName,  // Store display name
                    email: profile.emails[0].value,  // Use the primary email
                    password: DEFAULT_PASSWORD,  // Set the hashed default password
                    profileImage: profile._json.picture,  // Store the profile image
                }).save().then((newUser) => {
                    done(null, newUser);
                }).catch(err => {
                    console.error("Error saving new user:", err);
                    done(err, null);
                });
            
        }
    }).catch(err => {
        done(err, null);
    });
}));
