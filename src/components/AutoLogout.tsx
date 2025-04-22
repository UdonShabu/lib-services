import { useState, useEffect, useRef } from "react";

export default function AutoLogout() {
  const [isInactive, setIsInactive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // timeoutRef.current = setTimeout(() => setIsInactive(true), 30000);
    timeoutRef.current = setTimeout(() => setIsInactive(true), 3000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="p-4">
      <p className="text-lg">
        {isInactive
          ? "You've been logged out due to inactivity!"
          : "You're active"}
      </p>
    </div>
  );
}
