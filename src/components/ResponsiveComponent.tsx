import { useState, useEffect } from "react";

export default function ResponsiveComponent() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  return (
    <div className={isMobile ? "bg-blue-500" : "bg-green-500"}>
      <h1 className="text-white p-4">Window width: {width}px</h1>
    </div>
  );
}
