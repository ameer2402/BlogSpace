const { z } = require("zod");

// Define Zod schemas
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title cannot exceed 100 characters"),
  category: z.string().min(2, "Category must be at least 2 characters long"),
  body: z.string().min(10, "Content must be at least 10 characters long"),
});

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  parentId: z.string().optional().nullable(),
});

// Middleware factory for validation
const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    // Collect all error messages
    const errorMsg = result.error.errors.map(err => err.message).join(". ");
    req.session.toast = { status: "error", message: errorMsg };
    
    // Redirect back to the form page or index if referer not present
    return res.redirect("back");
  }
  next();
};

module.exports = {
  signupSchema,
  signinSchema,
  blogSchema,
  commentSchema,
  validateRequest,
};
