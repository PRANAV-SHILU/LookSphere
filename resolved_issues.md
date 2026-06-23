<div align="right">Last Modified: 2026-06-23</div>

# Resolved Issues & Bug Fixes — LookSphere

This document records the major bugs, UI glitches, and functional issues that have been successfully resolved across the platform.

---

## Table of Contents

- [1. Visual & Rendering Glitches](#1-visual--rendering-glitches)
  - [1.1 GPU Rasterization Glitch Mitigation](#11-gpu-rasterization-glitch-mitigation)
  - [1.2 Chrome Mobile Blur Bug Fix](#12-chrome-mobile-blur-bug-fix)
  - [1.3 Mobile Hover Effect Removal](#13-mobile-hover-effect-removal)
- [2. Functional & Logic Fixes](#2-functional--logic-fixes)
  - [2.1 Infinite Scroll Array Duplication](#21-infinite-scroll-array-duplication)
  - [2.2 Search Revalidation & Empty State](#22-search-revalidation--empty-state)
  - [2.3 Accidental Mobile Clicks](#23-accidental-mobile-clicks)
  - [2.4 Mobile Toast Notification Sticking](#24-mobile-toast-notification-sticking)

---

## 1. Visual & Rendering Glitches

### 1.1 GPU Rasterization Glitch Mitigation
**Files:** `frontend/src/main.css`, Home page components

On mid-tier mobile GPUs (such as the Mali-G52) running Chrome with GPU Rasterization enabled, rendering complex transparent layers, vector borders, and linear gradients at deep scroll offsets triggers screen-wide horizontal rendering seam glitches.

**Fixes:**
1. **Targeted Touchscreen Media Query:** Adjusted the mobile media query in `main.css` to target both small viewports and all touchscreen devices: `@media (max-width: 768px), (pointer: coarse)`.
2. **Solid Card & Page Backgrounds:** Overrode the transparent backgrounds of `.glass`, `.liquid-glass`, and `body` to use 100% solid, non-transparent background variables on mobile/touchscreen devices.
3. **Card/Item Border Removal:** Set `border: none !important;` on `.glass` and `.liquid-glass` elements on mobile/touch screens to disable sub-pixel vector border drawing.
4. **Disabled Card Glows:** Disabled the `<CardGlow />` hover gradient overlay entirely on mobile screens (`display: none !important`).
5. **Badge Blur Removal:** Removed absolute-positioned `backdrop-blur-md` and borders from the "Very Soon" badge inside `ActivityFeed.jsx` on mobile.

**Impact:** Eliminates all screen-wide horizontal tearing and grid glitches in mobile Chrome.

---

### 1.2 Chrome Mobile Blur Bug Fix
**File:** `frontend/src/shared-components/SharedHomeComponents.jsx`

A persistent Chrome mobile rendering bug caused thin horizontal glitch lines across Home page sections. The root cause was a `blur-md` CSS filter on the `<CardGlow />` component when combined with a `linear-gradient` background.

**Fix:** The `blur-md` class was removed from `CardGlow`, leaving only the gradient opacity transition. 

---

### 1.3 Mobile Hover Effect Removal
**File:** `frontend/src/utils/styles.js`

On mobile devices, CSS `:hover` states behave unpredictably — they "stick" after a tap and trigger during scroll. 

**Fix:** The shared `CARD_HOVER` utility class was updated to restrict all hover transforms and shadows to the `md:` breakpoint (768px+), ensuring mobile users never experience cards "jumping up" (`-translate-y-1`) when accidentally scrolled over.

---

## 2. Functional & Logic Fixes

### 2.1 Infinite Scroll Array Duplication
**File:** `frontend/src/components/home/ActivityFeed.jsx`

The activity feed occasionally appended duplicate items when fetching the next page of results during infinite scroll.

**Fix:** Implemented duplicate prevention logic by maintaining a `Set` of existing IDs and filtering new incoming data against it before updating the state.

---

### 2.2 Search Revalidation & Empty State
**Files:** `frontend/src/pages/Explore.jsx`, `frontend/src/pages/Creators.jsx`

Clearing the search input did not correctly re-fetch the default feed data, leaving the user stuck with previous search results.

**Fix:** Search input is now synced with URL parameters. Clearing the search explicitly triggers a refetch of the default un-filtered feed. Added a 'clear search' cross icon to search bars to quickly reset the state.

---

### 2.3 Accidental Mobile Clicks
**File:** `frontend/src/pages/Explore.jsx`

The `displayUser` hover overlays on Explore cards were triggering accidentally on touch devices while scrolling.

**Fix:** Hid the user overlay on mobile devices to prevent unintentional profile navigation during feed scroll.

---

### 2.4 Mobile Toast Notification Sticking
**File:** `frontend/src/Layout/AppLayout.jsx`

Toast notifications (`react-toastify`) were getting stuck on mobile devices and refusing to auto-close. This occurs because touch events trigger the library's `pauseOnHover` and `draggable` behaviors. On touch devices, slight scroll movements are often interpreted as a "drag" on the toast, permanently pausing the auto-close timer.

**Fix:** Disabled `pauseOnHover={false}`, `pauseOnFocusLoss={false}`, and crucially `draggable={false}` on the `<ToastContainer>`. This prevents mobile touch events from hijacking the timer, ensuring toasts always disappear after exactly 2000ms.

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](./Readme.md) | [File Tree](./File_Tree.md) | [Future Plans](./futureplan.md) | [Performance](./performance_optimization.md) | [Resolved Issues](./resolved_issues.md)
- **Frontend:** [Frontend Readme](./frontend/README.md) | [Design Specs](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md) | [Improvements](./frontend/improvement.md)
- **Backend:** [Backend Readme](./Backend/Readme.md) | [API Docs](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)
---
