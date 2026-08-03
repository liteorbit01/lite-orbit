"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {
  error: "",
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center">
        Lite Orbit
      </h1>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Administrator Login
      </p>

      <form action={formAction} className="space-y-6">

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-medium"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
          />
        </div>

        {state.error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-700">
              {state.error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>

      </form>

    </div>
  );
}