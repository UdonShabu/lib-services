import { useState, useEffect } from "react";

export default function ToastNotification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 transition-transform transform ${
        show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } bg-blue-500 text-white p-4 rounded-lg shadow-md`}
    >
      <p>✔ Task completed successfully!</p>
      <button className="absolute top-1 right-2" onClick={() => setShow(false)}>
        ✖
      </button>
    </div>
  );
}
