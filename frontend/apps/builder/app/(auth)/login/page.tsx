// Login page — email/password form with JWT storage

import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login — Website Builder",
  description: "Sign in to your Website Builder account",
};

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
      </div>
      <LoginForm />
    </div>
  );
}
