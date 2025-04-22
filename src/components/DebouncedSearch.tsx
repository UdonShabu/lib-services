import { useState, useEffect } from "react";

export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      console.log("Fetching results for:", query);
      setResults([query + " Result 1", query + " Result 2"]);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((r, index) => (
          <li key={index} className="border p-2">
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
