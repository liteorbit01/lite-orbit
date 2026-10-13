import type { ReactNode } from "react";

import { requireAdmin } from "@/lib/auth";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}