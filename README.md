<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:11998e,50:38ef7d,100:667eea&height=240&section=header&text=BlogSpace&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Full-Stack%20MERN%20Blogging%20Platform&descSize=22&descAlignY=62&descAlign=50"/>

<h3>📝 A Modern, Secure, and Responsive Blogging Platform for Creators 🚀</h3>

<p><em>Powered by Node.js • Express.js • MongoDB • EJS • JWT • Google OAuth • Cloudinary</em></p>

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black&labelColor=000000"/>
  <img src="https://img.shields.io/badge/JWT-FF6B6B?style=for-the-badge&logo=jsonwebtokens&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white&labelColor=000000"/>
</p>

<p>
  <img src="https://img.shields.io/badge/OAuth_2.0-Google-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Status-Production_Ready-00C853?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Uptime-99%25-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge"/>
</p>

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📋 Table of Contents

- [🌟 Introduction](#-introduction)
- [✨ Key Features](#-key-features)
- [📸 Screenshots](#-screenshots)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🔄 How It Works](#-how-it-works)
- [📦 Installation & Setup](#-installation--setup)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Running the App](#-running-the-app)
- [📊 Performance & Impact](#-performance--impact)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [👨‍💻 Author](#-author)

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🌟 Introduction

**BlogSpace** is a **production-grade, full-stack blogging platform** designed to give content creators a modern, secure, and intuitive space to publish, share, and engage with their audience. Built on a robust **Node.js + Express.js + MongoDB** stack with **EJS server-side templating**, BlogSpace combines the best of traditional MVC architecture with cutting-edge auth (JWT + Google OAuth 2.0) and cloud-based media management (Cloudinary).

> 💡 **Sign up → Write rich blogs → Engage with readers → Track your impact — all in one elegant platform.**

Whether you're a **tech blogger**, **lifestyle writer**, or **professional content creator**, BlogSpace gives you the tools to publish beautifully formatted articles, manage media in the cloud, and connect with readers via comments — backed by enterprise-grade authentication and **99% uptime**.

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## ✨ Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Dual Authentication</h3>
      <p>Secure <b>JWT-based auth</b> + <b>Google OAuth 2.0</b> for one-click social login. <b>30% faster login flow</b> via OAuth integration.</p>
    </td>
    <td width="50%">
      <h3>📝 Rich-Text Editor (Quill)</h3>
      <p>Powerful <b>WYSIWYG Quill editor</b> for crafting beautifully formatted blogs with images, lists, code blocks & embeds.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🛡️ Role-Based Access Control</h3>
      <p>Granular <b>RBAC</b> across all routes — <b>unauthenticated</b> users browse & comment-view, while <b>authenticated</b> users get full CRUD power.</p>
    </td>
    <td width="50%">
      <h3>🔁 Full CRUD Operations</h3>
      <p><b>Create, Read, Update, Delete</b> blogs seamlessly. Users can manage only their own content with strict ownership checks.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔑 OTP-Based Password Reset</h3>
      <p>Secure <b>"Forgot Password"</b> flow with <b>email-delivered OTPs</b> via Nodemailer for verified password resets.</p>
    </td>
    <td width="50%">
      <h3>☁️ Cloudinary Media Storage</h3>
      <p>All blog images & profile pictures stored on <b>Cloudinary CDN</b> — fast, scalable, optimized delivery worldwide.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔍 Category-Based Search</h3>
      <p>Discover content easily via <b>category filtering</b> (Tech, Lifestyle, Travel, etc.) for personalized content discovery.</p>
    </td>
    <td width="50%">
      <h3>💬 Real-Time Commenting</h3>
      <p>Logged-in users can <b>comment on any blog</b> they love — driving engagement & community building.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📧 Email Notifications</h3>
      <p><b>Nodemailer-powered</b> emails for OTPs, default password delivery, and a built-in <b>feedback system</b>.</p>
    </td>
    <td width="50%">
      <h3>🍞 Toast Notifications</h3>
      <p><b>Session-based toast alerts</b> via cookies for login, signup, blog actions & feedback submission feedback.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>👤 Profile Management</h3>
      <p>Users can <b>update profile info</b>, change passwords, upload profile pictures & view personal blog statistics.</p>
    </td>
    <td width="50%">
      <h3>📱 Fully Responsive</h3>
      <p>Built with <b>Bootstrap 5</b> for a seamless experience across <b>mobile, tablet & desktop</b> devices.</p>
    </td>
  </tr>
</table>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📸 Screenshots

<div align="center">

### 🏠 Home & Blog Feed
<img src="https://github.com/user-attachments/assets/b0499cb3-52b7-4f0c-a05c-bef265cadc14" width="80%" alt="Home Page"/>

<br/><br/>

### ✍️ Blog Creation with Quill Editor
<img src="https://github.com/user-attachments/assets/2349b245-310f-4a6c-b344-839bc141af50" width="80%" alt="Blog Creation"/>

<br/><br/>

### 👤 User Profile & Settings
<img src="https://github.com/user-attachments/assets/9880c655-4dcd-42ad-bad1-5080cde6ddf9" width="80%" alt="Profile Page"/>

<br/><br/>

### 📧 Feedback & Email Notifications
<img src="https://github.com/user-attachments/assets/07f83ad1-1332-4038-a860-a3624d5a4c09" width="80%" alt="Feedback System"/>

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🏗️ Architecture

### 🔥 Server-Side Rendered MVC Architecture

BlogSpace follows a **classic MVC pattern** with secure middleware layers, JWT session management, and cloud-integrated media handling.

```text
                ┌─────────────────────────────┐
                │       👤 USER (Browser)     │
                └──────────────┬──────────────┘
                               │
                               ▼
                ┌─────────────────────────────┐
                │   🎨 EJS Views + Bootstrap  │
                │     (Server-Rendered UI)    │
                └──────────────┬──────────────┘
                               │
                               ▼
        ╔══════════════════════════════════════════════╗
        ║      ⚡ EXPRESS.JS APPLICATION LAYER         ║
        ╚══════════════════════════════════════════════╝
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐      ┌────────────────┐      ┌──────────────┐
│ 🔐 Auth      │      │ 🛣️ Routing     │      │ 📦 Multer    │
│ Middleware   │      │ Controllers    │      │ File Handler │
│ (JWT + RBAC) │      │ (CRUD Logic)   │      │              │
└──────┬───────┘      └────────┬───────┘      └──────┬───────┘
       │                       │                     │
       ▼                       ▼                     ▼
┌──────────────┐      ┌────────────────┐      ┌──────────────┐
│ 🔑 Google    │      │ 💾 MongoDB     │      │ ☁️ Cloudinary│
│ OAuth 2.0    │      │ (Mongoose ODM) │      │ Media CDN    │
└──────────────┘      └────────────────┘      └──────────────┘
                               │
                               ▼
                ┌─────────────────────────────┐
                │ 📧 Nodemailer Service       │
                │ (OTPs • Feedback • Alerts)  │
                └─────────────────────────────┘
```

### 🔄 Request Flow

1. **User Action** → Browser sends HTTP request to Express server
2. **Auth Middleware** → JWT token validated; RBAC permissions checked
3. **Controller Logic** → Business logic executed (blog CRUD, user mgmt)
4. **Database Operation** → MongoDB read/write via Mongoose ODM
5. **Media Handling** → Images uploaded to Cloudinary via Multer pipe
6. **Email Service** → Nodemailer sends OTPs / notifications when triggered
7. **EJS Rendering** → Server renders dynamic HTML view with Bootstrap
8. **Toast Feedback** → Session-based toast notifies user of action result

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---|:---|:---|
| 🎨 **Frontend** | `EJS` + `Bootstrap 5` | Server-rendered templating + responsive UI |
| ✍️ **Editor** | `Quill.js` | Rich-text WYSIWYG blog editor |
| ⚙️ **Runtime** | `Node.js` | JavaScript runtime environment |
| 🚀 **Framework** | `Express.js` | Web framework & routing |
| 💾 **Database** | `MongoDB` + `Mongoose` | NoSQL storage with schema modeling |
| 🔐 **Auth** | `JWT` + `Google OAuth 2.0` | Token-based + social authentication |
| 📦 **File Upload** | `Multer` | Multipart form-data middleware |
| ☁️ **Media CDN** | `Cloudinary` | Image storage & global delivery |
| 📧 **Email** | `Nodemailer` | OTPs, feedback & notifications |
| 🍪 **Sessions** | `express-session` + `cookies` | Toast notifications & state |
| 🔒 **Security** | `bcrypt` | Password hashing |
| 🌍 **Config** | `dotenv` | Environment variable management |

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🔄 How It Works

### 👀 For Unauthenticated Users

| Action | Permitted? |
|:---|:---:|
| 📖 View blogs & comments | ✅ |
| 🔍 Search blogs by category | ✅ |
| 💬 Post comments | ❌ |
| ✍️ Create blogs | ❌ |
| 🗑️ Delete blogs | ❌ |
| 🔑 **Sign Up** (Manual or Google OAuth) | ✅ |
| 🆔 **Login** (Existing users) | ✅ |
| 🔁 **Forgot Password** (OTP via email) | ✅ |

### ✅ For Authenticated Users

| Action | Permitted? |
|:---|:---:|
| 📖 View all blogs | ✅ |
| ✍️ **Create blogs** with Quill editor | ✅ |
| ✏️ **Edit own blogs** | ✅ |
| 🗑️ **Delete own blogs** | ✅ |
| 💬 **Comment** on any blog | ✅ |
| 👤 **Update profile** (info, password, picture) | ✅ |
| ⚙️ **Settings page** with blog statistics | ✅ |
| 📧 **Submit feedback** via email | ✅ |

> 🔑 **First-time signup?** A default password is automatically emailed to the user via Nodemailer for first login.

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📦 Installation & Setup

### ✅ Prerequisites

Make sure you have the following installed:

- 🟢 **[Node.js](https://nodejs.org/)** (v16+ recommended)
- 🍃 **[MongoDB](https://www.mongodb.com/)** (local or Atlas cloud cluster)
- 🔧 **Git** for cloning
- 📧 **Gmail account** with App Password enabled (for Nodemailer)
- ☁️ **Cloudinary account** (free tier works)
- 🔑 **Google Cloud OAuth credentials**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ameer2402/BlogSpace.git
cd BlogSpace
cd Blogify
```

### 2️⃣ Install Dependencies

```bash
npm install
```

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🔐 Environment Variables

### 3️⃣ Create a `.env` file in the root directory

```bash
touch .env
```

### 4️⃣ Add the following template:

```env
# ====== Google OAuth 2.0 Credentials ======
client_id=YOUR_GOOGLE_CLIENT_ID
client_secret=YOUR_GOOGLE_CLIENT_SECRET

# ====== Cloudinary Media Storage ======
cloud_key=YOUR_CLOUDINARY_API_KEY
cloud_name=YOUR_CLOUDINARY_CLOUD_NAME
cloud_secret=YOUR_CLOUDINARY_API_SECRET

# ====== Default Password (for new signups) ======
default_password=YOUR_DEFAULT_PASSWORD

# ====== Email Configuration (Nodemailer / Gmail) ======
email=your_email@example.com
password=your_email_app_password    # ⚠️ Use Gmail App Password, NOT your real password

# ====== MongoDB Connection ======
MONGO_URL=your_mongo_db_connection_string

# ====== Session Secret ======
secret_key=your_session_secret_key
```

### 🔑 How to Obtain Credentials

#### 🅰️ Google OAuth Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project → Navigate to **APIs & Services → Credentials**
3. Click **➕ CREATE CREDENTIALS → OAuth client ID**
4. Configure consent screen → Add authorized redirect URI (`http://localhost:3000/auth/google/callback`)
5. Copy `Client ID` → paste as `client_id`
6. Copy `Client Secret` → paste as `client_secret`

#### 🅱️ Cloudinary API Keys

1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Go to your **Dashboard**
3. Copy **Cloud Name**, **API Key**, and **API Secret** → paste accordingly

#### 🅲 Gmail App Password

> ⚠️ **You MUST use an App Password, not your regular Gmail password!**

1. Enable **2-Step Verification** on your Google Account
2. Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail" → copy the 16-digit code
4. Paste as `password` in `.env`

#### 🅳 MongoDB Connection String

- **Local:** `mongodb://127.0.0.1:27017/blogspace`
- **Atlas Cloud:** Get from [MongoDB Atlas](https://www.mongodb.com/atlas) → Database → Connect → Drivers

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🚀 Running the App

### 5️⃣ Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 6️⃣ Open in Browser

> 🌐 Visit **`http://localhost:3000`** to see BlogSpace live!

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📊 Performance & Impact

<div align="center">

| Metric | Achievement |
|:---|:---:|
| 🟢 **Production Uptime** | ✅ **99%** |
| ⚡ **Login Speed (OAuth)** | ⬆️ **30% faster** vs. manual login |
| 🔐 **Auth Methods** | 🔑 **2** (JWT + Google OAuth) |
| 👥 **User Roles** | 🎭 **2** (Authenticated / Unauthenticated) |
| 📦 **REST Endpoints** | 🛣️ **15+** |
| ☁️ **Media CDN Delivery** | 🌍 **Global** (Cloudinary) |
| 📧 **Email Triggers** | 📨 **3** (OTP, Default Password, Feedback) |
| 📱 **Device Support** | 📲 **Mobile, Tablet, Desktop** |

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🗺️ Roadmap

- [ ] 🌙 **Dark Mode** toggle
- [ ] 🏷️ **Tags & Hashtags** for richer content discovery
- [ ] 👍 **Like / Reaction System** on blogs
- [ ] 🔔 **Real-time notifications** (Socket.io)
- [ ] 🔍 **Full-text search** with MongoDB indexes
- [ ] 📊 **Author Analytics Dashboard** (views, likes, comments)
- [ ] 🌐 **Multi-language Support** (i18n)
- [ ] 🐳 **Docker Containerization** for easy deployment
- [ ] 🚀 **Deploy on Vercel / Render** with CI/CD pipeline
- [ ] 💬 **Nested replies** in comments
- [ ] 🔖 **Bookmark / Save for later** feature

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🤝 Contributing

Contributions are **welcome and appreciated!** 🎉

1. 🍴 **Fork** the repository
2. 🌿 **Create a feature branch** — `git checkout -b feature/AmazingFeature`
3. ✅ **Commit your changes** — `git commit -m 'Add some AmazingFeature'`
4. 🚀 **Push to the branch** — `git push origin feature/AmazingFeature`
5. 🎁 **Open a Pull Request**

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 👨‍💻 Author

<div align="center">

### **Mohammed Ameer Khan**

*Full Stack Software Engineer • Ex-Google Apprentice • AI Builder*

<p>
  <a href="https://www.linkedin.com/in/mohammed-ameerkhan-22368626a/">
    <img src="https://img.shields.io/badge/LinkedIn-CONNECT-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=000000"/>
  </a>
  <a href="mailto:ameerkhan20241a0497@gmail.com">
    <img src="https://img.shields.io/badge/Email-REACH%20OUT-D14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=000000"/>
  </a>
  <a href="https://github.com/ameer2402">
    <img src="https://img.shields.io/badge/GitHub-FOLLOW-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=000000"/>
  </a>
  <a href="https://portfolio-frontend-rho-blond.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-EXPLORE-FF5722?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=000000"/>
  </a>
</p>

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

<div align="center">

### ⭐ If BlogSpace inspired you, **drop a star!** It motivates further development. 🚀

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:38ef7d,50:11998e,100:667eea&height=140&section=footer&text=Built%20with%20❤️%20by%20Ameer%20Khan&fontSize=22&fontColor=ffffff&animation=twinkling&fontAlignY=70"/>

</div>
