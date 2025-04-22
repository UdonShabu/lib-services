import { useState } from "react";

export default function DragToExpand() {
  const [height, setHeight] = useState(100);
  const [dragging, setDragging] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setHeight(e.clientY - 50);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>
      <div
        className="w-64 bg-blue-500 text-white flex justify-center items-center rounded"
        style={{ height: `${height}px` }}
      >
        Drag to resize
      </div>
      <div
        className="w-64 h-3 bg-gray-700 cursor-ns-resize mt-1"
        onMouseDown={() => setDragging(true)}
        onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
