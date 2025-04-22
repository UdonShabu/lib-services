"use client";
import { useRef, useState } from "react";

export default function PrevInputValue() {
  const prevValueRef = useRef<string | null>(null);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    prevValueRef.current = value;
    setValue(e.target.value);
  };

  return (
    <div className="p-4">
      <input value={value} onChange={handleChange} className="border p-2" />
      <p>Previous Value: {prevValueRef.current}</p>
    </div>
  );
}
