import {
  CheckCircle,
  Shield,
  KeyRound,
  Fingerprint,
  Mail,
  Bell,
  MessageSquare,
  MessageCircle,
  Sparkles,
  Trophy,
  ThumbsUp,
  UserPlus,
  Bookmark,
  Zap,
  FileText,
  Trash2,
  Database,
  BarChart3,
  Search,
  Globe,
  Settings,
  Link,
  Share2,
} from "lucide-react";

// ============================================================================
// PRIVACY POLICY DATA
// ============================================================================

export const LAST_UPDATED = "October 22, 2026";

export const PRIVACY_INTRO = {
  heading: "Privacy Policy",
  description:
    "LookSphere is a personal full-stack portfolio project created and maintained solely for educational and demonstration purposes. It is not a commercial service or product. This Privacy Policy explains what information is processed when you use LookSphere, how it is stored, and how it is used. By creating an account or using the platform, you agree to the practices described here.",
};

export const PRIVACY_SECTIONS = [
  {
    id: "information-you-provide",
    heading: "Information You Provide",
    subsections: [
      {
        id: "account-registration",
        subheading: "Account Registration",
        content:
          "When you create an account, we request your username, email address, and password. Your password is never stored in plain text — it is hashed using bcrypt with 12 salt rounds before being saved to our database. The raw password is never logged or transmitted after the initial request.",
        table: null,
      },
      {
        id: "profile-information",
        subheading: "Profile Information",
        content:
          "When you update your profile, you may optionally provide a tagline (up to 80 characters), a bio (up to 300 characters), and a profile image. These are stored in our database and displayed on your profile page.",
        table: null,
      },
      {
        id: "posts",
        subheading: "Posts",
        content:
          "When you create a post, we store the uploaded media file (image or video), an optional caption (up to 500 characters), and optional alt text (up to 50 characters). Alt text is used for accessibility and it will be displayed on your posts.",
        table: null,
      },
    ],
  },
  {
    id: "data-sharing",
    heading: "We Do Not Share or Sell Your Data",
    subsections: [
      {
        id: "no-sharing",
        subheading: null,
        content:
          "We do not sell, rent, share, or trade your personal information or uploaded media with any third party for commercial purposes. Your profile data, email, and uploaded images and videos are used solely to operate the platform. They are never used for advertising, never shared with data brokers, and never analyzed beyond what is necessary to display your content on LookSphere.",
        table: null,
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    subsections: [
      {
        id: "cookies-info",
        subheading: null,
        content:
          "LookSphere does not use cookies of any kind — no session cookies, no tracking cookies, no advertising cookies. Authentication is handled entirely through a JWT token stored in your browser's localStorage, not a cookie.",
        table: null,
      },
    ],
  },
  {
    id: "how-we-use-information",
    heading: "How We Use Your Information",
    subsections: [
      {
        id: "usage",
        subheading: null,
        content: null,
        list: [
          {
            label: "Username & email",
            detail: "Identifying your account and enabling login.",
          },
          {
            label: "Password (hashed)",
            detail:
              "Authenticating you securely via bcrypt comparison. Never stored or transmitted in plain text.",
          },
          {
            label: "Profile image, tagline & bio",
            detail:
              "Displayed on your profile page and in the Creators directory.",
          },
          {
            label: "Posts (media, caption, alt text)",
            detail:
              "Displayed on the Feed, Explore pages and on the creators profile page.",
          },
          {
            label: "Post interactions (sparks, reshares, archives)",
            detail:
              "Storing your reactions and archives to compute aggregate counts, show lists of users who engaged with posts.",
          },
          {
            label: "JWT token",
            detail:
              "Authenticating protected API requests such as editing your profile, uploading posts, and editing posts.",
          },
          {
            label: "Theme preference",
            detail:
              "Restoring your dark or light mode choice on every visit without requiring you to re-select it.",
          },
          {
            label: "Seen post IDs",
            detail:
              "Prioritizing posts you have not yet seen at the top of your feed during the current session.",
          },
        ],
        table: null,
      },
    ],
  },
  {
    id: "browser-storage",
    heading: "Browser Storage",
    subsections: [
      {
        id: "what-we-store",
        subheading: "What We Store Locally",
        content:
          "LookSphere uses your browser's localStorage and sessionStorage to keep you logged in and improve your experience. No tracking cookies are used. The following table outlines exactly what is stored, where, and when it is removed:",
        table: {
          headers: ["Storage", "Key", "What Is Stored", "When Cleared"],
          rows: [
            [
              "localStorage",
              "user",
              "Your user object — username, email, role, profile image URL, view counts",
              "When you log out",
            ],
            [
              "localStorage",
              "jwtToken",
              "Your JWT authentication token (1-year expiry)",
              "When you log out",
            ],
            [
              "localStorage",
              "theme",
              "Your dark or light theme preference",
              "Never — persists across sessions",
            ],
            [
              "sessionStorage",
              "seenPostIds",
              "IDs of posts viewed in the current session, used to prioritize unseen posts in the feed",
              "When the browser tab is closed",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "data-security",
    heading: "Data Security",
    subsections: [
      {
        id: "security-measures",
        subheading: null,
        content: null,
        list: [
          {
            label: "Password hashing",
            detail:
              "All passwords are hashed with bcrypt (12 salt rounds) before storage. The hashed password is never included in any API response.",
          },
          {
            label: "JWT authentication",
            detail:
              "Tokens are signed with a server-side secret key and expire after one year.",
          },
          {
            label: "CORS policy",
            detail:
              "The API is configured to only accept requests from the designated frontend origin, blocking unauthorized cross-origin access.",
          },
          {
            label: "HTTPS",
            detail:
              "All traffic between your browser and LookSphere is encrypted via HTTPS, enforced by Vercel (frontend) and Render (backend).",
          },
          {
            label: "No plain-text secrets in code",
            detail:
              "All sensitive configuration — database URIs, JWT secrets, Cloudinary API keys — are stored in environment variables and never committed to source code.",
          },
        ],
        table: null,
      },
    ],
  },
  {
    id: "third-party-services",
    heading: "Third-Party Services",
    subsections: [
      {
        id: "cloudinary",
        subheading: "Cloudinary",
        content:
          "All uploaded images and videos are stored on Cloudinary's servers. When you upload media, Cloudinary processes and re-encodes the file to apply automatic quality and format optimizations (such as converting to WebP or AVIF). Your media files are hosted on Cloudinary's CDN and served directly from there. Cloudinary's own privacy policy governs how they handle this data. Files are named using your username and user ID.",
        table: null,
      },
      {
        id: "vercel",
        subheading: "Vercel",
        content:
          "The LookSphere frontend is hosted on Vercel. Vercel Analytics and Speed Insights are active on the platform — these collect anonymized, aggregate usage data such as page views and performance metrics. No personally identifiable information is included in these analytics. Vercel's privacy policy governs this data.",
        table: null,
      },
      {
        id: "render",
        subheading: "Render",
        content:
          "The LookSphere backend API is hosted on Render. API requests are processed on Render's infrastructure. Render's privacy policy governs how server-level data is handled.",
        table: null,
      },
      {
        id: "google-fonts",
        subheading: "Google Fonts",
        content:
          "LookSphere loads the Inter typeface from Google Fonts on every page visit. This establishes a connection to Google's servers, which may log your IP address per Google's privacy policy. No data from LookSphere is shared with Google through this connection.",
        table: null,
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    subsections: [
      {
        id: "policy-changes",
        subheading: null,
        content:
          "We may update this Privacy Policy from time to time. When we do, the 'Last Updated' date at the top of this page will reflect the most recent revision. Continued use of LookSphere after any changes constitutes acceptance of the updated policy.",
        table: null,
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    subsections: [
      {
        id: "contact-info",
        subheading: null,
        content:
          "If you have any questions about this Privacy Policy or would like to request data deletion, you can reach Pranav Shilu through any of the following. Responses to your Contact Us submissions will be delivered to your My Inquiries dashboard (/my-inquiries) and via email.",
        table: null,
        links: [
          {
            label: "Contact Us",
            href: "/contact-us",
            display: "Contact Form",
          },
          {
            label: "Email",
            href: "mailto:pranavshilu@zohomail.in",
            display: "pranavshilu@zohomail.in",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/pranavshilu/",
            display: "linkedin.com/in/pranavshilu",
          },
          {
            label: "GitHub",
            href: "https://github.com/PRANAV-SHILU",
            display: "github.com/PRANAV-SHILU",
          },
        ],
      },
    ],
  },
];

// ============================================================================
// TERMS AND CONDITIONS DATA
// ============================================================================

export const TNC_INTRO = {
  heading: "Terms and Conditions",
  description:
    "Welcome to LookSphere! These Terms and Conditions outline the rules and regulations for the use of our platform. LookSphere is a personal full-stack portfolio project created and maintained solely for educational and demonstration purposes. It is not a commercial service or product. By accessing or using this website, we assume you accept these terms and conditions.",
};

export const TNC_SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    subsections: [
      {
        id: "acceptance-1",
        content:
          "By accessing, registering for, or using LookSphere, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of the terms and conditions stated on this page, do not continue to use LookSphere.",
      },
      {
        id: "acceptance-2",
        content:
          'Please be advised that LookSphere is a personal portfolio project. As such, the platform is provided on an "AS IS" basis without any Service Level Agreements (SLAs).',
      },
    ],
  },
  {
    id: "accounts",
    heading: "User Accounts & Eligibility",
    subsections: [
      {
        id: "accounts-1",
        subheading: "Account Security",
        content:
          "You are responsible for maintaining the confidentiality of your account credentials (password and email). You agree to accept responsibility for any and all activities or actions that occur under your account. LookSphere cannot and will not be liable for any loss or damage arising from your failure to adequately secure your account.",
      },
      {
        id: "accounts-2",
        subheading: "Accuracy of Information",
        content:
          "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.",
      },
    ],
  },
  {
    id: "ugc",
    heading: "User-Generated Content & Acceptable Use",
    subsections: [
      {
        id: "ugc-1",
        content:
          'LookSphere allows users to post, link, store, share, and interact with content (including sparking, resharing, and saving posts), as well as make available certain information, text, graphics, videos, or other material ("Content").',
      },
      {
        id: "ugc-2",
        subheading: "Content Ownership",
        content:
          "You retain any and all of your rights to any Content you submit, post or display on or through LookSphere and you are responsible for protecting those rights.",
      },
      {
        id: "ugc-3",
        subheading: "License Granted to LookSphere",
        content:
          "By posting Content on LookSphere, you grant us the right and license to publicly perform, publicly display, reproduce, and distribute such Content on and through the platform for the purpose of operating the service.",
      },
      {
        id: "ugc-4",
        subheading: "Prohibited Content",
        content: "You agree not to post any Content that is:",
        list: [
          {
            label: "Illegal",
            detail:
              "Content that violates any local, national, or international law, including copyright infringement.",
          },
          {
            label: "Abusive",
            detail:
              "Content that is harassing, threatening, bullying, or promotes hate speech against any group or individual.",
          },
          {
            label: "Explicit",
            detail:
              "NSFW (Not Safe For Work), pornographic, or highly graphic material.",
          },
          {
            label: "Malicious",
            detail:
              "Spam, phishing links, malware, or attempts to scrape or manipulate the platform.",
          },
        ],
      },
      {
        id: "ugc-5",
        content:
          "We reserve the right (but not the obligation) to review, modify, or remove any Content that violates these Terms or is otherwise objectionable, in our sole discretion.",
      },
    ],
  },
  {
    id: "ip",
    heading: "Intellectual Property",
    subsections: [
      {
        id: "ip-1",
        content:
          "The LookSphere platform, including its original code, design, layout, look, appearance, and graphics (excluding user-generated content), are owned by Pranav Shilu and are protected by intellectual property laws. You may not copy, reverse-engineer, or distribute any part of LookSphere without prior written permission.",
      },
    ],
  },
  {
    id: "warranty",
    heading: "Disclaimer of Warranties",
    subsections: [
      {
        id: "warranty-1",
        content:
          'Your use of LookSphere is at your sole risk. The platform is provided on an "AS IS" and "AS AVAILABLE" basis. LookSphere is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.',
      },
      {
        id: "warranty-2",
        content:
          "As a demonstration project, we cannot guarantee constant uptime, perfect security, or that all features will work without issues.",
      },
    ],
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    subsections: [
      {
        id: "liability-1",
        content:
          "In no event shall Pranav Shilu, nor its developers, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the platform; (ii) any conduct or content of any third party on the platform; (iii) any content obtained from the platform; and (iv) unauthorized access, use or alteration of your transmissions or content.",
      },
      {
        id: "liability-2",
        content:
          "Please note that as a portfolio project, the database and server environments may be wiped, reset, or taken offline without notice. We are not responsible for any lost user data, images, or account information.",
      },
    ],
  },
  {
    id: "termination",
    heading: "Account Termination",
    subsections: [
      {
        id: "termination-1",
        content:
          "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
      },
      {
        id: "termination-2",
        content:
          "Upon termination, your right to use LookSphere will immediately cease. If you wish to terminate your account, you may simply discontinue using the platform or request account deletion by submitting a request via our Account Termination form (/account-termination) from Settings. You will be notified via email.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to Terms",
    subsections: [
      {
        id: "changes-1",
        content:
          "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our platform after those revisions become effective, you agree to be bound by the revised terms.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact Information",
    subsections: [
      {
        id: "contact-1",
        content:
          "If you have any questions about these Terms and Conditions or the LookSphere project, please feel free to reach out. Responses to your Contact Us submissions will be delivered to your My Inquiries dashboard (/my-inquiries) and via email.",
        links: [
          {
            label: "Contact Us",
            href: "/contact-us",
            display: "Contact Form",
          },
          {
            label: "Email",
            display: "pranavshilu@zohomail.in",
            href: "mailto:pranavshilu@zohomail.in",
          },
          {
            label: "LinkedIn",
            display: "linkedin.com/in/pranavshilu",
            href: "https://www.linkedin.com/in/pranavshilu/",
          },
          {
            label: "GitHub",
            display: "github.com/PRANAV-SHILU",
            href: "https://github.com/PRANAV-SHILU",
          },
        ],
      },
    ],
  },
];

// ============================================================================
// ROADMAP DATA
// ============================================================================

export const COMPLETED_FEATURES = {
  id: "completed",
  title: "Completed & Achieved",
  icon: CheckCircle,
  color: "#6366F1", // Indigo
  items: [
    {
      icon: ThumbsUp,
      title: "Post Interactions & User Lists",
      description:
        "Seamless mechanism to Spark, Reshare, and Archive posts with dedicated modal inspect lists for Sparks and Reshares.",
    },
    {
      icon: Zap,
      title: "Cross-Tab State Synchronization",
      description:
        "Real-time optimistic interaction state synchronization across Images, Videos, Reshares, Archived, and Sparks tabs.",
    },
    {
      icon: Link,
      title: "Profile & Post Link Sharing",
      description:
        "Instant shareable URLs for profile and post with standalone post view page and clipboard notifications.",
    },
    {
      icon: Settings,
      title: "Change Email & Password",
      description:
        "Secure & authenticated flow to change Email & Password directly from Settings with real-time validation.",
    },
    {
      icon: MessageSquare,
      title: "Contact Us & Inquiries",
      description:
        "Interactive categorized contact form and My Inquiry page to track admin responses.",
    },
  ],
};

export const ROADMAP_CATEGORIES = [
  {
    id: "security",
    title: "Security & Authentication",
    icon: Shield,
    color: "#10B981", // Emerald
    items: [
      {
        icon: KeyRound,
        title: "Password Recovery",
        description:
          "Secure password reset and forgot password flow with email verification.",
      },
      {
        icon: Globe,
        title: "Google OAuth",
        description:
          "Seamless one-click sign-up and login via Google integration.",
      },
      {
        icon: Fingerprint,
        title: "Two-Step Verification",
        description:
          "Enhanced account security through 2FA/MFA implementation.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Support",
    icon: MessageCircle,
    color: "#3B82F6", // Blue
    items: [
      {
        icon: MessageSquare,
        title: "Real-time Chat",
        description:
          "Instant messaging between users powered by WebSockets for a seamless experience.",
      },
      {
        icon: Bell,
        title: "Advanced Notifications",
        description:
          "A dedicated live notification page and modal with read/unread states, including direct admin notes/responses.",
      },
      {
        icon: Mail,
        title: "Email Integrations",
        description:
          "General mail sending functionality for updates, reports, and administrative alerts.",
      },
    ],
  },
  {
    id: "community",
    title: "Community & Engagement",
    icon: Sparkles,
    color: "#8B5CF6", // Violet
    items: [
      {
        icon: UserPlus,
        title: "Follow System",
        description:
          "Build your network by following favorite creators and curating your personalized feed.",
      },
      {
        icon: Sparkles,
        title: "Spotlights",
        description:
          "A dedicated short-video feed for fast-paced, engaging content discovery.",
      },
      {
        icon: Trophy,
        title: "Leaderboards",
        description:
          "Global rankings for top posts by impressions and views, top creators, and most-viewed profiles.",
      },
      {
        icon: MessageCircle,
        title: "Comments",
        description:
          "Comment on your favorite posts to interact with fellow creators.",
      },
      {
        icon: FileText,
        title: "Text-Based Feed",
        description:
          "A streamlined feed dedicated to short-form text thoughts and discussions (similar to Twitter).",
      },
      {
        icon: Fingerprint,
        title: "Unique View Tracking",
        description:
          "Tracking 'Unique Views' exclusively once per user along with detailed insights modal showing who viewed profile or posts.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance & Core",
    icon: Zap,
    color: "#F59E0B", // Amber
    items: [
      {
        icon: Zap,
        title: "Optimistic UI",
        description:
          "Background operations for media uploads and post edits, ensuring the UI never blocks your workflow.",
      },
      {
        icon: Globe,
        title: "Advanced SEO",
        description:
          "Dynamic meta tags and server-side optimizations to ensure LookSphere content is easily discoverable.",
      },
    ],
  },
];

// ============================================================================
// WHAT'S NEW DATA
// ============================================================================

export const WHATS_NEW_DATA = [
  {
    id: "oct-22-2026",
    date: "22 October 2026",
    title: "Post Interactions, User Lists Modal & Link Sharing",
    description:
      "Engage with content using Spark, Reshare, and Archive, inspect interaction participant lists with interactive modals, enjoy real-time cross-tab synchronization, view your sparked posts in a dedicated Sparks profile tab, and share profiles and posts with dedicated direct links.",
    updates: [
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Spark Posts",
        description:
          "Express appreciation and support for creator posts with instant, optimistic sparking. All your sparked posts are automatically collected in a dedicated Sparks tab at the end of your own profile for easy revisiting.",
        link: "/feed",
      },
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Reshare Posts",
        description:
          "Amplify standout posts across LookSphere by resharing them. Reshared posts are automatically added to your dedicated Reshares profile tab for your audience to discover.",
        link: "/feed",
      },
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Archive Posts",
        description:
          "Privately bookmark posts to revisit whenever you want. Archived posts are stored securely under your account and accessible exclusively from the Archived tab on your profile page.",
        link: "/profile",
      },
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Spark & Reshare User Lists Modal",
        description:
          "Click the down-arrow count badge on any post to inspect the list of users who sparked or reshared it. Powered by portal-based modal overlays, instant client-side memory caching, fast profile navigation buttons, and real-time cache invalidation on self-toggle.",
        link: "/feed",
      },
      {
        tag: "Performance",
        page: "Profile",
        title: "Cross-Tab Interaction Synchronization",
        description:
          "Interacting with posts (sparks, reshares, archives) now reflects across the entire application — including Images, Videos, Reshares, Archived, and Sparks tabs, as well as the Post Detail modal — without requiring page reloads.",
        link: "/profile",
      },
      {
        tag: "Feature",
        page: "Profile & Post Detail",
        title: "Profile & Post Link Sharing & Dedicated Post View",
        description:
          "Easily share content with dedicated copy link buttons beside profile usernames, one-click post share links across feed and modal footers, and direct standalone post URLs with view count tracking and full-screen modal expansion.",
        link: "/profile",
      },
    ],
  },
  {
    id: "aug-15-2026",
    date: "15 August 2026",
    title: "Support & Inquiries System, Password & Email Management",
    description:
      "A complete support system — submit inquiries with categories and media, track their status, and receive admin responses. Plus secure account management for passwords and email.",
    updates: [
      {
        tag: "Feature",
        page: "Settings",
        title: "Change Email Address",
        description:
          "A brand-new Change Email page lets you securely update your account email. It requires password verification for security, and includes real-time validation — matching confirmation, duplicate detection, and format checks.",
        link: "/settings/change-email",
      },
      {
        tag: "Feature",
        page: "Settings",
        title: "Change Password",
        description:
          "You can now securely change your password directly from the account settings page, with complete session management to keep your account safe.",
        link: "/settings",
      },
      {
        tag: "Feature",
        page: "Contact Us",
        title: "Dynamic Contact Form",
        description:
          "A fully categorized contact form with support for text messages, image uploads, and video attachments. Choose from General, Feedback, Suggestion, Issue, Security, or Business Inquiry categories.",
        link: "/contact-us",
      },
      {
        tag: "Feature",
        page: "My Inquiries",
        title: "My Inquiries Dashboard",
        description:
          "Track all your submitted inquiries with a Pending/Responded toggler. View admin responses directly on your inquiry cards, or get a friendly 'Not responded yet' status for pending tickets.",
        link: "/my-inquiries",
      },
      {
        tag: "Performance",
        page: "Feed",
        title: "Smoother Feed Scrolling & Video Playback",
        description:
          "Fixed layout shift caused by posts jumping during load by using fixed-height media containers in both skeletons and cards. Videos now autoplay with sound as you scroll — only one plays at a time, and the previous pauses automatically. Added theme-aware letterbox backgrounds and native video poster attributes to eliminate visual flashes during transitions.",
        link: "/feed",
      },
    ],
  },
  {
    id: "july-1-2026",
    date: "1 July 2026",
    title: "Added Major Information Related Pages",
    description:
      "Added several new core pages to complete the platform's information architecture and provide better resources for users.",
    updates: [
      {
        tag: "Feature",
        page: "Roadmap",
        title: "New Roadmap Page",
        description:
          "A completely revamped roadmap showcasing our upcoming features, performance targets, and community goals in a beautiful bento-box layout.",
        link: "/roadmap",
      },
      {
        tag: "Feature",
        page: "About",
        title: "About Us Page",
        description:
          "Added an extensive About Us page detailing our mission, technology stack, and the journey from a simple authentication app to LookSphere.",
        link: "/about-us",
      },
      {
        tag: "Feature",
        page: "FAQ",
        title: "Detailed FAQ Page",
        description:
          "Integrated a dedicated FAQ page to provide quick answers to common questions about accounts, security, and privacy.",
        link: "/faq",
      },
      {
        tag: "Feature",
        page: "Privacy Policy",
        title: "Privacy Policy",
        description:
          "Added a comprehensive Privacy Policy outlining data processing, database storage, and third-party integrations (Cloudinary, Vercel, Render).",
        link: "/privacy-policy",
      },
      {
        tag: "Feature",
        page: "Terms & Conditions",
        title: "Terms & Conditions",
        description:
          "Established Terms & Conditions explaining the rules of use for LookSphere, clarifying it is a non-commercial educational project.",
        link: "/terms-and-conditions",
      },
      {
        tag: "Enhancement",
        page: null,
        title: "Footer Navigation",
        description:
          "Expanded the global footer with organized links to all our new pages. Click here to see the new layout.",
        scrollToFooter: true,
      },
    ],
  },
  {
    id: "jun-23-2026",
    date: "23 June 2026",
    title: "Performance & UI Fixes",
    description:
      "A major focus on mobile optimization, resolving GPU rendering glitches, and enhancing the overall touchscreen experience.",
    updates: [
      {
        tag: "Bugfix",
        page: null,
        title: "GPU Rasterization Mitigation",
        description:
          "Resolved severe screen tearing and horizontal line glitches on mid-tier mobile GPUs by adjusting glassmorphism and transparent backgrounds on touch devices.",
      },
      {
        tag: "Enhancement",
        page: null,
        title: "Mobile Hover Effects",
        description:
          "Stripped out hover-based interactions on mobile to prevent sticky-state bugs and improve scroll performance.",
      },
      {
        tag: "Enhancement",
        page: null,
        title: "Chrome Mobile Blur Fix",
        description:
          "Replaced performance-heavy backdrop filters on modals with high-opacity solid backgrounds for a smoother experience on Chromium browsers.",
      },
    ],
  },
];
