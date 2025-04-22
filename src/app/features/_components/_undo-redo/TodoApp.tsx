"use client";

import { useState } from "react";
import TodoList from "./TodoList";
import { title } from "process";
import { Button } from "@/components/ui/button";

export type Todo = {
  id: string;
  title: string;
};
type History = {
  action: string;
  todos: Todo[];
};
export default function TodoApp() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<History[]>([
    {
      action: "init",
      todos: [],
    },
  ]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const canUndo = historyIdx > 0;
  const canRedo = historyIdx < history.length - 1;

  const updateHistory = (action: string, newTodos: Todo[]) => {
    const updatedHistory = [
      ...history.slice(0, historyIdx + 1),
      { action, todos: newTodos },
    ];
    setHistory(updatedHistory);
    setHistoryIdx(historyIdx + 1);
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const updatedTodos = [
      ...todos,
      { id: Date.now().toString(), title: newTodo },
    ];

    setTodos(updatedTodos);
    setNewTodo("");
    updateHistory("add", updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    updateHistory("delete", updatedTodos);
  };

  const undo = () => {
    if (canUndo) {
      setHistoryIdx(historyIdx - 1);
      setTodos(history[historyIdx - 1].todos);
    }
  };
  const redo = () => {
    if (canRedo) {
      setHistoryIdx(historyIdx + 1);
      setTodos(history[historyIdx + 1].todos);
    }
  };

  return (
    <div className="h-screen w-1/3 mx-auto space-y-3">
      <h2 className="text-blue-400 text-xl font-bold text-center">Todo</h2>
      <input
        type="text"
        value={newTodo}
        className="border-2 border-gray-300 p-1 rounded-md w-full"
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />
      <TodoList todos={todos} deleteTodo={deleteTodo} />

      {/* History controls */}
      <div className="flex justify-between">
        <Button disabled={!canUndo} onClick={undo}>
          Undo
        </Button>
        <Button disabled={!canRedo} onClick={redo}>
          Redo
        </Button>
      </div>
    </div>
  );
}
