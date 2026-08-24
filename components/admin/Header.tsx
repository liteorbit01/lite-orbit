"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const title =
    pathname.split("/").pop()?.replace("-", " ") ?? "Dashboard";

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div>
        <h1 className="text-2xl font-semibold capitalize">
          {title}
        </h1>

        <p className="text-sm text-gray-500">
          Lite Orbit Administration
        </p>
      </div>

      <div className="text-right">
        <p className="font-medium">Administrator</p>
        <p className="text-sm text-gray-500">
          Secure Session
        </p>
      </div>

    </header>
  );
}