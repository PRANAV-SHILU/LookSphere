<div align="right">Last Modified: 01-Nov-2026</div>

# 🛡️ Full-Stack Error Handling Architecture — LookSphere

A comprehensive engineering reference of fault tolerance, error boundary containment, graceful fallbacks, and resilient data flow implemented across LookSphere's frontend, network, and backend infrastructure.

---

## Table of Contents

- [1. Client-Side Compression & File Selection](#1-client-side-compression--file-selection)
  - [1.1 Corrupt Media Decode Fallback (img.onerror)](#11-corrupt-media-decode-fallback-imgonerror)
  - [1.2 Memory Leak Protection (Object URL Revocation)](#12-memory-leak-protection-object-url-revocation)
- [2. Frontend UI Rendering & Media Fallbacks](#2-frontend-ui-rendering--media-fallbacks)
  - [2.1 Avatar Broken Image Fallback (onError)](#21-avatar-broken-image-fallback-onerror)
  - [2.2 Poster-First Video Decoupling](#22-poster-first-video-decoupling)
  - [2.3 Hardware Video Decoder Exhaustion Guard](#23-hardware-video-decoder-exhaustion-guard)
- [3. Network Layer & API Resilience](#3-network-layer--api-resilience)
  - [3.1 Instant Offline Fast-Fail (0ms Rejection)](#31-instant-offline-fast-fail-0ms-rejection)
  - [3.2 Real-Time Online/Offline & Async Rejection Listeners](#32-real-time-onlineoffline--async-rejection-listeners)
  - [3.3 Database & Driver Error Sanitization](#33-database--driver-error-sanitization)
  - [3.4 Unified DataErrorState with Skeleton Retry Flow](#34-unified-dataerrorstate-with-skeleton-retry-flow)
  - [3.5 Mutation-Driven Cache Invalidation](#35-mutation-driven-cache-invalidation)
  - [3.6 Cached Profile Fallback](#36-cached-profile-fallback)
  - [4. Backend Server & Database Error Handling](#4-backend-server--database-error-handling)
  - [4.1 Global asyncHandler Controller Protection](#41-global-asynchandler-controller-protection)
  - [4.2 Mongoose Cascading Pre-Delete Cleanups](#42-mongoose-cascading-pre-delete-cleanups)
  - [4.3 Cloudinary Upload Rollback on DB Write Failure](#43-cloudinary-upload-rollback-on-db-write-failure)
- [Summary of Error Handling Implementations](#summary-of-error-handling-implementations)

---

## 1. Client-Side Compression & File Selection

**Files:** [`frontend/src/utils/imageCompressor.js`](./frontend/src/utils/imageCompressor.js), [`frontend/src/modals/UploadMediaModal.jsx`](./frontend/src/modals/UploadMediaModal.jsx), [`frontend/src/pages/EditProfile.jsx`](./frontend/src/pages/EditProfile.jsx)

### 1.1 Corrupt Media Decode Fallback (img.onerror)
If a user selects a corrupt, unreadable, or truncated image file that fails to render in canvas, the error event catches it, immediately revoking the object URL and resolving with the raw file.
- **Impact:** Reverts gracefully to the original file, ensuring user forms never hang or freeze on corrupted media.

### 1.2 Memory Leak Protection (Object URL Revocation)
Object URLs allocated for canvas decoding are revoked in both success (`img.onload`) and failure (`img.onerror`) handlers.
- **Impact:** Prevents browser heap memory leaks during repeated image uploads.

---

## 2. Frontend UI Rendering & Media Fallbacks

### 2.1 Avatar Broken Image Fallback (onError)
**File:** [`frontend/src/pages/Profile.jsx`](./frontend/src/pages/Profile.jsx)

If a user avatar URL 404s, is deleted, or network drops, an `onError` handler catches the failure and switches state to render a styled Lucide `<User />` icon.
- **Impact:** Renders a clean Lucide `<User />` icon instead of broken image graphics and disables empty zoom modal triggers.

### 2.2 Poster-First Video Decoupling
**Files:** [`frontend/src/pages/Explore.jsx`](./frontend/src/pages/Explore.jsx), [`frontend/src/pages/Profile.jsx`](./frontend/src/pages/Profile.jsx), [`frontend/src/pages/Feed.jsx`](./frontend/src/pages/Feed.jsx)

Video cards mount static `<img>` posters by default and only mount `<video>` tags during active playback.
- **Impact:** Eliminates video decoder initialization crashes, letterbox flashes, and blank rectangle visual errors while media loads.

### 2.3 Hardware Video Decoder Exhaustion Guard
**File:** [`frontend/src/pages/Feed.jsx`](./frontend/src/pages/Feed.jsx)

Coordinated video playback restricts active hardware video decoders to exactly 1 via centralized active video tracking in Feed.
- **Impact:** Prevents mobile GPU decoder limit crashes ($k \le 3$) and eliminates overlapping audio streams.

---

## 3. Network Layer & API Resilience

### 3.1 Instant Offline Fast-Fail (0ms Rejection)
**File:** [`frontend/src/network/apiClient.js`](./frontend/src/network/apiClient.js)

A pre-request interceptor checks client connectivity (`navigator.onLine`) before dispatching network sockets.
- **Impact:** Rejects offline requests instantly ($0\text{ms}$) instead of waiting for 15–30 second OS socket timeouts.

### 3.2 Real-Time Online/Offline & Async Rejection Listeners
**File:** [`frontend/src/Layout/AppLayout.jsx`](./frontend/src/Layout/AppLayout.jsx)

Registers global browser connectivity listeners for online and offline events, alongside an unhandled rejection listener that catches uncaught async errors.
- **Impact:** Informs users immediately of network disruptions and prevents unhandled promise rejections from freezing the component tree.

### 3.3 Database & Driver Error Sanitization
**Files:** [`frontend/src/network/apiClient.js`](./frontend/src/network/apiClient.js), [`frontend/src/shared-components/DataErrorState.jsx`](./frontend/src/shared-components/DataErrorState.jsx)

Intercepts technical backend strings (`ENOTFOUND`, `getaddrinfo`, `MongoNetworkError`, buffering timeouts) and translates them into user-friendly messages:
- `"Server is unable to connect to the database. Check connection."`
- **Impact:** Prevents cryptic technical driver logs from leaking into consumer UI notifications.

### 3.4 Unified DataErrorState with Skeleton Retry Flow
**File:** [`frontend/src/shared-components/DataErrorState.jsx`](./frontend/src/shared-components/DataErrorState.jsx)

Distinguishes offline status (`WifiOff`) from server outages (`AlertTriangle`). Clicking "Try Again" immediately remounts the skeleton loader while revalidating data.
- **Impact:** Eliminates static frozen error screens and provides immediate tactile feedback on retry.

### 3.5 Mutation-Driven Cache Invalidation
**File:** [`frontend/src/network/cacheInterceptor.js`](./frontend/src/network/cacheInterceptor.js)

Any modifying request (`POST`, `PATCH`, `DELETE`) immediately purges the client-side GET cache.
- **Impact:** Eliminates stale cache state inconsistencies across subsequent page views.

### 3.6 Cached Profile Fallback
**Files:** [`frontend/src/loaders/profileLoader.jsx`](./frontend/src/loaders/profileLoader.jsx), [`frontend/src/pages/Profile.jsx`](./frontend/src/pages/Profile.jsx)

Authenticated users view cached profile data if network requests drop.
- **Impact:** Prevents blank error screens when viewing own profile during temporary network drops.

---

## 4. Backend Server & Database Error Handling

### 4.1 Global asyncHandler Controller Protection
**Files:** All controllers (`Backend/src/controllers/user.controller.js`, `post.controller.js`)

All asynchronous controller endpoints are wrapped in a central `asyncHandler` middleware.
- **Impact:** Automatically routes unhandled promise rejections to Express error middleware, preventing Node.js process crashes.

### 4.2 Mongoose Cascading Pre-Delete Cleanups
**Files:** [`Backend/src/models/posts.model.js`](./Backend/src/models/posts.model.js), [`Backend/src/models/users.model.js`](./Backend/src/models/users.model.js)

Pre-delete middleware on user and post schemas automatically purges orphaned interaction records upon document deletion.
- **Impact:** Prevents null reference errors and orphaned pointer lookups during vectorized batch scans.

### 4.3 Cloudinary Upload Rollback on DB Write Failure
**Files:** [`Backend/src/controllers/post.controller.js`](./Backend/src/controllers/post.controller.js), [`Backend/src/utils/cloudinaryUpload.js`](./Backend/src/utils/cloudinaryUpload.js)

If creating a post in MongoDB fails after an image or video has already been uploaded to Cloudinary, the controller catches the error and immediately deletes the newly created asset.
- **Impact:** Prevents orphaned media assets from consuming cloud storage quotas when database operations fail.

---

## Summary of Error Handling Implementations

| Layer | Component / File | Safeguard Applied |
|---|---|---|
| **Client / File** | [`imageCompressor.js`](./frontend/src/utils/imageCompressor.js) | `img.onerror` fallback and object URL memory cleanup |
| **Frontend / UI** | [`Profile.jsx`](./frontend/src/pages/Profile.jsx) | `onError` fallback to Lucide `<User />` icon on broken avatars |
| **Frontend / Media** | [`Feed.jsx`](./frontend/src/pages/Feed.jsx) | Single-active player lock prevents mobile GPU decoder exhaustion crashes |
| **Network / Core** | [`apiClient.js`](./frontend/src/network/apiClient.js) | 0ms offline fast-fail, MongoDB driver error sanitization |
| **Network / State** | [`AppLayout.jsx`](./frontend/src/Layout/AppLayout.jsx) | Global `online`/`offline` and `unhandledrejection` listeners |
| **Network / Cache** | [`cacheInterceptor.js`](./frontend/src/network/cacheInterceptor.js) | Mutation-driven cache invalidation preventing desync |
| **Backend / Route** | All controllers | `asyncHandler` wrapper preventing unhandled promise process crashes |
| **Backend / Upload**| [`post.controller.js`](./Backend/src/controllers/post.controller.js) | Automatic Cloudinary asset deletion rollback on DB write failure |
| **Backend / Database**| Mongoose models | Cascading pre-delete hooks preventing null interaction references |

<br>
<br>

---

**📚 LookSphere Documentation Index:**
- **Core Documentation:** [Main Readme](./Readme.md) | [Algorithms](./Algorithms.md) | [Performance Optimization](./Performance_Optimization.md) | [Error Handling](./Error_Handling.md) | [Roadmap](./Roadmap.md) | [Resolved Issues](./Resolved_Issues.md) | [File Tree](./File_Tree.md) | [Improvements](./improvement.md)
- **Governance & Policies:** [Contributing Guidelines](./CONTRIBUTING.md) | [Code of Conduct](./CODE_OF_CONDUCT.md) | [Security Policy](./SECURITY.md) | [License](./LICENSE.md)
- **Community & Templates:** [Support Desk](./.github/SUPPORT.md) | [PR Template](./.github/PULL_REQUEST_TEMPLATE.md) | [Bug Report](./.github/ISSUE_TEMPLATE/bug_report.md) | [Feature Request](./.github/ISSUE_TEMPLATE/feature_request.md)
- **Frontend Architecture:** [Frontend Readme](./frontend/README.md) | [Design System](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md)
- **Backend Architecture:** [Backend Readme](./Backend/Readme.md) | [API Documentation](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)

---

<div align="center">

**LookSphere Engineering Documentation**  
*Comprehensive error resilience, graceful degradation, and bulletproof runtime stability.*

</div>
<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://www.linkedin.com/in/pranavshilu/">Pranav Shilu</a>. All rights reserved.</b>
</div>
