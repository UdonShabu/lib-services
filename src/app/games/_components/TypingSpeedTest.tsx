import { useState, useEffect } from "react";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes it painless to create interactive UIs.",
  "Coding is like humor, if you have to explain it, it’s bad.",
];

export default function TypingSpeedTest() {
  const [sentence, setSentence] = useState(
    sentences[Math.floor(Math.random() * sentences.length)]
  );
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    if (input.length === 1) setStartTime(Date.now());
    if (input.length === sentence.length) {
      const timeTaken = (Date.now() - startTime) / 1000;
      setWpm(Math.round((sentence.split(" ").length / timeTaken) * 60));
      let correctChars = sentence
        .split("")
        .filter((char, i) => char === input[i]).length;
      setAccuracy(Math.round((correctChars / sentence.length) * 100));
    }
  }, [input]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Typing Speed Test</h1>
      <p className="text-gray-700 mb-4">{sentence}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-3 py-2 w-full max-w-md text-lg"
      />
      {input.length === sentence.length && (
        <p className="mt-4">
          WPM: {wpm} | Accuracy: {accuracy}%
        </p>
      )}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => {
          setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
          setInput("");
          setWpm(0);
          setAccuracy(100);
          setStartTime(null);
        }}
      >
        Restart
      </button>
    </div>
  );
}
