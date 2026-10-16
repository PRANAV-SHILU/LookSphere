<div align="right">Last Modified: 22-Oct-2026</div>

# LookSphere — API Documentation

Base URL: `http://BASE_URL/api`

---

## System & Health Checks

### GET /

Welcome message / service check

- **URL:** `/`
- **Response:** `200` `"welcome to LookSphere backend"`

### GET /ping

Uptime heartbeat ping endpoint (used for keep-alive monitoring)

- **URL:** `/ping`
- **Response:** `200` `{ status: "ok", timestamp, message: "Server is alive" }`

### GET /health

System and database connection health check

- **URL:** `/health`
- **Response:** `200` `{ status: "healthy", timestamp, database: "connected", uptime }` | `503` `{ status: "unhealthy", ... }`

---

## Auth

### POST /auth/register

Register a new user account

- **Body:** `{ username, email, password, confirmPassword }`
- **Response:** `201` `{ success, message }` | `400` | `500`

### POST /auth/login

Authenticate user and return JWT token

- **Body:** `{ username, password }`
- **Response:** `200` `{ success, data, token }` | `400` | `500`
- **Note:** Store the returned `token` and user data in localStorage and include it in the Authorization header as `Bearer <token>` for subsequent requests.

### POST /auth/logout

End session (client should remove token from localStorage)

- **Response:** `200` `{ success, message }` | `500`
- **Note:** Client should remove the JWT token and user data from localStorage after successful logout.

---

## Users

### GET /users

Fetch all non-admin users sorted by profile views

- **Response:** `200` `{ message, data }` | `500`

### GET /users/profile

Get the logged-in user's own full profile with posts

- **Auth:** Required
- **Response:** `200` `{ message, data: { user, images, videos } }` (includes `totalPostImpressions` and `profileViewCount`) | `401` | `500`

### GET /users/profile/:username

Get a public user's profile by username

- **Auth:** Optional
- **Response:** `200` `{ message, data: { user, images, videos } }` (includes `totalPostImpressions` and `profileViewCount`) | `404` | `500`

### PATCH /users/profile

Update the logged-in user's profile details or avatar

- **Auth:** Required
- **Content:** `multipart/form-data`
- **Fields:** `username, email, tagline, bio, profileImage` (all optional)
- **Response:** `200` `{ message, data }` | `400` | `401` | `404` | `500`

### PATCH /users/change-password

Change the logged-in user's password

- **Auth:** Required
- **Body:** `{ oldPassword, newPassword }` (min 6 chars, required)
- **Response:** `200` `{ success: true, message: "Password changed successfully" }` | `400` | `401` | `404` | `500`

### PATCH /users/change-email

Update the logged-in user's registered email address with password verification

- **Auth:** Required
- **Body:** `{ newEmail, password }` (valid email, required)
- **Response:** `200` `{ success: true, message: "Email updated successfully." }` | `400` | `401` | `404` | `500`

---

## Posts

### GET /posts

Fetch all posts for the feed sorted by newest first

- **Response:** `200` `{ message, data }` (each post includes `counts: { spark, archive, reshare, comment, impression }`) | `500`

### GET /posts/:id

Fetch single post by ID

- **Auth:** Optional
- **Response:** `200` `{ message, data }` (includes `counts: { spark, archive, reshare, comment, impression }`) | `404` | `500`

### POST /posts

Upload and create a new media post

- **Auth:** Required
- **Content:** `multipart/form-data`
- **Fields:** `media` (required file), `mediaType`, `altText`, `caption`
- **Response:** `201` `{ message, post }` | `400` | `401` | `500`

### PATCH /posts/:id/increment-impression

Increment a post's impression count by one

- **Response:** `200` `{ message, data }` | `404` | `500`

### PATCH /posts/:id

Edit a post's caption or alt text

- **Auth:** Required
- **Body:** `{ caption, altText }` (optional)
- **Response:** `200` `{ message, data }` | `401` | `403` | `404` | `500`

---

## Interactions

Manages user engagement actions on posts including sparks (likes), archives (bookmarks), and reshares.

### POST /interaction

Toggle a post interaction. If the user already performed this action on the post, it is removed and the post counter is decremented; otherwise, it is created and the counter is incremented.

- **Auth:** Required
- **Body:**
  - `postId` (string / ObjectId, required)
  - `action` (`"spark"` | `"archive"` | `"reshare"`, required)
- **Response:**
  - `201` `{ success: true, action: "added" }`
  - `200` `{ success: true, action: "removed" }` | `400` | `401` | `500`

### GET /interaction/user/:userId

Get all post interactions performed by a specific user (used for profile tabs). Reshares are public; sparks and archives are private and only viewable by the account owner.

- **Auth:** Optional for public actions; Required when requesting private actions (`spark` or `archive`)
- **Query Params:**
  - `action` (`"spark"` | `"archive"` | `"reshare"`, required)
- **Response:** `200` `{ success: true, total: number, data: [...] }` | `401` | `403` | `500`

### GET /interaction/post/:postId

Get all interactions and user details for a specific post.

- **Auth:** None (Public)
- **Query Params:**
  - `action` (`"spark"` | `"archive"` | `"reshare"`, optional)
- **Response:** `200` `{ success: true, total: number, data: [...] }` | `500`

---

## Contact & Support

Provides endpoints for user inquiry submissions with media attachments, user ticket retrieval where users track real-time response messages directly in their **My Inquiries** page (`/my-inquiries`), and administrative moderation.

### POST /contact_support/submit

Submit a new inquiry, bug report, feature request, or feedback with optional attachments via the **Contact Us** form (`/contact-us`). Users can track their inquiry status and administrative responses on the **My Inquiries** page (`/my-inquiries`).

- **Auth:** Required
- **Content:** `multipart/form-data`
- **Fields:**
  - `name` (string, 3-30 chars, required)
  - `email` (string, valid email, required)
  - `category` (enum: `general` | `feedback` | `suggestion` | `issue` | `security` | `inquiry`, required)
  - `message` (string, 10-1000 chars, required)
  - `userId` (string / ObjectId, required)
  - `images` (file[], max 5 images, optional)
  - `video` (file, max 1 video, optional)
- **Response:** `200` `{ success: true, message: "Your message has been sent successfully!" }` | `400` | `401` | `500`

### GET /contact_support/myContacts

Get all contact inquiries submitted by the logged-in user to render on their **My Inquiries** page (`/my-inquiries`) with response status filter

- **Auth:** Required
- **Query Params:**
  - `isResponded` (`true` | `false`, optional) — filter by answered or pending inquiries
- **Response:** `200` `{ success: true, message: "User contacts fetched successfully!", data: { contacts: [...] } }` | `401` | `500`

### GET /contact_support/

Get all inquiries across all users with summary stats (Admin only)

- **Auth:** Required (Admin)
- **Query Params:**
  - `isResponded` (`true` | `false`, optional) — filter by answered or pending inquiries
- **Response:** `200` `{ success: true, message: "Contact data fetched successfully!", data: { contacts: [...], stats: { total, pending, responded } } }` | `401` | `403` | `500`

### PATCH /contact_support/:id/respond

Submit or update an admin response to a specific inquiry (Admin only). The response message is delivered directly to the user's **My Inquiries** page (`/my-inquiries`) and sent to their email address.

- **Auth:** Required (Admin)
- **Body:** `{ response: "Response text..." }` (string, 1-1000 chars, required)
- **Response:** `200` `{ success: true, message: "Response sent successfully!" }` | `400` | `401` | `403` | `404` | `500`

---

## Admin

### GET /admin/matrics

Get platform-wide analytics, user metrics, and post counters

- **Auth:** Required (Admin)
- **Response:** `200` `{ success, data }` | `401` | `403` | `500`

---

## Error Format

**Validation:** `{ errors: [{ type, msg, path, location }] }` or `{ success: false, message: string }`  
**Other:** `{ message: string }` or `{ error: string }`

---

## Authentication

All protected endpoints require JWT authentication via the Authorization header:

- **Header Format:** `Authorization: Bearer <token>`
- **Token Storage:** Store JWT token in localStorage on the client side
- **Token Retrieval:** Token is returned in the response body on successful login
- **Token Refresh:** When username is changed via profile update, a new token is returned and should replace the old one in localStorage

**Example Request:**

```javascript
headers: {
  'Authorization': 'Bearer jwt_token'
}
```

<br>
<br>

---

**📚 LookSphere Documentation Index:**
- **Core Documentation:** [Main Readme](../Readme.md) | [Algorithms](../Algorithms.md) | [Performance Optimization](../Performance_Optimization.md) | [Roadmap](../Roadmap.md) | [Resolved Issues](../Resolved_Issues.md) | [File Tree](../File_Tree.md) | [Improvements](../improvement.md)
- **Governance & Policies:** [Contributing Guidelines](../CONTRIBUTING.md) | [Code of Conduct](../CODE_OF_CONDUCT.md) | [Security Policy](../SECURITY.md) | [License](../LICENSE.md)
- **Issue Templates:** [Bug Report](../.github/ISSUE_TEMPLATE/bug_report.md) | [Feature Request](../.github/ISSUE_TEMPLATE/feature_request.md)
- **Frontend Architecture:** [Frontend Readme](../frontend/README.md) | [Design System](../frontend/Design.md) | [Frontend File Tree](../frontend/File_Tree.md)
- **Backend Architecture:** [Backend Readme](./Readme.md) | [API Documentation](./APIs.md) | [Backend File Tree](./File_Tree.md)

---

<div align="center">

**LookSphere Engineering Documentation**  
*Deterministic endpoints, sanitized payload contracts, and atomic database state transitions.*

</div>
<div align="center">
  <b>© 2026 LookSphere. Built by <a href="https://www.linkedin.com/in/pranavshilu/">Pranav Shilu</a>. All rights reserved.</b>
</div>

