import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen">

      <div className="p-8 text-2xl font-bold tracking-widest">
        LITE ORBIT
      </div>

      <nav className="flex flex-col">

        <Link
          href="/admin/dashboard"
          className="px-8 py-4 hover:bg-gray-900"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/products"
          className="px-8 py-4 hover:bg-gray-900"
        >
          Products
        </Link>

        <Link
          href="/admin/orders"
          className="px-8 py-4 hover:bg-gray-900"
        >
          Orders
        </Link>

        <Link
          href="/admin/customers"
          className="px-8 py-4 hover:bg-gray-900"
        >
          Customers
        </Link>

        <Link
          href="/admin/subscribers"
          className="px-8 py-4 hover:bg-gray-900"
        >
          Subscribers
        </Link>

        <Link
          href="/admin/settings"
          className="px-8 py-4 hover:bg-gray-900"
        >
          Settings
        </Link>

      </nav>

    </aside>
  );
}