"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Mail, Lock, MicroscopeIcon } from "lucide-react";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <MicroscopeIcon className="mx-auto size-10 text-primary" />
          <h1 className="mt-3 font-heading text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage ForensiLabs</p>
        </div>

        <form action={action} className="space-y-4">
          {state?.error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
