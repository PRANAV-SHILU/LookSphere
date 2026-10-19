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

   Create a `.env` file in the `Backend/` directory (see [`Backend/.env.example`](./Backend/.env.example)):
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Create a `.env` file in the `frontend/` directory (see [`frontend/.env.example`](./frontend/.env.example)):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_FRONTEND_URL=http://localhost:5173
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

5. Open [http://localhost:5173](http://localhost:5173) in your browser (or visit the production deployment at [looksphere.vercel.app](https://looksphere.vercel.app/))

## Style Guidelines

### Code Style

- Use **ES6+** syntax and functional React components with hooks
- Follow existing code patterns and conventions in the project
- Use CSS custom properties (`var(--variable-name)`) for theme-aware styling
- Ensure all interactive elements work in both **light** and **dark** themes
- Use **Lucide React** icons consistently throughout the UI
- All pages must include SEO metadata via the [`useDocumentMetadata`](./frontend/src/hooks/useDocumentMetadata.js) hook

### File Organization

**Frontend (`frontend/src/`):**
- **Actions** → [`actions/`](./frontend/src/actions/)
- **Components** → [`components/`](./frontend/src/components/)
- **Shared Components** → [`shared-components/`](./frontend/src/shared-components/)
- **Modals** → [`modals/`](./frontend/src/modals/)
- **Loaders** → [`loaders/`](./frontend/src/loaders/)
- **Pages** → [`pages/`](./frontend/src/pages/)
- **Hooks** → [`hooks/`](./frontend/src/hooks/)
- **Context** → [`context/`](./frontend/src/context/)
- **Services** → [`services/`](./frontend/src/services/)
- **Network (API Calls & Interceptors)** → [`network/`](./frontend/src/network/)
- **Routes** → [`routes/`](./frontend/src/routes/)
- **Validation Schemas** → [`schema/`](./frontend/src/schema/)
- **Skeletons** → [`skeletons/`](./frontend/src/skeletons/)
- **Utils** → [`utils/`](./frontend/src/utils/)

**Backend (`Backend/src/`):**
- **Controllers** → [`controllers/`](./Backend/src/controllers/)
- **Models** → [`models/`](./Backend/src/models/)
- **Routes** → [`routes/`](./Backend/src/routes/)
- **Middlewares** → [`middlewares/`](./Backend/src/middlewares/)
- **Validators** → [`validators/`](./Backend/src/validators/)
- **Configuration** → [`config/`](./Backend/src/config/)
- **Utils** → [`utils/`](./Backend/src/utils/)

### CSS & Theming

- Use the CSS variable system defined in [`main.css`](./frontend/src/main.css) (`--bg-primary`, `--text-primary`, `--surface-card`, etc.)
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

<br>
<br>

---

**📚 LookSphere Documentation Index:**
- **Core Documentation:** [Main Readme](./Readme.md) | [Algorithms](./Algorithms.md) | [Performance Optimization](./Performance_Optimization.md) | [Roadmap](./Roadmap.md) | [Resolved Issues](./Resolved_Issues.md) | [File Tree](./File_Tree.md) | [Improvements](./improvement.md)
- **Governance & Policies:** [Contributing Guidelines](./CONTRIBUTING.md) | [Code of Conduct](./CODE_OF_CONDUCT.md) | [Security Policy](./SECURITY.md) | [License](./LICENSE.md)
- **Community & Templates:** [Support Desk](./.github/SUPPORT.md) | [PR Template](./.github/PULL_REQUEST_TEMPLATE.md) | [Bug Report](./.github/ISSUE_TEMPLATE/bug_report.md) | [Feature Request](./.github/ISSUE_TEMPLATE/feature_request.md)
- **Frontend Architecture:** [Frontend Readme](./frontend/README.md) | [Design System](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md)
- **Backend Architecture:** [Backend Readme](./Backend/Readme.md) | [API Documentation](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)

---

<div align="center">

**LookSphere Engineering Documentation**  
*Collaborative engineering, transparent open-source workflows, and inclusive teamwork.*

</div>
<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://www.linkedin.com/in/pranavshilu/">Pranav Shilu</a>. All rights reserved.</b>
</div>
