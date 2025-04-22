import { useState, useEffect } from "react";

const gridSize = 10;
const getRandomPosition = () => [
  Math.floor(Math.random() * gridSize),
  Math.floor(Math.random() * gridSize),
];

export default function SnakeGame() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState(getRandomPosition);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const move = setInterval(() => {
      setSnake((prev) => {
        const newHead = [prev[0][0] + direction[0], prev[0][1] + direction[1]];
        if (
          newHead[0] < 0 ||
          newHead[0] >= gridSize ||
          newHead[1] < 0 ||
          newHead[1] >= gridSize ||
          prev.some((seg) => seg[0] === newHead[0] && seg[1] === newHead[1])
        ) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomPosition);
          return newSnake;
        }
        return newSnake.slice(0, -1);
      });
    }, 200);
    return () => clearInterval(move);
  }, [direction, food, gameOver]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Snake Game</h1>
      {gameOver && (
        <p className="text-red-500 font-bold">Game Over! Press Restart</p>
      )}
      <div className="grid grid-cols-10 gap-1 mt-4">
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = Math.floor(i / gridSize),
            y = i % gridSize;
          return (
            <div
              key={i}
              className={`w-8 h-8 border ${
                snake.some((seg) => seg[0] === x && seg[1] === y)
                  ? "bg-green-500"
                  : food[0] === x && food[1] === y
                  ? "bg-red-500"
                  : "bg-white"
              }`}
            />
          );
        })}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => window.location.reload()}
      >
        Restart
      </button>
    </div>
  );
}
