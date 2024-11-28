# **BlogSpace Application**

## **Introduction**

**BlogSpace** is a responsive full-stack blogging platform built using the  Express.js, EJS for templating, Node.js, **JWT**-based authentication, and **MongoDB** for CRUD operations. The application provides users with the ability to create, view, update, and delete blogs. It also includes features such as email notifications, Google OAuth, and session-based toast notifications.

---

## **Features**

### **Authentication & Authorization**
- **JWT-Based Authentication**: Secure login for users and token management.
- **Google OAuth**: Login and registration via Google for convenience.
- **Session Management**: Handles user sessions with cookies, including toast notifications.
- **Sign Up & Login**:
  - Users can sign up manually or via Google OAuth.
  - Upon first login, users receive a default password to their email.
- **Forgot Password**: OTP-based email verification for password reset.

### **Blog Management**
- **CRUD Operations**: Users can create, read, update, and delete their own blogs.
- **Quill Editor**: Rich-text editor for blog creation.
- **User Access**:
  - Unauthenticated users can only view blogs.
  - Authenticated users can create, manage, and delete blogs.
 
### **Search Blogs**
- **Search by Category**: Users can search for blogs based on specific categories (e.g., technology, lifestyle, etc.) for better content discovery.
  
### **User Interaction**
- **Commenting on Blogs**: Logged-in users can comment on blogs they like. This feature allows for increased user interaction on the platform.

### **User Profile & Settings**
- **Profile Management**: Users can update their profile information,including password and profile picture.
- **Blog Statistics**: View the number of blogs created and manage them via the settings page.
- **Cloud Storage**: Profile pictures and blog images are stored on **Cloudinary**.

### **Feedback System**
- **Email Notifications**: Using **Nodemailer**, users can send feedback and OTPs for password reset.
- **Toast Notifications**: Session-based toast notifications for actions like login, signup, and feedback submission.

### **Responsive Design**
- The application is fully responsive, built with **Bootstrap** for a seamless user experience across devices.

---

## **Technologies Used**

### **Frontend**
- **EJS**: Dynamic templating engine for rendering views.
- **Bootstrap**: For responsive UI design and layout.

### **Backend**
- **Node.js**: Backend runtime environment.
- **Express.js**: Backend framework for routing and middleware.
- **Multer**: Middleware for handling file uploads.

### **Database**
- **MongoDB**: NoSQL database used for storing user information and blogs.

### **Authentication**
- **JWT**: Secure JSON Web Token-based authentication.
- **Google OAuth**: For easy Google-based authentication.

### **File Management**
- **Cloudinary**: For storing and managing images (blog images and profile pictures).
- **Nodemailer**: For email-based notifications, OTPs, and feedback.

---

## **How It Works**

### **For Unauthenticated Users**
- **View Blogs**: Users can view blogs and the Comments created by others but cannot create or delete blogs.
- **Sign Up & Login**:
  - Sign up manually or via Google OAuth.
  - Forgot password functionality available with email verification with OTP.
  - If user already a member he Can directly login through Signin Page

### **For Authenticated Users**
- **Create Blogs**: Users can create blogs using the rich-text editor (Quill).
- **Manage Profile**: Users can update their profile, including password and profile picture.
- **Settings Page**: View and manage personal information, including blogs created.
- **Delete Blogs**: Users can delete their own blogs.

---

## **Installation**

### **Prerequisites**
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### **Steps to Set Up Locally**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd BlogSpace
   cd Blogify
   
2. Install the Packages:
   ```bash
   npm install

3. Create a .env file in the root directory with the following content:
   ```bash
   client_id=YOUR_GOOGLE_CLIENT_ID
   client_secret=YOUR_GOOGLE_CLIENT_SECRET
   cloud_key=YOUR_CLOUDINARY_API_KEY
   cloud_name=YOUR_CLOUDINARY_CLOUD_NAME
   cloud_secret=YOUR_CLOUDINARY_API_SECRET  
   default_password=YOUR_DEFAULTPASSWORD
   email=your_email@example.com
   password=your_email_app_password  // CREATE AN APP PASSWORD FOR GMAIL APPLICATION
   MONGO_URL=your_mongo_db_url
   secret_key=your_session_secret_key
   

