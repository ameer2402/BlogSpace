const {Router}=require("express");
const {cookieValidation}=require("../middlewares/authentication");
const multer=require("multer");
const path=require("path");
const Blog=require("../models/blog");
const Comment=require("../models/comment");
const User=require("../models/user");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

 
const route=Router();

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
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(`./public`));
//     },
//     filename: function (req, file, cb) {
//       const filename=`${Date.now()}-${file.originalname}`;
//       cb(null, filename);
//     }
//   })


  // const fileFilter = (req, file, cb) => {
  //   const allowedTypes = ['image/jpeg', 'image/jpg','image/png'];
  //   if (allowedTypes.includes(file.mimetype)) {
  //     cb(null, true);  // Accept the file
  //   } else {
  //     req.session.toast = { 
  //       status: 'error', 
  //       method: 'Invalid file type. Only JPG and JPEG are allowed.' 
  //     };
  //     cb(null, false);  // Reject the file
  //   }
  // };
  
  const upload = multer({ storage });
  

route.get("/addBlog",cookieValidation,(req,res)=>{
  
    return res.render("addBlog",{
        user:req.user,
    });
})

route.get("/:id",cookieValidation,async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    console.log(blog);
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog",{
      user:req.user,
      blog,
      comments,
    });
})

route.get("/user/:id",async(req,res)=>{
  try{
  const Bloguser=await User.findById(req.params.id);
  const Blogs=await Blog.find({createdBy:req.params.id});
   res.render("user",{
      Bloguser,
      Blogs,
   })
  }
  catch(error){
    res.status(500).send("Server error");
  }
})




route.post("/addBlog", cookieValidation, upload.single("coverImage"), async (req, res) => {
  const { title, body, category } = req.body;
  console.log("Form Data:", req.body); // Log form data
  console.log("File Data:", req.file); // Log file data

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
          category: category.toLowerCase(), // Normalize category
          coverImage: req.file.path, // Cloudinary provides the URL
      });

      req.session.toast = { status: "success", message: "Blog created successfully!" };
      return res.redirect("/");
  } catch (error) {
      console.error("Error creating blog:", error);
      req.session.toast = { status: "error", message: "Failed to create blog. Please try again." };
      return res.redirect("/blog/addBlog");
  }
});


route.delete('/delete/:id',cookieValidation,async(req,res)=>{
  try {
    await Blog.findByIdAndDelete(req.params.id);
    req.session.toast={status:"success",method:"Blog Deleted Successfully"};
    res.redirect('/user/setting');
  } catch (err) {
    console.error(err);
    req.session.toast={status:"error",method:"OOPS! Please try again"};
    res.status(500).send('Server Error');
  }
})

route.post("/comment/:blogId",cookieValidation,async(req,res)=>{
   const comment=await Comment.create({
      content:req.body.content,
      blogId:req.params.blogId,
      createdBy:req.user._id,
   })
   console.log(comment);
   return res.redirect(`/blog/${req.params.blogId}` );
})

module.exports=route;
