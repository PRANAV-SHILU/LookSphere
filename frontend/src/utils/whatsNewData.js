// frontend/src/utils/whatsNewData.js

export const WHATS_NEW_DATA = [
  {
    id: "sep-1-2026",
    date: "1 September 2026",
    title: "Profile Link Sharing, Dedicated Post View & URL Sharing",
    description: "Introduced instant profile link copying beside usernames, dedicated standalone post view pages, one-click post share link copying, and interactive full-screen modal inspection.",
    updates: [
      {
        tag: "Feature",
        page: "Profile",
        title: "Copy Profile Link",
        description: "Easily share user profiles with a dedicated copy link button positioned right beside usernames on both desktop and mobile views, featuring instant clipboard copying and visual confirmation.",
        link: "/profile",
      },
      {
        tag: "Feature",
        page: "Post Detail",
        title: "Dedicated Post View & Share Links",
        description: "Direct post URLs now load a focused post view with full description display, newline preservation, view count tracking, and instant full-screen modal expansion. You can copy post share links directly from the Feed card footer, the Post View footer, and the top-right header in the Post Detail modal.",
        link: "/posts/6a7de833ff797865982e1be3",
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
        tag: "Enhancement",
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
