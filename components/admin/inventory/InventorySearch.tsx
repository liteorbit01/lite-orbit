"use client";

type InventorySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InventorySearch({
  value,
  onChange,
}: InventorySearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by product name or SKU..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          shadow-sm
          focus:border-black
          focus:outline-none
        "
      />
    </div>
  );
}