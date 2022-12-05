import "./App.scss";
import React from "react";

function App() {
  const [todo, setTodo] = React.useState([]);
  const [text, setText] = React.useState("");
  const addTodo = () => {
    if (text.trim().length) {
      setTodo([
        ...todo,
        {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      ]);
      setText("");
    }
  };
  const removeTodo = (todoId) => {
    setTodo(todo.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="App">
      <div className="container">
        <h3>Type Todo</h3>
        <label>
          <input value={text} onChange={(e) => setText(e.target.value)}></input>
          <button onClick={addTodo}>Add Todo</button>
        </label>
        <div className="list">
          <ul>
            {todo.map((todo) => (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.completed}></input>
                <span>{todo.text}</span>
                <span
                  onClick={() => removeTodo(todo.id)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  &times;
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
