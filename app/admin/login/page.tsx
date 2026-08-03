import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login | Lite Orbit",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <LoginForm />
    </main>
  );
}