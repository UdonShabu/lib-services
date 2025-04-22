"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoLogoutCountDown() {
  const [isInactive, setIsInactive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      setIsInactive(false);
      setCountdown(10);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsInactive(true);
      }, 3000);
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
      setCountdown((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isInactive]);

  return (
    <div className="p-10">
      <p>
        {isInactive
          ? countdown === 0
            ? "U r inactive"
            : `Logging out in ${countdown}...`
          : "U r active"}{" "}
      </p>
    </div>
  );
}
