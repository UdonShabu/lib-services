"use client";
import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
} from "date-fns";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface Event {
  id: string;
  title: string;
  date: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(
      localStorage.getItem("calendarEvents") || "[]"
    );
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (date: string) => {
    const eventTitle = prompt("Enter event title:");
    if (eventTitle) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventTitle,
        date,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    setEvents((prev) =>
      prev.map((e) => (e.id === active.id ? { ...e, date: over.id } : e))
    );
  };

  const renderDays = () => {
    let days = [];
    let day = startOfWeek(startOfMonth(currentDate));
    const endDay = endOfWeek(endOfMonth(currentDate));

    while (day <= endDay) {
      const formattedDate = format(day, "yyyy-MM-dd");

      days.push(
        <DroppableDay
          key={formattedDate}
          date={formattedDate}
          onClick={() => handleAddEvent(formattedDate)}
        >
          {events
            .filter((e) => e.date === formattedDate)
            .map((event) => (
              <DraggableEvent key={event.id} event={event} />
            ))}
        </DroppableDay>
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="max-w-4xl mx-auto mt-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            ◀ Prev
          </button>
          <h2 className="text-xl font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next ▶
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 bg-gray-100 p-2 text-center font-semibold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        {renderDays()}
      </div>
    </DndContext>
  );
};

export default Calendar;

// Draggable event component
const DraggableEvent = ({ event }: { event: Event }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded cursor-grab"
      style={{ transform: `translate(${transform?.x}px, ${transform?.y}px)` }}
    >
      {event.title}
    </div>
  );
};

// Droppable calendar day component
const DroppableDay = ({
  date,
  children,
  onClick,
}: {
  date: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const { setNodeRef } = useDroppable({ id: date });

  return (
    <div
      ref={setNodeRef}
      className="border p-4 h-24 relative cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <span className="text-sm font-semibold">
        {format(new Date(date), "d")}
      </span>
      {children}
    </div>
  );
};
