
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:3000/auth/adminlogin", values, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.loginStatus) {
          localStorage.setItem("valid", "true");
          navigate("/dashboard");
        } else {
          setError(res.data.Error || "Invalid credentials");
        }
      })
      .catch(() => {
        setError("Server error. Please try again later.");
      });
  };

  return (
    <div className="loginPage min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg px-3 py-2 text-center">
            {error}
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              autoComplete="off"
              placeholder="admin@example.com"
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              className="w-full bg-black/40 text-white border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="w-full bg-black/40 text-white border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              className="accent-amber-500"
              required
            />
            <label htmlFor="terms" className="text-gray-300">
              I agree to the Terms & Conditions
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2.5 rounded-xl transition shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// divyanshgupta@gmail.com   password-12345678   admin@gmail.com   password-12345

export default Login;

