<div align="right">Last Modified: 22-Oct-2026</div>


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

The frontend is crafted with React 19 and Vite for a lightning-fast development and production experience. Every screen — from the global feed and user profiles to the contact desk and admin moderation panels — is built with reusable, modular components and styled using Tailwind CSS for a sleek, dark-theme-first aesthetic. Forms are powered by React Hook Form and validated with Yup schemas on the client side before any data touches the network, keeping the experience smooth and secure. Lucide React provides a clean, consistent icon set, while React Toastify and React Spinners handle real-time feedback so users always know what's happening. The result is an interface that feels responsive, polished, and purpose-built for social interaction.

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

### **Core Frontend Algorithms & Optimization**
- **Feed Permutation:** Fisher-Yates (Knuth) Unbiased Shuffle ($O(N)$ with `sessionStorage` disjoint seen-post partitioning)
- **Viewport & Playback:** Single-Active Viewport Decoupling (centralized video coordinator preventing mobile GPU decoder exhaustion)
- **Sentinel Pagination:** Invisible Sentinel `IntersectionObserver` ($k=5..9$ item prefetch with $O(M)$ hash `Set` deduplication)
- **State Synchronization:** Optimistic State Mutation with referential integrity preservation (`prevProps.post === nextProps.post`) and multi-setter tab fanout
- **Search Ingestion:** Time-Decay Sliding Window Debounce (400ms) with dynamic Axios cache-bypass policy
- **Batch Processing:** Micro-Batch Ingestion Pipeline (5–10 items per fetch for sub-100ms FCP and $<15\text{MB}$ memory footprint)

## ✨ Features of LookSphere

- **Global Community:** Join a diverse, vibrant community of creators, thinkers, and innovators across the globe.
- **Share & Discover:** Share your passions and discover new interests through an intuitive content discovery engine.
- **Post Interactions & Modals:** Real-time Spark, Reshare, and Archive capabilities with optimistic updates, dedicated interactive user list modals to inspect who sparked or reshared posts, and instant profile navigation.
- **Cross-Tab Synchronization:** Interacting with posts immediately syncs across all media tabs (Images, Videos, Reshares, Archived) and modal views without page reloads.
- **Profile & Post Link Sharing:** Dedicated copy link buttons next to usernames, one-click post share links across feed/modal footers, and standalone post view pages (`/posts/:id`).
- **Support & Inquiries:** Dedicated Contact Us portal (`/contact-us`) with category routing, media attachments (images/video), real-time ticket tracking under My Inquiries (`/my-inquiries`), and an admin moderation dashboard.
- **Privacy First:** Your data belongs to you. Advanced security features keep your conversations and content safe.

## ⚙️ How It Works

1. **Secure Signup & Onboarding:** Your password is encrypted with 12 salt rounds before hitting our database. Create your custom credentials and start connecting immediately.
2. **Upload Media:** Share images or videos with custom captions and alt-text for accessibility.
3. **Discover & Engage:** Explore the Feed, search for creators, spark, reshare, or archive posts, inspect who reacted via interaction list modals, open dedicated post URLs (`/posts/:id`), and see impression counts grow.
4. **Get Support:** Submit inquiries or feedback directly through the Contact Us desk (`/contact-us`). You will receive admin responses directly on your My Inquiries page (`/my-inquiries`) directly on your portal.

## 🎯 What You Can Do

- **Post & Share:** Express yourself! Upload photos & media, write captions & stories, add alt text for accessibility, share direct post and profile links, reach a global audience, and see real-time post impression counts.
- **Interact & Connect:** Spark posts to show appreciation, reshare posts to your public reshare feed, and privately archive posts. Tap down-arrow count badges to see complete lists of people who interacted.
- **Explore & Discover:** Never miss a thing. Browse a global post feed with seamless video autoplay, use smart search & filters, discover new creators, and browse creator profiles with synchronized media tabs.
- **Support & Inquiries:** Reach out directly through the interactive Contact Us form (`/contact-us`), attach screenshots or video clips, track submitted requests under My Inquiries (`/my-inquiries`), receive official admin response messages.
- **Secure Profile & Settings:** Keep your data protected. Manage your profile, enjoy JWT stateless sessions, bcrypt password hashing, securely change password and email address directly from Settings, and view tracking.

## 🛡️ Data Integrity & Security

- **Bcrypt (Password Hashing):** All user passwords are hashed with bcrypt using 12 salt rounds before storage. Plain-text passwords are never saved.
- **JSON Web Tokens (Authentication):** Stateless JWT tokens are issued on login and verified on every protected route.
- **CORS (Cross-Origin Protection):** Strict CORS policies ensure only trusted origins can communicate with the API.
- **Express Validator (Server-Side Validation):** All incoming request data is validated and sanitized on the server.
- **Yup + React Hook Form (Client-Side Validation):** Schema-based form validation ensures user input is validated before it even reaches the server.
- **Dotenv (Secret Management):** All sensitive configuration is stored in environment variables, never in source code.


## 📁 Folder Structure

The project has a well-organized, scalable architecture. For a detailed breakdown of the directory layout and all files, please see the [File Tree](./File_Tree.md) documentation.

<br>
<br>

---

**📚 LookSphere Documentation Index:**
- **Core Documentation:** [Main Readme](../Readme.md) | [Algorithms](../Algorithms.md) | [Performance Optimization](../Performance_Optimization.md) | [Roadmap](../Roadmap.md) | [Resolved Issues](../Resolved_Issues.md) | [File Tree](../File_Tree.md) | [Improvements](../improvement.md)
- **Governance & Policies:** [Contributing Guidelines](../CONTRIBUTING.md) | [Code of Conduct](../CODE_OF_CONDUCT.md) | [Security Policy](../SECURITY.md) | [License](../LICENSE.md)
- **Issue Templates:** [Bug Report](../.github/ISSUE_TEMPLATE/bug_report.md) | [Feature Request](../.github/ISSUE_TEMPLATE/feature_request.md)
- **Frontend Architecture:** [Frontend Readme](./README.md) | [Design System](./Design.md) | [Frontend File Tree](./File_Tree.md)
- **Backend Architecture:** [Backend Readme](../Backend/Readme.md) | [API Documentation](../Backend/APIs.md) | [Backend File Tree](../Backend/File_Tree.md)

---

<div align="center">

**LookSphere Engineering Documentation**  
*Liquid glassmorphism, instant optimistic feedback, and accessible React architecture.*

</div>
<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://www.linkedin.com/in/pranavshilu/">Pranav Shilu</a>. All rights reserved.</b>
</div>

