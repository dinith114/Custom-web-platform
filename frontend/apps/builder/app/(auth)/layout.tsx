// Auth route group layout — minimal centered layout for login/register pages
// No sidebar, no dashboard nav — clean auth experience

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
