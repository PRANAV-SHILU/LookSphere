<div align="right">Last Modified: 2026-06-20</div>


<div align="center">

# LookSphere Backend

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-Uploads-orange)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-red)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-14B32E)
![Dotenv](https://img.shields.io/badge/Dotenv-Config-ECD53F?logo=dotenv&logoColor=black)
![Compression](https://img.shields.io/badge/Compression-GZIP%20%2F%20Brotli-00F2FE?logo=googlecloud&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

</div>

This is the backend server for **LookSphere**, a modern social media application. Built with **Node.js** and **Express**, it provides a robust REST API for user authentication, profile management, and media-rich post feeds.

**🌐 Live Demo:** [LookSphere](http://localhost:5173/)  
**🐱 GitHub Profile:** [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

**💻 Frontend Repository:** [View Frontend](../frontend/README.md)

## ✨ Features Highlight

- **Seamless Media Uploads:** Handles both Images and Videos with auto-optimization and cloud storage via Cloudinary.
- **Secure Authentication:** JWT-based authentication using localStorage with Authorization header transmission to avoid third-party cookie blocking issues.
- **Platform Analytics:** Comprehensive metrics and statistics for admin dashboards.
- **Engagement Tracking:** Dynamic counters for profile views and post views.
- **Robust Validation:** Strict input validation to ensure data integrity before it reaches the database.

## 🚀 Tech Stack & Libraries

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens) via localStorage with Authorization header
- **Media Storage:** Cloudinary (Image & Video uploads)
- **File Parsing:** Multer
- **Validation:** Express-Validator
- **Security & Password Hashing:** bcrypt
- **Email Services:** Nodemailer
- **Middleware:** CORS (Cross-Origin Resource Sharing), Compression (GZIP/Brotli payload compression)
- **Environment Management:** Dotenv
- **Development Tool:** Nodemon

## 🛡️ Security Measures

Security is a top priority for this API. The following protections are in place:

- **Password Protection:** Passwords are salted and hashed using `bcrypt` (cost factor 10).
- **XSS Mitigation:** JWT tokens are stored in localStorage. To mitigate XSS risks, implement strict Content Security Policy (CSP) and validate/sanitize all user inputs.
- **Route Authorization:** Robust JWT middleware ensures protected routes are only accessible to authenticated users.
- **Input Sanitization:** All incoming request bodies and parameters are validated and sanitized via `express-validator` to prevent bad data and NoSQL injection.
- **Role Separation:** Dedicated admin middleware prevents standard users from accessing platform metrics.

## 🏗️ Architecture & Key Design Decisions

- **Why Multer + Cloudinary?** Heavy media streaming and storage are offloaded to Cloudinary, ensuring the Node.js server remains lightweight and fast for API requests.
- **Why LocalStorage with Authorization Header?** Storing JWTs in localStorage with Authorization header transmission avoids third-party cookie blocking issues and provides better cross-origin compatibility. Security is maintained through CSP and input validation.
- **Why MVC (Model-View-Controller)?** Keeping routing, business logic, and database operations decoupled makes the codebase maintainable, scalable, and easier to test.
- **Role-Based Access Control:** The API includes specific middleware to differentiate between standard users and administrators, securing sensitive endpoints.

## 🗄️ Database Schema Design

The database utilizes MongoDB and is centered around two core entities:

- **User Model:** Stores credentials (securely hashed), profile data (avatar, bio, tagline), roles, and dynamic statistics (total post count, profile views).
- **Post Model:** References the `User` object, stores Cloudinary media URLs, specifies media types (Image/Video), and tracks engagement (post view counts).

## 📡 API Overview & Error Handling

Here's a quick summary of the available resources. For full details, view the [APIs.md](APIs.md) file.

- **Auth:** Register, login, and logout functionalities.
- **Users:** Fetch user lists, manage profiles, and view user metrics.
- **Posts:** Create, edit, fetch feeds, and increment view counts for media posts.
- **Admin:** Fetch platform-wide analytics and metrics.

### Error Format

The API follows a standardized error response format so the client always knows what to expect:

- **Validation Errors (express-validator):** `{ errors: [{ type, msg, path, location }] }`
- **Standard/Client Errors:** `{ message: string }`

## 📂 Project Structure

Check out the detailed [File Tree Overview](File_Tree.md) to understand the directory structure.  
Check out the detailed [API Documentation](APIs.md) for all available endpoints.


---

## 👨‍💻 Author

Built by **Pranav Shilu**

- GitHub: [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

---

## ⚖️ License

**All Rights Reserved.**  
This is a private, proprietary repository. No part of this codebase may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the owner.

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](../Readme.md) | [File Tree](../File_tree.md) | [Future Plans](../futureplan.md)
- **Frontend:** [Frontend Readme](../frontend/README.md) | [Design Specs](../frontend/Design.md) | [Frontend File Tree](../frontend/File_Tree.md) | [Improvements](../frontend/improvement.md)
- **Backend:** [Backend Readme](./Readme.md) | [API Docs](./APIs.md) | [Backend File Tree](./File_Tree.md)
---
