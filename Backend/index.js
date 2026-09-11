import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./database/db.js";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const defaultFrontendOrigins = [
  "http://localhost:5173",
  "https://file-keeper-brown.vercel.app",
];
const frontendOrigins = (process.env.FRONTEND_URL || defaultFrontendOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

connectDB();

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header cover health checks and server-to-server calls.
      if (!origin || frontendOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

// IMPORTANT: before routes
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});