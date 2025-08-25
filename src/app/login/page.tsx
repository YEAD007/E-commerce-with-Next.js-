"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // Handle login logic
  const onSubmit = async (data: LoginFormData) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 800));
    // Get user from localStorage
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userStr) {
      toast.error("Please sign up first");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.email !== data.email || user.password !== data.password) {
      toast.error("User is not registered");
      return;
    }
    toast.success("Login successful!");
    // Set login flag in localStorage
    localStorage.setItem("isLoggedIn", "true");
    setTimeout(() => router.push("/"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="off"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
