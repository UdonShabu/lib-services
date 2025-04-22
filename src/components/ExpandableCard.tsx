import { useState } from "react";

export default function ExpandableCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`max-w-sm mx-auto p-6 rounded-lg bg-white shadow-lg transition-all duration-500 ease-in-out transform ${
        expanded ? "scale-105" : "scale-100"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <h2 className="text-lg font-semibold">
        Click to {expanded ? "Collapse" : "Expand"}
      </h2>
      {expanded && (
        <p className="mt-2 text-gray-600">
          This is additional content revealed on click.
        </p>
      )}
    </div>
  );
}
