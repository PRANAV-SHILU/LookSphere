# LookSphere — API Documentation

Base URL: `http://localhost:<PORT>`

---

## Auth

### POST /api/auth/register
Register new user account
- **Auth:** None
- **Body:** `{ username, email, password, confirmPassword }`
- **Response:** `201` user created | `400` validation/error | `500`

### POST /api/auth/login  
Authenticate/Login user and set session token
- **Auth:** None
- **Body:** `{ username, password }`
- **Response:** `200` token set | `401` invalid | `500`

### POST /api/auth/logout
Clear session token and logout user
- **Auth:** None
- **Response:** `200` logged out | `500`

---

## Users

### GET /api/users
Get list of all users
- **Auth:** None
- **Response:** `200` users array | `500`

### GET /api/users/:id/detail
Get minimal user info (username, avatar)
- **Auth:** None
- **Response:** `200` { username, avatar } | `404` | `500`

### GET /api/users/profile
Get authenticated user's own profile
- **Auth:** Required (jwtToken cookie)
- **Response:** `200` own profile | `401` | `500`

### GET /api/users/profile/:username
Get public profile by username
- **Auth:** Optional (jwtToken cookie)
- **Response:** `200` public profile | `404` | `500`

### PATCH /api/users/profile
Update/Edit authenticated user's profile
- **Auth:** Required (jwtToken cookie)
- **Content:** multipart/form-data
- **Fields:** `username, email, tagline, bio, profileImage` (all optional)
- **Response:** `200` updated | `400` validation | `401` | `500`

---

## Posts

### GET /api/posts
Get feed of all posts from all users
- **Auth:** None
- **Response:** `200` feed array | `500`

### POST /api/posts
Create new post with media upload
- **Auth:** Required (jwtToken cookie)
- **Content:** multipart/form-data
- **Fields:** `media` (required), `mediaType` (image/video), `caption` (optional)
- **Response:** `201` created | `400` validation | `401` | `500`

### PATCH /api/posts/:id/views
Increment post view count
- **Auth:** None
- **Response:** `200` view count incremented | `404` | `500`

### PATCH /api/posts/:id
Edit post caption
- **Auth:** Required (jwtToken cookie)
- **Body:** `{ caption }` (optional)
- **Response:** `200` updated | `400` validation | `401` | `403` not owner | `404` | `500`

### DELETE /api/posts/:id
Delete post (owner only)
- **Auth:** Required (jwtToken cookie)
- **Response:** `200` deleted | `401` | `403` not owner | `404` | `500`

---

## Admin

### GET /api/admin/matrics
Get platform analytics metrics
- **Auth:** Required (jwtToken cookie + admin role)
- **Response:** `200` metrics | `401` | `403` not admin | `500`

---

## Error Format

**Validation errors:** `{ errors: [{ type, msg, path, location }] }`
**Other errors:** `{ msg: string }`
