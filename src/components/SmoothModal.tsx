import { useState } from "react";

export default function SmoothModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform scale-95 opacity-0 animate-fadeIn"
            onAnimationEnd={() => setOpen(true)}
          >
            <h2 className="text-lg font-semibold">Smooth Modal</h2>
            <p className="mt-2 text-gray-600">
              This modal smoothly appears with scale and fade.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
