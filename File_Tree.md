<div align="right">Last Modified: 2026-06-23</div>

# File Tree: LookSphere

**Root Path:** `LookSphere`

```text
├── ⚙️ .gitignore
├── 📁 Backend
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 APIs.md
│   ├── 📝 File_Tree.md
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📝 Readme.md
│   └── 📁 src
│       ├── 📁 config
│       │   ├── 📄 cloudinaryConfig.js
│       │   └── 📄 db.js
│       ├── 📁 controllers
│       │   ├── 📄 admin.controller.js
│       │   ├── 📄 auth.controller.js
│       │   ├── 📄 post.controller.js
│       │   └── 📄 user.controller.js
│       ├── 📄 index.js
│       ├── 📁 middlewares
│       │   ├── 📄 auth.middleware.js
│       │   ├── 📄 role.middleware.js
│       │   └── 📄 upload.middleware.js
│       ├── 📁 models
│       │   ├── 📄 posts.model.js
│       │   └── 📄 users.model.js
│       ├── 📁 routes
│       │   ├── 📄 admin.route.js
│       │   ├── 📄 auth.routes.js
│       │   ├── 📄 post.routes.js
│       │   └── 📄 user.routes.js
│       ├── 📁 utils
│       │   ├── 📄 asyncHandler.js
│       │   ├── 📄 cloudinaryUpload.js
│       │   └── 📄 errorHandler.js
│       └── 📁 validators
│           ├── 📄 auth.validator.js
│           ├── 📄 post.validator.js
│           └── 📄 user.validator.js
├── 📝 File_Tree.md
├── 📁 frontend
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 Design.md
│   ├── 📄 eslint.config.js
│   ├── 📝 File_Tree.md
│   ├── 📝 improvement.md
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📁 public
│   │   └── 🖼️ favicon.png
│   ├── 📝 README.md
│   ├── 📁 src
│   │   ├── 📁 actions
│   │   │   ├── 📄 editProfileAction.jsx
│   │   │   ├── 📄 loginAction.jsx
│   │   │   ├── 📄 logoutAction.jsx
│   │   │   ├── 📄 registerAction.jsx
│   │   │   └── 📄 uploadAction.jsx
│   │   ├── 📁 components
│   │   │   ├── 📁 dashboard
│   │   │   │   ├── 📄 LatestPostsTab.jsx
│   │   │   │   ├── 📄 MetricsTab.jsx
│   │   │   │   └── 📄 RecentActivityTab.jsx
│   │   │   ├── 📄 ErrorBoundary.jsx
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📁 home
│   │   │   │   ├── 📄 ActivityFeed.jsx
│   │   │   │   ├── 📄 AppShowcase.jsx
│   │   │   │   ├── 📄 CTASection.jsx
│   │   │   │   ├── 📄 FAQSection.jsx
│   │   │   │   ├── 📄 FuturePlans.jsx
│   │   │   │   ├── 📄 HeroSection.jsx
│   │   │   │   ├── 📄 HowItWorks.jsx
│   │   │   │   ├── 📄 SecurityPrivacy.jsx
│   │   │   │   ├── 📄 TechStack.jsx
│   │   │   │   ├── 📄 ThankYouSection.jsx
│   │   │   │   ├── 📄 ThemePreview.jsx
│   │   │   │   ├── 📄 WhatYouCanDo.jsx
│   │   │   │   └── 📄 WhyLookSphere.jsx
│   │   │   └── 📄 PageNotFound.jsx
│   │   ├── 📁 hooks
│   │   │   └── 📄 useDocumentMetadata.js
│   │   ├── 📁 Layout
│   │   │   └── 📄 AppLayout.jsx
│   │   ├── 📁 loaders
│   │   │   ├── 📄 authLoader.jsx
│   │   │   ├── 📄 creatorsLoader.jsx
│   │   │   ├── 📄 dashboardLoader.jsx
│   │   │   ├── 📄 editProfileLoader.jsx
│   │   │   ├── 📄 feedLoader.jsx
│   │   │   ├── 📄 profileLoader.jsx
│   │   │   └── 📄 redirectIfAuthenticated.jsx
│   │   ├── 🎨 main.css
│   │   ├── 📄 main.jsx
│   │   ├── 📁 modals
│   │   │   ├── 📄 ConfirmationModal.jsx
│   │   │   ├── 📄 PostDetailModal.jsx
│   │   │   └── 📄 UploadMediaModal.jsx
│   │   ├── 📁 network
│   │   │   ├── 📄 adminApi.js
│   │   │   ├── 📄 apiClient.js
│   │   │   ├── 📄 authApi.js
│   │   │   ├── 📄 cacheInterceptor.js
│   │   │   ├── 📄 endpoints.js
│   │   │   ├── 📄 postApi.js
│   │   │   └── 📄 userApi.js
│   │   ├── 📁 pages
│   │   │   ├── 📄 Creators.jsx
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   ├── 📄 EditProfile.jsx
│   │   │   ├── 📄 Explore.jsx
│   │   │   ├── 📄 Feed.jsx
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 Profile.jsx
│   │   │   └── 📄 Register.jsx
│   │   ├── 📁 routes
│   │   │   └── 📄 router.jsx
│   │   ├── 📁 schema
│   │   │   ├── 📄 editProfileSchema.jsx
│   │   │   ├── 📄 loginSchema.jsx
│   │   │   ├── 📄 postSchema.jsx
│   │   │   └── 📄 registerSchema.jsx
│   │   ├── 📁 services
│   │   │   ├── 📄 adminService.js
│   │   │   ├── 📄 authService.js
│   │   │   ├── 📄 postService.js
│   │   │   └── 📄 userService.js
│   │   ├── 📁 shared-components
│   │   │   ├── 📄 BackButton.jsx
│   │   │   └── 📄 SharedHomeComponents.jsx
│   │   ├── 📁 skeletons
│   │   │   ├── 📄 CreatorsSkeleton.jsx
│   │   │   ├── 📄 DashboardSkeleton.jsx
│   │   │   ├── 📄 ExploreSkeleton.jsx
│   │   │   ├── 📄 FeedSkeleton.jsx
│   │   │   └── 📄 ProfileSkeleton.jsx
│   │   └── 📁 utils
│   │       ├── 📄 cloudinaryOptimizer.js
│   │       ├── 📄 feedRefresher.js
│   │       ├── 📄 staticData.jsx
│   │       └── 📄 styles.js
│   ├── 📄 vercel.json
│   └── 📄 vite.config.js
├── 📝 roadmap.md
├── 📝 performance_optimization.md
├── 📝 resolved_issues.md
└── 📝 Readme.md
```

---

_Generated by Antigravity IDE_

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](./Readme.md) | [File Tree](./File_Tree.md) | [Roadmap](./roadmap.md) | [Performance](./performance_optimization.md) | [Resolved Issues](./resolved_issues.md)
- **Frontend:** [Frontend Readme](./frontend/README.md) | [Design Specs](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md) | [Improvements](./frontend/improvement.md)
- **Backend:** [Backend Readme](./Backend/Readme.md) | [API Docs](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)
---
