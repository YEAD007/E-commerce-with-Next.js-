"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkLogin = () => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      };
      checkLogin();
      window.addEventListener("storage", checkLogin);
      return () => window.removeEventListener("storage", checkLogin);
    }
  }, []);

  // Also update on same-tab login/logout
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 text-white flex items-center justify-between px-6 py-3 shadow-lg mb-8 sticky top-0 z-50 backdrop-blur">
      <div className="font-bold text-xl tracking-wide">My Website</div>
      <div className="flex gap-6 text-base font-medium">
        <a href="/" className="hover:text-blue-300 transition-colors">
          Home
        </a>
        {!isLoggedIn && (
          <>
            <a href="/login" className="hover:text-blue-300 transition-colors">
              Login
            </a>
            <a href="/signup" className="hover:text-blue-300 transition-colors">
              Sign Up
            </a>
          </>
        )}
        {isLoggedIn && (
          <>
            <a
              href="/product/form"
              className="hover:text-blue-300 transition-colors"
            >
              Sell
            </a>
            <a
              href="/product"
              className="hover:text-blue-300 transition-colors"
            >
              Products
            </a>
            <a
              href="#"
              className="hover:text-blue-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined") {
                  localStorage.setItem("isLoggedIn", "false");
                  window.location.href = "/";
                }
              }}
            >
              Logout
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
