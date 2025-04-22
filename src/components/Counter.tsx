import { useReducer } from "react";

type State = { count: number };
type Action =
  | { type: "INCREMENT"; step: number }
  | { type: "DECREMENT"; step: number }
  | { type: "RESET" };

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.step };
    case "DECREMENT":
      return { count: state.count - action.step };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="space-x-3">
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT", step: 1 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", step: 1 })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
