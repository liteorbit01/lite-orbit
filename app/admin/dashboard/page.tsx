import DashboardCard from "@/components/admin/DashboardCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <section>
        <h2 className="text-3xl font-semibold">
          Welcome back 👋
        </h2>

        <p className="mt-2 text-gray-500">
          Here's what's happening with Lite Orbit today.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Products"
          value="1"
          description="Products available"
          icon="📦"
        />

        <DashboardCard
          title="Orders"
          value="0"
          description="Orders received"
          icon="🛒"
        />

        <DashboardCard
          title="Subscribers"
          value="0"
          description="Newsletter subscribers"
          icon="📧"
        />

        <DashboardCard
          title="Revenue"
          value="$0"
          description="Total revenue"
          icon="💰"
        />

      </section>

      <section className="rounded-2xl bg-white p-8 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold">
          Recent Activity
        </h3>

        <ul className="space-y-4 text-gray-600">

          <li>✅ Admin dashboard initialized</li>

          <li>✅ Supabase connected</li>

          <li>✅ Authentication enabled</li>

          <li>🚀 Ready to create products</li>

        </ul>

      </section>

    </div>
  );
}