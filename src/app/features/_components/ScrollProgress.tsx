"use client";

import { use, useEffect, useState } from "react";

export default function ScrollProgress() {
  // on scroll -> change progress -> state -> to width -> styles

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const actualProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(actualProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="fixed top-0 left-0 bg-emerald-300 w-full h-3 transition-transform"
      style={{ width: `${progress}%` }}
    >
      <p>s</p>
    </div>
  );
}
