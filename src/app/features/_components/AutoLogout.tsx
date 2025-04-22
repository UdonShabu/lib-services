"use client";

import { TimerReset } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AutoLogout() {
  const [isInActive, setIsInActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        setIsInActive(false);
      }

      timeoutRef.current = setTimeout(() => {
        setIsInActive(true);
      }, 3000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="p-10">
      {isInActive
        ? `You've been logged out due to inactivity!`
        : `You're active`}{" "}
    </div>
  );
}
