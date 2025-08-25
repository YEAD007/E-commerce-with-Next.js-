"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function Navbar() {
  // Show 'Sell' only if logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, []);
  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 text-white flex items-center justify-between px-6 py-3 shadow-lg mb-8 sticky top-0 z-50 backdrop-blur">
      <div className="font-bold text-xl tracking-wide">My Website</div>
      <div className="flex gap-6 text-base font-medium">
        <a href="/" className="hover:text-blue-300 transition-colors">
          Home
        </a>
        <a href="/login" className="hover:text-blue-300 transition-colors">
          Login
        </a>
        <a href="/signup" className="hover:text-blue-300 transition-colors">
          Sign Up
        </a>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[80vh] p-8">
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-gray-600 mb-8 text-center max-w-xl">
          This is a simple home page with a navbar. Use the navigation above to
          explore. Click <b>Sell</b> to open the product form.
        </p>
        {/* Show Sell button only if logged in */}
        {typeof window !== "undefined" &&
          localStorage.getItem("isLoggedIn") === "true" && (
            <a
              href="/product/form"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Sell a Product
            </a>
          )}
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center py-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
