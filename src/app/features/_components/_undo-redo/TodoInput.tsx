import React from "react";

const TodoInput = ({ newTodo, setNewTodo, addTodo }) => {
  return (
    <div className="flex">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="p-2 border border-gray-300 rounded-l-lg w-full"
        placeholder="Enter a new todo"
      />
      <button
        onClick={addTodo}
        className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
