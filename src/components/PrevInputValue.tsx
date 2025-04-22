import { useRef, useState } from "react";

export default function PrevInputValue() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevValueRef = useRef<string | null>(null);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    prevValueRef.current = value;
    setValue(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className="border p-2"
      />
      <button onClick={handleFocus} className="p-2 bg-blue-500 text-white ml-2">
        Focus
      </button>
      <p>Previous Value: {prevValueRef.current}</p>
    </div>
  );
}
