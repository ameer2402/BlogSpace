const{Router}=require("express");
const User=require("../models/user");
const multer = require('multer');
const path=require("path");
const{cookieValidation}=require("../middlewares/authentication");
const{generateToken}=require("../services/authentication");
const Blogs=require("../models/blog");
const generateOTP=require("../controllers/GenerateOtp");
const storeOTP=require("../controllers/storeOtp");
const mail=require("../controllers/sendOTP");
const sendOTP = require("../controllers/sendOTP");
const OTP=require("../models/otp");
const bcrypt = require('bcrypt');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;





const router=Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_key,
  api_secret: process.env.cloud_secret,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profileImages",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

router.get("/signin",(req,res)=>{
  const toast = req.session.toast || null;
    req.session.toast = null; // Clear the toast after reading it
   return res.render("signin",{
    toast,
   });
})
router.get("/signup",(req,res)=>{
  const toast = req.session.toast || null;
  req.session.toast = null; // Clear the toast after reading it
    return res.render("signup",{
      toast,
    });
 })
router.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body;
    try{
    const newUser=await User.create({
        name,
        email,
        password,
    });
    const token=generateToken(newUser);
    res.cookie("token",token);
    req.session.toast={status:"success",message:`Welcome to Blogify ${name}`};
    console.log(req.session.toast);
    return res.status(201).redirect("/");
  }
  catch (error) {
    // Handle duplicate user error (or any other error)
    if (error.code === 11000) { // MongoDB duplicate key error
        req.session.toast = { status: "error", message: "User already exists" };
    } else {
        req.session.toast = { status: "error", message: "An error occurred. Please try again." };
    }
    console.log(req.session.toast);
    
    return res.status(400).redirect("/user/signup");
}
 })

 router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user=await User.findOne({email});
    if(!user){
      req.session.toast = { status: 'error', message: "User doesn't exists" }; // Success messageu
      return res.redirect("/user/signin");
    }

      // Attempt to match the email and password and generate a token
      const token = await User.matchPasswordandGenerateToken(email, password);

      // If successful, set the token in a cookie and redirect to the home page
      req.session.toast = { status: 'success', message: 'Welcome Back!' }; // Success message
      return res.cookie("token", token).redirect("/"); 
  } catch (error) {
      // Handle errors (e.g., invalid credentials)
      
      req.session.toast = { status: 'error', message: 'Username or Password is Incorrect' }; // Error message
      console.log(req.session.toast); 
      return res.redirect('/user/signin'); // Redirect back to the signin page
  }
});


router.get("/setting",cookieValidation,async(req,res)=>{
    const userid=req.user._id;
    const newUser=await User.findById(userid);
    const blog=await Blogs.find({createdBy:userid}).populate("createdBy");
    const toast=req.session.toast||null;
    req.session.toast=null;
    // console.log(blog);
    return res.render("setting",{
        user:newUser,
        blogs:blog,
        profileImage:newUser.profileImage,
        toast,
    });
})

router.post("/upload-profile-image", cookieValidation, upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.file) {
      req.session.toast = { status: "error", message: "No file uploaded!" };
      return res.redirect("/user/setting");
    }

    const imagePath = req.file.path; // Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imagePath },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    router.post("/upload-profile-image", cookieValidation, upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.file) {
      req.session.toast = { status: "error", message: "No file uploaded!" };
      return res.redirect("/user/setting");
    }

    const imagePath = req.file.path; // Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imagePath },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    req.user.profileImage=updatedUser.profileImage;
    res.redirect("/user/setting");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
   
    res.redirect("/user/setting");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


  router.post("/check-mail", async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const user = await User.findOne({ email });
        
        if (user) {
          req.session.email = user.email; // Store user in session
          req.session.timer=user.createdAt;
         const otpGenerated=await  generateOTP();
        const otp= await storeOTP(email,otpGenerated);
         await sendOTP(email,otp);
         req.session.otp=otp;
         res.json({ exists: true });
      } else {
          res.json({ exists: false });
      }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
      const otpGenerated = await generateOTP();
      const otp = await storeOTP(email, otpGenerated);
      await sendOTP(email, otp);
      
      res.json({ success: true });
  } catch (error) {
      console.error("Error resending OTP:", error);
      res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/check-mail",(req,res)=>{
  res.render("check-mail");
})

router.get("/verify-otp",(req,res)=>{
  const email=req.session.email;
  // console.log(email);

  if(!email){
    return res.redirect("/user/check-mail");
  }
  res.render("verify-otp",{
    email:email,
  });
})
router.post("/verify-otp",async(req,res)=>{
  const email=req.session.email;
  if(!email){
    return res.redirect("/user/check-mail");
  }
  const otpArray = req.body['otp[]']; // Retrieves the array of OTP inputs
  const candidate=await OTP.findOne({user_email:email});
  console.log(candidate);
  console.log(candidate.otp);

  const submittedOtp = otpArray.join(''); // Combine the array into a single OTP string

    if (!otpArray || otpArray.length !== 6) {
        return res.status(400).send('Incomplete OTP submission.');
    }
  
    if(submittedOtp===candidate.otp){
      return res.redirect("/user/change-password");
    }
    else{
      req.session.toast={status:"error",message:"otp is invalid"}
      res.redirect("/user/password");
    }


})

router.get("/change-password",(req,res)=>{
    res.render("change-password");
})

router.post("/change-password",async(req,res)=>{
  const {newPassword}=req.body;
  const email=req.session.email;
  const user=await User.findOne({email});

   // Update the user's password in the database
   user.password = newPassword;
   console.log(user.password);
   await user.save();
   req.session.toast={status:"success",message:"Password updated successfully"};
   await OTP.deleteOne({email});
   res.redirect("/");

});

router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    req.session.destroy((err) => { // Destroy session
        if (err) {
            console.log('Failed to destroy session during logout', err);
            return res.redirect('/');  
        }
        res.clearCookie('connect.sid'); // If you're using express-session
        res.redirect('/'); // Redirect to homepage or login
    });
});

router.get("/create-feedback",cookieValidation,(req,res)=>{
  res.render("create-feedback",
    { rating: null ,
      user:req.user,
    });
})


module.exports=router;
