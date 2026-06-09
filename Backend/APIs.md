# SecureAuth — API Documentation

Base URL: `http://localhost:<PORT>`

---

## Table of Contents

- [Auth](#auth)
  - [POST api/auth/register](#post-apiauthregister)
  - [POST api/auth/login](#post-apiauthlogin)
- [Users](#users)
  - [GET api/users](#get-apiusers)
  - [GET api/users/profile](#get-apiusersprofile)
  - [GET api/users/:username](#get-apiusersusername)
  - [PATCH api/users/profile](#patch-apiusersprofile)
- [Posts](#posts)
  - [GET api/posts](#get-apiposts)
  - [GET api/posts/:id](#get-apipostsid)
  - [POST api/posts](#post-apiposts)
  - [DELETE api/posts/:id](#delete-apipostsid)

---

## Auth

### POST api/auth/register

Register a new user account.

- **Auth required:** No

**Request Body** `application/json`

| Field             | Type   | Required | Rules                               |
| ----------------- | ------ | -------- | ----------------------------------- |
| `username`        | string | ✅       | Min 3 chars, no spaces, lowercased  |
| `email`           | string | ✅       | Valid email format, lowercased      |
| `password`        | string | ✅       | Min 6 chars, no spaces              |
| `confirmPassword` | string | ✅       | Must match `password`               |

**Responses**

| Status | Description                    |
| ------ | ------------------------------ |
| `201`  | User created successfully      |
| `400`  | Validation error / user exists |
| `500`  | Internal server error          |

> **Note:** `hashedPassword` is never returned in any response.

---

### POST api/auth/login

Log in with an existing account.

- **Auth required:** No

**Request Body** `application/json`

| Field      | Type   | Required | Rules                    |
| ---------- | ------ | -------- | ------------------------ |
| `email`    | string | ✅       | Valid email format       |
| `password` | string | ✅       | Min 6 chars, no spaces   |

**Responses**

| Status | Description                     |
| ------ | ------------------------------- |
| `200`  | Login successful, returns token |
| `400`  | Validation error                |
| `401`  | Invalid credentials             |
| `500`  | Internal server error           |

---

## Users

### GET api/users

Get a list of all users.

- **Auth required:** No

**Responses**

| Status | Description           |
| ------ | --------------------- |
| `200`  | Array of user objects |
| `500`  | Internal server error |

---

### GET api/users/profile

Get the authenticated user's own profile.

- **Auth required:** ✅ Cookie (`jwtToken`)

**Responses**

| Status | Description                  |
| ------ | ---------------------------- |
| `200`  | Own profile data             |
| `401`  | Unauthorized / invalid token |
| `500`  | Internal server error        |

---

### GET api/users/:username

Get a public profile by username.

- **Auth required:** No

**Path Parameters**

| Param      | Type   | Description         |
| ---------- | ------ | ------------------- |
| `username` | string | The user's username |

**Responses**

| Status | Description           |
| ------ | --------------------- |
| `200`  | User profile data     |
| `404`  | User not found        |
| `500`  | Internal server error |

---

### PATCH api/users/profile

Update the authenticated user's profile. All fields are optional.

- **Auth required:** ✅ Cookie (`jwtToken`)
- **Content-Type:** `multipart/form-data`

**Form Fields**

| Field          | Type   | Required | Rules                   |
| -------------- | ------ | -------- | ----------------------- |
| `username`     | string | ❌       | Min 3 chars, no spaces  |
| `email`        | string | ❌       | Valid email format      |
| `tagline`      | string | ❌       | Max 100 characters      |
| `bio`          | string | ❌       | Max 500 characters      |
| `profileImage` | file   | ❌       | Image file (via upload) |

**Responses**

| Status | Description                  |
| ------ | ---------------------------- |
| `200`  | Profile updated successfully |
| `400`  | Validation error             |
| `401`  | Unauthorized / invalid token |
| `500`  | Internal server error        |

---

## Posts

### GET api/posts

Get all posts from all users (public feed).

- **Auth required:** No

**Responses**

| Status | Description           |
| ------ | --------------------- |
| `200`  | Array of post objects |
| `500`  | Internal server error |

---

### GET api/posts/:id

Get a single post by ID.

- **Auth required:** No

**Path Parameters**

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| `id`  | string | MongoDB ObjectId |

**Responses**

| Status | Description           |
| ------ | --------------------- |
| `200`  | Post object           |
| `404`  | Post not found        |
| `500`  | Internal server error |

---

### POST api/posts

Create a new post. Requires a media file upload.

- **Auth required:** ✅ Cookie (`jwtToken`)
- **Content-Type:** `multipart/form-data`

**Form Fields**

| Field       | Type   | Required | Rules                    |
| ----------- | ------ | -------- | ------------------------ |
| `media`     | file   | ✅       | Image or video file      |
| `mediaType` | string | ✅       | `"image"` or `"video"`   |
| `caption`   | string | ❌       | Max 500 characters       |

**Responses**

| Status | Description                  |
| ------ | ---------------------------- |
| `201`  | Post created successfully    |
| `400`  | Validation error             |
| `401`  | Unauthorized / invalid token |
| `500`  | Internal server error        |

---

### DELETE api/posts/:id

Delete a post by ID. Only the post owner can delete their post.

- **Auth required:** ✅ Cookie (`jwtToken`)

**Path Parameters**

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| `id`  | string | MongoDB ObjectId |

**Responses**

| Status | Description                    |
| ------ | ------------------------------ |
| `200`  | Post deleted successfully      |
| `401`  | Unauthorized / invalid token   |
| `403`  | Forbidden — not the post owner |
| `404`  | Post not found                 |
| `500`  | Internal server error          |

---

## Error Response Format

All validation errors follow this structure:

| Field      | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| `errors`   | array  | List of validation error objects         |
| `errors[].type` | string | Type of error (e.g. `"field"`)      |
| `errors[].msg`  | string | Human-readable error message        |
| `errors[].path` | string | The field that failed validation    |
| `errors[].location` | string | Where the field was (`"body"`) |

Non-validation errors return:

| Field | Type   | Description          |
| ----- | ------ | -------------------- |
| `msg` | string | Short error message  |
