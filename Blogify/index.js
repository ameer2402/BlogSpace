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
const MongoStore = require('connect-mongo');

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
});

const PORT=process.env.PORT || 5001;
const app=express();
 
app.set("view engine","ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/profileImages', express.static(path.join(__dirname, 'public/profileImages')));

app.use(cookieparser());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.secret_key, // Secret key from .env
    resave: false,
    saveUninitialized: true, // Prevents session creation for unauthenticated users
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, // Use your MongoDB URL here
        collectionName: 'sessions', // Optional: Name of the session collection
        ttl: 14 * 24 * 60 * 60, // Session TTL (14 days)
    }),
}));

// Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

app.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    try {
        const isNewUser = !req.user.createdAt || (Date.now() - new Date(req.user.createdAt).getTime()) < 10000; // Assuming recent creation
        
        const token = generateToken(req.user);
        res.cookie("token", token, { httpOnly: true });
        
        if (isNewUser) {
            req.session.email = req.user.email;
            req.session.toast = { status: 'success', message: 'Welcome! Please set a custom password for your account.' };
            return res.redirect('/user/change-password');
        } else {
            req.session.toast = { status: 'success', message: 'Welcome back!' };
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Error in callback:', error);
        res.redirect('/user/signup');
    }
});

app.get("/", cookieValidation, async(req, res) => {
    try {
        const allBlogs = await Blog.find({}).sort({ createdAt: -1 }).populate("createdBy").lean();

        // Calculate reading time manually since lean() drops virtuals
        allBlogs.forEach(blog => {
            const wordsPerMinute = 200;
            const cleanBody = blog.body ? blog.body.replace(/<[^>]*>/g, '') : '';
            const words = cleanBody.split(/\s+/).filter(w => w.length > 0).length;
            blog.readingTime = Math.ceil(words / wordsPerMinute);
        });

        const toast = req.session.toast || null;
        req.session.toast = null;
        
        return res.render("home", {
            user: req.user,
            blogs: allBlogs,
            searchQuery: null,
            toast,
        });
    } catch (error) {
        console.error("Error loading home page:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/search", cookieValidation, async(req, res) => {
    try {
        const { query } = req.body;
        
        if (!query || query.trim() === "") {
            return res.redirect("/");
        }

        // Search utilizing the MongoDB Text Search index on title, body, and category
        const allBlogs = await Blog.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }).populate("createdBy").lean();
        
        // Calculate reading time manually since lean() drops virtuals
        allBlogs.forEach(blog => {
            const wordsPerMinute = 200;
            const cleanBody = blog.body ? blog.body.replace(/<[^>]*>/g, '') : '';
            const words = cleanBody.split(/\s+/).filter(w => w.length > 0).length;
            blog.readingTime = Math.ceil(words / wordsPerMinute);
        });
        
        return res.render("home", {
          user: req.user,
          blogs: allBlogs,
          searchQuery: query,
          toast: {},
        });
    } catch (error) {
        console.error("Error loading search page:", error);
        res.status(500).send("Internal Server Error");
    }
});

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

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}

module.exports = app;
