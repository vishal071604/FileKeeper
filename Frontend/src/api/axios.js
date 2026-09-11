import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://filekeeper-co0f.onrender.com/api",
  withCredentials: true,
});

export default API;