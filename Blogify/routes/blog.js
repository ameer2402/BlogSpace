const { Router } = require("express");
const mongoose = require("mongoose");
const { cookieValidation, requireAuth } = require("../middlewares/authentication");
const { blogSchema, commentSchema, validateRequest } = require("../middlewares/validation");
const sanitizeHtml = require("sanitize-html");
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

        // Calculate reading time manually since lean() drops virtuals
        const wordsPerMinute = 200;
        const cleanBody = blog.body ? blog.body.replace(/<[^>]*>/g, '') : '';
        const words = cleanBody.split(/\s+/).filter(w => w.length > 0).length;
        blog.readingTime = Math.ceil(words / wordsPerMinute);

        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy").lean();
        
        // Helper function to build threaded comment tree
        const buildCommentTree = (list, parentId = null) => {
            return list
                .filter(c => String(c.parentId || '') === String(parentId || ''))
                .map(c => ({
                    ...c,
                    replies: buildCommentTree(list, c._id)
                }));
        };

        const commentTree = buildCommentTree(comments);
        const toast = req.session.toast || null;
        req.session.toast = null;
        
        return res.render("blog", {
          user: req.user,
          blog,
          comments: commentTree,
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

route.post("/addBlog", cookieValidation, requireAuth, upload.single("coverImage"), validateRequest(blogSchema), async (req, res) => {
  const { title, body, category } = req.body;

  if (!req.file) {
      req.session.toast = {
          status: "error",
          message: "A valid cover image must be uploaded.",
      };
      return res.redirect("/blog/addBlog");
  }

  try {
      // Strict sanitization: Strip script/style threats but allow rich-text tags
      const cleanTitle = sanitizeHtml(title, { allowedTags: [], allowedAttributes: {} });
      const cleanBody = sanitizeHtml(body, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'pre', 'code', 'span', 'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li']),
          allowedAttributes: {
              ...sanitizeHtml.defaults.allowedAttributes,
              '*': ['style', 'class'],
              'img': ['src', 'alt', 'width', 'height']
          }
      });

      await Blog.create({
          title: cleanTitle,
          body: cleanBody,
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
    
    req.session.toast = { status: "success", message: "Blog deleted successfully." }; 
    res.redirect('/user/setting');
  } catch (err) {
    console.error("Error deleting blog:", err);
    req.session.toast = { status: "error", message: "OOPS! Please try again" };
    res.redirect('/user/setting');
  }
});

route.post("/comment/:blogId", cookieValidation, requireAuth, validateRequest(commentSchema), async (req, res) => {
   if (!mongoose.Types.ObjectId.isValid(req.params.blogId)) {
       req.session.toast = { status: "error", message: "Invalid Blog ID." };
       return res.redirect("/");
   }

   try {
       // Sanitize the comment content for basic security
       const cleanContent = sanitizeHtml(req.body.content, { allowedTags: [], allowedAttributes: {} });

       await Comment.create({
          content: cleanContent,
          blogId: req.params.blogId,
          createdBy: req.user._id,
          parentId: req.body.parentId || null,
       });
       
       return res.redirect(`/blog/${req.params.blogId}`);
   } catch (error) {
       console.error("Error posting comment:", error);
       req.session.toast = { status: "error", message: "Failed to post comment." };
       return res.redirect(`/blog/${req.params.blogId}`);
   }
});

// JSON API: Autocomplete Search Suggestions
route.get("/api/search-autocomplete", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query || query.trim() === "") {
            return res.json([]);
        }
        // Match matching titles or categories
        const suggestions = await Blog.find({
            $or: [
                { title: { $regex: new RegExp(query, 'i') } },
                { category: { $regex: new RegExp(query, 'i') } }
            ]
        })
        .limit(5)
        .select("title _id category")
        .lean();
        
        return res.json(suggestions);
    } catch (error) {
        console.error("Autocomplete search error:", error);
        return res.status(500).json([]);
    }
});

// Likes Toggle Route
route.post("/like/:id", cookieValidation, requireAuth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid Blog ID." });
    }
    
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found." });
        }
        
        if (!blog.likes) {
            blog.likes = [];
        }
        
        const userId = req.user._id;
        const index = blog.likes.indexOf(userId);
        let liked = false;
        
        if (index === -1) {
            blog.likes.push(userId);
            liked = true;
        } else {
            blog.likes.splice(index, 1);
        }
        
        await blog.save();
        return res.json({ liked, likesCount: blog.likes.length });
    } catch (error) {
        console.error("Like toggle error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = route;
