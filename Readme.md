<div align="right">Last Modified: 2026-06-23</div>


<div align="center">

# LookSphere 🌐

*A modern, privacy-first, full-stack social media platform.*

![React](https://img.shields.io/badge/React-v19.2.0-2b2b2b?style=flat&logo=react&logoColor=white&labelColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.1-2b2b2b?style=flat&logo=tailwindcss&logoColor=white&labelColor=06B6D4)
![Vite](https://img.shields.io/badge/Vite-v7.2.4-2b2b2b?style=flat&logo=vite&logoColor=white&labelColor=BD34FE)
![JWT](https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-Uploads-orange)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-red)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-14B32E)
![Dotenv](https://img.shields.io/badge/Dotenv-Config-ECD53F?logo=dotenv&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-v7.11.0-2b2b2b?style=flat&logo=reactrouter&logoColor=white&labelColor=CA4245)
![Axios](https://img.shields.io/badge/Axios-v1.17.0-2b2b2b?style=flat&logo=axios&logoColor=white&labelColor=5A29E4)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-v7.69.0-2b2b2b?style=flat&logo=reacthookform&logoColor=white&labelColor=EC5990)
![Yup](https://img.shields.io/badge/Yup-v1.7.1-2b2b2b?style=flat&labelColor=32B768)
![Lucide React](https://img.shields.io/badge/Lucide_React-v1.17.0-2b2b2b?style=flat&logo=lucide&logoColor=white&labelColor=F56565)
![React Spinners](https://img.shields.io/badge/React_Spinners-v0.17.0-2b2b2b?style=flat&labelColor=36D7B7)
![React Toastify](https://img.shields.io/badge/React_Toastify-v11.0.5-2b2b2b?style=flat&labelColor=FF9900)

</div>

**🌐 Live Demo:** [LookSphere](http://localhost:5173/)  
**🐱 GitHub Profile:** [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

## 📖 Overview

**LookSphere** is a modern social media platform built using the MERN stack (MongoDB, Express, React, Node.js). Originally starting as a pure React/JSON-server authentication practice app ("SecureAuth"), it has evolved into a robust, secure, and full-featured social networking application.

It features a dark-theme-first aesthetic, secure JWT authentication, rich media sharing (Cloudinary), and a responsive, dynamic UI built with Tailwind CSS.

---

## 🔗 Quick Links

Explore the detailed documentation for different parts of the project:

- 🎨 **[Frontend Documentation](./frontend/README.md)** - Details about the React & Vite frontend architecture, libraries, and UI design.
- ⚙️ **[Backend Documentation](./Backend/Readme.md)** - Details about the Node.js/Express server, MongoDB schemas, and security practices.
- 📡 **[API Reference](./Backend/APIs.md)** - Comprehensive documentation of all available REST API endpoints.
- 🗂️ **[Frontend File Tree](./frontend/File_Tree.md)** - Structure of the frontend codebase.
- 🗂️ **[Backend File Tree](./Backend/File_Tree.md)** - Structure of the backend codebase.
- 🖌️ **[Frontend Design Notes](./frontend/Design.md)** - Design choices and UI/UX improvements.

---

## ✨ Key Features

- **Global Community:** Share passions, discover new interests, and explore a global feed of content.
- **Robust Security:** Passwords hashed via `bcrypt` (12 salt rounds), JWT stateless sessions (JWT Auth Token + Auth Header for CSRF/cross-origin safety), and strict CORS policies.
- **Rich Media Handling:** Upload images and videos directly. Media is optimized and stored efficiently using Multer and Cloudinary.
- **Advanced UI/UX:** Built with React 19, Tailwind CSS, and native CSS for smooth animations, with a focus on accessibility (alt texts).
- **Data Integrity:** Strict server-side validation via `express-validator` and robust client-side form validation via `Yup` and `React Hook Form`.

---

## 🛠️ Tech Stack

### **Frontend**
- **Core:** React, Vite, React Router DOM
- **Styling & UI:** Tailwind CSS, Lucide React, React Spinners, React Toastify
- **Data & Forms:** Axios, React Hook Form, Yup
- **Tools & Validation:** ESLint, Yup

### **Backend**
- **Core:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Security & Auth:** JSON Web Tokens (JWT), bcrypt, CORS, Dotenv
- **Media & Files:** Cloudinary, Multer
- **Utilities:** Nodemailer (Emails), express-validator, Nodemon

---


<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://github.com/PRANAV-SHILU">Pranav Shilu</a>. All rights reserved.</b>
</div>

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](./Readme.md) | [File Tree](./File_Tree.md) | [Future Plans](./futureplan.md) | [Performance](./performance_optimization.md)
- **Frontend:** [Frontend Readme](./frontend/README.md) | [Design Specs](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md) | [Improvements](./frontend/improvement.md)
- **Backend:** [Backend Readme](./Backend/Readme.md) | [API Docs](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)
---
