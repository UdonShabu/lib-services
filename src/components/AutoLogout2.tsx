import { useState, useEffect, useRef } from "react";

export default function AutoLogout2() {
  const [countdown, setCountdown] = useState(10);
  const [isInactive, setIsInactive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      setCountdown(30);
      setIsInactive(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsInactive(true), 3000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  useEffect(() => {
    if (!isInactive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isInactive]);

  useEffect(() => {
    if (countdown === 0) {
      console.log("User logged out!");
    }
  }, [countdown]);

  return (
    <div className="p-4">
      <p className="text-lg">
        {isInactive ? `Logging out in ${countdown}s...` : "You're active"}
      </p>
    </div>
  );
}
