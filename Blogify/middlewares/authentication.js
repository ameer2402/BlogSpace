const {validateToken}=require("../services/authentication");

    function cookieValidation(req, res, next) {
        const cookieValue = req.cookies["token"];
        if (!cookieValue) {
            return next();
        }
    
        try {
            const payload = validateToken(cookieValue);
            req.user = payload;
        } catch (error) {
            console.error('Token validation failed:', error);
        }
    
        next();
    }
    
    function requireAuth(req, res, next) {
        if (!req.user) {
            req.session.toast = { status: "error", message: "You must be logged in to access this page." };
            return res.redirect("/user/signin");
        }
        next();
    }
    
    module.exports = {
        cookieValidation,
        requireAuth
    };
    
   
