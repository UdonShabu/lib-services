import { useState, useEffect } from "react";

const cards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓"].sort(
  () => Math.random() - 0.5
);

export default function MemoryGame() {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleFlip = (index) => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index)
    ) {
      setFlipped([...flipped, index]);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">Memory Matching Game</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {cards.map((card, index) => (
          <button
            key={index}
            className="w-16 h-16 bg-white border text-2xl font-bold"
            onClick={() => handleFlip(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </button>
        ))}
      </div>
      {matched.length === cards.length && (
        <p className="mt-4 text-lg font-semibold">You Won! 🎉</p>
      )}
    </div>
  );
}
