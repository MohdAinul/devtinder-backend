# DevTinder Backend 🚀

## 📌 Overview

DevTinder is a MERN stack web application designed to help developers connect and collaborate — similar to Tinder, but specifically for developers.

Users can:

- Create profiles
- Explore other developers
- Send connection requests
- Manage their matches

This repository contains the **backend** of DevTinder, built using **Node.js, Express, and MongoDB**, following scalable architecture practices.

---

## 🔗 Project Links

- 🌐 Frontend: [DevTinder Frontend](https://github.com/MohdAinul/devtinder-frontend)

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens) + Cookies
- **Encryption:** bcryptjs
- **API Testing:** Postman
- **Environment Variables:** dotenv
- **Package Manager:** npm

---

## 🔑 Features Implemented

### 1️⃣ Authentication System

- ✅ User Signup, Login, Logout
- ✅ JWT-based authentication with secure cookies
- ✅ Password encryption using bcryptjs
- ✅ Authentication middleware for protected routes

---

### 2️⃣ User Profile Management

- ✅ View user profile
- ✅ Edit profile (restricted fields for security)
- ✅ Update password with validation

---

### 3️⃣ Connection Request System

- ✅ Send requests (Interested / Ignored)
- ✅ Accept or Reject requests
- ✅ Prevent duplicate requests (MongoDB validation)
- ✅ Prevent self-requests (Mongoose `.pre` middleware)

---

### 4️⃣ Feed API & Pagination

- ✅ Fetch suggested developers excluding:
  - Logged-in user
  - Existing connections
  - Ignored users
  - Pending requests

- ✅ Pagination using `skip` and `limit`
- ✅ Optimized queries using `$nin` and `$ne`

---

### 5️⃣ Database Design

#### User Schema

- Sanitized inputs (trim, lowercase, validation)
- Unique email & username

#### ConnectionRequest Schema

- Fields: `fromUserId`, `toUserId`, `status` (enum)
- Indexed fields for faster queries
- Prevents duplicate requests

---

### 6️⃣ Advanced Query Optimization

- ✅ Indexes for faster queries
- ✅ Compound indexes for optimized search

---

### 7️⃣ Middleware Implementation

- ✅ Authentication Middleware
- ✅ Error Handling Middleware
- ✅ Mongoose `.pre` Middleware (prevent self-requests)

---

### 8️⃣ Express Router Structure

- Modular route structure
- Separate routers:
  - Auth
  - Profile
  - Connections
  - Users

---

## 🚀 API Endpoints

### 1️⃣ Authentication Routes

| Method | Endpoint     | Description         | Auth |
| ------ | ------------ | ------------------- | ---- |
| POST   | /auth/signup | Register a new user | ❌   |
| POST   | /auth/login  | Login & get JWT     | ❌   |
| POST   | /auth/logout | Logout user         | ✅   |

---

### 2️⃣ User Profile Routes

| Method | Endpoint          | Description        | Auth |
| ------ | ----------------- | ------------------ | ---- |
| GET    | /profile/view     | Get logged-in user | ✅   |
| PATCH  | /profile/edit     | Update profile     | ✅   |
| PATCH  | /profile/password | Update password    | ✅   |

---

### 3️⃣ Connection Request Routes

| Method | Endpoint                           | Description              | Auth |
| ------ | ---------------------------------- | ------------------------ | ---- |
| POST   | /request/send/:status/:toUserId    | Send request             | ✅   |
| POST   | /request/review/:status/:requestId | Accept/Reject request    | ✅   |
| GET    | /user/requests/received            | Get pending requests     | ✅   |
| GET    | /user/connections                  | Get accepted connections | ✅   |

---

### 4️⃣ Feed API

| Method | Endpoint                   | Description              | Auth |
| ------ | -------------------------- | ------------------------ | ---- |
| GET    | /user/feed?page=1&limit=10 | Get feed with pagination | ✅   |

---

## 🏗️ Setup & Running the Server

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MohdAinul/devtinder-backend.git
cd devtinder-backend
```
