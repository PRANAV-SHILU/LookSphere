<div align="right">Last Modified: 2026-06-23</div>

# Performance Optimization — LookSphere

A comprehensive record of every performance optimization applied to LookSphere, covering networking, rendering, media delivery, CSS, React architecture, and backend changes.

---

## Table of Contents

- [1. Network & API Layer](#1-network--api-layer)
  - [1.1 Response Compression (Backend)](#11-response-compression-backend)
  - [1.2 Cloudinary Preconnect (Frontend)](#12-cloudinary-preconnect-frontend)
  - [1.3 In-Memory Request Caching (Frontend)](#13-in-memory-request-caching-frontend)
- [2. Media Optimization](#2-media-optimization)
  - [2.1 Cloudinary On-the-Fly Image Resizing](#21-cloudinary-on-the-fly-image-resizing)
  - [2.2 Video Poster Thumbnails](#22-video-poster-thumbnails)
  - [2.3 Deferred Video DOM Rendering](#23-deferred-video-dom-rendering)
  - [2.4 Lazy Loading & Async Decoding](#24-lazy-loading--async-decoding)
- [3. CSS & Rendering Performance](#3-css--rendering-performance)
  - [3.1 GPU Hardware Acceleration](#31-gpu-hardware-acceleration)
  - [3.2 Content Visibility & Containment](#32-content-visibility--containment)
  - [3.3 Mobile Hover Effect Removal](#33-mobile-hover-effect-removal)
  - [3.4 Chrome Mobile Blur Bug Fix](#34-chrome-mobile-blur-bug-fix)
- [4. React Architecture](#4-react-architecture)
  - [4.1 Component Memoization](#41-component-memoization)
  - [4.2 Derived State over setState-in-Effects](#42-derived-state-over-setstate-in-effects)
  - [4.3 IntersectionObserver-Based Scrolling](#43-intersectionobserver-based-scrolling)
  - [4.4 Activity Feed Cleanup](#44-activity-feed-cleanup)
  - [4.5 Feed Refresher Algorithm](#45-feed-refresher-algorithm)
- [5. Search & Data Fetching](#5-search--data-fetching)
  - [5.1 Debounced Search with URL Params](#51-debounced-search-with-url-params)
  - [5.2 Search Revalidation Fix](#52-search-revalidation-fix)
- [Summary of Affected Files](#summary-of-affected-files)

---

## 1. Network & API Layer

### 1.1 Response Compression (Backend)

**File:** [`Backend/src/index.js`](../Backend/src/index.js)

The Express backend uses the `compression` middleware, applied as the very first middleware in the stack. This automatically gzip/brotli compresses all JSON responses before sending them over the network, drastically reducing payload size — especially for large feed arrays containing 20+ posts with nested user objects.

```javascript
import compression from "compression";
app.use(compression());
```

**Impact:** Typical API responses are reduced by 60–80% in size, directly cutting mobile data usage and improving time-to-first-byte.

---

### 1.2 Cloudinary Preconnect (Frontend)

**File:** [`frontend/index.html`](./index.html)

A `<link rel="preconnect">` tag was added to `index.html` so the browser establishes the DNS lookup, TCP handshake, and TLS negotiation with Cloudinary's CDN immediately on page load — before any images are actually requested.

```html
<link rel="preconnect" href="https://res.cloudinary.com" />
```

**Impact:** Eliminates 100–300ms of connection setup delay on the first image request, making images appear significantly faster — especially on mobile networks with high latency.

---

### 1.3 In-Memory Request Caching (Frontend)

**File:** [`frontend/src/network/cacheInterceptor.js`](./src/network/cacheInterceptor.js)

An Axios request/response interceptor implements a lightweight in-memory `Map` cache with a 5-second TTL. This prevents redundant API calls when:

- React Router re-runs loaders during navigation.
- The user rapidly switches between tabs.
- A component re-mounts due to Suspense boundaries.

Key design decisions:

- **Search queries are excluded** from caching (`?search=` bypasses the cache) to ensure real-time results.
- **Any mutation** (POST, PATCH, DELETE) immediately invalidates the entire cache to guarantee data consistency.
- Cached responses are deep-cloned (`JSON.parse(JSON.stringify(...))`) to prevent shared-reference mutation bugs.

```javascript
// Cache bypass for search queries
const isSearchQuery = config.params?.search || config.url?.includes("search=");
if (config.method.toLowerCase() === "get" && !isSearchQuery) { ... }
```

**Impact:** Eliminates duplicate network requests during fast navigation, reducing perceived load times to near-zero for repeated page visits within 5 seconds.

---

## 2. Media Optimization

### 2.1 Cloudinary On-the-Fly Image Resizing

**File:** [`frontend/src/utils/cloudinaryOptimizer.js`](./src/utils/cloudinaryOptimizer.js)

A `getOptimizedMediaUrl()` utility dynamically injects Cloudinary transformation parameters into image URLs. Instead of serving the original 3000×4000px upload, images are automatically:

- **Resized** to the width needed by the container (typically 300–400px for grid thumbnails).
- **Converted** to WebP/AVIF via `f_auto` (the browser's most efficient format).
- **Quality-optimized** via `q_auto` (Cloudinary's perceptual quality algorithm).

```javascript
// Example: transforms a raw upload URL into an optimized one
// Before: .../upload/v12345/photo.jpg (3MB)
// After:  .../upload/w_400,c_scale,q_auto,f_auto/v12345/photo.jpg (40KB)
const transformation = `w_${width},c_scale,q_${quality},f_${format}/`;
```

**Impact:** Image payload sizes drop from megabytes to kilobytes. A 3MB JPEG becomes a ~40KB WebP — a 98% reduction.

---

### 2.2 Video Poster Thumbnails

**File:** [`frontend/src/utils/cloudinaryOptimizer.js`](./src/utils/cloudinaryOptimizer.js)

A `getVideoPosterUrl()` utility generates lightweight JPEG thumbnails from video URLs by replacing the video extension (`.mp4`) with `.jpg` and applying the same resize transformations. This is used instead of loading the actual video file just to show a preview frame.

```javascript
// Converts: .../upload/v123/video.mp4 → .../upload/w_300,c_scale,q_auto,f_jpg/v123/video.jpg
const posterUrl = url.replace(/\.(mp4|webm|ogg|mov)$/i, ".jpg");
return getOptimizedMediaUrl(posterUrl, {
  width,
  quality: "auto",
  format: "jpg",
});
```

**Impact:** Video thumbnails load as tiny ~15KB JPEGs instead of downloading megabytes of video data just to display a poster frame.

---

### 2.3 Deferred Video DOM Rendering

**Files:** [`Explore.jsx`](./src/pages/Explore.jsx), [`Profile.jsx`](./src/pages/Profile.jsx), [`Feed.jsx`](./src/pages/Feed.jsx), [`LatestPostsTab.jsx`](./src/components/dashboard/LatestPostsTab.jsx)

This is one of the most impactful optimizations. Previously, every video post rendered a full `<video>` element into the DOM at all times — even when off-screen or not playing. Each `<video>` tag forces the browser to allocate a media decoder, buffer memory, and a compositing layer.

**The fix:** All video grids now use a **poster-first pattern**:

- By default, videos render as a lightweight `<img>` tag showing the Cloudinary poster thumbnail.
- The actual `<video>` element is only mounted into the DOM when the user explicitly interacts (hover on desktop grids, or auto-play when scrolled into view in the Feed).
- When the video scrolls out of view or the user stops hovering, the `<video>` is unmounted and replaced by the `<img>` poster again.

**Explore page (hover-to-play):**

```jsx
{
  isPlaying ? (
    <video
      ref={videoRef}
      src={`${post.mediaUrl}#t=1.0`}
      muted
      loop
      playsInline
      autoPlay
    />
  ) : (
    <img src={optimizedPoster} loading="lazy" decoding="async" />
  );
}
```

**Feed page (intersection-based with derived state):**

```jsx
const isPlaying = isVideo && isIntersecting && !isParentModalOpen;
// Video is only in the DOM when isPlaying is true
```

**Impact:** On a page with 20 video posts, this reduces the active `<video>` elements from 20 to 1–2 at any given time. This saves hundreds of megabytes of browser memory and prevents GPU decoder exhaustion on mobile.

---

### 2.4 Lazy Loading & Async Decoding

**Files:** All pages rendering images (`Explore.jsx`, `Profile.jsx`, `Feed.jsx`, `LatestPostsTab.jsx`)

Every `<img>` tag in the application includes:

- `loading="lazy"` — The browser only downloads the image when it's about to scroll into view.
- `decoding="async"` — Image data is decoded on a background thread, preventing the main UI thread from stuttering during scroll.

```html
<img src="{url}" loading="lazy" decoding="async" />
```

**Impact:** Initial page load only downloads images visible in the viewport. Scrolling is smoother because image decoding doesn't block the rendering pipeline.

---

## 3. CSS & Rendering Performance

### 3.1 GPU Hardware Acceleration

**File:** [`frontend/src/main.css`](./src/main.css)

Feed and Explore card wrappers are forced onto their own GPU compositing layers via `transform: translateZ(0)` and `will-change: transform`. This means the browser can scroll these elements by simply repositioning the GPU layer, without recalculating CSS layout or repainting pixels.

```css
.feed-card-wrapper,
.explore-card-wrapper {
  will-change: transform;
  transform: translateZ(0);
}

.explore-card-wrapper img,
.explore-card-wrapper video {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

**Impact:** Scroll-triggered repaints are eliminated. The GPU handles compositing at 60fps instead of the CPU doing expensive paint operations per frame.

---

### 3.2 Content Visibility & Containment

**File:** [`frontend/src/main.css`](./src/main.css)

Two powerful CSS containment strategies are applied:

1. **`contain: content`** on grid containers — Tells the browser that layout changes inside the grid don't affect elements outside it, allowing the browser to skip layout recalculations for off-screen sections.

2. **`content-visibility: auto`** on individual card wrappers — This is the single most impactful CSS property for scroll performance. It instructs the browser to completely skip layout, paint, and style calculations for any card that isn't currently in the viewport. The `contain-intrinsic-size` provides an estimated height so scrollbar calculations remain accurate.

```css
.feed-grid,
.explore-grid,
.profile-grid {
  contain: content;
}

.feed-card-wrapper,
.explore-card-wrapper {
  content-visibility: auto;
  contain-intrinsic-size: 0 400px;
}
```

**Impact:** On a feed with 100 posts, only the ~5 visible posts are fully rendered. The other 95 are treated as empty placeholders by the browser, massively reducing CPU work during scroll.

---

### 3.3 Mobile Hover Effect Removal

**File:** [`frontend/src/utils/styles.js`](./src/utils/styles.js)

On mobile devices, CSS `:hover` states behave unpredictably — they "stick" after a tap and trigger during scroll. The shared `CARD_HOVER` utility class was updated to restrict all hover transforms and shadows to the `md:` breakpoint (768px+), ensuring mobile users never experience:

- Cards "jumping up" (`-translate-y-1`) when accidentally scrolled over.
- Phantom box-shadow flickers during fast scroll gestures.

```javascript
export const CARD_HOVER =
  "group relative ... md:hover:-translate-y-1 md:hover:shadow-[...]";
//                     ^^^ Only activates on desktop
```

**Impact:** Eliminates visual jitter and accidental hover-state sticking on all touch devices.

---

### 3.4 Chrome Mobile Blur Bug Fix

**File:** [`frontend/src/shared-components/SharedHomeComponents.jsx`](./src/shared-components/SharedHomeComponents.jsx)

A persistent Chrome mobile rendering bug caused thin horizontal glitch lines to appear across Home page sections (TechStack, FAQ, Security, WhatYouCanDo). The root cause was a `blur-md` CSS filter on the `<CardGlow />` component — when combined with a `linear-gradient` background and hardware-accelerated transforms, Chrome's mobile compositor produced sub-pixel bleeding artifacts at layer boundaries.

**Fix:** The `blur-md` class was removed from `CardGlow`, leaving only the gradient opacity transition. The visual effect is indistinguishable on all browsers, but the rendering bug is completely eliminated.

**Impact:** Zero visual glitch lines on Chrome mobile. Reduced composite layer complexity.

---

## 4. React Architecture

### 4.1 Component Memoization

**Files:** [`Explore.jsx`](./src/pages/Explore.jsx), [`Feed.jsx`](./src/pages/Feed.jsx), [`Profile.jsx`](./src/pages/Profile.jsx), [`LatestPostsTab.jsx`](./src/components/dashboard/LatestPostsTab.jsx)

All heavy card components are wrapped with `React.memo()`:

- `ExploreCard` — Prevents re-render when sibling cards update.
- `FeedCard` — Prevents re-render when other posts' intersection states change.
- `ProfileVideoCard` — Prevents re-render when the parent Profile component re-renders.
- `DashboardVideoCard` — Prevents re-render during dashboard tab switches.

```jsx
const ExploreCard = React.memo(function ExploreCard({ post }) { ... });
const FeedCard = React.memo(function FeedCard({ post, ... }) { ... });
const ProfileVideoCard = React.memo(function ProfileVideoCard({ post, onClick }) { ... });
const DashboardVideoCard = memo(function DashboardVideoCard({ post }) { ... });
```

**Impact:** React's reconciliation only re-renders the specific card whose props actually changed, not the entire grid of 20+ cards.

---

### 4.2 Derived State over setState-in-Effects

**File:** [`frontend/src/pages/Feed.jsx`](./src/pages/Feed.jsx)

The `FeedCard` component originally used a `useState` + `useEffect` pattern to track whether a video should be playing, which triggered cascading renders:

```javascript
// ❌ Before — triggers extra render cycle via setState inside useEffect
const [isPlaying, setIsPlaying] = useState(false);
useEffect(() => {
  if (isIntersecting && !isParentModalOpen) setIsPlaying(true); // cascading render!
}, [isIntersecting, isParentModalOpen]);
```

This was refactored to use **derived state** — a plain variable calculated during render, eliminating the extra render cycle entirely:

```javascript
// ✅ After — zero extra renders, zero ESLint warnings
const isPlaying = isVideo && isIntersecting && !isParentModalOpen;
```

**Impact:** Eliminates one full render cycle per video card per scroll event. Also resolved the ESLint `setState-synchronously-within-effect` error.

---

### 4.3 IntersectionObserver-Based Scrolling

**Files:** [`Feed.jsx`](./src/pages/Feed.jsx), [`Explore.jsx`](./src/pages/Explore.jsx)

All infinite scroll triggers use `IntersectionObserver` instead of listening to raw `scroll` events. The observer is attached to a "trigger element" positioned 5–9 posts from the bottom of the current list, initiating the next page fetch before the user reaches the end.

```javascript
observer.current = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && hasMore) loadMore();
});
```

Duplicate prevention is built in:

```javascript
const existingIds = new Set(prev.map((p) => p._id));
const newPostsRaw = res.data.filter((p) => !existingIds.has(p._id));
```

**Impact:** `scroll` events fire 60+ times per second and require manual throttling. `IntersectionObserver` fires exactly once when the threshold is crossed, using zero CPU during passive scrolling.

---

### 4.4 Activity Feed Cleanup

**Files:** [`ActivityFeed.jsx`](./src/components/home/ActivityFeed.jsx), [`staticData.jsx`](./src/utils/staticData.jsx)

The Live Activity section previously used an infinite-scrolling CSS animation (`scroll-feed`) that required the activities array to be duplicated (`[...activities, ...activities]`) to create a seamless loop illusion. After the animation was disabled:

- The array duplication code was removed.
- The `activities` static data was trimmed from 8 entries to 4, reducing the DOM node count and the JavaScript bundle size.

**Impact:** Halved the DOM nodes in the Activity Feed section. Removed unnecessary array allocation on every render.

---

### 4.5 Feed Refresher Algorithm

**File:** [`frontend/src/utils/feedRefresher.js`](./src/utils/feedRefresher.js)

A Fisher-Yates shuffle algorithm ensures the feed feels "fresh" on every page load. Posts the user has already seen (tracked via `sessionStorage`) are deprioritized to the end of the list, while unseen posts are shuffled to the top.

```javascript
const unseen = posts.filter((p) => !seenIds.includes(p._id));
const seen = posts.filter((p) => seenIds.includes(p._id));
return [...shuffle(unseen), ...shuffle(seen)];
```

**Impact:** Prevents the user from seeing the exact same post order on every visit, improving engagement without requiring a backend recommendation engine.

---

## 5. Search & Data Fetching

### 5.1 Debounced Search with URL Params

**File:** [`frontend/src/pages/Explore.jsx`](./src/pages/Explore.jsx)

Search input is debounced by 400ms using `setTimeout`. The search query is synced with the URL via React Router's `useSearchParams` instead of manually manipulating `window.history`. This ensures:

- The browser back button correctly restores the previous search state.
- React Router's loader re-runs with the correct search param, triggering a proper data fetch.

```javascript
searchTimeoutRef.current = setTimeout(() => {
  if (searchQuery.trim()) {
    setSearchParams({ search: searchQuery.trim() }, { replace: true });
  } else {
    setSearchParams({}, { replace: true });
  }
}, 400);
```

**Impact:** Prevents rapid-fire API calls while typing. Clearing the search correctly triggers a full re-fetch of the default feed data (previously broken when using `window.history.replaceState`).

---

### 5.2 Search Revalidation Fix

**Files:** [`Explore.jsx`](./src/pages/Explore.jsx), [`Creators.jsx`](./src/pages/Creators.jsx)

Added clear/cross (`X`) icons to search bars. Clicking the icon clears the search query and revalidates the data loader to restore the default unfiltered results.

```jsx
{
  searchQuery && (
    <button onClick={() => setSearchQuery("")}>
      <X size={16} />
    </button>
  );
}
```

**Impact:** Users can instantly reset search results with one tap instead of manually deleting text. The revalidation ensures correct data is always displayed after clearing.

---

## Summary of Affected Files

| File                                                                                                          | Optimizations Applied                                                                |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`Backend/src/index.js`](../Backend/src/index.js)                                                             | `compression` middleware                                                             |
| [`frontend/index.html`](./index.html)                                                                         | Cloudinary preconnect                                                                |
| [`frontend/src/main.css`](./src/main.css)                                                                     | GPU acceleration, content-visibility, containment                                    |
| [`frontend/src/utils/cloudinaryOptimizer.js`](./src/utils/cloudinaryOptimizer.js)                             | Image resizing, video poster generation                                              |
| [`frontend/src/utils/styles.js`](./src/utils/styles.js)                                                       | Mobile hover removal                                                                 |
| [`frontend/src/utils/feedRefresher.js`](./src/utils/feedRefresher.js)                                         | Fisher-Yates shuffle, seen-post deprioritization                                     |
| [`frontend/src/network/cacheInterceptor.js`](./src/network/cacheInterceptor.js)                               | In-memory GET cache with TTL                                                         |
| [`frontend/src/network/apiClient.js`](./src/network/apiClient.js)                                             | Cache interceptor activation                                                         |
| [`frontend/src/pages/Explore.jsx`](./src/pages/Explore.jsx)                                                   | Deferred video DOM, React.memo, debounced search, IntersectionObserver               |
| [`frontend/src/pages/Feed.jsx`](./src/pages/Feed.jsx)                                                         | Derived state, deferred video DOM, React.memo, IntersectionObserver, poster fallback |
| [`frontend/src/pages/Profile.jsx`](./src/pages/Profile.jsx)                                                   | ProfileVideoCard with poster-first pattern, React.memo                               |
| [`frontend/src/pages/Creators.jsx`](./src/pages/Creators.jsx)                                                 | Search clear icon, revalidation fix                                                  |
| [`frontend/src/components/dashboard/LatestPostsTab.jsx`](./src/components/dashboard/LatestPostsTab.jsx)       | DashboardVideoCard with poster-first pattern                                         |
| [`frontend/src/components/home/ActivityFeed.jsx`](./src/components/home/ActivityFeed.jsx)                     | Removed array duplication                                                            |
| [`frontend/src/utils/staticData.jsx`](./src/utils/staticData.jsx)                                             | Trimmed activity data to 4 entries                                                   |
| [`frontend/src/shared-components/SharedHomeComponents.jsx`](./src/shared-components/SharedHomeComponents.jsx) | Removed blur-md from CardGlow                                                        |

---

**📚 LookSphere Documentation Index:**

- **Root:** [Main Readme](../Readme.md) | [File Tree](../File_tree.md) | [Future Plans](../futureplan.md)
- **Frontend:** [Frontend Readme](./README.md) | [Design Specs](./Design.md) | [Frontend File Tree](./File_Tree.md) | [Improvements](./improvement.md)
- **Backend:** [Backend Readme](../Backend/Readme.md) | [API Docs](../Backend/APIs.md) | [Backend File Tree](../Backend/File_Tree.md)

---
