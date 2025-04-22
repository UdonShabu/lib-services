import React, { useReducer } from "react";

// Action types
const SET_FIELD = "SET_FIELD";
const SET_ERROR = "SET_ERROR";
const RESET_FORM = "RESET_FORM";

// Initial state for form
const initialState = {
  name: "",
  email: "",
  password: "",
  errors: {
    name: "",
    email: "",
    password: "",
  },
  isSubmitting: false,
};

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

// Form Component
const Form = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validate = () => {
    let isValid = true;
    if (!state.name) {
      dispatch({ type: SET_ERROR, field: "name", message: "Name is required" });
      isValid = false;
    } else {
      dispatch({ type: SET_ERROR, field: "name", message: "" });
    }

    if (!state.email || !/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({
        type: SET_ERROR,
        field: "email",
        message: "Valid email is required",
      });
      isValid = false;
    } else {
      dispatch({ type: SET_ERROR, field: "email", message: "" });
    }

    if (!state.password || state.password.length < 6) {
      dispatch({
        type: SET_ERROR,
        field: "password",
        message: "Password must be at least 6 characters",
      });
      isValid = false;
    } else {
      dispatch({ type: SET_ERROR, field: "password", message: "" });
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: SET_FIELD, field: "isSubmitting", value: true });
      // Simulate submission delay
      setTimeout(() => {
        alert("Form submitted successfully!");
        dispatch({ type: RESET_FORM });
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: SET_FIELD, field: "name", value: e.target.value })
          }
        />
        {state.errors.name && <span>{state.errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: SET_FIELD, field: "email", value: e.target.value })
          }
        />
        {state.errors.email && <span>{state.errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={state.password}
          onChange={(e) =>
            dispatch({
              type: SET_FIELD,
              field: "password",
              value: e.target.value,
            })
          }
        />
        {state.errors.password && <span>{state.errors.password}</span>}
      </div>

      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
