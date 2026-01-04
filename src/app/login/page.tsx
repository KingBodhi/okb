"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    alert("Login functionality coming soon.");
  };

  return (
    <>
      {/* Header Spacer */}
      <div className="h-32" />

      <section className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl text-center mb-8 font-cinzel">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link href="/contact" className="text-[#3949AB] hover:underline">
              Contact us
            </Link>{" "}
            for account access.
          </p>
        </div>
      </section>
    </>
  );
}
