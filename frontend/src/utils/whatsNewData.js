// frontend/src/utils/whatsNewData.js

export const WHATS_NEW_DATA = [
  {
    id: "july-1-2026",
    date: "1 July 2026",
    title: "Added Major Information Related Pages",
    description: "Added several new core pages to complete the platform's information architecture and provide better resources for users.",
    updates: [
      {
        tag: "Feature",
        title: "New Roadmap Page",
        description: "A completely revamped roadmap showcasing our upcoming features, performance targets, and community goals in a beautiful bento-box layout.",
        link: "/roadmap",
      },
      {
        tag: "Feature",
        title: "About Us Page",
        description: "Added an extensive About Us page detailing our mission, technology stack, and the journey from a simple authentication app to LookSphere.",
        link: "/about-us",
      },
      {
        tag: "Feature",
        title: "Detailed FAQ Page",
        description: "Integrated a dedicated FAQ page to provide quick answers to common questions about accounts, security, and privacy.",
        link: "/faq",
      },
      {
        tag: "Feature",
        title: "Privacy Policy",
        description: "Added a comprehensive Privacy Policy outlining data processing, database storage, and third-party integrations (Cloudinary, Vercel, Render).",
        link: "/privacy-policy",
      },
      {
        tag: "Feature",
        title: "Terms & Conditions",
        description: "Established Terms & Conditions explaining the rules of use for LookSphere, clarifying it is a non-commercial educational project.",
        link: "/terms-and-conditions",
      },
      {
        tag: "Enhancement",
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
        title: "GPU Rasterization Mitigation",
        description: "Resolved severe screen tearing and horizontal line glitches on mid-tier mobile GPUs by adjusting glassmorphism and transparent backgrounds on touch devices.",
      },
      {
        tag: "Enhancement",
        title: "Mobile Hover Effects",
        description: "Stripped out hover-based interactions on mobile to prevent sticky-state bugs and improve scroll performance.",
      },
      {
        tag: "Enhancement",
        title: "Chrome Mobile Blur Fix",
        description: "Replaced performance-heavy backdrop filters on modals with high-opacity solid backgrounds for a smoother experience on Chromium browsers.",
      }
    ]
  }
];
