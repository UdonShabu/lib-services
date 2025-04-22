"use client"; // If using Next.js, ensure client-side rendering

import { useState, useEffect } from "react";

const gridSize = 5;

export default function MazeGame() {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    setGrid(generateGrid()); // Generate the grid after mounting
  }, []);

  function generateGrid() {
    return Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => (Math.random() < 0.3 ? 1 : 0))
    );
  }

  const findPath = () => {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let queue = [[0, 0, []]];
    let visited = new Set();

    while (queue.length) {
      let [x, y, p] = queue.shift();
      if (x === gridSize - 1 && y === gridSize - 1) {
        setPath(p.concat([[x, y]]));
        return;
      }

      for (let [dx, dy] of directions) {
        let nx = x + dx,
          ny = y + dy;
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < gridSize &&
          ny < gridSize &&
          grid[nx][ny] === 0
        ) {
          let key = `${nx},${ny}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push([nx, ny, p.concat([[x, y]])]);
          }
        }
      }
    }
    setPath([]);
  };

  if (grid.length === 0) return <p>Loading...</p>; // Prevent errors before grid initializes

  return (
    <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Maze Solver</h1>
      <div className="grid grid-cols-5 gap-1">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-12 h-12 flex items-center justify-center border
                ${
                  cell === 1
                    ? "bg-gray-700"
                    : path.some(([px, py]) => px === i && py === j)
                    ? "bg-green-500"
                    : "bg-white"
                }
              `}
            />
          ))
        )}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={findPath}
      >
        Solve Maze
      </button>
      <button
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded shadow"
        onClick={() => setGrid(generateGrid())}
      >
        New Maze
      </button>
    </div>
  );
}
