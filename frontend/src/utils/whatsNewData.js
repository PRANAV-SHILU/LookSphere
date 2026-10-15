// frontend/src/utils/whatsNewData.js

export const WHATS_NEW_DATA = [
  {
    id: "oct-22-2026",
    date: "22 October 2026",
    title: "Post Interactions, User Lists Modal & Link Sharing",
    description: "Engage with content using Spark, Reshare, and Archive, inspect interaction participant lists with interactive modals, enjoy real-time cross-tab synchronization, and share profiles and posts with dedicated direct links.",
    updates: [
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Spark Posts",
        description: "Express appreciation and support for creator posts with instant, optimistic sparking. Clicking the Spark icon immediately updates interaction counts and highlights your reaction.",
        link: "/feed",
      },
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Reshare Posts",
        description: "Amplify standout posts across LookSphere by resharing them. Reshared posts are automatically added to your dedicated Reshares profile tab for your audience to discover.",
        link: "/feed",
      },
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Archive Posts",
        description: "Privately bookmark posts to revisit whenever you want. Archived posts are stored securely under your account and accessible exclusively from the Archived tab on your profile page.",
        link: "/profile",
      },
      {
        tag: "Feature",
        page: "Feed & Post Detail",
        title: "Spark & Reshare User Lists Modal",
        description: "Click the down-arrow count badge on any post to inspect the list of users who sparked or reshared it. Powered by portal-based modal overlays, instant client-side memory caching, fast profile navigation buttons, and real-time cache invalidation on self-toggle.",
        link: "/feed",
      },
      {
        tag: "Performance",
        page: "Profile",
        title: "Cross-Tab Interaction Synchronization",
        description: "Interacting with posts (sparks, reshares, archives) now reflects across the entire application — including Images, Videos, Reshares, and Archived tabs, as well as the Post Detail modal — without requiring page reloads.",
        link: "/profile",
      },
      {
        tag: "Feature",
        page: "Profile & Post Detail",
        title: "Profile & Post Link Sharing & Dedicated Post View",
        description: "Easily share content with dedicated copy link buttons beside profile usernames, one-click post share links across feed and modal footers, and direct standalone post URLs with view count tracking and full-screen modal expansion.",
        link: "/profile",
      },
    ],
  },
  {
    id: "aug-15-2026",
    date: "15 August 2026",
    title: "Support & Inquiries System, Password & Email Management",
    description: "A complete support system — submit inquiries with categories and media, track their status, and receive admin responses. Plus secure account management for passwords and email.",
    updates: [
      {
        tag: "Feature",
        page: "Settings",
        title: "Change Email Address",
        description: "A brand-new Change Email page lets you securely update your account email. It requires password verification for security, and includes real-time validation — matching confirmation, duplicate detection, and format checks.",
        link: "/settings/change-email",
      },
      {
        tag: "Feature",
        page: "Settings",
        title: "Change Password",
        description: "You can now securely change your password directly from the account settings page, with complete session management to keep your account safe.",
        link: "/settings",
      },
      {
        tag: "Feature",
        page: "Contact Us",
        title: "Dynamic Contact Form",
        description: "A fully categorized contact form with support for text messages, image uploads, and video attachments. Choose from General, Feedback, Suggestion, Issue, Security, or Business Inquiry categories.",
        link: "/contact-us",
      },
      {
        tag: "Feature",
        page: "My Inquiries",
        title: "My Inquiries Dashboard",
        description: "Track all your submitted inquiries with a Pending/Responded toggler. View admin responses directly on your inquiry cards, or get a friendly 'Not responded yet' status for pending tickets.",
        link: "/my-inquiries",
      },
      {
        tag: "Performance",
        page: "Feed",
        title: "Smoother Feed Scrolling & Video Playback",
        description: "Fixed layout shift caused by posts jumping during load by using fixed-height media containers in both skeletons and cards. Videos now autoplay with sound as you scroll — only one plays at a time, and the previous pauses automatically. Added theme-aware letterbox backgrounds and native video poster attributes to eliminate visual flashes during transitions.",
        link: "/feed",
      },
    ],
  },
  {
    id: "july-1-2026",
    date: "1 July 2026",
    title: "Added Major Information Related Pages",
    description: "Added several new core pages to complete the platform's information architecture and provide better resources for users.",
    updates: [
      {
        tag: "Feature",
        page: "Roadmap",
        title: "New Roadmap Page",
        description: "A completely revamped roadmap showcasing our upcoming features, performance targets, and community goals in a beautiful bento-box layout.",
        link: "/roadmap",
      },
      {
        tag: "Feature",
        page: "About",
        title: "About Us Page",
        description: "Added an extensive About Us page detailing our mission, technology stack, and the journey from a simple authentication app to LookSphere.",
        link: "/about-us",
      },
      {
        tag: "Feature",
        page: "FAQ",
        title: "Detailed FAQ Page",
        description: "Integrated a dedicated FAQ page to provide quick answers to common questions about accounts, security, and privacy.",
        link: "/faq",
      },
      {
        tag: "Feature",
        page: "Privacy Policy",
        title: "Privacy Policy",
        description: "Added a comprehensive Privacy Policy outlining data processing, database storage, and third-party integrations (Cloudinary, Vercel, Render).",
        link: "/privacy-policy",
      },
      {
        tag: "Feature",
        page: "Terms & Conditions",
        title: "Terms & Conditions",
        description: "Established Terms & Conditions explaining the rules of use for LookSphere, clarifying it is a non-commercial educational project.",
        link: "/terms-and-conditions",
      },
      {
        tag: "Enhancement",
        page: null,
        title: "Footer Navigation",
        description: "Expanded the global footer with organized links to all our new pages. Click here to see the new layout.",
        scrollToFooter: true,
      }
    ]
  },
  {
    id: "jun-23-2026",
    date: "23 June 2026",
    title: "Performance & UI Fixes",
    description: "A major focus on mobile optimization, resolving GPU rendering glitches, and enhancing the overall touchscreen experience.",
    updates: [
      {
        tag: "Bugfix",
        page: null,
        title: "GPU Rasterization Mitigation",
        description: "Resolved severe screen tearing and horizontal line glitches on mid-tier mobile GPUs by adjusting glassmorphism and transparent backgrounds on touch devices.",
      },
      {
        tag: "Enhancement",
        page: null,
        title: "Mobile Hover Effects",
        description: "Stripped out hover-based interactions on mobile to prevent sticky-state bugs and improve scroll performance.",
      },
      {
        tag: "Enhancement",
        page: null,
        title: "Chrome Mobile Blur Fix",
        description: "Replaced performance-heavy backdrop filters on modals with high-opacity solid backgrounds for a smoother experience on Chromium browsers.",
      }
    ]
  }
];
