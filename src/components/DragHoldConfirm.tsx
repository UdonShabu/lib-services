import { DndContext, useDraggable } from "@dnd-kit/core";
import { useState, useRef } from "react";

export default function DragHoldConfirm() {
  const [isHeld, setIsHeld] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const handleDragStart = () => {
    timeoutRef.current = setTimeout(() => setIsHeld(true), 500);
  };

  const handleDragEnd = () => {
    clearTimeout(timeoutRef.current!);
    setIsHeld(false);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center space-y-4">
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="p-3 bg-yellow-500 text-black rounded"
          style={{
            transform: transform
              ? `translate(${transform.x}px, ${transform.y}px)`
              : "none",
          }}
        >
          Drag Me
        </button>
        <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-500">
          {isHeld ? "✅ Confirmed!" : "Drop here & hold"}
        </div>
      </div>
    </DndContext>
  );
}
