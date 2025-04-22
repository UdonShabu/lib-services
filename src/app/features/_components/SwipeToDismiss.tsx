"use client";

import { useRef, useState } from "react";

export default function SwipeToDismiss() {
  const [dismissed, setDismissed] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (clientX: number) => {
    startX.current = clientX;
    isDragging.current = true;
  };
  const handleMouseMove = (clientX: number) => {
    if (!isDragging.current) return;

    const distanceX = clientX - startX.current;
    if (distanceX < 0) {
      setTranslateX(distanceX);
    }
  };
  const handleMouseEnd = () => {
    if (translateX > -150) {
      setTranslateX(0);
    } else {
      setDismissed(true);
    }
    isDragging.current = false;
  };

  if (dismissed) return <p>Aloha!</p>;
  return (
    <div
      className="bg-sky-300 p-1 text-center select-none transition-transform"
      style={{ transform: `translateX(${translateX}px) ` }}
      onPointerDown={(e) => handleMouseDown(e.clientX)}
      onPointerMove={(e) => handleMouseMove(e.clientX)}
      onPointerUp={handleMouseEnd}
      onPointerLeave={handleMouseEnd}
    >
      <p>Swipe to dismiss</p>
      {translateX}
    </div>
  );
}
