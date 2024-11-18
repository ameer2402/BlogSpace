const {validateToken}=require("../services/authentication");

    function cookieValidation(req, res, next) {
        const cookieValue = req.cookies["token"];  // Corrected the way to access the cookie
        if (!cookieValue) {
            return next();  // If there's no token, proceed to the next middleware
        }
    
        try {
            const payload = validateToken(cookieValue);  // Validate the token
            req.user = payload;  // Attach the payload to the request object
        } catch (error) {
            console.error('Token validation failed:', error);  // Optionally log the error
        }
    
        next();  // Proceed to the next middleware
    }
    
    module.exports = {
        cookieValidation,
    };
    
   
