import { useState, useRef } from "react";

export default function HoldButton() {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 20, 100)); // Smoothly increase progress
    }, 100);

    timeoutRef.current = setTimeout(() => {
      console.log("Action triggered!"); // Replace with your logic
    }, 500);
  };

  const handlePointerUp = () => {
    clearTimeout(timeoutRef.current!);
    clearInterval(intervalRef.current!);
    setProgress(0); // Reset if released early
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp} // Prevents holding outside
      className="relative w-40 h-12  font-bold overflow-hidden"
    >
      <span className="relative z-10">Hold Me</span>
      <div
        className="absolute left-0 top-0 h-full bg-red-500 transition-all"
        style={{ width: `${progress}%` }}
      />
    </button>
  );
}
