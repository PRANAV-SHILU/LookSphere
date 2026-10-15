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
│   │   ├── 📄 loginSchema.jsx
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
│   │   ├── 📄 DashboardSkeleton.jsx
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
