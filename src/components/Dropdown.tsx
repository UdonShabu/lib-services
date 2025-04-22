import { useEffect, useRef, useState } from "react";

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

// Usage Example: Dropdown Component
export default function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useOutsideClick(dropdownRef, () => setOpen(false));

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Toggle Menu</button>
      {open && (
        <div
          ref={dropdownRef}
          style={{ border: "1px solid black", padding: "10px" }}
        >
          Dropdown Content
        </div>
      )}
    </div>
  );
}
