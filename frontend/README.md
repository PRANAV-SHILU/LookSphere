<div align="right">Last Modified: 2026-06-23</div>


<div align="center">

# LookSphere Frontend

![React](https://img.shields.io/badge/React-v19.2.0-2b2b2b?style=flat&logo=react&logoColor=white&labelColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.1-2b2b2b?style=flat&logo=tailwindcss&logoColor=white&labelColor=06B6D4)
![Vite](https://img.shields.io/badge/Vite-v7.2.4-2b2b2b?style=flat&logo=vite&logoColor=white&labelColor=BD34FE)
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

**⚙️ Backend Repository:** [View Backend](../Backend/Readme.md)

LookSphere is a modern social media platform designed to help you look into your surrounding sphere. It is reliable, consistent, and privacy-first. We believe in protecting your privacy—your data is never shared or leaked. We support both light and dark themes, with a dark-theme-first approach.

## 🗺️ The Journey

LookSphere originally started as **SecureAuth**, a modern authentication app built with pure React.js and a JSON-server API deployed on Render. I built SecureAuth to practice when I first learned React. As I learned new technologies like Node.js, Express, MongoDB, Mongoose, and various other libraries, I wanted a real-world project to apply everything I was learning.

I decided to upgrade SecureAuth, converting it from a simple JSON-server API into a fully-fledged MERN stack web application. I was really enjoying the process, and I thought, "Why not build something we use every day?" So, I decided to build a social media platform. That led to the creation of LookSphere, and here it is today!

While it is still not a final version and serves primarily as a way to practice full-stack development, this has been the incredible journey from SecureAuth to LookSphere. And rest assured, LookSphere is now even more secure than its predecessor.

## 🚀 Tech Stack & Libraries

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Form Handling:** React Hook Form
- **Validation:** Yup
- **Animations:** Native CSS & Tailwind Transitions
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Loading Indicators:** React Spinners

## ✨ Features of LookSphere

- **Global Community:** Join a diverse, vibrant community of creators, thinkers, and innovators across the globe.
- **Share & Discover:** Share your passions and discover new interests through an intuitive content discovery engine.
- **Privacy First:** Your data belongs to you. Advanced security features keep your conversations and content safe.

## ⚙️ How It Works

1. **Secure Signup:** Your password is encrypted with 12 salt rounds before hitting our database.
2. **Upload Media:** Share images or videos with custom captions and alt-text for accessibility.
3. **Discover & Engage:** Explore the Feed, search for specific users, and see your view counts grow.

## 🎯 What You Can Do

- **Post & Share:** Express yourself! Upload photos & media, write captions & stories, add alt text for accessibility, reach a global audience, and see real-time post view counts.
- **Explore & Discover:** Never miss a thing. Browse a global post feed, use smart search & filters, discover new creators, and get curated recommendations.
- **Secure Profile:** Keep your data protected. Manage your profile, enjoy JWT stateless sessions, bcrypt password hashing, and profile view tracking.

## 🛡️ Data Integrity & Security

- **Bcrypt (Password Hashing):** All user passwords are hashed with bcrypt using 12 salt rounds before storage. Plain-text passwords are never saved.
- **JSON Web Tokens (Authentication):** Stateless JWT tokens are issued on login and verified on every protected route.
- **CORS (Cross-Origin Protection):** Strict CORS policies ensure only trusted origins can communicate with the API.
- **Express Validator (Server-Side Validation):** All incoming request data is validated and sanitized on the server.
- **Yup + React Hook Form (Client-Side Validation):** Schema-based form validation ensures user input is validated before it even reaches the server.
- **Dotenv (Secret Management):** All sensitive configuration is stored in environment variables, never in source code.


## 📁 Folder Structure

The project has a well-organized, scalable architecture. For a detailed breakdown of the directory layout and all files, please see the [File Tree](./File_Tree.md) documentation.

---

## ⚖️ Copyright & License

  <b>© 2026 LookSphere. All rights reserved.**

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](../Readme.md) | [File Tree](../File_Tree.md) | [Future Plans](../futureplan.md) | [Performance](../performance_optimization.md) | [Resolved Issues](../resolved_issues.md)
- **Frontend:** [Frontend Readme](./README.md) | [Design Specs](./Design.md) | [Frontend File Tree](./File_Tree.md) | [Improvements](./improvement.md)
- **Backend:** [Backend Readme](../Backend/Readme.md) | [API Docs](../Backend/APIs.md) | [Backend File Tree](../Backend/File_Tree.md)
---
