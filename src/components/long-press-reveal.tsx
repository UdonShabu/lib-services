import { useState, useRef } from "react";

export default function LongPressReveal() {
  const [revealed, setRevealed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    timeoutRef.current = setTimeout(() => setRevealed(true), 1000);
  };

  const handlePointerUp = () => {
    clearTimeout(timeoutRef.current!);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="p-3 bg-blue-500 text-white rounded"
      >
        Hold to Reveal
      </button>
      {revealed && (
        <p className="mt-3 text-green-500">You revealed the secret!</p>
      )}
    </div>
  );
}
