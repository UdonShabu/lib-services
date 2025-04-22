import { useState } from "react";

export default function NumberGuessingGame() {
  const [target] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(5);

  const checkGuess = () => {
    if (attempts <= 0) return;
    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage("Enter a valid number!");
      return;
    }
    if (num === target) {
      setMessage("🎉 Correct! You Win!");
    } else if (num < target) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }
    setAttempts(attempts - 1);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 ">
      <h1 className="text-2xl font-bold">Guess the Number</h1>
      <p className="text-lg">Attempts Left: {attempts}</p>
      <input
        type="number"
        className="border p-2 rounded mt-4"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded shadow"
        onClick={checkGuess}
      >
        Submit Guess
      </button>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}
