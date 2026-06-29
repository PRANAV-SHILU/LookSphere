// frontend/src/utils/privacyPolicyData.js

export const LAST_UPDATED = "June 28, 2026";

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



  /*
  {
    id: "data-retention",
    heading: "Data Retention & Deletion",
    subsections: [
      {
        id: "retention",
        subheading: null,
        content:
          "User accounts and all associated posts are retained in our database until manually removed. Profile images and uploaded media remain on Cloudinary until manually deleted. There is currently no self-service account or post deletion feature — this is planned for a future release. If you would like your account or any data removed before that feature is available, please contact us directly using the details in the Contact section and we will handle it promptly.",
        table: null,
      },
    ],
  },
  */

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
          "If you have any questions about this Privacy Policy or would like to request data deletion, you can reach Pranav Shilu through any of the following:",
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
