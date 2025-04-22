import { useState, useRef } from "react";

export default function CircularProgressHold() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    let value = 0;
    intervalRef.current = setInterval(() => {
      value += 5;
      setProgress(value);
    }, 100);
    timeoutRef.current = setTimeout(() => {
      console.log("Action confirmed!");
    }, 2000);
  };

  const handlePointerUp = () => {
    clearTimeout(timeoutRef.current!);
    clearInterval(intervalRef.current!);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-20 h-20 flex items-center justify-center border-2 rounded-full"
      >
        <svg width="50" height="50">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="red"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray="125"
            strokeDashoffset={125 - (progress / 100) * 125}
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
