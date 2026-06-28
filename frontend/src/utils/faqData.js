import {
  Shield,
  User,
  HelpCircle,
  Layers,
  Star,
  Sparkles,
  Mail,
  Rocket,
} from "lucide-react";

export const LAST_UPDATED = "June 28, 2026";

export const FAQ_CATEGORIES = [
  {
    id: "common",
    title: "Common FAQs",
    icon: Sparkles,
    questions: [
      {
        q: "Is LookSphere free to use?",
        a: "Yes, LookSphere is entirely free. It is hosted purely for educational and demonstration purposes. There are no advertisements, paid subscriptions, or commercial transactions on this platform.",
      },
      {
        q: "How are my password and login details secured?",
        a: "We prioritize security. Passwords are never stored in plain text. When you create an account, your password is immediately salted and hashed using bcrypt on the server side. Additionally, we use secure JSON Web Tokens (JWT) stored in HTTP-only cookies to handle authentication, protecting you from Cross-Site Scripting (XST) and other common vulnerabilities.",
      },
      {
        q: "Does LookSphere track my browsing or sell my data?",
        a: "Absolutely not. We do not use tracking cookies for marketing, nor do we partner with advertising networks. The cookies used are strictly functional (maintaining your active login session). Your profile and data are never sold or shared.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    icon: Mail,
    questions: [
      {
        q: "How do I report bugs, security concerns, or inappropriate content?",
        a: "If you encounter a bug, a visual layout issue, a security concern, or inappropriate user-generated content, you can report it directly by submitting the details on our internal /contact-us form, emailing us at pranavshilu@zohomail.in, or by sending a direct message on LinkedIn (linkedin.com/in/pranavshilu). All reports are reviewed promptly.",
      },
      {
        q: "How can I contact the developer or submit feedback?",
        a: "You can reach out through any of the following channels:\n\n1. Contact Form: Navigate to our internal /contact-us page.\n2. Email: Send an email directly to pranavshilu@zohomail.in.\n3. LinkedIn: Connect at linkedin.com/in/pranavshilu.",
      },
      {
        q: "How long does it typically take to receive a response?",
        a: "We aim to respond to all your inquiries and contact form submissions within 24 to 48 hours. LinkedIn connection requests and messages are reviewed daily.",
      },
    ],
  },
  {
    id: "general",
    title: "General & Project",
    icon: HelpCircle,
    questions: [
      {
        q: "What is LookSphere?",
        a: "LookSphere is a personal full-stack social media portfolio project created and maintained by Pranav Shilu. It serves as a comprehensive demonstration of modern web engineering, showcasing features like responsive user feeds, image/video uploads, custom profile personalization, and real-time interaction capabilities.",
      },
      {
        q: "Can I use LookSphere as my primary social media platform?",
        a: "Yes! You are fully allowed and welcome to use LookSphere. You can register an account, customize your profile, upload posts/videos, and interact with other users. However, since this is a developer portfolio project, we recommend not using it as your sole storage for critical or irreplaceable personal media, as the database or server may undergo maintenance updates.",
      },
      {
        q: "Will my account or posts be deleted during system updates?",
        a: "No! We do not delete user accounts or posts during standard system updates. Your profile data, posts, comments, and media are safely stored in our persistent database and Cloudinary storage. However, since this is a developer portfolio project, we still recommend keeping backups of your most important media files in case of server migration resets.",
      },
      {
        q: "Can I clone or contribute to LookSphere?",
        a: "Yes! LookSphere is open source. You are welcome to clone the repository from GitHub, set up your own local environment (by copying .env.example), and run the developer build. Pull requests and feature suggestions are always welcome!",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Customization",
    icon: User,
    questions: [
      {
        q: "How do I register an account on LookSphere?",
        a: "To register, click the 'Register' button on the navbar. You will need to provide a unique username, a valid email address, and a secure password. Once registered, you can login and begin customizing your profile immediately.",
      },
      {
        q: "How can I edit my profile information (including username and email)?",
        a: "Once logged in, click your avatar or username to visit your profile page, then click the 'Edit Profile' button. From there, you can upload a new profile picture, customize your bio/tagline, update your contact links, and change your registered username and email address directly.",
      },
      {
        q: "Are there plans to support Two-Step Verification (2FA)?",
        a: "Yes! Two-Step Verification (2FA) is on our active project roadmap. This feature will provide an extra layer of security for your account by requiring a secondary code (e.g., sent via email or an authenticator app) during login.",
      },
      {
        q: "What customization themes does LookSphere support?",
        a: "LookSphere features a full Dark/Light theme toggle, along with multiple premium accent palettes (Ocean Blue, Royal Purple, Emerald Green, and Crimson Sunset) to fully personalize your dashboard and feed interfaces.",
      },
    ],
  },
  {
    id: "features",
    title: "Posting & Interactions",
    icon: Star,
    questions: [
      {
        q: "What type of media files can I upload in my posts?",
        a: "LookSphere supports standard image formats (JPEG, PNG, WebP) with a maximum size limit of 10 MB, and short video formats (MP4, WebM) with a maximum size limit of 100 MB. All uploaded files are automatically processed and optimized by our media partner, Cloudinary, to ensure fast loading speeds for everyone.",
      },
      {
        q: "Can I edit a post after it has been published?",
        a: "Yes, you can edit the captions, tags, and description fields of any post you have created. Simply go to your profile, find the post you want to change, and click the edit option.",
      },
      {
        q: "What is the 'Spotlights' feature?",
        a: "Spotlights is an upcoming short-form video feed feature designed for LookSphere. It will allow creators to showcase vertical videos in a scrollable, high-engagement feed layout.",
      },
      {
        q: "Can I save posts to view them later?",
        a: "An upcoming update will add a 'Save Post' icon to all cards. Saved posts will be kept privately in a dedicated tab on your profile page so you can quickly refer back to them.",
      },
      {
        q: "Is there a follow/unfollow system?",
        a: "Yes, we are actively implementing a social graph feature. This will allow you to follow other creators, and their posts will be prioritized on your personalized home feed.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    questions: [
      {
        q: "How do I protect my privacy?",
        a: "We prioritize your privacy. LookSphere never exposes your sensitive info—our backend strictly strips out hashed passwords before sending data. We also enforce strict CORS origin policies to block unauthorized websites from accessing the API.",
      },
      {
        q: "Are my login sessions secure?",
        a: "Yes! We use stateless JSON Web Tokens (JWT) configured to expire after 1 year. Your token is generated uniquely using a secret key on our server, ensuring tamper-proof authentication.",
      },
      {
        q: "Where is my uploaded media stored?",
        a: "All uploaded images and videos are securely offloaded to Cloudinary, a industry-leading cloud media management platform. This keeps our database lightweight and ensures your files are distributed globally via high-speed Content Delivery Networks (CDNs) for lightning-fast loads.",
      },
      {
        q: "How does LookSphere prevent common web attacks like XSS or Injection?",
        a: "Our frontend utilizes React's built-in automatic HTML sanitization to prevent Cross-Site Scripting (XSS). On the backend, Express middleware checks and sanitizes inputs, and the Mongoose ODM naturally parameterizes queries to prevent NoSQL injection attacks.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Stack & Hosting",
    icon: Layers,
    questions: [
      {
        q: "What technologies make up the LookSphere ecosystem?",
        a: "LookSphere is a modern MERN-stack application:\n\n• Frontend: React.js, React Router, Tailwind CSS, Lucide React icons, and Vite build tool.\n• Backend: Node.js runtime, Express framework, and Mongoose ODM.\n• Database: MongoDB Atlas cloud cluster.\n• Authentication: JWT (JSON Web Tokens) & bcrypt encryption.",
      },
      {
        q: "How does LookSphere optimize network usage?",
        a: "We use Brotli and Gzip compression middleware on our Express backend to compress API responses, saving up to 80% bandwidth over the network. In addition, images are lazy-loaded and decoded asynchronously in the browser.",
      },
      {
        q: "Where is LookSphere hosted?",
        a: "The React client application is optimized and hosted globally on Vercel's edge network. The Node.js Express server is containerized and hosted on Render. MongoDB database is managed by MongoDB Atlas across secure cloud availability zones.",
      },
      {
        q: "Is the source code for LookSphere open source?",
        a: "Yes! You can explore the codebase, check out the backend API design, or leave feedback on the GitHub repository at github.com/PRANAV-SHILU/LookSphere.",
      },
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap & Future Plans",
    icon: Rocket,
    questions: [
      {
        q: "What is the roadmap for Communication features on LookSphere?",
        a: "We plan to implement the following features to improve platform communication:\n\n• Contact Us: A fully functional messaging system for direct messages.\n• Live Notifications: Real-time action logs and activity alerts.\n• Admin Notes: Support for customized notifications sent directly by administrators to specific user feeds.\n• Mail Services: Automated email flows for registration, security changes, and notifications.",
      },
      {
        q: "What security and authentication upgrades are planned?",
        a: "To ensure user protection, our active roadmap includes:\n\n• Reset & Forgot Password: Secure, token-based verification flows to recover accounts.\n• Google OAuth: One-click registration and login via Google credentials.\n• Two-Step Verification (2FA): Secondary passcode checks to safeguard active accounts.",
      },
      {
        q: "What community and social features will be added?",
        a: "We are preparing to launch a range of social mechanisms:\n\n• Spotlights: A high-engagement vertical layout feed for short-form videos.\n• User Interactions: Liking, commenting, and sharing tools on posts and creator profiles.\n• Social Graph: Follow/unfollow mechanics to curate a personalized home feed.\n• Content Library: Ability to bookmark and save posts inside a private profile tab.\n• Microblogging Feed: A text-based timeline feed (similar to Twitter) for rapid sharing.\n• Leaderboard: A comparative ranking page highlighting top posts, top creators, and highly viewed profiles.",
      },
    ],
  },
];
