import { useState, useRef } from "react";

export default function SwipeToDismiss() {
  const [x, setX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const startXRef = useRef(0);

  const handleStart = (clientX: number) => {
    startXRef.current = clientX;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const moveX = clientX - startXRef.current;
    if (moveX < 0) setX(moveX); // Only allow left swipe
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (x < -150) {
      setDismissed(true);
    } else {
      setX(0); // Snap back if not swiped far enough
    }
  };

  if (dismissed) return <p className="text-red-500">Item deleted!</p>;

  return (
    <div
      className="p-3 bg-blue-500 text-white rounded cursor-pointer transition-transform select-none"
      style={{
        transform: `translateX(${x}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      Swipe me left (Mouse & Touch)
    </div>
  );
}
