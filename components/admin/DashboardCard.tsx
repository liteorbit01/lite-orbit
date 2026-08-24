type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
};

export default function DashboardCard({
  title,
  value,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {value}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {description}
          </p>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}