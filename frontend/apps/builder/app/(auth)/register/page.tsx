// Registration page — name, email, password form

import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register — Website Builder",
  description: "Create a new Website Builder account",
};

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-2 text-sm text-gray-600">Start building beautiful websites today</p>
      </div>
      <RegisterForm />
    </div>
  );
}
