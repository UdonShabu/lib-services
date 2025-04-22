"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sampleText = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast improves efficiency and reduces errors.",
  "Monkey see, monkey do. Keep typing!",
  "Practice makes perfect. Keep going!",
  "Coding is fun when you get better at it.",
];

const getRandomText = () =>
  sampleText[Math.floor(Math.random() * sampleText.length)];

export default function MonkeyTypeClone() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  // ✅ Fix Hydration Mismatch by setting text after mount
  useEffect(() => {
    setText(getRandomText());
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      clearInterval(intervalRef.current);
      calculateStats();
    }
  }, [timeLeft]);

  const handleKeyPress = (e) => {
    if (gameOver || timeLeft === 0) return;
    if (input.length === 0) startTimer();
    if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (input.length < text.length && e.key.length === 1) {
      setInput((prev) => prev + e.key);
    }
    let correctChars = input
      .split("")
      .filter((char, i) => char === text[i]).length;
    setAccuracy(((correctChars / text.length) * 100).toFixed(2));
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const calculateStats = () => {
    const timeTaken = (30 - timeLeft) / 60;
    const wordCount = text.split(" ").length;
    setWpm(timeTaken > 0 ? Math.round(wordCount / timeTaken) : 0);
  };

  const resetGame = () => {
    clearInterval(intervalRef.current);
    setText(getRandomText());
    setInput("");
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(30);
    setGameOver(false);
    inputRef.current.focus();
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      tabIndex={0}
      ref={inputRef}
      onKeyDown={handleKeyPress}
    >
      <Card className="p-6 w-full max-w-2xl shadow-lg bg-white">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-4">
            🐒 Monkey Type Clone
          </h1>
          {text && ( // Ensure text is not empty before rendering
            <p className="text-lg text-gray-700 text-center mb-2">
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  className={`${
                    index < input.length
                      ? input[index] === text[index]
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {char}
                </span>
              ))}
            </p>
          )}
          <div className="mt-4 flex justify-between">
            <p className="text-md text-gray-600">
              WPM: <span className="font-bold">{wpm}</span>
            </p>
            <p className="text-md text-gray-600">
              Accuracy: <span className="font-bold">{accuracy}%</span>
            </p>
            <p
              className={`text-md font-bold ${
                timeLeft <= 5 ? "text-red-500" : "text-gray-600"
              }`}
            >
              Time: {timeLeft}s
            </p>
          </div>
          {gameOver && (
            <p className="text-red-500 text-center mt-4">Time's up! ⏳</p>
          )}
          <Button
            className="mt-4 w-full bg-blue-500 text-white"
            onClick={resetGame}
          >
            Restart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
