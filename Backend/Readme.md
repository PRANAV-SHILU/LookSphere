<div align="right">Last Modified: 22-Oct-2026</div>


<div align="center">

# LookSphere Backend

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-Uploads-orange)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-red)
![Express Validator](https://img.shields.io/badge/Express_Validator-Validation-41315F)
![Dotenv](https://img.shields.io/badge/Dotenv-Config-ECD53F?logo=dotenv&logoColor=black)
![CORS](https://img.shields.io/badge/CORS-Protection-purple)
![Compression](https://img.shields.io/badge/Compression-GZIP%20%2F%20Brotli-00F2FE?logo=googlecloud&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-Dev_Tool-76D04B?logo=nodemon&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

</div>

This is the backend server for **LookSphere**, a modern social media application. Built with **Node.js** and **Express**, it provides a robust REST API for user authentication, profile management, media-rich post feeds, post interactions (sparks, archives, reshares), and user contact/inquiry support.

**🌐 Live Demo:** [LookSphere](http://localhost:5173/)  
**🐱 GitHub Profile:** [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

**💻 Frontend Repository:** [View Frontend](../frontend/README.md)

## ✨ Features Highlight

- **Seamless Media Uploads:** Handles both Images and Videos with auto-optimization and cloud storage via Cloudinary.
- **Secure Authentication:** JWT-based authentication using localStorage with Authorization header transmission to avoid third-party cookie blocking issues.
- **Post Interactions Engine:** Full-fledged mechanism supporting atomic toggling of sparks, archives, and reshares with covered index lookups, automatic count synchronization, and user inspect lists.
- **Contact & Inquiries System:** Full-featured inquiry submission supporting category routing, multi-image and video attachments, inquiry tracking via My Inquiries (`/my-inquiries`), and an administrative moderation desk.
- **Platform Analytics:** Comprehensive metrics and statistics for admin dashboards.
- **Engagement Tracking:** Dynamic counters for profile views and post impressions.
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
- **Middleware:** CORS (Cross-Origin Resource Sharing), Compression (GZIP/Brotli payload compression)
- **Environment Management:** Dotenv
- **Development Tool:** Nodemon

### **Core Backend Algorithms & Query Optimization**
- **Stream Compression:** Dynamic Brotli (`br`) & DEFLATE (LZ77 / Huffman / 2nd-order context modeling) middleware compressing JSON responses by 70–85% to fit inside initial TCP `initcwnd` (10 packets ~14.6KB)
- **Batch Enrichment Pipeline:** Vectorized Batch Index Scan algorithm ($O(1)$ single-trip DB enrichment via `{ postId: { $in: postIds } }` with $O(M)$ in-memory hash map lookup, eliminating $N+1$ query overhead)
- **Covered Index Architecture:** Compound indexes satisfying queries entirely in RAM cache (`{ userId: 1, postId: 1, action: 1 }`, `{ postId: 1, action: 1, createdAt: -1 }`)
- **Prefix Optimization:** Compound sorting indexes (`{ userId: 1, mediaType: 1, createdAt: -1 }`) eliminating in-memory `SORT_KEY_GENERATOR` passes
- **Atomic Operations:** Concurrency-safe in-place MongoDB `$inc` updates for interaction telemetry counters
- **Lifecycle Cascading:** Pre-delete cascading document cleanup hooks preventing orphaned data bloat

## 🛡️ Security Measures

Security is a top priority for this API. The following protections are in place:

- **Password Protection:** Passwords are salted and hashed using `bcrypt` (cost factor 12).
- **XSS Mitigation:** JWT tokens are stored in localStorage. To mitigate XSS risks, implement strict Content Security Policy (CSP) and validate/sanitize all user inputs.
- **Route Authorization:** Robust JWT middleware ensures protected routes are only accessible to authenticated users.
- **Input Sanitization:** All incoming request bodies and parameters are validated and sanitized via `express-validator` to prevent bad data and NoSQL injection.
- **Role Separation:** Dedicated admin middleware prevents standard users from accessing platform metrics or contact moderation dashboards.

## 🏗️ Architecture & Key Design Decisions

- **Why Multer + Cloudinary?** Heavy media streaming and storage are offloaded to Cloudinary, ensuring the Node.js server remains lightweight and fast for API requests.
- **Why LocalStorage with Authorization Header?** Storing JWTs in localStorage with Authorization header transmission avoids third-party cookie blocking issues and provides better cross-origin compatibility. Security is maintained through CSP and input validation.
- **Why MVC (Model-View-Controller)?** Keeping routing, business logic, and database operations decoupled makes the codebase maintainable, scalable, and easier to test.
- **Role-Based Access Control:** The API includes specific middleware to differentiate between standard users and administrators, securing sensitive endpoints.

## 🗄️ Database Schema Design

The database utilizes MongoDB and is centered around four core entities:

- **User Model:** Stores credentials (securely hashed), profile data (avatar, bio, tagline), roles, and dynamic statistics (total post count, profile views).
- **Post Model:** References the `User` object, stores Cloudinary media URLs, specifies media types (Image/Video), and tracks engagement (post impressions, sparks, reshares, archives).
- **Interaction Model:** Tracks user interactions on posts (`spark`, `archive`, `reshare`) with atomic count synchronizations.
- **Contact Model:** Stores user inquiries, category classifications (`general`, `feedback`, `suggestion`, `issue`, `security`, `inquiry`), Cloudinary attachment URLs (images and video), resolution status, and administrative responses.

## 📡 API Overview & Error Handling

Here's a quick summary of the available resources. For full details, view the [APIs.md](APIs.md) file.

- **Auth:** Register, login, and logout functionalities.
- **Users:** Fetch user lists, manage profiles, change password/email, and view user metrics.
- **Posts:** Create, edit, fetch feeds, and increment impression counts for media posts.
- **Interactions:** Toggle sparks, archives, and reshares on posts, and fetch user- or post-specific interaction histories.
- **Contact & Support:** Submit inquiries with attachments, deliver responses to the user's My Inquiries dashboard (`/my-inquiries`), send and manage/respond to inquiries via admin portal.
- **Admin:** Fetch platform-wide analytics, user metrics, and contact statistics.

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

<br>
<br>

---

**📚 LookSphere Documentation Index:**
- **Core Documentation:** [Main Readme](../Readme.md) | [Algorithms](../Algorithms.md) | [Performance Optimization](../Performance_Optimization.md) | [Roadmap](../Roadmap.md) | [Resolved Issues](../Resolved_Issues.md) | [File Tree](../File_Tree.md) | [Improvements](../improvement.md)
- **Governance & Policies:** [Contributing Guidelines](../CONTRIBUTING.md) | [Code of Conduct](../CODE_OF_CONDUCT.md) | [Security Policy](../SECURITY.md) | [License](../LICENSE.md)
- **Issue Templates:** [Bug Report](../.github/ISSUE_TEMPLATE/bug_report.md) | [Feature Request](../.github/ISSUE_TEMPLATE/feature_request.md)
- **Frontend Architecture:** [Frontend Readme](../frontend/README.md) | [Design System](../frontend/Design.md) | [Frontend File Tree](../frontend/File_Tree.md)
- **Backend Architecture:** [Backend Readme](./Readme.md) | [API Documentation](./APIs.md) | [Backend File Tree](./File_Tree.md)

---

<div align="center">

**LookSphere Engineering Documentation**  
*Robust REST infrastructure, covered database lookups, and airtight authentication.*

</div>
<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://www.linkedin.com/in/pranavshilu/">Pranav Shilu</a>. All rights reserved.</b>
</div>

