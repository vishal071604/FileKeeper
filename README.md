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
```

## Run locally

1. Create `Backend/.env`:

   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=a-long-random-secret
   FRONTEND_URL=http://localhost:5173
   ```

2. Start the backend:

   ```bash
   cd Backend
   npm install
   npm run dev
   ```

3. Start the frontend in another terminal:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## Deployment

The frontend is deployed at [file-keeper-iota.vercel.app](https://file-keeper-iota.vercel.app/).

For a fully live app, deploy the backend separately and configure these variables:

```env
# Frontend (Vercel)
VITE_API_URL=https://your-backend-domain/api

# Backend host
NODE_ENV=production
FRONTEND_URL=https://file-keeper-iota.vercel.app
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=a-long-random-secret
```

After changing `VITE_API_URL`, redeploy the frontend. The backend must allow the frontend URL through CORS.
