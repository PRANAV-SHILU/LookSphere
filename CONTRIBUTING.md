# Contributing to LookSphere

First off, thank you for considering contributing to LookSphere! 🎉

The following is a set of guidelines for contributing to LookSphere. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the [LookSphere Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior through any of the following channels:

- 📧 **Email**: [pranavshilu@zohomail.in](mailto:pranavshilu@zohomail.in)
- 💼 **LinkedIn**: [Pranav Shilu](https://www.linkedin.com/in/pranavshilu/)
- 🐙 **GitHub**: [@PRANAV-SHILU](https://github.com/PRANAV-SHILU)

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible using the bug report template.

**Great bug reports tend to have:**

- A clear and descriptive title
- Exact steps to reproduce the issue
- What you expected to happen vs. what actually happened
- Screenshots or screen recordings if applicable
- Your environment details (browser, OS, screen size)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Why this enhancement would be useful to LookSphere users
- Mockups or examples if applicable

### Pull Requests

1. Fork the repository and create your branch from `main`
2. Follow the [Development Setup](#development-setup) to get the project running locally
3. Make your changes following the [Style Guidelines](#style-guidelines)
4. Test your changes thoroughly across both light and dark themes
5. Ensure your code doesn't break any existing functionality
6. Submit a pull request with a clear description of your changes

## Development Setup

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **Cloudinary** account (for media uploads)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/PRANAV-SHILU/LookSphere.git
   cd LookSphere
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../Backend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `Backend/` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 — Frontend
   cd frontend
   npm run dev

   # Terminal 2 — Backend
   cd Backend
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Style Guidelines

### Code Style

- Use **ES6+** syntax and functional React components with hooks
- Follow existing code patterns and conventions in the project
- Use CSS custom properties (`var(--variable-name)`) for theme-aware styling
- Ensure all interactive elements work in both **light** and **dark** themes
- Use **Lucide React** icons consistently throughout the UI
- All pages must include SEO metadata via the `useDocumentMetadata` hook

### File Organization

- **Pages** → `frontend/src/pages/`
- **Shared Components** → `frontend/src/shared-components/`
- **Components** → `frontend/src/components/`
- **Modals** → `frontend/src/modals/`
- **Hooks** → `frontend/src/hooks/`
- **Services** → `frontend/src/services/`
- **Network (API calls)** → `frontend/src/network/`
- **Routes** → `frontend/src/routes/`
- **Utils** → `frontend/src/utils/`

### CSS & Theming

- Use the CSS variable system defined in `main.css` (`--bg-primary`, `--text-primary`, `--surface-card`, etc.)
- Avoid hardcoded colors like `bg-zinc-800` — use theme tokens (`bg-(--surface-hover)`) instead
- Test all UI changes in both light and dark mode

## Commit Messages

Follow these conventions for commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Reference issues and pull requests where appropriate

**Examples:**
```
feat: add profile copy button to share profile links
fix: resolve hover background issue in light theme
style: update button spacing on mobile view
docs: add contributing guidelines
```

---

Thank you for helping make LookSphere better! 🌐
