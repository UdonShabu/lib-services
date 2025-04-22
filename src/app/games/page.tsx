"use client";

import { DraggableStory } from "@/components/dnd-kit/1 - Core/Draggable/1-Draggable";
import CounterClicker from "./_components/CounterClicker";
import MazeGame from "./_components/MazeGame";
import MemoryGame from "./_components/MemoryGame";
import MonkeyTypeClone from "./_components/MonkeyTypeClone";
import NumberGuessingGame from "./_components/NumberGuessingGame";
import RockPaperScissors from "./_components/RockPaperScissors";
import SnakeGame from "./_components/SnakeGame";
import TicTacToeBot from "./_components/TicTacToeBot";
import TypingSpeedTest from "./_components/TypingSpeedTest";

export default function Games() {
  return (
    <div className=" min-h-screen">
      <p>Games</p>
      {/* <CounterClicker />
      <NumberGuessingGame />
      <MemoryGame />
      <TicTacToeBot /> */}
      {/* <RockPaperScissors /> */}
      {/* <MonkeyTypeClone /> */}
    </div>
  );
}
