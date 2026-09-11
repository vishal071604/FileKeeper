import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", {
        name,
        email,
        password
      });

      toast.success(response.data.message);
      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Signup
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>

        </form>

        <p className="text-slate-400 text-center mt-5">
          Already have an account?{" "}

          <Link to="/" className="text-cyan-400">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;
