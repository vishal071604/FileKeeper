import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./database/db.js";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Connect database
connectDB();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Home
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

