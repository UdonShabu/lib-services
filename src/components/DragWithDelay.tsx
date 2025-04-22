import React, { useState, useRef } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

export default function DragWithDelay() {
  const [dragging, setDragging] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-item",
  });

  const handlePointerDown = () => {
    setHoldProgress(0);
    timeoutRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timeoutRef.current!);
          setDragging(true);
        }
        return prev + 20; // Increase progress over 500ms
      });
    }, 100);
  };

  const handlePointerUp = () => {
    clearInterval(timeoutRef.current!);
    setHoldProgress(0);
    setDragging(false);
  };

  return (
    <DndContext>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{
          width: 100,
          height: 100,
          background: `linear-gradient(to right, red ${holdProgress}%, white ${holdProgress}%)`,
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : "none",
          transition: dragging ? "none" : "background 0.1s linear",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          cursor: dragging ? "grabbing" : "pointer",
        }}
      >
        Hold to Drag
      </div>
    </DndContext>
  );
}
