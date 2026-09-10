import axios from "axios";

const API = axios.create({
  // Set VITE_API_URL to your deployed API (for example,
  // https://notes-api.example.com/api).  The localhost value keeps the
  // development setup working without an environment file.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

export default API;
