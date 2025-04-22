import { useState, useEffect } from "react";

export default function TicTacToeBot() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isBotThinking, setIsBotThinking] = useState(false);

  useEffect(() => {
    if (!isXNext && !winner) {
      setIsBotThinking(true);
      setTimeout(() => {
        const botMove = getBotMove(board);
        if (botMove !== -1) {
          makeMove(botMove, "O");
        }
        setIsBotThinking(false);
      }, 700); // 700ms delay for bot move
    }
  }, [isXNext, winner]);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : "Draw";
  };

  const getBotMove = (board) => {
    const available = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    return available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : -1;
  };

  const makeMove = (index, player) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setIsXNext(player === "X" ? false : true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Tic-Tac-Toe (vs Bot)</h1>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="w-16 h-16 bg-white border text-2xl font-bold flex items-center justify-center"
            onClick={() =>
              isXNext &&
              !cell &&
              !winner &&
              !isBotThinking &&
              makeMove(idx, "X")
            }
            disabled={cell || isBotThinking}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <p className="mt-4 text-lg font-semibold">
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </p>
      )}
      {isBotThinking && (
        <p className="text-gray-500 mt-2">Bot is thinking...</p>
      )}
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
          setWinner(null);
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
