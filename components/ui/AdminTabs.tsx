"use client";

export type AdminTab = {
  id: string;
  label: string;
};

type AdminTabsProps = {
  tabs: AdminTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
};

export default function AdminTabs({
  tabs,
  activeTab,
  onChange,
}: AdminTabsProps) {
  return (
    <div className="border-b">
      <nav className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={[
                "border-b-2 px-5 py-3 text-sm font-medium transition",
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}