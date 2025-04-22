"use client";

import { useEffect, useRef, useState } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
          document.body.scrollHeight - 50 &&
        !loading
      ) {
        setLoading(true);

        setTimeout(() => {
          setItems((prev) => [
            ...prev,
            ...Array.from(
              { length: 10 },
              (_, i) => `Item ${prev.length + i + 1}`
            ),
          ]);
          setLoading(false);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="space-y-3 w-44 mx-auto">
      <ul className="space-y-3 ">
        {items.map((item) => (
          <div key={item} className="bg-gray-300 p-1 rounded-md">
            {item}{" "}
          </div>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
    </div>
  );
}
