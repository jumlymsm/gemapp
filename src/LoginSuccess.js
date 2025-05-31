import React from "react";

export default function LoginSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Login Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Welcome to GemFind. You have successfully logged in.</p>
        <a
          href="https://main.d27uvtfjtw8lzw.amplifyapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition"
        >
          Go to Main Site
        </a>
      </div>
    </div>
  );
}
