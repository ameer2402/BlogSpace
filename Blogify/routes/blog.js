const { Router } = require("express");
const mongoose = require("mongoose");
const { cookieValidation, requireAuth } = require("../middlewares/authentication");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const route = Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_key,
  api_secret: process.env.cloud_secret,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogify", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Accepted file formats
  },
});

const upload = multer({ storage });

route.get("/addBlog", cookieValidation, requireAuth, (req, res) => {
    const toast = req.session.toast || null;
    req.session.toast = null;
    return res.render("addBlog", {
        user: req.user,
        toast,
    });
});

route.get("/:id", cookieValidation, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        req.session.toast = { status: "error", message: "Invalid Blog ID." };
        return res.redirect("/");
    }

    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy").lean();
        if (!blog) {
            req.session.toast = { status: "error", message: "Blog not found." };
            return res.redirect("/");
        }

        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy").lean();
        const toast = req.session.toast || null;
        req.session.toast = null;
        
        return res.render("blog", {
          user: req.user,
          blog,
          comments,
          toast,
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        req.session.toast = { status: "error", message: "An error occurred while loading the blog." };
        return res.redirect("/");
    }
});

route.get("/user/:id", cookieValidation, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      req.session.toast = { status: "error", message: "Invalid User ID." };
      return res.redirect("/");
  }

  try {
      const Bloguser = await User.findById(req.params.id).lean();
      if (!Bloguser) {
          req.session.toast = { status: "error", message: "User not found." };
          return res.redirect("/");
      }

      const Blogs = await Blog.find({ createdBy: req.params.id }).lean();
      const toast = req.session.toast || null;
      req.session.toast = null;

      res.render("user", {
          Bloguser,
          Blogs,
          user: req.user,
          toast,
      });
  } catch(error) {
      console.error("Error fetching user profile:", error);
      req.session.toast = { status: "error", message: "Error loading user profile." };
      res.redirect("/");
  }
});

route.post("/addBlog", cookieValidation, requireAuth, upload.single("coverImage"), async (req, res) => {
  const { title, body, category } = req.body;

  if (!title || !body || !category || !req.file) {
      req.session.toast = {
          status: "error",
          message: "All fields are required, and a valid image must be uploaded.",
      };
      return res.redirect("/blog/addBlog");
  }

  try {
      await Blog.create({
          title,
          body,
          createdBy: req.user._id,
          category: category.toLowerCase(), 
          coverImage: req.file.path, 
      });

      req.session.toast = { status: "success", message: "Blog created successfully!" };
      return res.redirect("/");
  } catch (error) {
      console.error("Error creating blog:", error);
      req.session.toast = { status: "error", message: "Failed to create blog. Please try again." };
      return res.redirect("/blog/addBlog");
  }
});


route.delete('/delete/:id', cookieValidation, requireAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      req.session.toast = { status: "error", message: "Invalid Blog ID." };
      return res.redirect("/user/setting");
  }

  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!blog) {
        req.session.toast = { status: "error", message: "Blog not found or unauthorized to delete." };
        return res.redirect('/user/setting');
    }
    
    req.session.toast = { status: "success", message: "Blog deleted successfully." }; // Fixed 'method' to 'message'
    res.redirect('/user/setting');
  } catch (err) {
    console.error("Error deleting blog:", err);
    req.session.toast = { status: "error", message: "OOPS! Please try again" };
    res.redirect('/user/setting');
  }
});

route.post("/comment/:blogId", cookieValidation, requireAuth, async (req, res) => {
   if (!mongoose.Types.ObjectId.isValid(req.params.blogId)) {
       req.session.toast = { status: "error", message: "Invalid Blog ID." };
       return res.redirect("/");
   }

   try {
       await Comment.create({
          content: req.body.content,
          blogId: req.params.blogId,
          createdBy: req.user._id,
       });
       
       return res.redirect(`/blog/${req.params.blogId}`);
   } catch (error) {
       console.error("Error posting comment:", error);
       req.session.toast = { status: "error", message: "Failed to post comment." };
       return res.redirect(`/blog/${req.params.blogId}`);
   }
});

module.exports = route;
