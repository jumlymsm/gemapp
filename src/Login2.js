import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await Auth.signIn(email, password);
      // Redirect to create-listing page after successful login
      navigate("/create-listing");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Sign in to GemFind</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          {error && <div className="text-red-500 text-sm text-center">{error === 'User is not confirmed.' ? (
            <>
              Authentication Error: Account not confirmed.<br />
              <a href="/signup2" className="text-blue-500 underline">Resend confirmation</a>
            </>
          ) : error}
          </div>}
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
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="min-w-[110px] px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-2xl text-base shadow transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-gray-500 text-sm text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup2" className="text-blue-500 hover:underline font-medium">Sign up</a>
        </div>
        <div className="text-gray-500 text-sm text-center mt-2">
          <a href="/login" className="text-blue-500 hover:underline font-medium">Classic Login</a>
        </div>
      </div>
    </div>
  );
}
