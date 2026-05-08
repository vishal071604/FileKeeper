import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", formData);
      toast.success(res.data.message || "Signup successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-700 p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Sign up to create notes
        </p>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-5 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white p-4 rounded-xl font-semibold text-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-cyan-400 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}