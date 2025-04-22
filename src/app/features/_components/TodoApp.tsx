"use client";

import { useState } from "react";
import TodoInput from "./_undo-redo/TodoInput";
import TodoList from "./_undo-redo/TodoList";
import HistoryControls from "./_undo-redo/HistoryControls";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [history, setHistory] = useState([{ todos: [], action: "init" }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateHistory = (newTodos, action) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    setHistory([...updatedHistory, { todos: newTodos, action }]);
    setHistoryIndex(updatedHistory.length);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodo("");
      updateHistory(updatedTodos, "add");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    updateHistory(updatedTodos, "delete");
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTodos(history[historyIndex - 1].todos);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTodos(history[historyIndex + 1].todos);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Todo List with Undo/Redo
        </h1>

        {/* Todo Input Component */}
        <TodoInput
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />

        {/* Todo List Component */}
        <TodoList todos={todos} deleteTodo={deleteTodo} />

        {/* History Controls Component */}
        <HistoryControls
          undo={undo}
          redo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
        />
      </div>
    </div>
  );
};

export default TodoApp;
