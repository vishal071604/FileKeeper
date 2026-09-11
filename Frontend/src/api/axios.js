import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://filekeeper-ryj2.onrender.com/api",
  withCredentials: true,
});

export default API;