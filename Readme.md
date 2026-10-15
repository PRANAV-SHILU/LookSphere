<div align="right">Last Modified: 22-Oct-2026</div>


<div align="center">

# LookSphere 🌐

*A modern, privacy-first, full-stack social media platform.*

![React](https://img.shields.io/badge/React-v19.2.0-2b2b2b?style=flat&logo=react&logoColor=white&labelColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?logo=mongoose&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.1-2b2b2b?style=flat&logo=tailwindcss&logoColor=white&labelColor=06B6D4)
![Vite](https://img.shields.io/badge/Vite-v7.2.4-2b2b2b?style=flat&logo=vite&logoColor=white&labelColor=BD34FE)
![React Router](https://img.shields.io/badge/React_Router-v7.11.0-2b2b2b?style=flat&logo=reactrouter&logoColor=white&labelColor=CA4245)
![Axios](https://img.shields.io/badge/Axios-v1.17.0-2b2b2b?style=flat&logo=axios&logoColor=white&labelColor=5A29E4)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-v7.69.0-2b2b2b?style=flat&logo=reacthookform&logoColor=white&labelColor=EC5990)
![Yup](https://img.shields.io/badge/Yup-v1.7.1-2b2b2b?style=flat&labelColor=32B768)
![Lucide React](https://img.shields.io/badge/Lucide_React-v1.17.0-2b2b2b?style=flat&logo=lucide&logoColor=white&labelColor=F56565)
![React Spinners](https://img.shields.io/badge/React_Spinners-v0.17.0-2b2b2b?style=flat&labelColor=36D7B7)
![React Toastify](https://img.shields.io/badge/React_Toastify-v11.0.5-2b2b2b?style=flat&labelColor=FF9900)
![JWT](https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-Uploads-orange)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-red)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-14B32E)
![Express Validator](https://img.shields.io/badge/Express_Validator-Validation-41315F)
![Dotenv](https://img.shields.io/badge/Dotenv-Config-ECD53F?logo=dotenv&logoColor=black)
![CORS](https://img.shields.io/badge/CORS-Protection-purple)
![Compression](https://img.shields.io/badge/Compression-GZIP%20%2F%20Brotli-00F2FE?logo=googlecloud&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-Dev_Tool-76D04B?logo=nodemon&logoColor=white)

</div>

**🌐 Live Demo:** [LookSphere](http://localhost:5173/)  
**🐱 GitHub Profile:** [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

## 📖 Overview

**LookSphere** is a modern, privacy-first social media platform built using the MERN stack (MongoDB, Express, React, Node.js). Originally starting as a pure React/JSON-server authentication practice app ("SecureAuth"), it has evolved into a robust, secure, and full-featured social networking platform.

It features a dark-theme-first aesthetic, stateless JWT authentication via Authorization headers, rich media sharing through Cloudinary, atomic post interactions (Sparks, Reshares, Archives), and a responsive, dynamic UI built with React 19 and Tailwind CSS.

---

## 🗺️ The Journey

LookSphere originally started as **SecureAuth**, a modern authentication app built with pure React.js and a JSON-server API deployed on Render. I built SecureAuth to practice when I first learned React. As I learned new technologies like Node.js, Express, MongoDB, Mongoose, and various other libraries, I wanted a real-world project to apply everything I was learning.

I decided to upgrade SecureAuth, converting it from a simple JSON-server API into a fully-fledged MERN stack web application. I was really enjoying the process, and I thought, "Why not build something we use every day?" So, I decided to build a social media platform. That led to the creation of LookSphere, and here it is today!

While it is continuously evolving as a hands-on project to practice high-performance full-stack engineering, this has been the incredible journey from SecureAuth to LookSphere.

---

## 🔗 Quick Links

Explore the detailed documentation across the project:

**Root Documentation:**
- 🗂️ **[Project File Tree](./File_Tree.md)** - Complete repository file tree.
- 🚀 **[Performance Optimizations](./performance_optimization.md)** - GPU rendering fixes, state tuning, zero-CLS viewports, and database indexing.
- 🔮 **[Roadmap](./roadmap.md)** - Completed milestones, in-progress tasks, and upcoming feature pipeline.
- ✅ **[Resolved Issues](./resolved_issues.md)** - Log of major bug fixes, rendering fixes, and platform improvements.
- 💡 **[Improvement Notes](./improvement.md)** - Architectural notes, planned structural improvements, and future ideas.

**Community & Governance:**
- 🤝 **[Contributing Guidelines](./CONTRIBUTING.md)** - Code standards, PR workflow, and local development setup.
- 🛡️ **[Security Policy](./SECURITY.md)** - Security disclosure guidelines, vulnerability reporting, and practices.
- 📜 **[Code of Conduct](./CODE_OF_CONDUCT.md)** - Standards and expectations for community interaction.
- ⚖️ **[License](./LICENSE.md)** - All rights reserved software license and permissions.

**Frontend & Backend:**
- 🎨 **[Frontend Documentation](./frontend/README.md)** - React 19 & Vite architecture, state management, and UI design.
- ⚙️ **[Backend Documentation](./Backend/Readme.md)** - Node.js/Express server, MongoDB schemas, and security practices.
- 📡 **[API Reference](./Backend/APIs.md)** - Comprehensive documentation of all REST API endpoints.
- 🗂️ **[Frontend File Tree](./frontend/File_Tree.md)** - Detailed tree of the frontend codebase.
- 🗂️ **[Backend File Tree](./Backend/File_Tree.md)** - Detailed tree of the backend codebase.
- 🖌️ **[Frontend Design Notes](./frontend/Design.md)** - Design system tokens, liquid glassmorphism, and responsive guidelines.

---

## ✨ Key Features

- **Global Community & Discovery:** Explore global post feeds with smooth autoplay videos, discover creators via debounced search, and browse user profiles.
- **Dynamic Post Interactions:** Real-time atomic **Sparks** (likes), **Reshares**, and private **Archives** with optimistic UI updates. Down-arrow count badges open an interactive modal (`InteractionsListModal`) to inspect which users engaged.
- **Synchronized Profile Media Tabs:** Profile showcases dynamic media tabs (All, Images, Videos, Reshares, Archived) with automatic cross-tab interaction state synchronization without full-page reloads.
- **Account & Security Settings:** Dedicated Settings hub (`/settings`) with secure self-service **Change Email** (`/settings/change-email`) and **Change Password** (`/settings/change-password`) backed by Yup validation schemas.
- **Dedicated Post Page & Link Sharing:** Standalone post pages (`/posts/:id`), one-click link copying for profiles and posts, alt-text accessibility, and live impression telemetry.
- **Support & Inquiries Desk:** Comprehensive Contact Us portal (`/contact-us`) supporting multiple inquiry categories with image and video attachments. Users track admin responses under My Inquiries (`/my-inquiries`) and receive email updates via Nodemailer.
- **High-Performance Architecture:** Zero Cumulative Layout Shift (CLS = 0) with locked 520px media containers, single-active coordinated video playback, GZIP/Brotli payload compression, and compound MongoDB covered indexes.
- **Robust Security & Data Integrity:** Passwords hashed via `bcrypt` (12 salt rounds), stateless JWT tokens via `Authorization: Bearer <token>` headers, strict CORS configuration, and dual-layer validation (`Yup` on frontend, `express-validator` on backend).

---

## 🛠️ Tech Stack

### **Frontend**
- **Core:** React, Vite, React Router
- **Styling & UI:** Tailwind CSS, Lucide React, React Spinners, React Toastify
- **Data & Forms:** Axios, React Hook Form, Yup
- **Tools & Config:** ESLint, Vercel deployment configuration

### **Backend**
- **Core:** Node.js, Express.js
- **Database:** MongoDB & Mongoose (with compound indexes and cascading hooks)
- **Security & Auth:** JSON Web Tokens (JWT), bcrypt (12 rounds), CORS, Dotenv
- **Media & Storage:** Cloudinary (CDN image/video processing), Multer (multipart handling)
- **Utilities & Communications:** Nodemailer (email updates), Express Validator, Compression (GZIP/Brotli), Nodemon

---

<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://github.com/PRANAV-SHILU">Pranav Shilu</a>. All rights reserved.</b>
</div>

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](./Readme.md) | [File Tree](./File_Tree.md) | [Roadmap](./roadmap.md) | [Performance](./performance_optimization.md) | [Resolved Issues](./resolved_issues.md) | [Improvements](./improvement.md)
- **Governance:** [Contributing](./CONTRIBUTING.md) | [Security](./SECURITY.md) | [Code of Conduct](./CODE_OF_CONDUCT.md) | [License](./LICENSE.md)
- **Frontend:** [Frontend Readme](./frontend/README.md) | [Design Specs](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md)
- **Backend:** [Backend Readme](./Backend/Readme.md) | [API Docs](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)
---
