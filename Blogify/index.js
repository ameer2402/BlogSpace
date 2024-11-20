require('dotenv').config();  // Make sure this is in the main file to load .env
const express=require("express");
const path=require("path");
const passport = require('passport');
const session = require('express-session');
const router=require("./routes/user");
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser");
const{cookieValidation}=require("./middlewares/authentication");
const blogRouter=require("./routes/blog");
const Blog=require("./models/blog");
require('./routes/passport-setup');
const {generateToken}=require("./services/authentication");
const methodOverride = require('method-override');
const mail=require("./routes/mails");
const sendMail=require("./controllers/sendMail");
const MongoStore = require('connect-mongo'); // Import MongoStore







mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
})

const PORT=5000;
const app=express();
 

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



// app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/profileImages', express.static(path.join(__dirname, 'public/profileImages')));


app.use(cookieparser());

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));


app.use(session({
    secret: process.env.secret_key, // Secret key from .env
    resave: false,
    saveUninitialized: false, // Prevents session creation for unauthenticated users
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, // Use your MongoDB URL here
        collectionName: 'sessions', // Optional: Name of the session collection
        ttl: 14 * 24 * 60 * 60, // Session TTL (14 days)
    }),
    cookie: { secure: process.env.NODE_ENV === 'production' } // Set secure cookies only in production
}));

// Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

app.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    try {
        const isNewUser = !req.user.createdAt || (Date.now() - new Date(req.user.createdAt).getTime()) < 10000; // Assuming recent creation
        
        
        if (isNewUser) {
            req.session.email=req.user.email;
            await sendMail(req, res); // Send mail if it's a new user
            req.session.toast = { status: 'success', message: 'Welcome! Your password has been sent via email.' };
        } else {
            req.session.toast = { status: 'success', message: 'Welcome back!' };
        }

        const token = generateToken(req.user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.error('Error in callback:', error);
        res.redirect('/signup');
    }
});




app.get("/",cookieValidation,async(req,res)=>{
    const allBlogs=await Blog.find({});

   

    const toast = req.session.toast || null;
    req.session.toast = null;
    
    return res.render("home",{
        user:req.user,
        blogs:allBlogs,
        toast,
        
    });
})
app.post("/category",cookieValidation,async(req,res)=>{
    const {category}=req.body;

    const allBlogs=await Blog.find({ category: category.toLowerCase()}).populate("createdBy");
    console.log(allBlogs);
    return res.render("home",{
      user:req.user,
      blogs:allBlogs,
      toast:{},
  });
  })

 app.get("/terms", (req, res, next) => {
    cookieValidation(req, res, () => {
        res.render("terms", { user: req.user });
    });
});

app.get("/privacy", (req, res, next) => {
    cookieValidation(req, res, () => {
        res.render("privacy", { user: req.user });
    });
});

app.use("/mail",cookieValidation,mail);

app.use("/blog",blogRouter);
app.use("/user",router);

app.listen(PORT,()=>console.log("server started"));
