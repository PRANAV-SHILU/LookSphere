<div align="right">Last Modified: 2026-06-23</div>


# LookSphere — API Documentation

Base URL: `http://BASE_URL/api`

---

## Auth

### POST /auth/register
Register a new user account
- **Body:** `{ username, email, password, confirmPassword }`
- **Response:** `201` `{ success, data }` | `400` | `500`

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
- **Response:** `200` `{ message, data: { user, images, videos } }` | `401` | `500`

### GET /users/profile/:username
Get a public user's profile by username
- **Auth:** Optional
- **Response:** `200` `{ message, data: { user, images, videos } }` | `404` | `500`

### PATCH /users/profile
Update the logged-in user's profile details or avatar
- **Auth:** Required
- **Content:** `multipart/form-data`
- **Fields:** `username, email, tagline, bio, profileImage` (all optional)
- **Response:** `200` `{ message, data }` | `400` | `401` | `404` | `500`

---

## Posts

### GET /posts
Fetch all posts for the feed sorted by newest first
- **Response:** `200` `{ message, data }` | `500`

### POST /posts
Upload and create a new media post
- **Auth:** Required
- **Content:** `multipart/form-data`
- **Fields:** `media` (required), `mediaType`, `altText`, `caption`
- **Response:** `201` `{ message, post }` | `400` | `401` | `500`

### PATCH /posts/:id/increment-view
Increment a post's view count by one
- **Response:** `200` `{ message, data }` | `404` | `500`

### PATCH /posts/:id
Edit a post's caption or alt text
- **Auth:** Required
- **Body:** `{ caption, altText }` (optional)
- **Response:** `200` `{ message, data }` | `401` | `403` | `404` | `500`

---

## Admin

### GET /admin/matrics
Get platform-wide analytics and user/post metrics
- **Auth:** Required (admin)
- **Response:** `200` `{ success, data }` | `401` | `403` | `500`

---

## Error Format

**Validation:** `{ errors: [{ type, msg, path, location }] }`  
**Other:** `{ message: string }`

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

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](../Readme.md) | [File Tree](../File_Tree.md) | [Roadmap](../roadmap.md) | [Performance](../performance_optimization.md) | [Resolved Issues](../resolved_issues.md)
- **Frontend:** [Frontend Readme](../frontend/README.md) | [Design Specs](../frontend/Design.md) | [Frontend File Tree](../frontend/File_Tree.md) | [Improvements](../frontend/improvement.md)
- **Backend:** [Backend Readme](./Readme.md) | [API Docs](./APIs.md) | [Backend File Tree](./File_Tree.md)
---
