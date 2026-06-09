# 🔐 SecureAuth – React Authentication System

> ⚠️ **Demo Notice (Important)**  
> This project uses a JSON Server API hosted on a free-tier service.  
> **User registrations, logins, and profile edits are not permanently stored.**  
> Data may reset when the API restarts, sleeps due to inactivity, or is redeployed.
>
> You can freely register and test the application with your own data, but please note that **your data will not be stored permanently**.

---

## 🧪 Demo User (Always Available After Reset)

You can use the following pre-seeded demo account to test login functionality at any time if you don't want to use your own data:

```
  "id": "0",
  "name": "Demo User",
  "mobile": "9999999999",
  "password": "demo123",
```

SecureAuth is A lightweight authentication system built with React and React Router DOM, using a JSON Server–based self-made API. The project demonstrates a complete client-side authentication flow without any backend or database, focusing on routing, form handling, and controlled state management with a mini color mixer project.

---

## 🚀 Features

- User Registration
- User Login
- Logout Handling
- Edit User Details
- Protected Dashboard Routes
- Query String Handling
- Schema-based Form Validation
- Toast Notifications for User Feedback
- Loading Indicators with Spinners
- Multi-user handling via API state

---

## 🛠 Tech Stack

- **Frontend:** React JS
- **Routing:** React Router DOM
- **Forms:** React Hook Form
- **Validation:** Yup
- **API Layer:** JSON Server (Self-made REST API)
- **UI Feedback:** React Toastify, React Spinners

---

## 📦 Required Dependencies

```bash
react-dom
react-router-dom
react-hook-form
yup
@hookform/resolvers
react-toastify
react-spinners
```

---

## 🔑 React Router Hooks Used



Used to read and update query parameters in the URL. This helps manage conditional navigation, redirects, and URL-driven state changes.

### useActionData()

Used to access data returned from route `action` functions after form submission. This enables clean form workflows without manual state propagation.

---

## 🔐 Authentication Flow

1. User registers through the Register API.
2. Login validates credentials against stored user data.
3. Logged-in status is maintained using API flags and client logic.
4. Protected routes restrict access based on authentication state.
5. Logout updates session status without server-side authentication.
6. Profile edits directly sync with the API.

---

## ⚠️ Project Scope

- No backend authentication
- No database
- No JWT, cookies, or sessions
- Designed purely for frontend architecture and learning purposes

---

## 🎯 Ideal For

- Understanding React Router authentication patterns
- Learning action-based form handling
- Practicing frontend-only auth systems
- Rapid prototyping without backend complexity
