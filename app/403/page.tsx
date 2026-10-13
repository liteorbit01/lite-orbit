import Link from "next/link";

export const metadata = {
  title: "403 | Access Denied",
};

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Error 403
        </p>

        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          Access Denied
        </h1>

        <p className="mt-6 text-gray-600">
          Your account is authenticated, but you do not have permission
          to access this page.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Return to Home
          </Link>
        </div>

      </div>
    </main>
  );
}