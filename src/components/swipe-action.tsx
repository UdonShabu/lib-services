import { useRef, useState } from "react";

const SwipeAction = () => {
  const [translateX, setTranslateX] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - startX.current;
    // Limit the swipe movement to 80px to the left
    if (deltaX < 0) {
      setTranslateX(Math.max(deltaX, -80));
    }
    // Allow swiping back to the right (reset)
    else {
      setTranslateX(Math.min(deltaX, 0));
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    // If swiped enough to show delete button
    if (translateX < -40) {
      setTranslateX(-80); // Fully reveal delete button
    } else {
      setTranslateX(0); // Reset to initial position
    }
  };

  return (
    <div className="relative w-64 select-none">
      {/* Swipeable Content */}
      <div
        className="flex items-center bg-white shadow-md p-4 rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
        style={{ transform: `translateX(${translateX}px)` }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <span className="text-lg">Swipe me</span>
      </div>

      {/* Delete Button */}
      <button
        className={`absolute top-0 right-0 h-full bg-red-500 text-white px-4 rounded-lg transition-opacity ${
          translateX === -80 ? "opacity-100" : "opacity-0"
        }`}
      >
        Delete
      </button>
    </div>
  );
};

export default SwipeAction;
