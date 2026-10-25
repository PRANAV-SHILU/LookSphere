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
![Algorithms](https://img.shields.io/badge/Algorithms-Computational_Engine-8B5CF6?logo=diagramnext&logoColor=white)
![Fisher--Yates](https://img.shields.io/badge/Fisher--Yates-Shuffle_Permutation-EC4899)
![Single--Active Playback](https://img.shields.io/badge/Single--Active_Playback-O(1)_Decoupling-06B6D4)
![Optimistic UI](https://img.shields.io/badge/Optimistic_UI-%3C1ms_State_Sync-F59E0B)
![IntersectionObserver](https://img.shields.io/badge/IntersectionObserver-Sentinel_Prefetch-3B82F6)
</div>


**🌐 Live Demo:** [LookSphere (looksphere.vercel.app)](https://looksphere.vercel.app/)  
**🐱 GitHub Profile:** [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

**⚙️ Backend Repository:** [View Backend](../Backend/Readme.md)

LookSphere is a modern social media platform designed to help you look into your surrounding sphere. It is reliable, consistent, and privacy-first. We believe in protecting your privacy—your data is never shared or leaked. We support both light and dark themes, with a dark-theme-first approach.

The frontend is crafted with React 19 and Vite for a lightning-fast development and production experience. Every screen — from the global feed and user profiles to the contact desk and admin moderation panels — is built with reusable, modular components and styled using Tailwind CSS for a sleek, dark-theme-first aesthetic. Forms are powered by React Hook Form and validated with Yup schemas on the client side before any data touches the network, keeping the experience smooth and secure. Lucide React provides a clean, consistent icon set, while React Toastify and React Spinners handle real-time feedback so users always know what's happening. The result is an interface that feels responsive, polished, and purpose-built for social interaction.

## 🚀 Tech Stack & Libraries

### **Frontend Stack**
- **Core:** React, Vite, React Router
- **Styling & UI:** Tailwind CSS, Lucide React, React Spinners, React Toastify, Native CSS Transitions
- **Data & Forms:** Axios, React Hook Form, Yup
- **Tools & Config:** ESLint, Vercel deployment configuration

### **Algorithms & Computational Architecture** ([Full Specification](../Algorithms.md))
- **Feed Permutation:** Fisher-Yates (Knuth) Unbiased Shuffle ($O(N)$ with `sessionStorage` disjoint seen-post partitioning)
- **Viewport & Playback:** Single-Active Viewport Decoupling (centralized mutual-exclusion playback coordinator restricting active hardware video decoders to exactly 1)
- **Sentinel Pagination:** Invisible Sentinel `IntersectionObserver` ($k \in [5, 9]$ item prefetch with $O(M)$ hash set deduplication)
- **State Synchronization:** Optimistic State Mutation ($<1\text{ms}$) with referential integrity preservation for `React.memo` and multi-setter tab fanout
- **Search Ingestion:** Time-Decay Sliding Window Debounce (400ms) with dynamic cache-bypass policy
- **Batch Processing:** Micro-Batch Ingestion Pipeline (5–10 items per fetch for sub-100ms FCP and $<15\text{MB}$ memory footprint)

## ✨ Features of LookSphere

- **Global Community:** Join a diverse, vibrant community of creators, thinkers, and innovators across the globe.
- **Share & Discover:** Share your passions and discover new interests through an intuitive content discovery engine.
- **Post Interactions & Modals:** Real-time Spark, Reshare, and Archive capabilities with optimistic updates, dedicated interactive user list modals ([`InteractionsListModal`](./src/modals/InteractionsListModal.jsx)) to inspect who sparked or reshared posts, and instant profile navigation.
- **Cross-Tab Synchronization:** Interacting with posts immediately syncs across all media tabs (Images, Videos, Reshares, Archived, Sparks) and modal views without page reloads.
- **Profile & Post Link Sharing:** Dedicated copy link buttons next to usernames, one-click post share links across feed/modal footers, and standalone post view pages ([`/posts/:id`](https://looksphere.vercel.app/explore)).
- **Support & Inquiries:** Dedicated Contact Us portal ([`/contact-us`](https://looksphere.vercel.app/contact-us)) with category routing, media attachments (images/video), real-time ticket tracking under My Inquiries ([`/my-inquiries`](https://looksphere.vercel.app/my-inquiries)), and an admin moderation dashboard.
- **Network Resiliency & Offline Detection:** Instant detection of offline state, zero-latency request short-circuiting, sanitized database driver error handling, cached profile fallback, and dynamic skeleton retry states.
- **Privacy First:** Your data belongs to you. Advanced security features keep your conversations and content safe.

## ⚙️ How It Works

1. **Secure Signup & Onboarding:** Your password is encrypted with 12 salt rounds before hitting our database. Create your custom credentials on [Register](https://looksphere.vercel.app/register) or [Login](https://looksphere.vercel.app/login) and start connecting immediately.
2. **Upload Media:** Share images or videos with custom captions and alt-text for accessibility.
3. **Discover & Engage:** Explore the Feed ([`/feed`](https://looksphere.vercel.app/feed)), search for creators ([`/creators`](https://looksphere.vercel.app/creators)), spark, reshare, or archive posts, inspect who reacted via interaction list modals, open dedicated post URLs ([`/posts/:id`](https://looksphere.vercel.app/explore)), and see impression counts grow.
4. **Get Support:** Submit inquiries or feedback directly through the Contact Us desk ([`/contact-us`](https://looksphere.vercel.app/contact-us)). You will receive admin responses directly on your My Inquiries page ([`/my-inquiries`](https://looksphere.vercel.app/my-inquiries)) directly on your portal.

## 🎯 What You Can Do

- **Post & Share:** Express yourself! Upload photos & media, write captions & stories, add alt text for accessibility, share direct post and profile links, reach a global audience, and see real-time post impression counts.
- **Interact & Connect:** Spark posts to show appreciation, view your sparked posts in your own private Sparks tab, reshare posts to your public reshare feed, and privately archive posts. Tap down-arrow count badges to see complete lists of people who interacted.
- **Explore & Discover:** Never miss a thing. Browse a global post feed ([`/feed`](https://looksphere.vercel.app/feed)) with seamless video autoplay, use smart search & filters in Explore ([`/explore`](https://looksphere.vercel.app/explore)), discover new creators ([`/creators`](https://looksphere.vercel.app/creators)), and browse creator profiles ([`/profile`](https://looksphere.vercel.app/profile)) with synchronized media tabs.
- **Support & Inquiries:** Reach out directly through the interactive Contact Us form ([`/contact-us`](https://looksphere.vercel.app/contact-us)), attach screenshots or video clips, track submitted requests under My Inquiries ([`/my-inquiries`](https://looksphere.vercel.app/my-inquiries)), receive official admin response messages.
- **Secure Profile & Settings:** Keep your data protected. Manage your profile ([`/profile`](https://looksphere.vercel.app/profile)), enjoy JWT stateless sessions, bcrypt password hashing, securely change password and email address directly from Settings ([`/settings`](https://looksphere.vercel.app/settings)), and view tracking.

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
- **Community & Templates:** [Support Desk](../.github/SUPPORT.md) | [PR Template](../.github/PULL_REQUEST_TEMPLATE.md) | [Bug Report](../.github/ISSUE_TEMPLATE/bug_report.md) | [Feature Request](../.github/ISSUE_TEMPLATE/feature_request.md)
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

