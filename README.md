# 📝 Notes Keeper App

A full-stack MERN Notes Keeper application where users can create, update, delete, pin, search, and restore notes securely.

## 🚀 Features

- User Signup and Login
- JWT Authentication with Cookies
- Create Notes
- View All Notes
- Update Notes
- Delete Notes
- Restore Deleted Notes
- Permanent Delete
- Pin / Unpin Notes
- Search Notes
- Protected Routes
- Responsive UI

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- CORS

## 📁 Project Structure

```bash
Notes-Keeper/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.Controller.js
│   │   └── note.Controller.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── note.routes.js
│   ├── server.js
│   └── .env
