import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className={`mt-6 inline-block px-6 py-3 rounded-lg ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}