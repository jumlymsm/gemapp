import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Logo above the title */}
        <div className="mb-4">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#2563eb" stroke="#1e40af" strokeWidth="3"/>
            <ellipse cx="30" cy="30" rx="18" ry="10" fill="#60a5fa" />
            <ellipse cx="30" cy="30" rx="10" ry="18" fill="#93c5fd" />
            <polygon points="30,10 38,30 30,50 22,30" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
            <circle cx="30" cy="30" r="6" fill="#1e40af" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Sign in to GemFind</h2>
        <p className="text-gray-500 mb-6 text-center">Welcome back! Please login to your account.</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <div></div>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="flex gap-3 justify-center mt-2">
            <button
              type="submit"
              className="min-w-[110px] px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-2xl text-base shadow transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              className="min-w-[110px] px-4 bg-gray-100 hover:bg-gray-200 text-blue-700 font-semibold py-2 rounded-2xl text-base shadow transition-colors border border-blue-200"
              onClick={() => navigate("/")}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center w-full my-5">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <div className="flex gap-4 w-full mb-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded-2xl shadow-sm transition-colors">
            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            Facebook
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 rounded-2xl shadow-sm transition-colors">
            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633C17.07 2.57 14.789 1.5 12.039 1.5 6.477 1.5 2 5.977 2 11.5s4.477 10 10.039 10c5.789 0 9.594-4.07 9.594-9.797 0-.656-.07-1.18-.164-1.68z"/></svg>
            Google
          </button>
        </div>
        <div className="text-gray-500 text-sm text-center">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline font-medium">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
