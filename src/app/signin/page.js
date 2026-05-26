"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4 relative overflow-hidden">
      {/* Background soft blur effect */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-8 shadow-sm relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold tracking-tight text-on-surface">Welcome Back</h1>
          <p className="text-on-surface-variant mt-2 text-sm">Access your archive.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container/50 text-error text-sm rounded-lg border border-error/20 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-on-surface">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-on-surface">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-primary text-on-primary rounded-lg font-medium text-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></span>
            ) : null}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
