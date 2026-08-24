"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/orders", label: "Orders", icon: "🛒" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "📧" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col bg-black text-white">

      <div className="border-b border-gray-800 p-8">
        <h1 className="text-2xl font-semibold tracking-[0.3em]">
          LITE ORBIT
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Administration
        </p>
      </div>

      <nav className="flex-1 p-4">

        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-white text-black"
                  : "hover:bg-gray-900"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-gray-800 p-6">
        <LogoutButton />
      </div>

    </aside>
  );
}