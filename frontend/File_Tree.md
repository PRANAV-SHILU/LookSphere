<div align="right">Last Modified: 22-Oct-2026</div>

# File Tree: Frontend

**Root Path:** `LookSphere/frontend`

```text
├── ⚙️ .env.example
├── ⚙️ .gitignore
├── 📝 Design.md
├── 📄 eslint.config.js
├── 📝 File_Tree.md
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📁 public
│   ├── 🖼️ favicon.png
│   ├── 📄 manifest.json
│   ├── 🖼️ og-image.jpg
│   ├── 📄 robots.txt
│   └── 📄 sitemap.xml
├── 📝 README.md
├── 📁 src
│   ├── 📁 actions
│   │   ├── 📄 changeEmailAction.jsx
│   │   ├── 📄 changePasswordAction.jsx
│   │   ├── 📄 contactAction.jsx
│   │   ├── 📄 editProfileAction.jsx
│   │   ├── 📄 loginAction.jsx
│   │   ├── 📄 logoutAction.jsx
│   │   ├── 📄 registerAction.jsx
│   │   └── 📄 uploadAction.jsx
│   ├── 📁 components
│   │   ├── 📁 about
│   │   │   ├── 📄 AboutDeveloper.jsx
│   │   │   ├── 📄 AboutFeatures.jsx
│   │   │   ├── 📄 AboutHero.jsx
│   │   │   ├── 📄 AboutJourney.jsx
│   │   │   └── 📄 AboutTechStack.jsx
│   │   ├── 📁 admin
│   │   │   ├── 📄 AdminSidebar.jsx
│   │   │   └── 📄 ContactCard.jsx
│   │   ├── 📁 dashboard
│   │   │   ├── 📄 LatestPostsTab.jsx
│   │   │   ├── 📄 MetricsTab.jsx
│   │   │   └── 📄 RecentActivityTab.jsx
│   │   ├── 📄 ErrorBoundary.jsx
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 Header.jsx
│   │   ├── 📁 home
│   │   │   ├── 📄 ActivityFeed.jsx
│   │   │   ├── 📄 AppShowcase.jsx
│   │   │   ├── 📄 CTASection.jsx
│   │   │   ├── 📄 HeroSection.jsx
│   │   │   ├── 📄 HowItWorks.jsx
│   │   │   ├── 📄 ReleasesAndVision.jsx
│   │   │   ├── 📄 SecurityPrivacy.jsx
│   │   │   ├── 📄 SupportAndPolicies.jsx
│   │   │   ├── 📄 TechStack.jsx
│   │   │   ├── 📄 ThemePreview.jsx
│   │   │   ├── 📄 WhatYouCanDo.jsx
│   │   │   └── 📄 WhyLookSphere.jsx
│   │   ├── 📄 PageNotFound.jsx
│   │   ├── 📁 post
│   │   │   └── 📄 PostInteractions.jsx
│   │   └── 📁 profile
│   │       └── 📄 ProfileTabGrid.jsx
│   ├── 📁 context
│   │   └── 📄 ContactFormContext.jsx
│   ├── 📁 hooks
│   │   └── 📄 useDocumentMetadata.js
│   ├── 📁 Layout
│   │   └── 📄 AppLayout.jsx
│   ├── 📁 loaders
│   │   ├── 📄 adminContactLoader.jsx
│   │   ├── 📄 authLoader.jsx
│   │   ├── 📄 creatorsLoader.jsx
│   │   ├── 📄 dashboardLoader.jsx
│   │   ├── 📄 editProfileLoader.jsx
│   │   ├── 📄 feedLoader.jsx
│   │   ├── 📄 myInquiriesLoader.jsx
│   │   ├── 📄 postDetailLoader.jsx
│   │   ├── 📄 profileLoader.jsx
│   │   └── 📄 redirectIfAuthenticated.jsx
│   ├── 🎨 main.css
│   ├── 📄 main.jsx
│   ├── 📁 modals
│   │   ├── 📄 ConfirmationModal.jsx
│   │   ├── 📄 InteractionsListModal.jsx
│   │   ├── 📄 PostDetailModal.jsx
│   │   └── 📄 UploadMediaModal.jsx
│   ├── 📁 network
│   │   ├── 📄 adminApi.js
│   │   ├── 📄 apiClient.js
│   │   ├── 📄 authApi.js
│   │   ├── 📄 cacheInterceptor.js
│   │   ├── 📄 contactApi.js
│   │   ├── 📄 endpoints.js
│   │   ├── 📄 interactionApi.js
│   │   ├── 📄 postApi.js
│   │   └── 📄 userApi.js
│   ├── 📁 pages
│   │   ├── 📄 About.jsx
│   │   ├── 📄 AdminContact.jsx
│   │   ├── 📄 ChangeEmail.jsx
│   │   ├── 📄 ChangePassword.jsx
│   │   ├── 📄 ContactUs.jsx
│   │   ├── 📄 Creators.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 EditProfile.jsx
│   │   ├── 📄 Explore.jsx
│   │   ├── 📄 FAQ.jsx
│   │   ├── 📄 Feed.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 MyInquiries.jsx
│   │   ├── 📄 PostDetail.jsx
│   │   ├── 📄 PrivacyPolicy.jsx
│   │   ├── 📄 Profile.jsx
│   │   ├── 📄 Register.jsx
│   │   ├── 📄 Roadmap.jsx
│   │   ├── 📄 Settings.jsx
│   │   ├── 📄 TermsAndConditions.jsx
│   │   └── 📄 WhatsNew.jsx
│   ├── 📁 routes
│   │   └── 📄 router.jsx
│   ├── 📁 schema
│   │   ├── 📄 contactSchema.jsx
│   │   ├── 📄 editProfileSchema.jsx
│   │   ├── 📄 postSchema.jsx
│   │   └── 📄 registerSchema.jsx
│   ├── 📁 services
│   │   ├── 📄 adminService.js
│   │   ├── 📄 authService.js
│   │   ├── 📄 contactService.js
│   │   ├── 📄 interactionService.js
│   │   ├── 📄 postService.js
│   │   └── 📄 userService.js
│   ├── 📁 shared-components
│   │   ├── 📄 BackButton.jsx
│   │   ├── 📄 LegalDocument.jsx
│   │   ├── 📄 PageLoader.jsx
│   │   ├── 📄 SharedHomeComponents.jsx
│   │   └── 📄 SvgIcons.jsx
│   ├── 📁 skeletons
│   │   ├── 📄 CreatorsSkeleton.jsx
│   │   ├── 📄 ExploreSkeleton.jsx
│   │   ├── 📄 FeedSkeleton.jsx
│   │   ├── 📄 MyInquiriesSkeleton.jsx
│   │   └── 📄 ProfileSkeleton.jsx
│   └── 📁 utils
│       ├── 📄 aboutData.js
│       ├── 📄 cloudinaryOptimizer.js
│       ├── 📄 faqData.jsx
│       ├── 📄 feedRefresher.js
│       ├── 📄 interactionUtils.js
│       ├── 📄 privacyPolicyData.js
│       ├── 📄 roadmapData.js
│       ├── 📄 staticData.jsx
│       ├── 📄 styles.js
│       ├── 📄 termsAndConditionsData.js
│       └── 📄 whatsNewData.js
├── 📄 vercel.json
└── 📄 vite.config.js
```

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
*Component-driven hierarchy, optimized asset management, and predictable client state.*

</div>
<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://www.linkedin.com/in/pranavshilu/">Pranav Shilu</a>. All rights reserved.</b>
</div>

