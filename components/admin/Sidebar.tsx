export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-50 p-6">
      <h2 className="mb-8 text-2xl font-bold">
        Lite Orbit
      </h2>

      <nav className="space-y-3">
        <p>Dashboard</p>
        <p>Products</p>
        <p>Categories</p>
        <p>Collections</p>
        <p>Inventory</p>
        <p>Orders</p>
        <p>Customers</p>
        <p>Shipping</p>
        <p>Settings</p>
      </nav>
    </aside>
  );
}