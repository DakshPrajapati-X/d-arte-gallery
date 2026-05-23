"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl tracking-widest uppercase mb-4">Admin Access</h1>
          <p className="text-muted text-sm tracking-widest uppercase">D&apos;ARTE Gallery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground placeholder:text-muted/50 font-sans focus:border-foreground transition-colors"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground placeholder:text-muted/50 font-sans focus:border-foreground transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full pt-8 text-xs tracking-widest uppercase font-medium hover:text-muted transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
