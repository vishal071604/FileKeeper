# 📁 File Keeper

> 📝 A simple and secure **Note Management Application** where users can create, manage, search, pin, and delete their notes.

---

## 🚀 Features

| 🔧 Feature         | 📌 Description                      |
| ------------------ | ----------------------------------- |
| 👤 Signup          | Create a new user account           |
| 🔐 Login           | Secure user authentication          |
| 🍪 JWT Cookies     | Store authentication token securely |
| ➕ Create Notes     | Create new notes                    |
| ✏️ Update Notes    | Edit existing notes                 |
| 🗑️ Delete Notes   | Move notes to trash                 |
| ♻️ Restore Notes   | Restore deleted notes               |
| ❌ Permanent Delete | Completely remove notes             |
| 📌 Pin Notes       | Keep important notes at the top     |
| 🔍 Search Notes    | Search notes by title or content    |

---

## 🛠️ Technologies Used

### 🎨 Frontend

```text
┌─────────────────────────────┐
│        🎨 FRONTEND          │
├─────────────────────────────┤
│ ⚛️ React                    │
│ ⚡ Vite                     │
│ 🛣️ React Router             │
│ 📡 Axios                    │
│ 🎨 Tailwind CSS             │
│ 🔔 React Toastify           │
└─────────────────────────────┘
```

### ⚙️ Backend

```text
┌─────────────────────────────┐
│        ⚙️ BACKEND           │
├─────────────────────────────┤
│ 🟢 Node.js                  │
│ 🚂 Express.js               │
│ 🍃 MongoDB                  │
│ 📦 Mongoose                 │
│ 🔑 JWT                      │
│ 🔒 bcryptjs                 │
└─────────────────────────────┘
```

---

## 🏗️ System Architecture

```text
                 👤 USER
                   │
                   ▼
        ┌─────────────────────┐
        │   ⚛️ React Frontend │
        │      + Vite         │
        └──────────┬──────────┘
                   │
                   │ 📡 Axios API
                   ▼
        ┌─────────────────────┐
        │   🚂 Express.js     │
        │      Backend        │
        └──────────┬──────────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
   ┌─────────────┐   ┌─────────────┐
   │ 🔐 JWT Auth │   │ 📝 Notes API│
   └─────────────┘   └──────┬──────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ 🍃 MongoDB     │
                    │    Database    │
                    └────────────────┘
```

---

## 🔐 Authentication Flow

```text
👤 User
   │
   ▼
📝 Enter Email + Password
   │
   ▼
⚛️ React Frontend
   │
   │ POST /auth/login
   ▼
🚂 Express Backend
   │
   ▼
🍃 MongoDB
   │
   │ Check User
   ▼
🔒 bcrypt Password Check
   │
   ▼
🔑 Generate JWT
   │
   ▼
🍪 JWT stored in Cookie
   │
   ▼
✅ Login Successful
   │
   ▼
📊 Dashboard
```

---

## 📝 Note Management Flow

```text
                 📊 DASHBOARD
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
       ➕ Create    🔍 Search    📌 Pin
          │           │           │
          ▼           ▼           ▼
       ✏️ Update   📝 Find      📌 Mark
          │
          ▼
       🗑️ Delete
          │
          ▼
      🗑️ Trash
          │
       ┌──┴──┐
       ▼     ▼
   ♻️ Restore ❌ Permanent Delete
```

---

## 📂 Project Structure

```text
📁 File-Keeper
│
├── 📁 src
│   │
│   ├── 📁 api
│   │   └── 📄 axios.js
│   │
│   ├── 📁 pages
│   │   ├── 🔐 Login.jsx
│   │   ├── 📝 Signup.jsx
│   │   └── 📊 Dashboard.jsx
│   │
│   ├── 📄 App.jsx
│   ├── 📄 main.jsx
│   └── 🎨 index.css
│
├── 📄 package.json
├── 📄 .env
└── 📄 README.md
```

---

## 🌐 API Connection

The frontend connects to the deployed backend using:

```env
VITE_API_URL=https://filekeeper-ryj2.onrender.com/api
```

### 📡 API Flow

```text
⚛️ React
   │
   │ Axios
   ▼
🌐 API URL
   │
   ▼
🚂 Express Server
   │
   ▼
🍃 MongoDB
```

---

## 🔗 Main API Routes

### 🔐 Authentication

```text
POST  /api/auth/signup    → 👤 Create Account
POST  /api/auth/login     → 🔐 Login
POST  /api/auth/logout    → 🚪 Logout
```

### 📝 Notes

```text
POST    /api/notes              → ➕ Create Note
GET     /api/notes              → 📋 Get Notes
GET     /api/notes/search       → 🔍 Search Notes
GET     /api/notes/deleted      → 🗑️ Get Trash
PUT     /api/notes/:id          → ✏️ Update Note
PUT     /api/notes/pin/:id      → 📌 Pin / Unpin
PUT     /api/notes/restore/:id  → ♻️ Restore Note
DELETE  /api/notes/:id          → 🗑️ Move to Trash
DELETE  /api/notes/permanent/:id → ❌ Permanent Delete
```

---

## 🔑 JWT Authentication

```text
             🔐 LOGIN
                │
                ▼
        ┌───────────────┐
        │ Verify User   │
        └───────┬───────┘
                │
                ▼
          🔑 Create JWT
                │
                ▼
          🍪 Cookie
                │
                ▼
       📡 Protected Request
                │
                ▼
        🛡️ Auth Middleware
                │
                ▼
          ✅ Access Granted
```

---

## 📦 Installation

Clone the project and install dependencies:

```bash
npm install
```

---

## ▶️ Run the Project

### 💻 Development

```bash
npm run dev
```

### 🏭 Production Build

```bash
npm run build
```

---

## 🔄 Complete Project Flow

```text
👤 USER
  │
  ▼
🔐 LOGIN / 📝 SIGNUP
  │
  ▼
⚛️ REACT FRONTEND
  │
  ▼
📡 AXIOS
  │
  ▼
🚂 EXPRESS API
  │
  ├───────────────┐
  │               │
  ▼               ▼
🔑 JWT          📝 NOTES
  │               │
  │               ▼
  │          🍃 MONGODB
  │
  ▼
🍪 AUTH COOKIE
  │
  ▼
🛡️ PROTECTED ROUTES
  │
  ▼
📊 DASHBOARD
```

---

## 🎯 Project Goal

🎯 The main goal of **File Keeper** is to provide a simple web application for users to securely manage their personal notes.

It demonstrates important full-stack concepts such as:

* ⚛️ React frontend development
* 🌐 REST API communication
* 🚂 Express.js backend
* 🍃 MongoDB database
* 🔐 JWT authentication
* 🔒 Password hashing
* 🍪 Cookie-based authentication
* 📝 CRUD operations
* 🗑️ Soft delete and restore
* 🔍 Search functionality

---

## 👨‍💻 Author

**Vishal S. Kalawad**

🎓 Electronics & Communication Engineering
🏫 KLE Technological University

---

⭐ **If you like this project, consider giving it a star!**
