"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const choices = ["rock", "paper", "scissors"];
const getRandomChoice = () =>
  choices[Math.floor(Math.random() * choices.length)];

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, bot: 0 });

  const getResult = (player, bot) => {
    if (player === bot) return "It's a Draw! 😐";
    if (
      (player === "rock" && bot === "scissors") ||
      (player === "paper" && bot === "rock") ||
      (player === "scissors" && bot === "paper")
    ) {
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      return "You Win! 🎉";
    }
    setScore((prev) => ({ ...prev, bot: prev.bot + 1 }));
    return "You Lose! 😢";
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    setBotChoice(null);
    setResult("");

    setTimeout(() => {
      const botMove = getRandomChoice();
      setBotChoice(botMove);
      setResult(getResult(choice, botMove));
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white">
      <Card className="p-6 w-full max-w-md bg-white shadow-lg rounded-lg">
        <CardContent className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            ✊ Rock, 📄 Paper, ✂️ Scissors
          </h1>
          <p className="text-md text-gray-600 mt-2">Make your move!</p>

          <div className="flex justify-center gap-6 mt-6">
            {choices.map((choice, i) => (
              <motion.button
                key={choice}
                className="text-3xl p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                onClick={() => handleChoice(choice)}
                whileTap={{ scale: 0.9 }}
              >
                {choice === "rock" ? "✊" : choice === "paper" ? "📄" : "✂️"}
              </motion.button>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-lg font-semibold text-gray-700">
            <p>🏆 You: {score.player}</p>
            <p>🤖 Bot: {score.bot}</p>
          </div>

          <div className="mt-6">
            {playerChoice && (
              <motion.div
                key={playerChoice + "0"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl"
              >
                You:{" "}
                {playerChoice === "rock"
                  ? "✊"
                  : playerChoice === "paper"
                  ? "📄"
                  : "✂️"}
              </motion.div>
            )}
            {botChoice && (
              <motion.div
                key={botChoice + "1"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 }}
                className="text-4xl mt-2"
              >
                Bot:{" "}
                {botChoice === "rock"
                  ? "✊"
                  : botChoice === "paper"
                  ? "📄"
                  : "✂️"}
              </motion.div>
            )}
            {result && (
              <motion.p
                key={result}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold mt-4"
              >
                {result}
              </motion.p>
            )}
          </div>

          <Button
            className="mt-6 w-full bg-blue-500 text-white"
            onClick={() => setPlayerChoice(null)}
          >
            Play Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
