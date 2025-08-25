"use client";
import React, { useState } from "react";

export default function FormPage() {
  // Step 1: Set up state for form fields and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  // Step 2: Handle form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;

    // Step 3: Validate name
    if (!name.trim()) {
      setErrorName("Name is required.");
      valid = false;
    } else {
      setErrorName("");
    }

    // Step 4: Validate email
    if (!email.trim()) {
      setErrorEmail("Email is required.");
      valid = false;
    } else if (!email.includes("@")) {
      setErrorEmail("Email is not valid.");
      valid = false;
    } else {
      setErrorEmail("");
    }

    // Step 5: If valid, show alert
    if (valid) {
      alert("Form submitted!");
      setName("");
      setEmail("");
    }
  }

  // Step 6: Render the form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Simple Form</h2>
        <div className="mb-3">
          <label>Name:</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorName && (
            <div className="text-red-500 text-xs">{errorName}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && (
            <div className="text-red-500 text-xs">{errorEmail}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
