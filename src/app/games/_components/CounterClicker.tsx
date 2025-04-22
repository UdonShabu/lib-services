import { useState, useEffect } from "react";

export default function CounterClicker() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const targetScore = 15;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 ">
      <h1 className="text-2xl font-bold">Counter Clicker</h1>
      <p className="text-lg">Time Left: {timeLeft}s</p>
      <p className="text-xl font-semibold">Score: {count}</p>
      {timeLeft > 0 ? (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
          onClick={() => setCount(count + 1)}
        >
          Click Me!
        </button>
      ) : (
        <p className="text-red-500 text-lg">
          {count >= targetScore ? "You Win! 🎉" : "Game Over! 😢"}
        </p>
      )}
    </div>
  );
}
