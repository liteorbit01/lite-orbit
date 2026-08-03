export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-semibold">
        Lite Orbit Admin
      </h1>

      <div className="text-sm text-gray-600">
        Administrator
      </div>
    </header>
  );
}