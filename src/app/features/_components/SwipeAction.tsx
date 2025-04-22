"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function SwipeAction() {
  const [translateX, setTranslateX] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleDown = (clientX: number) => {
    startX.current = clientX;
    isDragging.current = true;
  };
  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;

    const distanceX = clientX - startX.current;
    if (distanceX > 0) {
      setTranslateX(Math.min(distanceX, 0));
    } else {
      setTranslateX(Math.max(distanceX, -60));
    }
  };
  const handleUp = () => {
    isDragging.current = false;
  };

  return (
    <div className=" w-64 relative mx-auto">
      <div
        className="shadow-md p-2 rounded-md select-none text-center transition-transform duration-300 ease-in-out"
        onPointerDown={(e) => handleDown(e.clientX)}
        onPointerMove={(e) => handleMove(e.clientX)}
        onPointerUp={handleUp}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <span>Swipe </span>
      </div>{" "}
      <button
        className={cn(
          "bg-red-400 text-white p-2 rounded-md",
          "absolute top-0 right-0 transition-opacity",
          translateX === -60 ? "opacity-100" : "opacity-0"
        )}
      >
        Delete
      </button>{" "}
    </div>
  );
}
