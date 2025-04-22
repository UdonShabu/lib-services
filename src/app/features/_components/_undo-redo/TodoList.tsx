import { Todo } from "./TodoApp";

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
};

export default function TodoList({ todos, deleteTodo }: TodoListProps) {
  return (
    <ul className="space-y-2 w-full">
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between shadow-md p-1">
          <span>{todo.title}</span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-400 text-white p-1 rounded-md"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
