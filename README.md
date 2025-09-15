# Blog Platform - Documentation

## 1. Overview

This project is a **Blog Publishing Platform** that allows users to create, read, update, and delete blog posts. It uses your provided folder structure and tech stack:

* **Frontend:** React (with Context API, SCSS)
* **Backend:** Node.js with Firebase integration
* **Database:** Firebase (Firestore, Auth, Storage)

The project demonstrates **full-stack development skills**, **clean code structure**, and **AI tool utilization**.

---

## 2. Project Structure

```
thread/ (root)
├── backend/              # Node.js backend API
│   ├── config/           # Firebase configuration
│   ├── methods/          # CRUD and utility methods
│   │   ├── auth.js
│   │   ├── CreateBlog.js
│   │   ├── GetPosts.js
│   │   ├── GetUser.js
│   │   ├── GetComments.js
│   │   ├── PostComment.js
│   │   └── GetAnalytics.js
│   ├── uploads/posts/   # Uploaded blog images
│   ├── index.js          # Entry point for backend server
│   └── package.json
│
├── public/assets/        # Static assets
│   ├── gif/
│   ├── icons/
│   ├── img/
│   └── video/
│
├── src/                 # React Frontend
│   ├── components/
│   │   ├── landingPage/
│   │   ├── loader/
│   │   └── user/
│   ├── context/         # Context API (Auth, Dark Mode)
│   ├── pages/           # App pages (form, user profile)
│   ├── styles/          # SCSS files (organized by feature)
│   ├── App.jsx
│   ├── main.jsx         # React entry point
│   └── index.css
│
├── eslint.config.js
├── vite.config.js       # Vite bundler config
└── README.md
```

---

## 3. Tech Stack

**Frontend:** React + Context API + SCSS

**Backend:** Node.js (Express-like structure with Firebase)

**Database:** Firebase Firestore (NoSQL)

**Other Tools:**

* Firebase Auth for authentication
* Firebase Storage for image uploads
* Firebase Functions (if used)

---

## 4. Core Features

### ✅ Authentication

* Email/Password signup & login
* JWT-like session handling via Firebase Auth
* Google OAuth supported (if enabled)

### ✅ Blog Post CRUD

* Create, read, update, delete blogs
* Store images in Firebase Storage
* Firestore as database for posts, comments, analytics

### ✅ Author Profile

* Profile page with name, avatar, bio
* List of user's own blog posts

---

## 5. Bonus Features

* Blog SEO tags (meta title/description)
* Search by title or tags
* Likes, bookmarks, comments
* Post analytics (views, engagement)
* Dark mode (context API powered)

---

## 6. Installation & Setup

### 6.1 Backend Setup

```bash
cd backend
cp .env.example .env  # Add Firebase credentials
npm install
node index.js
```

### 6.2 Web Frontend Setup

```bash
npm install
npm run dev
```

> The project uses **Vite** for fast development.

---

## 7. API & Methods (Firebase Driven)

| File            | Purpose                |
| --------------- | ---------------------- |
| auth.js         | Signup/Login functions |
| CreateBlog.js   | Blog creation logic    |
| GetPosts.js     | Fetch all posts        |
| GetUser.js      | Fetch user profile     |
| GetComments.js  | Fetch post comments    |
| PostComment.js  | Add new comment        |
| GetAnalytics.js | Track post views/likes |

---

## 8. AI Integration

AI tools were used for:

* Generating CRUD boilerplate
* Suggesting Firebase security rules
* Drafting documentation & README
* Suggesting frontend component structure

---

## 9. Deliverables

* ✅ Hosted GitHub repo with `backend/` & `src/`
* ✅ Working React frontend (Vite dev server)
* ✅ REST backend using Firebase methods
* ✅ Setup instructions (README)
* ✅ AI usage documentation

---

## 10. Future Enhancements

* Add pagination / infinite scroll
* Migrate to Redux Toolkit for state management (if scaling)
* Add push notifications for new posts/comments
* Role-based access (admin moderation)
* Flutter app for mobile (planned)
