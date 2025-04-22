"use client";

import { useRef, useState } from "react";

export default function SoundVolume() {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [alerted, setAlerted] = useState(false);

  const handlePointerDown = () => {
    if (alerted && isHolding) {
      setAlerted(false);
      setIsHolding(false);
      return;
    }

    setIsHolding(true);
    timeout.current = setTimeout(() => {
      setAlerted(true);
      alert("Yo!");
    }, 2000);
  };
  const handlePointerUp = () => {
    setIsHolding(false);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  return (
    <div className="mx-auto w-44  space-y-3 mt-10">
      <button
        className="bg-blue-400 w-full text-white p-2 rounded-sm"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        Hold to alert
      </button>

      <div>
        <p>Adjust volume</p>
        <input type="range" min="0" max="1" step="0.1" />
      </div>

      {isHolding && (
        <p className="text-emerald-400">
          Holding Detecting... {alerted ? "Alert triggered!" : "Waiting"}
        </p>
      )}
    </div>
  );
}
