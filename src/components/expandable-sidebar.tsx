import { useState } from "react";

const menuItems = [
  { title: "Dashboard", content: "Overview & stats" },
  { title: "Settings", content: "Account & preferences" },
  { title: "Help", content: "FAQs & support" },
];

export default function ExpandableSidebar() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-2">
      {menuItems.map((item, index) => (
        <div key={index}>
          <button
            className="w-full text-left p-2 bg-gray-800 rounded flex justify-between"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            {item.title} {expanded === index ? "▲" : "▼"}
          </button>
          {expanded === index && (
            <p className="p-2 text-gray-300">{item.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
