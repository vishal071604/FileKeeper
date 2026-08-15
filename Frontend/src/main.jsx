import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify"; // Import ToastContainer for displaying toasts
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={2000} /> 
  </StrictMode>
);